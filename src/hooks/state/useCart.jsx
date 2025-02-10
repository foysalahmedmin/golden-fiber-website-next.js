import { getCartProducts } from "@/network/products/api";
import {
  addItemToCart as addItemToCartSlice,
  clearCart as clearCartSlice,
  removeItemFromCart as removeItemFromCartSlice,
} from "@/redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function getValidNumber(value, fallback = 0) {
  return isNaN(value) ? fallback : value;
}

const useCart = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  console.log(cartProducts);

  const cart = useSelector((state) => state.cart);

  const addItemToCart = (payload) => dispatch(addItemToCartSlice(payload));
  const removeItemFromCart = (payload) =>
    dispatch(removeItemFromCartSlice(payload));
  const clearCart = () => dispatch(clearCartSlice());

  const getItemQuantityFromCart = ({ id } = {}) => cart[id] || 0;
  const getItemSubtotalFromCart = ({ id, price } = {}) => {
    return getValidNumber(
      parseFloat(price || 0) * parseFloat(getItemQuantityFromCart({ id }) || 0),
    );
  };

  const subtotal =
    cartProducts?.reduce(
      (acc, { _id, stocks }) =>
        acc +
        getItemSubtotalFromCart({
          id: _id,
          price: stocks?.selling_price,
        }),
      0,
    ) || 0;

  const cartIds = Object.keys(cart) || [];

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getCartProducts({ ids: [...cartIds] });
        products?.length > 0 ? setCartProducts(products) : setCartProducts([]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartProducts();
  }, [cart]);

  return {
    isLoading,
    cart,
    cartIds,
    cartProducts,
    subtotal,
    removeItemFromCart,
    clearCart,
    addItemToCart,
    getItemQuantityFromCart,
    getItemSubtotalFromCart,
  };
};

export default useCart;
