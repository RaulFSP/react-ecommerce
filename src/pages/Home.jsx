import { getProducts } from "../data/products"
import { Link } from "react-router";
import ProductCard from "../components/ProductCard"
export default function Home() {
    const products = getProducts()
    return (<div className="page">
        <section className="home-hero">
            <h1 className="home-title">Welcome to ShopUp</h1>
            <p className="home-subtitle">Discover amazing products at great prices</p>
        </section>
        <section className="container">
            <h2 className="page-title">Our Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </section>
    </div>)
}