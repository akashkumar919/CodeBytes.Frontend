import { useSelector } from "react-redux";
import Logout from "./Logout";
import { CalendarDays, BadgeCheck, Settings } from "lucide-react";
import { useNavigate } from "react-router";


export default function Profile() {
  const navigate = useNavigate();
  

  const { user, isAuthenticate } = useSelector((state) => state.auth);

  return (
    <div className="dropdown dropdown-end ">
      <img
        tabIndex={0}
        role="button"
        src={user?.photo ? user.photo : "/src/assets/anonymous.png"}
        className={`h-8 w-8 hover:cursor-pointer rounded-full hover:ring hover:ring-orange-500`}
        alt={user?.firstName || "User Avatar"}
      />

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-[#353535] shadow-[5_5_10px_rgba(0,0,0,0.3)] rounded-lg z-1 w-65 p-2 mt-5  "
      >
        {isAuthenticate && user.role === "user" && (
          <li>
            <div
              onClick={() => {
                navigate(`/user/dashboard/${user?._id}`);
              }}
              className="flex  justify-start "
            >
              {/* Name + Verified Badge */}
              <div className="flex items-center gap-2">
                {/* IMAGE  */}
                <img
                  src={user?.photo ? user.photo : "/src/assets/anonymous.png"}
                  alt=""
                  className="h-12 w-12 hover:cursor-pointer rounded-full"
                />

                {/* NAME & BLUE TICK & CALENDER  */}
                <div className="flex flex-col">
                  {/* NAME AND BLUE TICK  */}
                  <div className="flex items-center gap-1">
                    <h1 className="text-white font-semibold text-sm">
                      {user?.firstName}
                    </h1>

                    {/* Blue Tick */}
                    <span className="text-blue-500 ">
                      <BadgeCheck size={14} strokeWidth={3} />
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1 text-[#ff6200]">
                    <CalendarDays size={14} />
                    <span>
                      {new Date(user?.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}

        <li>
          <button
            onClick={() => navigate("/user/account")}
            className="flex items-center gap-2"
          >
            <Settings /> Settings
          </button>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
}
