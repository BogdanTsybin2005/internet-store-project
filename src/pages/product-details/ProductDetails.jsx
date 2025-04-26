import { useParams } from 'react-router-dom';
import './ProductDetails.css';



function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="product-details">
      <h1>Информация о товаре #{id}</h1>
    </div>
  );
}

export default ProductDetails;
