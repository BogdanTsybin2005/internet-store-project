import './CheckoutPage.css';
import { useState } from 'react';
import EnhancedInput from '../../components/enhanced-input/input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import GoBackToMainPageButton from '../../components/auth-button-to-main-page/go-back-button';



const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  country: '',
  address: '',
  postalCode: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  saveCard: false,
};

const inputSections = [
  {
    title: 'Personal Information',
    fields: [
      { label: 'First Name', type: 'text', name: 'firstName' },
      { label: 'Last Name', type: 'text', name: 'lastName' },
      { label: 'Email', type: 'email', name: 'email' },
      { label: 'Phone', type: 'tel', name: 'phone' },
    ],
    layout: 'double',
  },
  {
    title: 'Shipping Address',
    fields: [
      { label: 'Country', type: 'text', name: 'country' },
      { label: 'City', type: 'text', name: 'city' },
      { label: 'Street, House, Apt', type: 'text', name: 'address' },
      { label: 'Postal Code', type: 'text', name: 'postalCode' },
    ],
    layout: 'double',
  },
  {
    title: 'Card Details',
    fields: [
      { label: 'Cardholder Name', type: 'text', name: 'cardName' },
      { label: 'Card Number', type: 'text', name: 'cardNumber' },
    ],
    additionalFields: [
      { label: 'MM/YY', type: 'text', name: 'expiry' },
      { label: 'CVV', type: 'text', name: 'cvv' },
    ],
  },
];

function CheckoutPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'saveCard' && !value.trim()) {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        newErrors[key] = `${formattedKey} is required`;
      }
    });

    if (formData.country.trim() && formData.country.length < 3) {
      newErrors.country = 'Country name must be at least 3 characters long';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Data:', formData);
      alert('Order placed successfully!');
      setFormData(initialFormData);
    } else {
      setErrors(validationErrors);
    }
  };

  const renderInputs = (fields, layout) => {
    if (layout === 'double') {
      const pairedFields = [];
      for (let i = 0; i < fields.length; i += 2) {
        pairedFields.push(fields.slice(i, i + 2));
      }
      return pairedFields.map((pair, index) => (
        <div className="input-row" key={index}>
          {pair.map(({ label, type, name }) => (
            <EnhancedInput
              key={name}
              label={label}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              error={errors[name]}
            />
          ))}
        </div>
      ));
    } else {
      return fields.map(({ label, type, name }) => (
        <EnhancedInput
          key={name}
          label={label}
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          error={errors[name]}
        />
      ));
    }
  };

  return (
    <>
      <GoBackToMainPageButton isButtonDark isButtonFixed />
      <div className="checkout-page">
        <h1>Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>
          {inputSections.map(({ title, fields, additionalFields, layout }) => (
            <div className="form-section" key={title}>
              <h2>{title}</h2>
              {renderInputs(fields, layout)}
              {additionalFields && (
                <div className="card-details">
                  {additionalFields.map(({ label, type, name }) => (
                    <EnhancedInput
                      key={name}
                      label={label}
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      error={errors[name]}
                    />
                  ))}
                </div>
              )}
              {title === 'Card Details' && (
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span> Save card for next time
                </label>
              )}
            </div>
          ))}
          <SubmitButton text="PAY NOW" />
        </form>
      </div>
    </>
  );
}

export default CheckoutPage;
