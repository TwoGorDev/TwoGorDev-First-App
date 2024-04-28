// utilities
import { createContext, useContext, useEffect, useState } from "react";
import useDataApi from "../hooks/useDataApi";
import { UserAuthContext } from "./UserAuthContext";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const { user } = useContext(UserAuthContext);
  const { isPending, error, getData } = useDataApi();
  const [products, setProducts] = useState([]);
  const [endpoint, setEndpoint] = useState('/products');
  const isLoggedIn = Object.keys(user).length > 0;

  useEffect(() => {
    const fetch = async () => {
      const products = await getData(endpoint);
      setProducts(products);
    }

    isLoggedIn && fetch();
  }, [endpoint, isLoggedIn])

  return (
    <ProductsContext.Provider value={{ products, isPending, error, setEndpoint }}>
      {children}
    </ProductsContext.Provider>
  )
}