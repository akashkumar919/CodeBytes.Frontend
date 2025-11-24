
import PrivacyPolicy from "./PrivacyPolicy";
import ContactUs from "./ContactUs";
import { NavLink } from "react-router"; 

export default function Footer() {
  return (
    <div className="w-full bg-[#353535]/60">
      {/* Footer */}
      <footer className="bg-[#353535] py-4 text-center text-sm flex flex-col md:flex-row justify-around items-center gap-2 md:gap-0 text-white">
        {/* <span>
          <img src="src/assets/logo.png" alt="CodeBytes Logo" className="h-10" />
        </span> */}
        <span>
          Copyright © {new Date().getFullYear()} CodeBytes.
        </span>
        <span className="space-x-2 flex flex-wrap justify-center items-center">
          <NavLink
            to="/aboutUs"
            className="hover:text-white transition-colors text-gray-400"
          >
            About Us
          </NavLink>
          |&nbsp;&nbsp;
          <ContactUs />
          |&nbsp;&nbsp;
          <PrivacyPolicy />
          |&nbsp;&nbsp;
          <a
            href="https://github.com/akashkumar919"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-gray-400"
          >
            GitHub
          </a>
        </span>
      </footer>
    </div>
  );
}
