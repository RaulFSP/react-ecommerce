import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products"
import { AuthContext } from "./AuthContext";
export const CartContext = createContext(null)

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([])
    const { user } = useContext(AuthContext)
    function addItem(productId) {
        const existing = cartItems.find(i => i.id === productId)
        if (existing) {
            const currentQuantity = existing.quantity
            const updatedItems = cartItems.map((i) => i.id === productId ? { id: productId, quantity: currentQuantity + 1 } : i)
            setCartItems(updatedItems)
        } else {
            setCartItems([...cartItems, { id: productId, quantity: 1 }])
        }
    }

    function getCartItemsWithProducts() {
        return cartItems.map(item => ({
            ...item, product: getProductById(item.id)
        })).filter(item => item.product)
    }

    function removeItem(productId) {
        setCartItems(cartItems.filter(item => item.id !== productId))
    }

    function updateQuantity(productId, quantity) {
        if (quantity < 1) {
            removeItem(productId)
            return
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        )
    }
    function getCartTotal() {
        const total = cartItems.reduce((total, i) => {
            const p = getProductById(i.id)
            return total + (p ? p.price * i.quantity : 0)
        }, 0)
        return total
    }

    function placeOrder() {
        if (!user) {
            alert("Login is necessary for placing orders!")
        } else {
            alert("Successful Order!")
            clearCart()

        }
    }
    function clearCart() {
        setCartItems([])
    }
    return (
        <CartContext.Provider value={{ placeOrder, getCartTotal, addItem, cartItems, getCartItemsWithProducts, removeItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}