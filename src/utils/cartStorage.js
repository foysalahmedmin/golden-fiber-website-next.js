const cartStorage = {
  getCartItems: function () {
    if (typeof window === "undefined") return {};
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  },

  addCartItem: function (id, quantity) {
    if (typeof window === "undefined") return;
    const cartItems = this.getCartItems();

    if (quantity !== undefined) {
      if (quantity < 1) {
        this.removeCartItem(id);
        return;
      }
      cartItems[id] = quantity;
    } else {
      cartItems[id] = (cartItems[id] || 0) + 1;
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  },

  removeCartItem: function (id) {
    if (typeof window === "undefined") return;
    const cartItems = this.getCartItems();
    if (id in cartItems) {
      delete cartItems[id];
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  },

  getCartItemQuantity: function (id) {
    if (typeof window === "undefined") return 0;
    const cartItems = this.getCartItems();
    return cartItems[id] || 0;
  },

  clearCartItems: function () {
    if (typeof window === "undefined") return;
    localStorage.removeItem("cart");
  },
};

export default cartStorage;
