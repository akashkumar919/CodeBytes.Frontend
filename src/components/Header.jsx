import { useState } from "react";
import { Outlet, Link } from "react-router";
import Profile from "./Profile";
import { NavLink } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../themeSlice";

export default function Header() {
  const { isAuthenticate, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 flex items-center justify-between px-4 md:px-8 h-16 md:h-16 w-full bg-[#353535]/40 backdrop-blur-xl text-white border-b border-gray-400/20 font-serif z-50 shadow-sm">
        {/* Left Side (Hamburger + Logo) */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu (Mobile only) */}

          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>

          {/* Logo */}

          <NavLink to="/">
            <img
              src="https://res.cloudinary.com/djsxyiw6n/image/upload/v1764071145/logo_kzmmci.png"
              alt="CodeBytes_logo"
              className="w-28 md:w-40 scale-95 transition-transform duration-300 ease-in-out hover:scale-100 cursor-pointer"
            />
          </NavLink>
        </div>

        {/* Desktop Links  for user only */}
        {isAuthenticate && user.role === 'user' && (
          <div className="hidden md:flex gap-6 font-bold">
            {[
              { name: "Contest", path: "/Contest" },
              { name: "Problems", path: "/Problem" },
              { name: "Leader Board", path: "/user/leaderboard" },
              { name: "Courses", path: "/courses" },
            ].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative inline-block before:content-[''] before:absolute before:bottom-0 
   before:h-[2px] before:w-0 before:bg-[#ff6200] before:transition-all before:duration-300 
   before:left-1/2 before:-translate-x-1/2
   hover:before:w-full transition-colors duration-300
   ${isActive ? "text-[#ff6200] before:w-full" : "text-white"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}

        {/* Desktop Links  for admin only */}
        {isAuthenticate && user.role === "admin" && (
          <div className="hidden md:flex gap-6 font-bold">
            {[
              { name: "CreateProblem", path: "/admin/createProblem" },
              { name: "UpdateProblem", path: "/admin/updateProblem" },
              { name: "DeleteProblem", path: "/admin/deleteProblem" },
              { name: "UploadVideo", path: "/admin/videoDelete" },
            ].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative inline-block before:content-[''] before:absolute before:bottom-0 
   before:h-[2px] before:w-0 before:bg-[#ff6200] before:transition-all before:duration-300 
   before:left-1/2 before:-translate-x-1/2
   hover:before:w-full transition-colors duration-300
   ${isActive ? "text-[#ff6200] before:w-full" : "text-white"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}

        {/* Right Side (Theme + Buttons) */}
        <div className="flex items-center gap-3">
          {/* Theme Switch */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {/* Login & Sign up */}

          {!isAuthenticate && (
            <div className="flex gap-2">
              <NavLink to="/Login">
                <button className="btn btn-sm bg-[#ff6200] hover:opacity-80 ">
                  Login
                </button>
              </NavLink>
              <NavLink to="/Signup">
                <button className="btn btn-sm bg-[#ff6200] hover:opacity-80 ">
                  Sign up
                </button>
              </NavLink>
            </div>
          )}

          {isAuthenticate && <Profile />}
        </div>

        {/* Mobile Slide Menu */}

        {isAuthenticate && user.role === "admin" ? (
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-[#252525] text-white transform transition-transform duration-300 ease-in-out z-50 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {/* Menu Links */}
            <div className="h-screen mt-15 flex flex-col gap-6 text-lg font-bold px-6 bg-[#232222]">
              <hr className="w-full text-gray-400" />
              <NavLink to="/">
                <img
                  src="src/assets/logo.png"
                  alt="CodeBytes_logo"
                  className="w-40"
                />
              </NavLink>

              {[
                { name: "CreateProblem", path: "/admin/createProblem" },
                { name: "UpdateProblem", path: "/admin/updateProblem" },
                { name: "DeleteProblem", path: "/admin/deleteProblem" },
                 { name: "UploadVideo", path: "/admin/videoDelete" },
              ].map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative text-lg font-bold px-1 py-1 hover:text-[#ff6200] transition-colors duration-300
         before:content-[''] before:absolute before:left-0 before:bottom-0 
         before:h-[2px] before:w-0 before:bg-[#ff6200] before:transition-all before:duration-300
         ${isActive ? "text-[#ff6200]" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )
      : (
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-[#252525] text-white transform transition-transform duration-300 ease-in-out z-50 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {/* Menu Links */}
            <div className="h-screen mt-15 flex flex-col gap-6 text-lg font-bold px-6 bg-[#232222]">
              <hr className="w-full text-gray-400" />
              <NavLink to="/">
                <img
                  src="/src/assets/logo.png"
                  alt="CodeBytes_logo"
                  className="w-40"
                />
              </NavLink>

              {[
                { name: "Contest", path: "/contest" },
                { name: "Problems", path: "/Problem" },
                { name: "Leader Board", path: "/user/leaderboard" },
                { name: "Courses", path: "/courses" },
              ].map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative text-lg font-bold px-1 py-1 hover:text-[#ff6200] transition-colors duration-300
         before:content-[''] before:absolute before:left-0 before:bottom-0 
         before:h-[2px] before:w-0 before:bg-[#ff6200] before:transition-all before:duration-300
         ${isActive ? "text-[#ff6200] before:w-full" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        ) }

        {/* Background Overlay when menu open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
      <Outlet />
    </>
  );
}
