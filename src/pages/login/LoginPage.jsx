import './LoginPage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../../components/input/FormInput';
import GoBackToMainPageButton from '../../components/auth-button-to-main-page/go-back-button';



export default function LoginPage() {
    const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!loginData.email.includes('@')) newErrors.email = "Enter a valid email";
        if (!loginData.password) newErrors.password = "Password cannot be empty";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData({ ...loginData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Login Data:", loginData);
        setErrors({});
    };

    return (
        <div className="auth-page-container">
            <div className="auth-left-panel">

                <GoBackToMainPageButton isButtonDark={false}/>
                
                <h2>Nice to see you again</h2>
                <h1>WELCOME BACK</h1>
                <p>Access your account and continue your shopping experience.</p>
            </div>
            <div className="auth-right-panel">
                <div className="auth-form-wrapper">
                    <h2>Login Account</h2>
                    <form className="auth-form" onSubmit={handleLogin}>
                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <div className="form-options">
                            <label>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={loginData.remember}
                                    onChange={handleChange}
                                /> Keep me signed in
                            </label>
                            <Link to="/register">Don't have an account?</Link>
                        </div>
                        <button type="submit" className="auth-button">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
