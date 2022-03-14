import React from 'react';

export default function SignInPage() {
  return (
  <div>
    <form>
      <label for="email">Email Address:</label><br/>
      <input type="text" id="email" placeholder="Email..." name="email" value=""/><br/>

      <label for="password">Password:</label><br/>
      <input type="text" id="password" placeholder="Password..." name="password" value=""/><br/>
      <input type="submit" value="Submit"></input>
    </form>
  </div>);
}
