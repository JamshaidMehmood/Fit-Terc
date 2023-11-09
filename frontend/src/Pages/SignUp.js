import { useState } from 'react';
import './SignUp.css';
import { useSignUp } from '../Hooks/useSignUp';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUp, isLoading, error] = useSignUp();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await signUp(email, password);


        setEmail("")
        setPassword("")
        
    };

    return (
        <form className='signUP' onSubmit={onSubmitHandler}>
            <h3>Sign UP</h3>
            <label>Email :</label>
            <input
                type='email'
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                value={email}
            />

            <label>Password :</label>
            <input
                type='password'
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                value={password}
            />

            <button disabled={isLoading}>SignUp</button>

            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default SignUp;
