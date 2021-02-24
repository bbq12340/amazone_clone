import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './Reducer';
import { useStateValue } from './StateProvider';
import axios from './axios';

function Payment() {
    const history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();
    
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("")
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the the total in a currencies subunits
                // meaning of '100': subunits are cents in stripe. times 100 for changing 'em to dollars
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret);

    const onSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        // first step - client secret
        // clientSecret is refreshed everytime basket is updated (useEffect)

        // second step - confirm payment
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace("/orders");
        })
    }

    const onChange = (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout(<Link to="/checkout">{basket?.length} items</Link>)</h1>
                {/* delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                {/* Review items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}/>
                        ))}
                    </div>
                </div>
                {/* Payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe function */}
                        <form onSubmit={onSubmit}>
                            <CardElement onChange={onChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                    <>
                                        <p>
                                            <h3>Order Total: {value}</h3>
                                        </p>
                                        <small className="subtotal__gift">
                                            <input type="checkbox" /> This order contains a gift
                                        </small>
                                    </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
