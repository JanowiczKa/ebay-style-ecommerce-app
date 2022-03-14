import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const mongoose = require('mongoose')
import express from 'express';
import data from './data.js';
import User from './models/user.js';


//Connecting to the MongoDB Atlas Database

async function createUser(name, password, email, isadmin) {
    return new User({
      name,
      password,
      email,
      isadmin
    }).save()
}
  
  async function findUser(username) {
    return await User.findOne({ username })
}

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

app.get('/api/products', (req, res) =>{
    res.send(data.products);
});

app.get('/', (req, res) =>{
    res.send('Home page');
});

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server at http://localhost:${port}`);
});