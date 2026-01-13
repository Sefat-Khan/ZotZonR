import React from "react";
import { Head, usePage } from "@inertiajs/react";
import Common from "@/Layouts/Common";

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

export default function OrderDetails() {
  const { order } = usePage().props as { order: Order };

  return (
    <Common header="Order Details">
      <Head title="Order Details" />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Order Details
        </h1>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <img
            src={order.image_url}
            alt={order.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="text-gray-700 space-y-2 text-lg">
            <p><span className="font-semibold">Order ID:</span> {order.id}</p>
            <p><span className="font-semibold">Name:</span> {order.name}</p>
            <p><span className="font-semibold">Product ID:</span> {order.product_id}</p>
            <p><span className="font-semibold">Shipping:</span> {order.shipping_address}</p>
            <p><span className="font-semibold">Phone:</span> {order.phone}</p>
            <p><span className="font-semibold">Total Price:</span> ৳{order.total_price}</p>
            <p>
              <span className="font-semibold">Payment:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  order.payment_info === "Paid" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {order.payment_info}
              </span>
            </p>
            <p>
              <span className="font-semibold">Order Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  order.order_status === "complete"
                    ? "bg-green-500"
                    : order.order_status === "shipped"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
                }`}
              >
                {order.order_status}
              </span>
            </p>
          </div>

          {/* <div className="mt-6 text-center">
            <a
              href={route('order.pdf', order)}
              className="inline-block bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition-all"
            >
              Download PDF
            </a>
          </div> */}
        </div>
      </div>
    </Common>
  );
}
