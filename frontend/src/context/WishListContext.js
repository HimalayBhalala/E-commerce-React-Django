import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const [wish_list, setWishList] = useState(() => {
       try{
            const wishlist_data = JSON.parse(localStorage.getItem('wishlist'))
            return wishlist_data
       }catch(error){
            console.log("Error During getting a array")
            return []
       }
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wish_list));
    }, [wish_list]);

    return (
        <WishListContext.Provider value={{ wish_list, setWishList }}>
            {children}
        </WishListContext.Provider>
    );
};
