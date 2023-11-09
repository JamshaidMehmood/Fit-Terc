import {useState} from 'react'
import './Login.css'
import { useLogin } from '../Hooks/useLogin'

const Login = () => {
    const [email , setEmail]=useState('')
    const [password , setPassword]=useState('')
    const [login , isLoading , error] = useLogin()


    const onSubmitHandler =  async (e) =>
    {
        e.preventDefault()
        await login(email, password)

        setEmail("")
        setPassword("")
    }
  
    return (
    <form className='login' onSubmit={onSubmitHandler}>
        <h3>Log In</h3>
        <label>Email :</label>
        <input type='email'
        onChange={(e) => {
            setEmail(e.target.value)
        }}
        value={email}
        />

        <label>Password :</label>
        <input type='password'
        onChange={(e) => {
            setPassword(e.target.value)
        }}
        value={password}
        />

        <button disabled={isLoading}>LogIn</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
