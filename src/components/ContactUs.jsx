

import { useState } from "react";
import { X } from "lucide-react";
import axiosClient from "../utils/axiosClient";

export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosClient.post("/userContact/contact", formData);
      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔘 Button to open Contact Form */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-400 hover:text-white transition hover:cursor-pointer"
      >
        Contact Us
      </button>

      {/* 🪟 Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
          {/* Blurred Background */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition duration-300"
            onClick={() => setIsOpen(false)} // Click outside to close
          ></div>

          {/* Modal Content */}
          <div className="relative bg-[#1f1f1f] p-6 rounded-lg w-[90%] max-w-md text-white z-10 shadow-lg transform transition-all duration-300 scale-95 animate-scale-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center text-orange-500">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-2 rounded bg-[#2a2a2a] text-white outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full p-2 rounded bg-[#2a2a2a] text-white outline-none"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full p-2 rounded bg-[#2a2a2a] text-white outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="4"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white outline-none resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded font-medium transition ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}




