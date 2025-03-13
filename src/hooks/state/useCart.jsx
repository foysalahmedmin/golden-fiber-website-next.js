import { getCartProducts } from "@/network/products/api";
import {
  addCartItem as addCartItemSlice,
  clearCart as clearCartSlice,
  removeCartItem as removeCartItemSlice,
  setCartProducts as setCartProductsSlice,
  setLoading as setLoadingSlice,
} from "@/redux/slices/cartSlice";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const getValidNumber = (value, fallback = 0) =>
  isNaN(value) ? fallback : value;

const useCart = () => {
  const dispatch = useDispatch();

  // Selectors
  const cartItems = useSelector((state) => state.cart.items);
  const cartProducts = useSelector((state) => state.cart.products);
  const isLoading = useSelector((state) => state.cart.isLoading);

  // Memoized cart item IDs for dependency tracking
  const cartItemIds = useMemo(() => Object.keys(cartItems).sort(), [cartItems]);

  // Action dispatchers
  const setIsLoading = useCallback(
    (payload) => dispatch(setLoadingSlice(payload)),
    [dispatch],
  );
  const clearCart = useCallback(
    (payload) => dispatch(clearCartSlice(payload)),
    [dispatch],
  );
  const addCartItem = useCallback(
    (payload) => dispatch(addCartItemSlice(payload)),
    [dispatch],
  );
  const removeCartItem = useCallback(
    (payload) => dispatch(removeCartItemSlice(payload)),
    [dispatch],
  );
  const setCartProducts = useCallback(
    (payload) => dispatch(setCartProductsSlice(payload)),
    [dispatch],
  );

  // Helper functions
  const getCartItemQuantity = useCallback(
    ({ id } = {}) => cartItems[id] || 0,
    [cartItems],
  );

  const getCartItemSubtotal = useCallback(
    ({ id, price } = {}) => {
      const quantity = getCartItemQuantity({ id });
      return getValidNumber(parseFloat(price || 0) * quantity);
    },
    [getCartItemQuantity],
  );

  // Memoized calculations
  const subtotal = useMemo(
    () =>
      (cartProducts || []).reduce(
        (acc, { stock }) =>
          acc +
          getCartItemSubtotal({
            id: stock?._id,
            price: stock?.selling_price,
          }),
        0,
      ),
    [cartProducts, getCartItemSubtotal],
  );

  // Data fetching effect
  useEffect(() => {
    let isMounted = true;

    const fetchCartProducts = async () => {
      try {
        setIsLoading(true);

        if (cartItemIds.length > 0) {
          const products = await getCartProducts({ ids: cartItemIds });
          if (isMounted) setCartProducts(products || []);
        } else {
          setCartProducts([]);
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCartProducts();

    return () => {
      isMounted = false;
    };
  }, [cartItemIds, setCartProducts, setIsLoading]);

  return {
    isLoading,
    cartItems,
    cartProducts,
    subtotal,
    setIsLoading,
    clearCart,
    addCartItem,
    removeCartItem,
    setCartProducts,
    getCartItemQuantity,
    getCartItemSubtotal,
  };
};

export default useCart;
