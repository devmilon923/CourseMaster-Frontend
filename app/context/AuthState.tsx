"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
const StateContext = createContext<any>(null);
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    let token = null;
    token = localStorage.getItem("auth") || null;
    if (!token) {
      // admin token
      token = localStorage.getItem("aauth") || null;
    }
    if (token) {
      const fetchUser = async () => {
        try {
          const result = await axios.get(
            `${process.env.NEXT_PUBLIC_baseURL}/auth/my-profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = result.data.data;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <StateContext.Provider value={{ loading }}>
      {children}
    </StateContext.Provider>
  );
};
export const useAuth = () => useContext(StateContext);
