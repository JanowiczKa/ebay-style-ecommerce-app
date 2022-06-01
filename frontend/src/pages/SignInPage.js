import axios from "axios";
import { useState } from "react";

export default function SignInPage() {
  const [Lemail, setLEmail] = useState("");
  const [Lpassword, setLPassword] = useState("");

  const [Remail, setREmail] = useState("");
  const [Rpassword, setRPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async event => {

    event.preventDefault();

    const response = await axios.post('/api/login',
    {
      email: Lemail,
      password: Lpassword
    })
    .catch(function (error) {
      alert(`error: ${error}`);
    });

    alert(response.data);
    if (response.data){

      localStorage.setItem('userId', response.data);
      setLEmail("");
      setLPassword("");
    }
    else{
      setLPassword("");
    }
    window.location.reload();
  }

  const handleRegister = async event => {

    event.preventDefault();

    const response = await axios.post('/api/register',
    {
      name: name,
      email: Remail,
      password: Rpassword
    })
    .catch(function (error) {
      alert(`error: ${error}`);
    });

    alert(response.data);
    if (response.data  === "success"){
      setName("");
      setREmail("");
      setRPassword("");
    }
    else{
      setName("");
      setREmail("");
      setRPassword("");
    }
    window.location.reload();
  }

  return (  
    <div className="row top">
      <form onSubmit={handleLogin}>

        <h1>Login</h1>

        <br></br>

        <div>
          <label >Email Address:</label><br/>
          <input type="text" 
          placeholder="Email..." 
          value={Lemail} 
          onChange={(e) => setLEmail(e.target.value)} 
          required/><br/>
        </div>

        <br></br>

        <div>
          <label >Password:</label><br/>
          <input type="text" 
          placeholder="Password..." 
          value={Lpassword} 
          onChange={(i) => setLPassword(i.target.value)} 
          required/><br/>
        </div>

        <br></br>

        <div>
          <input type="submit" value="Submit"></input>
        </div>
        
      </form>

      <div>

      </div>

      <form onSubmit={handleRegister}>

        <h1>Register</h1>

        <br></br>

        <div>
          <label >Name:</label><br/>
          <input type="text" 
          placeholder="Name..." 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required/><br/>
        </div>

        <br></br>

        <div>
          <label >Email Address:</label><br/>
          <input type="text" 
          placeholder="Email..." 
          value={Remail} 
          onChange={(e) => setREmail(e.target.value)} 
          required/><br/>
        </div>

        <br></br>

        <div>
          <label >Password:</label><br/>
          <input type="text" 
          placeholder="Password..." 
          value={Rpassword} 
          onChange={(i) => setRPassword(i.target.value)} 
          required/><br/>
        </div>

        <br></br>

        <div>
          <input type="submit" value="Submit"></input>
        </div>

      </form>
    </div>);
}
