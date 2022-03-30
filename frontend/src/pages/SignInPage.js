import axios from "axios";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async event => {

    event.preventDefault();

    const response = await axios.post('/api/login',
    {
      email: email,
      password: password
    })
    .catch(function (error) {
      alert(`error: ${error}`);
    });

    alert(response.data);
    if (response.data){

      localStorage.setItem('userId', response.data);
      setEmail("");
      setPassword("");
    }
    else{
      setPassword("");
    }
    window.location.reload();
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
