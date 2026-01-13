import React from "react";
import { Truck, ShieldCheck, Headphones, Star } from "lucide-react";

export default function AboutContent() {
  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-[var(--primary-color)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Store
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 text-lg">
            We provide high-quality products at the best prices, ensuring
            a smooth and reliable shopping experience for everyone.
          </p>
        </div>
      </section>

      {/* ABOUT TEXT */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our store was founded with a simple mission: to make online
              shopping easy, affordable, and enjoyable. We carefully
              select each product to ensure quality, durability, and value.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you’re looking for electronics, fashion, home
              essentials, or accessories — we’ve got you covered.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">
              Why Customers Love Us
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Trusted & verified products</li>
              <li>✔ Competitive pricing</li>
              <li>✔ Fast delivery across Bangladesh</li>
              <li>✔ Dedicated customer support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            
            <Feature
              icon={<Truck size={36} />}
              title="Fast Delivery"
              text="Quick and reliable delivery to your doorstep."
            />

            <Feature
              icon={<ShieldCheck size={36} />}
              title="Secure Payment"
              text="Safe and secure checkout process."
            />

            <Feature
              icon={<Headphones size={36} />}
              title="24/7 Support"
              text="Our team is always here to help you."
            />

            <Feature
              icon={<Star size={36} />}
              title="Top Quality"
              text="Only the best products for our customers."
            />

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-gray-600 mb-6">
            Discover amazing products and exclusive deals today.
          </p>
          <a
            href={route("shop.index")}
            className="inline-block bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Visit Shop
          </a>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="p-6 border rounded-xl hover:shadow-lg transition">
      <div className="text-[var(--primary-color)] mb-4 flex justify-center">
        {icon}
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
