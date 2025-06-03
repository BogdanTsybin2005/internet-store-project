import './RegisterPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/input/FormInput';
import GoBackToMainPageButton from '../../components/auth-button-to-main-page/go-back-button';
import { useAuthStore } from '../../store/authStore';



export default function RegisterPage() {
    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.agree) newErrors.agree = 'You must agree to terms';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            alert('Registration failed!');
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-left-panel">
                <GoBackToMainPageButton isButtonFixed />
                <h2>Welcome to our store!</h2>
                <h1>CREATE ACCOUNT</h1>
                <p>Shop smart and easy. Register now and enjoy exclusive benefits!</p>
            </div>
            <div className="auth-right-panel">
                <div className="auth-form-wrapper">
                <h2>Register Account</h2>
                    <form className="auth-form" onSubmit={handleRegister}>
                        <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                        <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
                        <FormInput label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                        <FormInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
                        <FormInput label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                        <div className="form-options">
                        <label>
                            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} /> I agree to the terms
                        </label>
                        <Link to="/login">Already have an account?</Link>
                        </div>
                        {errors.agree && <span className="error">{errors.agree}</span>}
                        <button type="submit" className="auth-button">REGISTER</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
