// Utilities & Hooks
import { createContext, useContext, useEffect, useState } from "react";
import useDataApi from "../hooks/useDataApi";
import { UserAuthContext } from "./UserAuthContext";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  // External logic/state
  const { isLoggedIn } = useContext(UserAuthContext);
  const { isPending, error, getData } = useDataApi();

  // Local logic/state
  const [products, setProducts] = useState([]);
  const [endpoint, setEndpoint] = useState('/products');

  // Fetch products from the server if user is logged in
  useEffect(() => {
    const fetch = async () => {
      const products = await getData(endpoint);
      setProducts(products);
    }

    if (isLoggedIn) {
      fetch()
    }
  }, [endpoint, isLoggedIn])

  return (
    <ProductsContext.Provider value={{ products, setProducts, isPending, error, setEndpoint }}>
      {children}
    </ProductsContext.Provider>
  )
}