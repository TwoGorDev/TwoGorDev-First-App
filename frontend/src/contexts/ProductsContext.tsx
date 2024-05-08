// Utilities & Hooks
import { createContext, useContext, useEffect, useState } from "react";
import useDataApi from "../hooks/useDataApi";
import { UserAuthContext } from "./UserAuthContext";

// Types
import { Product, UserAuthContextType, ProductsContextType } from "../types/types";

// Context
export const ProductsContext = createContext<undefined | ProductsContextType>(undefined);

// Context Provider
export const ProductsContextProvider = ({children} : {children: React.ReactNode}) => {
  // External logic/state
  const { isLoggedIn } = useContext(UserAuthContext) as UserAuthContextType;
  const { isPending, error, getData } = useDataApi();

  // Local logic/state
  const [products, setProducts] = useState<Product[] | []>([]);
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