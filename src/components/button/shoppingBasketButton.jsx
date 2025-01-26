import basketIcon from '../../components/img/pictures/shopping-basket.png';
import rightArrow from '../../components/img/pictures/right-arrow.png';



export default function ShoppingBasketButton(props) {
    const {functionAfterClick} = props;
    return <button className="shopping-basket-button" onClick={functionAfterClick}>
        <img id='img-1' src={basketIcon} alt="basket picture" width={20}/>
        <img id='img-2' src={rightArrow} alt="right arrow picture" width={20}/>
        <span className="quantity-of-selected-items">100</span>
    </button>
}

