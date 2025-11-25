import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import Problem from "./components/Problem";
import Contest from "./components/Contest";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
//........................................................................................
import { useDispatch, useSelector } from "react-redux";
import { checkAuthUser } from "./authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router";
//........................................................................................
import CreateProblem from "./components/CreateProblem";
// import CodeEditor from "./components/CodeEditor"
import ProblemSolvePage from "./components/ProblemSolvePage";
import AdminPanel from "./components/AdminPanel";
import DeleteProblem from "./components/DeleteProblem";
import UpdateProblem from "./components/UpdateProblem";
import VideoDelete from "./components/VideoDelete";
import VideoUpload from "./components/VideoUpload";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import LeaderBoard from "./components/LeaderBoard";
import Courses from "./components/Courses";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


//.................................................................................................
export default function App() {
 
  const dispatch = useDispatch();
  const { isAuthenticate, user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(checkAuthUser());
    
  }, [dispatch]);

  // theme changer
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);


   

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route
              path="/"
              element={
               isAuthenticate && user.role === "user" ? (
                  <Home />
                ) : isAuthenticate && user.role === "admin" ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/Login" />
                )
              }
            />
            <Route
              path="/Login"
              element={isAuthenticate ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/Signup"
              element={isAuthenticate ? <Navigate to="/" /> : <Signup />}
            />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route
              path="/Problem"
              element={isAuthenticate ? <Problem /> : <Signup />}
            />
            <Route
              path="/Contest"
              element={isAuthenticate ? <Contest /> : <Signup />}
            />
            <Route
              path="/aboutUs"
              element={isAuthenticate ? <AboutUs /> : <Signup />}
            />
            <Route
              path="/user/account"
              element={isAuthenticate ? <Account /> : <Signup />}
            />
            <Route
              path="/user/dashboard/:id"
              element={
                isAuthenticate && user?.role == "user" ? (
                  <Dashboard />
                ) : (
                  <Signup />
                )
              }
            />
            <Route
              path="/courses"
              element={
                isAuthenticate && user?.role == "user" ? (
                  <Courses />
                ) : (
                  <Signup />
                )
              }
            />
            <Route
              path="/user/leaderboard"
              element={
                isAuthenticate && user?.role == "user" ? (
                  <LeaderBoard />
                ) : (
                  <Signup />
                )
              }
            />
          </Route>

          <Route
            path="/problem/oneProblem/:id"
            element={<ProblemSolvePage />}
          />

          <Route
            element={
              isAuthenticate && user.role === "admin" ? (
                <Header />
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route path="/AdminPanel" element={<AdminPanel />} />

            <Route
              path="/admin/createProblem"
              element={
                isAuthenticate && user.role === "admin" ? (
                  <CreateProblem />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/admin/updateProblem"
              element={
                isAuthenticate && user.role === "admin" ? (
                  <UpdateProblem />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/admin/deleteProblem"
              element={
                isAuthenticate && user.role === "admin" ? (
                  <DeleteProblem />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/admin/videoDelete"
              element={
                isAuthenticate && user.role === "admin" ? (
                  <VideoDelete />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/admin/videoUpload/:id"
              element={
                isAuthenticate && user.role === "admin" ? (
                  <VideoUpload />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/user/account"
              element={
                isAuthenticate && user?.role == "admin" ? (
                  <Account />
                ) : (
                  <Signup />
                )
              }
            />
          </Route>
        </Routes>

        {isAuthenticate && user.role === "user" && <Footer />}
      </BrowserRouter>

      {/* 👇 Toast Container for all notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}




