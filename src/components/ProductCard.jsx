import { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";
export default function Productcard({ product }) {
    const { addItem } = useContext(CartContext)

    return (
        <div className="product-card" key={product.id}>
            <img src={product.image} className="product-card-image" />
            <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">{product.price}</p>
                <div className="product-card-actions">
                    <Link className="btn btn-secondary" to={`/products/${product.id}`}>View Details</Link>
                    <button className="btn btn-primary" onClick={() => addItem(product.id)}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}