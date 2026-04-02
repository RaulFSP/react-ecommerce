import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getProductById } from "../data/products"
import { CartContext } from "../context/CartContext";
export default function Checkout() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()
    const { addItem } = useContext(CartContext)
    useEffect(() => {
        const foundProduct = getProductById(id)
        if (!foundProduct) {
            navigate("/")
            return
        }
        setProduct(foundProduct)
    }, [id, navigate])

    if (!product) {
        return <div>Loading...</div>
    }
    return (
        <div className="page">
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-detail-content">
                        <h1 className="product-detail-name">{product.name}</h1>
                        <p className="product-detail-price">{product.price}</p>
                        <p className="product-detail-description">{product.description}</p>
                        <button className="btn btn-primary" onClick={() => addItem(product.id)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>)
}