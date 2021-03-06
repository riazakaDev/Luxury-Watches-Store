import {createContext, useState} from 'react';

export const CartContext = createContext();
const STORAGE_ITEM = 'luxury_watch'


export const CartProvider = ({children}) => {
    const initialItems = JSON.parse(localStorage.getItem(STORAGE_ITEM)) || [] ;
    
    const calcCartTotal = items => {
        localStorage.setItem(STORAGE_ITEM, JSON.stringify(items))
        const itemsCount = items.reduce((prev, curr) =>prev + curr.qty ,0);
        const cartTotal = items.reduce(
            (prev, curr) => prev + curr.qty * curr.price,
            0
        )

        return {itemsCount, cartTotal}
    }

    const [cart, setCart] = useState({
        items : initialItems,
        ...calcCartTotal(initialItems),
    })



    const addToCart = product => {
        const { items = []} = cart;
        const productIndex = items.findIndex(item => item.id === product.id)

        if (productIndex === -1){
            items.push({
                ...product,
                qty: 1,
            })
        }else{
            items[productIndex].qty++;
        }

        const total = calcCartTotal(items)
        setCart({
            items,
            ...total,
        })

    }
    const removeFromCart = product => {
        const { items = []} = cart;
        const productIndex = items.findIndex(item => item.id === product.id)

        if (productIndex !== -1){
            items.splice(productIndex, 1)
        }
        const total = calcCartTotal(items)
        setCart({
            items,
            ...total,
        })
    }

    return (<CartContext.Provider value={{cart, addToCart, removeFromCart}}>
        {children}
    </CartContext.Provider>
    )
}