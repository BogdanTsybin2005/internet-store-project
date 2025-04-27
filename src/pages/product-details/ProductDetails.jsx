import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetails.css';
import GoBackToMainPageButton from '../../components/auth-button-to-main-page/go-back-button';



export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="product-details"><p className="loading">Loading...</p></div>;
  }

  if (!product) {
    return <div className="product-details"><p className="error">Product not found</p></div>;
  }

  return (
    <div className="product-details">
      <GoBackToMainPageButton isButtonDark isButtonFixed/>
      <div className="product-card">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-category"><strong>Category:</strong> {product.category}</p>
          <p className="product-price"><strong>Price:</strong> ${product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-rating">
            <span>⭐ {product.rating.rate} / 5</span>
            <span>({product.rating.count} reviews)</span>
          </div>
          <button className="buy-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
