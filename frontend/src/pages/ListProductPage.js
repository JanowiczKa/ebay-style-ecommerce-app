import axios from "axios";
import { useState } from "react";

export default function ListProductPage() {
  const [productImg, setProductImg] = useState(null);
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState(1);
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  const createProductListing = async event => {

    event.preventDefault();
    const fd = new FormData();
    fd.append('image', productImg);

    fd.append("userId", localStorage.getItem('userId'));
    fd.append("productName", productName);
    fd.append("productQty", productQty);
    fd.append("productPrice", productPrice);
    fd.append("productDesc", productDesc);

    await axios.post('/api/createListing',
    fd, 
    {onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      console.log(`Upload progress: ${percentCompleted}%`)
      if (percentCompleted===100)window.location.reload();
    }}).then(res => {
        console.log(res);
    });
  } 

  return (  
    <div className="row centre">
      <form onSubmit={createProductListing}>

        <div >
          <h2 htmlFor="upload">Picture of product:</h2>
          <input 
          type="file" 
          name="upload" 
          accept='image/*'
          onChange={(i) => setProductImg(i.target.files[0])}
          required>
          </input>
        </div><br/>
        
        <div>
          <h2 >Product Name:</h2>
          <input type="text" z
          placeholder=""
          onChange={(i) => setProductName(i.target.value)} 
          required/><br/>
        </div><br/>

        <div>
          <h2 >Product Quantity:</h2>
          <input type="number" 
          placeholder=""
          onChange={(i) => setProductQty(i.target.value)} 
          required/><br/>
        </div><br/>

        <div>
          <h2 >Product Price:</h2>
          <input type="text" 
          placeholder="£"
          min={0}
          onChange={(i) => setProductPrice(i.target.value)} 
          required/><br/>
        </div><br/>

        <div>
          <h2 >Product Description:</h2>
          <input type="text" 
          placeholder=""
          onChange={(i) => setProductDesc(i.target.value)} 
          maxLength="512"
          /><br/>
        </div><br/>

        <div>
          <input type="submit" value="Create Listing"></input>
        </div>

      </form>
      
    </div>  
  );
}
