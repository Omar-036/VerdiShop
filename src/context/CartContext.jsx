import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const CartContext = createContext();

export function CartProvider({ children, showToast }) {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    setCartItems((prevItems) => {
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });

    if (existingItem) {
      showToast(`Added ${quantity} more ${product.title} to cart!`);
    } else {
      showToast(`Added ${product.title} to cart!`);
    }
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.title} from cart!`);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    showToast("Cart cleared!");
  };

  const getTotalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const calculateTotal = useMemo(() => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getTotalItems,
      calculateTotal,
    }),
    [cartItems, getTotalItems, calculateTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
