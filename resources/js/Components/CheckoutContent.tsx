import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function CheckoutContent() {
  const { cart, setCart, setOpenCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});


  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.totalPrice),
    0
  );

const handlePlaceOrder = () => {
  if (loading) return;

  const newErrors: {
    name?: string;
    phone?: string;
    address?: string;
  } = {};

  if (!name.trim()) {
    newErrors.name = "Full name is required";
  }

  if (!phone.trim()) {
    newErrors.phone = "Phone number is required";
  }

  if (!address.trim()) {
    newErrors.address = "Address is required";
  }

  if (cart.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

 
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    toast.error("Please fix the highlighted fields");
    return;
  }

  
  setErrors({});
  setLoading(true);

  const toastId = toast.loading("Placing your order...");

  router.post(
    route("orders.store"),
    {
      name,
      phone,
      shipping_address: address,
      total_price: subtotal,
      payment_info: "Unpaid",
      order_status: "processing",
      cart,
    },
    {
      onSuccess: () => {
        toast.success("Order placed successfully 🎉", { id: toastId });

        setCart([]);
        localStorage.removeItem("cart");
        setOpenCart(false);

        setName("");
        setPhone("");
        setAddress("");

        router.visit(route("user.order"));
      },
      onError: () => {
        toast.error("Failed to place order. Please try again.", {
          id: toastId,
        });
      },
      onFinish: () => setLoading(false),
    }
  );
};

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Your Order</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <table className="w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={item.image}
                        className="w-12 h-12 object-cover rounded"
                      />
                      {item.name}
                    </td>
                    <td className="p-3">৳{item.price}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3 font-semibold">
                      ৳{item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Billing Details</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));}
              }
              
              className="w-full border p-3 rounded"
            />
            
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {setPhone(e.target.value);
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              className="w-full border p-3 rounded"
            />
           
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => {setAddress(e.target.value);
                setErrors((prev) => ({ ...prev, address: undefined }));
              }}
              className="w-full border p-3 rounded"
            />
            
            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handlePlaceOrder}
              className={`w-full py-3 rounded-lg font-semibold transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]"
                }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
