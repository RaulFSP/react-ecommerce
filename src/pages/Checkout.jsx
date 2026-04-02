import { useContext } from "react";
import { CartContext } from "../context/CartContext";
export default function Checkout() {
    const { getCartItemsWithProducts, updateQuantity, removeItem, getCartTotal, placeOrder } = useContext(CartContext)
    const cartItems = getCartItemsWithProducts()
    const usdFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    return (
        <div className="page">
            <div className="container">
                <h1 className="page-title">Checkout</h1>
                <div className="checkout-container">
                    <div className="checkout-items">
                        <h2>Order Summary</h2>
                        {cartItems.map((item) => (
                            < div className="checkout-item" key={item.id}>
                                <img
                                    src={item.product.image}
                                    className="checkout-item-image"
                                />
                                <div className="checkout-item-details">
                                    <h3 className="checkout-item-name">{item.product.name}</h3>
                                    <p className="checkout-item-price">{usdFormatter.format(item.product.price)} each</p>
                                </div>
                                <div className="checkout-item-controls">
                                    <div className="quantity-controls">
                                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <p className="checkout-item-total">{usdFormatter.format(item.product.price * item.quantity)}</p>
                                    <button className="btn btn-secondary btn-small" onClick={() => removeItem(item.product.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="checkout-summary">
                        <h2 className="checkout-section-title">Total</h2>
                        <div className="checkout-total">
                            <p className="checkout-total-label">Total:</p>
                            <p className="checkout-total-value checkout-total-final">
                                {usdFormatter.format(getCartTotal())}
                            </p>
                        </div>
                        <button className="btn btn-primary" onClick={() => placeOrder()}>Place Order</button>
                    </div>
                </div>
            </div>
        </div >)
}