// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserDataService from '../services/user.js';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
  
       try {
        const data = await UserDataService.getUserByEmail(user.email);
        console.log(user.email)

        setUserRole(data.role);
        console.log(userRole);

        
       } catch (error) {
        console.log(error)
       }
        
      } else {
        setUser(null);
        setUserRole(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider value={{ user, userRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
