import { createContext,React, useEffect, useState } from "react";
import axios from "axios";


export const ProfileContext = createContext();


export default function ProfileProvide({children}) {
    const customer_id = localStorage.getItem('customer_id');
    const token = localStorage.getItem('access_token');
    
    const [getProfile,setProfile] = useState([])

    useEffect(() => {

      const config = {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      };
  
      axios.get(`${process.env.REACT_APP_API_URL}/auth/customer/profile/${customer_id}/`, config)
          .then((response) => {
              setProfile(response.data.data);
          })
          .catch((error) => {
              console.log("Error fetching the API", error);
          });
  }, [customer_id, token]);

  return (
    <ProfileContext.Provider value = {{getProfile,setProfile}}>
      {children}
    </ProfileContext.Provider>
  )
}
