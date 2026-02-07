import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Cart parse error:", error);
      localStorage.removeItem("cart");
      return [];
    }
  });

  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    try {
      if (!cart || cart.length === 0) {
          localStorage.removeItem('cart');
          return;
      } else {
          localStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (error) {
      console.error("Cart storage error:", error);
      toast.error("Failed to save cart data");
    }
  }, [cart]);

  /**
   * ✅ Add item to cart (safe)
   */
  const addToCart = (product, qty = 1, total) => {
    // ❌ Invalid product
    if (!product || !product.id) {
      toast.error("Product not found");
      return;
    }

    const price = product.final_price ?? product.price;

    if (!price || price <= 0) {
      toast.error("Invalid product price");
      return;
    }

    if (qty <= 0) {
      toast.error("Invalid quantity");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + qty,
                totalPrice: (item.quantity + qty) * price,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name ?? "Unknown Product",
          image: product.image_url ?? "/placeholder.png",
          price,
          quantity: qty,
          totalPrice: qty * price,
        },
      ];
    });

    setOpenCart(true);
    toast.success("Added to cart");
  };

  /**
   * ✅ Remove item safely
   */
  const removeFromCart = (id) => {
    if (!id) {
      toast.error("Invalid cart item");
      return;
    }

    setCart((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (!exists) {
        toast.error("Item not found in cart");
        return prev;
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        openCart,
        setOpenCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
