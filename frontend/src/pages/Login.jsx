import {useState} from 'react'
import {useAuth} from "../contex/auth"
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   const {login} = useAuth()
    const navigate = useNavigate()
    
      const submitHandler = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Please fill in the form");
            return;
        }
    
        const loginSuccess = await login({ username, password });
        if (loginSuccess) {
            navigate("/");
        } else {
            alert("Login failed. Please try again.");
        }
    };
       
  
  return (
    <div className="Login">
    <h1>Login Page</h1>
    <form onSubmit={submitHandler}>
    <div className="form-control">
          <label htmlFor="">Email:  </label>
          <input type="email"  id="email" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:  </label>
          <input type="password"  id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
          <div className="form-control">
        <button type="submit"> Login</button>
      </div>
    </form>
  </div>
  )
}

export default Login