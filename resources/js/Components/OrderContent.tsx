import React from "react";
import { Link, usePage } from "@inertiajs/react";

type Order = {
  id: number;
  name: string;
  product_id: number;
  image_url: string;
  shipping_address: string;
  phone: string;
  total_price: number;
  payment_info: "Paid" | "Unpaid";
  order_status: "processing" | "shipped" | "complete";
};

export default function OrderContent() {
  const { orders } = usePage().props as { orders: Order[] };

  if (!orders || orders.length === 0)
    return (
      <div className="text-center text-gray-500 mt-32 text-lg">
        You have no orders yet.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        My Orders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative">
              <img
                src={order.image_url}
                alt={order.name}
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                    order.payment_info === "Paid"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {order.payment_info}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                    order.order_status === "complete"
                      ? "bg-green-500"
                      : order.order_status === "shipped"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {order.order_status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-800">
                {order.name}
              </h2>
              <div className="text-gray-600 space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Order ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-semibold">Product ID:</span> {order.product_id}
                </p>
                <p>
                  <span className="font-semibold">Shipping:</span> {order.shipping_address}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {order.phone}
                </p>
                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  <span className="text-lg font-bold text-gray-900">৳{order.total_price}</span>
                </p>
              </div>

              <Link
                href={route('user.order.show', order)}
                
                className="mt-4 w-full bg-[var(--primary-color)] text-white py-2 rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition-colors cursor-pointer text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
