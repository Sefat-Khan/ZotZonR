import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactContent() {
  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="bg-[var(--primary-color)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 text-lg">
            Have questions or need help? We’re here to assist you.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT: CONTACT INFO */}
          <div className="bg-white shadow rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

            <Info
              icon={<Phone />}
              title="Phone"
              value="+880 1234 567 890"
            />

            <Info
              icon={<Mail />}
              title="Email"
              value="support@yourstore.com"
            />

            <Info
              icon={<MapPin />}
              title="Address"
              value="Dhaka, Bangladesh"
            />

            <Info
              icon={<Clock />}
              title="Business Hours"
              value="Sat – Thu : 9:00 AM – 9:00 PM"
            />
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="bg-white shadow rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* MAP (OPTIONAL) */}
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-white shadow rounded-xl overflow-hidden h-[250px] md:h-[300px] lg:h-[350px]">
          <iframe
            title="Store Location"
            src="https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-[var(--primary-color)]">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}
