// utilities
import { createContext, useContext, useEffect, useState } from "react";
import useDataApi from "../hooks/useDataApi";
import { UserAuthContext } from "./UserAuthContext";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const { userToken } = useContext(UserAuthContext);
  const { isPending, getData } = useDataApi();
  const [products, setProducts] = useState([]);
  const [endpoint, setEndpoint] = useState('/products');

  useEffect(() => {
    const fetch = async () => {
      const products = await getData(endpoint);
      setProducts(products);
    }

    userToken && fetch();
  }, [endpoint, userToken])

  return (
    <ProductsContext.Provider value={{ products, isPending, setEndpoint }}>
      {children}
    </ProductsContext.Provider>
  )
}