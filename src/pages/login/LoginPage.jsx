import './LoginPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/input/FormInput';
import GoBackToMainPageButton from '../../components/auth-button-to-main-page/go-back-button';
import { useAuthStore } from '../../store/authStore';



export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!loginData.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (!loginData.password) newErrors.password = 'Password cannot be empty';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({ ...loginData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await login(loginData);
      navigate('/');
    } catch (err) {
      alert('Wrong email or password!');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-left-panel">
        <GoBackToMainPageButton isButtonFixed />
        <h2>Nice to see you again</h2>
        <h1>WELCOME BACK</h1>
        <p>Access your account and continue your shopping experience.</p>
      </div>
      <div className="auth-right-panel">
        <div className="auth-form-wrapper">
          <h2>Login Account</h2>
          <form className="auth-form" onSubmit={handleLogin}>
            <FormInput label="Email" name="email" value={loginData.email} onChange={handleChange} error={errors.email} />
            <FormInput label="Password" name="password" type="password" value={loginData.password} onChange={handleChange} error={errors.password} />
            <div className="form-options">
              <label>
                <input type="checkbox" name="remember" checked={loginData.remember} onChange={handleChange} /> Keep me signed in
              </label>
              <Link to="/registration">Don't have an account?</Link>
            </div>
            <button type="submit" className="auth-button">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}
