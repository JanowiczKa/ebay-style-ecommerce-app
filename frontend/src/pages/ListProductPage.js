import axios from "axios";
import { useState } from "react";

export default function ListProductPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async event => {

    event.preventDefault();
  }

  return (  
    <div>
      <form onSubmit={handleLogin}>

        <div>
          <label >Email Address:</label><br/>
          <input type="text" 
          placeholder="Email..." 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required/><br/>
        </div>

        <div>
          <label >Password:</label><br/>
          <input type="text" 
          placeholder="Password..." 
          value={password} 
          onChange={(i) => setPassword(i.target.value)} 
          required/><br/>
        </div>

        <div>
          <input type="submit" value="Submit"></input>
        </div>
        
      </form>
    </div>);
}
