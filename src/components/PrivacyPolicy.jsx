

import { useState } from "react";
import { X } from "lucide-react";

export default function PrivacyPolicy() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔘 Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm  hover:text-white transition text-gray-400 hover:cursor-pointer"
      >
        Privacy Policy
      </button>

      {/* 🪟 Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#1c1c1c]/90 text-white p-6 rounded-2xl w-full max-w-3xl relative max-h-[80vh] overflow-y-auto border border-gray-700 shadow-2xl backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            
            {/* ❌ Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
            >
              <X size={22} />
            </button>

            <h1 className="text-2xl font-bold mb-4 text-center  text-orange-500">
              Privacy Policy
            </h1>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Welcome to <span className="text-blue-400 font-semibold">CodeBytes</span>.  
              Your privacy is important to us. This Privacy Policy explains how we
              collect, use, and protect your personal information when you use our
              platform.
            </p>

            <h2 className="text-lg font-semibold mt-4 mb-2 text-orange-500">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 leading-relaxed">
              <li>Account information such as name, email, and username.</li>
              <li>Activity data including problems solved, submissions, and coding history.</li>
              <li>Device and browser information for analytics and security.</li>
            </ul>

            <h2 className="text-lg font-semibold mt-4 mb-2 text-orange-500">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 leading-relaxed">
              <li>To provide a personalized coding experience.</li>
              <li>To improve problem recommendations and learning paths.</li>
              <li>To enhance platform performance and detect misuse.</li>
            </ul>

            <h2 className="text-lg font-semibold mt-4 mb-2 text-orange-500">
              3. Data Security
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We implement strong encryption and access control to safeguard your
              data. However, no online platform can guarantee absolute security.
            </p>

            <h2 className="text-lg font-semibold mt-4 mb-2 text-orange-500">
              4. Third-Party Services
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We may use third-party tools (like Google Analytics or GitHub Login)
              that collect limited information in accordance with their privacy
              policies.
            </p>

            <h2 className="text-lg font-semibold mt-4 mb-2 text-orange-500">
              5. Your Rights
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              You may request to access, modify, or delete your personal information
              by contacting us at{" "}
              <span className="text-blue-400 cursor-pointer">codebytes929@gmail.com</span>.
            </p>

            <h2 className="text-lg font-semibold mt-4 mb-2 text-orange-500">
              6. Updates
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will
              be posted here with an updated “Last Updated” date.
            </p>

            <p className="text-gray-500 text-sm mt-6 text-center">
              Last Updated: October 10, 2025
            </p>
          </div>
        </div>
      )}
    </>
  );
}
