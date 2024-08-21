import { createContext, useEffect, useState } from "react";

export const RatingContext = createContext();

export const RatingProvider = ({ children }) => {

    const [getRatingInfo, setRatingInfo] = useState(() => {
       try{
            const rating_data = JSON.parse(localStorage.getItem('rating'))
            return rating_data || []
        }catch(error){
            console.log("Error During getting a array")
            return []
        }
    });
    
    useEffect(() => {
        localStorage.setItem('rating',JSON.stringify(getRatingInfo))
    },[getRatingInfo])

    return (
        <RatingContext.Provider value={{ getRatingInfo, setRatingInfo }}>
            {children}
        </RatingContext.Provider>
    );
};
