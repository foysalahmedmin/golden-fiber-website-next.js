const addItemToLocalCart = (id, quantity) => {
  const shoppingCart = getLocalCart();
  if (quantity !== undefined) {
    if (quantity < 1) {
      removeItemFromLocalCart(id);
      return;
    } else {
      shoppingCart[id] = quantity;
      localStorage.setItem("cart", JSON.stringify(shoppingCart));
    }
  } else {
    shoppingCart[id] = (shoppingCart[id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
  }
};

const removeItemFromLocalCart = (id) => {
  const shoppingCart = getLocalCart();
  if (id in shoppingCart) {
    delete shoppingCart[id];
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
  }
};

const getItemQuantityFromLocalCart = (id) => {
  const shoppingCart = getLocalCart();
  return shoppingCart[id] || 0;
};

const getLocalCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : {};
};

const clearLocalCart = () => {
  localStorage.removeItem("cart");
};

export {
  addItemToLocalCart,
  clearLocalCart,
  getItemQuantityFromLocalCart,
  getLocalCart,
  removeItemFromLocalCart,
};
