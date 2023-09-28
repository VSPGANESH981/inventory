import React, { createContext, useContext, useEffect, useState } from 'react';
import { INVENTORY_API } from '../constants/constants';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch(`${INVENTORY_API}/getCurrentUser`, {
        method: 'GET',        
        credentials: 'include',
      });
      const data = await res.json();
      const user = data?.user;
      if(user?.username){
          setCurrentUser(user);
      }
    } catch (err) {
      console.error('Failed to fetch current user:', err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async(username,password,onSuccess = ()=>{},onFailure=()=>{})=>{
    try {
          const res = await fetch(`${INVENTORY_API}/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username":username,"password":password}),
            credentials:"include",
          });
          if(res.ok){
            onSuccess();
            fetchCurrentUser();
        } else {
          onFailure();
        }
    } catch (error) {
      onFailure();
      console.log("error on login",error);
    }
  }

  const logout = async (onSuccess = ()=>{},onFailure=()=>{})=>{
    try {
      const res = await fetch(`${INVENTORY_API}/logout`,{
        method: "POST",
        credentials:"include",
      });
      const data= await res.json();
      if(data){
        setCurrentUser(null);
        onSuccess();
      }        
    } catch (error) {
      onFailure();
      console.log("error on logout",error);
    }
  }


  return (
    <AuthContext.Provider value={{ currentUser ,logout,login}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
}

export {AuthContext, AuthProvider, useAuth};