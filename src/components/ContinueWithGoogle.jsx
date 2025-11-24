
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../authSlice";

// import { loginWithGoogle } from "../googleAuth";
import { useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function ContinueWithGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleGoogle = async () => {
  try {
    // const user = await loginWithGoogle();
    const result = await signInWithPopup(auth, googleProvider);
    // console.log(result)

    const payload = {
      firstName: result?.user?.displayName?.split(" ")[0] || "User",
      email: result.user.email,
      photo: result.user.photoURL,
    };

    const response = await dispatch(loginWithGoogle(payload)).unwrap();

    // dispatch(setUser(response.user));

    if (response.token) {
      localStorage.setItem("token", response.token);
    }

    navigate("/");
  } catch (err) {
    console.log("Error:", err);
  }
};


  return (
    <div className="flex justify-center mt-3">
      <button
        onClick={handleGoogle}
        className="w-full py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 hover:cursor-pointer"
      >
        Continue with Google
      </button>
    </div>
  );
}
