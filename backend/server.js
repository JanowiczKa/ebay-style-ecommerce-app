import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const mongoose = require('mongoose')
import express from 'express';
import data from './data.js';
import User from './models/user.js';
import Product from './models/product.js';
import CartItem from './models/cartItem.js';
import { PassThrough } from 'stream';


//Connecting to the MongoDB Atlas Database

;(async () => {

    const connectionString = 'mongodb+srv://root:IzwjBNDtyhng1tct@kamazondb.1iaxw.mongodb.net/kamazonDB?retryWrites=true&w=majority';
    const connector = mongoose.connect(connectionString);

    // const name = 'Bob';
    // const password = '87654321';
    // const email = 'Bob@kamazon.com';
    // const isadmin = false;

    // let user = await connector.then(async () => {
    //     return findUser(name)
    // })
    
    //   if (!user) {
    //     user = await createUser(name, password, email, isadmin);
    // }
  
    // console.log(user + " was added to the database");
    // process.exit(0)
})()

//Express middleware
const app = express();

app.use( express.json());

const multer = require('multer');  

const storage =   multer.diskStorage({  
    destination: './frontend/public/images',  
    filename: function (req, file, callback) {  
      callback(null, Date.now() + '-' + file.originalname);  
    }  
}); 

const upload = multer({ 
    storage : storage,
    limits : {fileSize: 1000000}, //1MB
    fileFilter(req, file, cb) { //will upload only png and jpg format
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
}).single('image');  









async function createUser(name, password, email, imageAddress, isadmin) {
    let rating = 0;
    let ratings = 0;
    let cart = new Array("");
    let img = "DefaultUser.png";
    return new User({
      name,
      password,
      email,
      rating,
      ratings,
      img,
      cart,
      isadmin
    }).save()
}

async function createCartItem(ItemID, Quantity) {
    return new CartItem({
        ItemID,
        Quantity
    }).save()
}

async function reduceProductStock(ItemID) {

    //userId is person that bought it, not the seller
    //let qty = await Product.findOne({ _id: ItemID }).select(Quantity);
    let prod = await Product.findById(ItemID);
    let qty = prod.Quantity;
    prod.Quantity = (qty-1);

    await prod.save();

    //await Product.updateOne( { _id: ItemID }, { $set: { Quantity: (qty-1) } } ).save();

    await Product.deleteMany({ Quantity: { $lte: 0 } }).save();

    return true;
}

async function CleanUserCart(userID) {

    await CartItem.deleteMany({ SellerId: userID });

    await User.updateOne( { _id: userID }, { $set: { Cart: [] } } );
}

async function createProduct(SellerId, SellerName, ProductName, Price, Quantity, Description, ImageAddress) {
    return new Product({
        SellerId,
        SellerName,
        ProductName,
        Price,
        Quantity,
        Description,
        ImageAddress
    }).save()
}

async function GetDisplayProduct(){

    var count = await Product.countDocuments();

    //console.log(`count is equal to ${count}`)

    let rand = Math.floor(Math.random() * count);

    //console.log(`rand is ${rand}`);

    let randomProduct = await Product.findOne().skip(rand);

    return randomProduct;
}

async function CheckIfUserExists(username, pass) {
    
    console.log(`email is ${username} and password is ${pass}`);
    
    try{
        let user = await User.findOne( {email: username, password: pass} );
        console.log(user);

        if (!user) {
            return false;
        }
        else{
            return user;
        }
    }
    catch (e){
        console.log(e.message);
    }  
}

//creates product data
app.use('/api/createProduct', async (req, res) =>{

    const name = 'Crystal Dice';
    const quantity = 4;
    const price = 4.40;
    const desc = 'very pretty looking dice :3';
    const img = 'product-1.jpg';

    //userId, name, price, quantity, desc, img

    // let newProduct = await createProduct('622d7e6684ecb20e7af623fb', name, price, quantity, desc, img);

    // console.log(newProduct + " was added to the database");

    // res.send(newProduct);
});

//retrieves products for main screen
app.get('/api/products', async (req, res) =>{
    
    const displayProducts = [];
    
    for (let i = 0; i < 6; i++){
        displayProducts.push(await GetDisplayProduct());
    }

    
    //console.log(`products were called they are: ${displayProducts}`);

    res.send(displayProducts);
});

//retrieves products for main screen
app.use('/api/cart', async (req, res) =>{
    
    let entireCart = await User.findById( req.body.userId );

    //console.log(`cart has been called`);

    res.send(entireCart.Cart);
});

app.use('/api/uploadImage', async (req, res) =>{
    upload(req,res,function(err) {  
        if(err) {  
            return res.end("Error uploading file.");  
        }  
        res.end("File is uploaded successfully!");  
    });  
});

app.use('/api/createListing', async (req, res) =>{

    upload(req,res,async function(err) {  

        if(err) {  
            return res.end("Error uploading file.");  
        } 

        //console.log(req.body);
        console.log(req.file.filename);
        console.log(req.body.productName);

        let user = await User.findById(req.body.userId);

        let newProduct = await createProduct(
            user._id, 
            user.name,
            req.body.productName, 
            req.body.productPrice, 
            req.body.productQty, 
            req.body.productDesc, 
            req.file.filename);
        
        await User.updateOne(
            { _id: req.body.userId }, 
            { $push : { "Selling" : [newProduct._id] } }            
        );

        //createProduct(SellerId, ProductName, Price, Quantity, Description, ImageAddress)
        
        // fd.append('image', productImg);
        // fd.append("userId", localStorage.getItem('userId'));
        // fd.append("productName", productName);
        // fd.append("productQty", productQty);
        // fd.append("productPrice", productPrice);
        // fd.append("productDesc", productDesc);

        res.end("success!");  
    });  

});

//takes in Id and returns used info, without password.
app.use('/api/changeProfilePicture', async (req, res) =>{

    upload(req,res,async function(err) {  

        if(err) {  
            return res.end("Error uploading file.");  
        } 

        console.log(req.body.userId);
        console.log(req.file.filename);
        
        const update = await User.updateOne( 
            {_id: req.body.userId}, //filter
            {ImageAddress: req.file.filename} //update
        );
        
        
        
        //delete image which was used as pfp last


        res.end("new pfp is uploaded successfully!");  
    });  

});


//retrieves products for main screen
app.use('/api/retrieveCartItem', async (req, res) =>{
    
    let cartItem = await CartItem.findById( req.body.cartId );

    let product = await Product.findById( cartItem.ItemID );

   // console.log(`cart item retriveal has been called`);

    res.send(product);
});


//retrieves products for main screen
app.use('/api/getCart', async (req, res) =>{
    
    let cartItem = await CartItem.findById( req.body.cartId );
    //console.log(`cart item retriveal has been called`);

    res.send(cartItem);
});

//retrieves product data
app.use('/api/getProduct', async (req, res) =>{
    
    try{
        let x = await Product.findById(req.body.prodId);
        
        //console.log(`the returning product is ${x}`);

        res.send(x);
    }
    catch{
        res.send(null);
    }
});

//takes in Id and returns used info, without password.
app.use('/api/getUserById', async (req, res) =>{
    
    try{
        let x = await User.findById(req.body.profileID);
        
        //console.log(`the returning product is ${x}`);

        res.send(x);
    }
    catch{
        res.send(null);
    }
});

//handles adding the item to users cart
app.use('/api/addToCart', async (req, res) =>{ //itemId, userId, quantitySelected

    //check if cart exists, if it does just incrememnt quantity by 1
    //if cart quantity > product stock don't increment

    console.log(`${req.body.itemId}, ${req.body.userId}, ${req.body.quantitySelected} was added to cart`);

    let currUserCart = await User.find({ Cart: req.body.itemId });

    //console.log(`the item in cart is ${currUserCart}`);

    if (!currUserCart){
        //console.log("Item already in cart");
        res.send("Item already in cart");
    }
    else{
        
        let newProduct = await createCartItem(req.body.itemId, req.body.quantitySelected);

        await User.updateOne(
            { _id: req.body.userId }, 
            { $push : { "Cart" : [newProduct._id] } }            
        );

        console.log("Created a cart item");
        res.send(newProduct);   
    }
});

//retrieves product data
app.use('/api/reviews', async (req, res) =>{
    //console.log(`review data is ${req.body.sellerId}`);
    let revs = await User.findById(req.body.sellerId).select('name Rating Ratings');
    //console.log(`review data is ${revs}`);
    res.send(revs);
});

//login page
app.post('/api/login', async (req, res) =>{

    const data = req.body;
    let user = await CheckIfUserExists(data.email, data.password);

    if (user){
        //console.log(`Successfully logged in user: ${user._id}.`);
        res.send(user._id);
        //put in user id into the app in frontend so pages can access it.
        //redirect user to home page.
    }
    else{
        //console.log("Failed to log in.");
        res.send(null);
    }
})

//register page
app.post('/api/register', async (req, res) =>{

    const data = req.body;
    let user = await CheckIfUserExists(data.email, data.password);

    if (!user){
        await createUser(data.name, data.password, data.email, "DefaultUser.png", false);

        res.send("success");
        //put in user id into the app in frontend so pages can access it.
        //redirect user to home page.
    }
    else{
        //console.log("Failed to log in.");
        res.send("fail");
    }
})

//purchase goods
app.post('/api/purchaseGoods', async (req, res) =>{

    const data = req.body;

    for (let i = 0; i < data.cartIds; i++){
        console.log(`${data.cartIds[i]}, was in the cart`);
        reduceProductStock(data.cartIds[i]);
    }

    
    if (CleanUserCart(data.user)){

        res.send("success");
    }
    else{
        res.send("fail");
    }
})

//home page
app.get('/', (req, res) =>{
    //console.log(`Home page`);
    res.send('Home page');
});

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server at http://localhost:${port}`);
});