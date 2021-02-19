import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, image, title, price, rating}) {
    const [{basket}, dispatch] = useStateValue();
    
    const ratings = Array(rating).fill().map((star) => <p>⭐️</p>);

    const removeFromBasket = () => {
        // remove the item from the basket from the data layer
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt="" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {ratings}
                </div>
                <button onClick={removeFromBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
