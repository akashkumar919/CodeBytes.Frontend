import React from "react";
import { NavLink } from "react-router";
import Problem from "./Problem";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";



export default function Home() {
  const navigate = useNavigate();
   

    const features = [
    {
      title: "💡 Daily Coding Challenges",
      desc: "Sharpen your problem-solving skills with new challenges every day.",
    },
    {
      title: "🏆 Weekly Contests",
      desc: "Compete globally and climb the leaderboard to prove your skills.",
    },
    {
      title: "⚡ Instant Code Execution",
      desc: "Run and debug your code directly in the browser — no setup needed.",
    },
    {
      title: "📚 Learn with Notes",
      desc: "Understand every concept with concise and clear topic-wise notes.",
    },
    {
      title: "🧩 Multi-Language Support",
      desc: "Practice in C, C++, Java, Python, or JavaScript — your choice.",
    },
    {
      title: "🌐 Developer Community",
      desc: "Connect, discuss, and grow together with other coders worldwide.",
    },
  ];

    const steps = [
    { step: "1️⃣", title: "Sign Up", desc: "Create your free CodeBytes account.", link:"Signup" },
    { step: "2️⃣", title: "Practice", desc: "Solve problems & improve your skills.", link:"Problem" },
    { step: "3️⃣", title: "Compete", desc: "Join live contests & leaderboards.", link:"Contest" },
    { step: "4️⃣", title: "Grow", desc: "Earn badges, ranks, and confidence.", link:"user/leaderboard" },
  ];

  return (
    <div className="bg-gray-950 text-white font-sans">
      {/* Hero Section */}

      <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a]"
    >
      {/* 🔥 Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#ff620010,_transparent_60%),_radial-gradient(circle_at_bottom_right,_#ff620010,_transparent_60%)] animate-bgMove"></div>

      {/* 🌟 Hero Text Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-bold mb-4 text-[#ff6200] z-10"
      >
        Code. Compete. Conquer.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut", delay: 0.3 }}
        className="text-lg md:text-xl text-gray-300 max-w-2xl mb-6 z-10"
      >
        Master coding through challenges, contests, and projects — all on one platform.  
        Welcome to <span className="font-semibold text-white">CodeBytes</span>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
        className="z-10"
      >
        <NavLink to="/Problem">
          <button className="bg-[#ff6200] hover:bg-[#e45b00] text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition cursor-pointer">
            Start Coding Now
          </button>
        </NavLink>
      </motion.div>
    </section>


      {/* Features Section */}

      <section className="py-20 px-6 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a]">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose CodeBytes?</h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.3,          // thoda zyada duration for smoothness
                delay: index * 0.08,     // stagger but very small
                ease: [0.42, 0, 0.58, 1] // smooth custom ease
            }}
            className="bg-[#353535]/80 p-6 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 ease-out hover:-translate-y-3"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#ff6200]">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] text-center">
      <h2 className="text-3xl font-bold mb-12 text-white">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.42, 0, 0.58, 1], // smooth ease-in-out
            }}
             className="bg-[#353535]/80 p-6 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 ease-out hover:-translate-y-3"
>
            <div className="text-3xl mb-3">{item.step}</div>
            <NavLink to={`/${item.link}`}>
              <h3 className="text-xl font-semibold mb-2 text-[#ff6200]">{item.title}</h3>
            </NavLink>
            <p className="text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

      {/* Call to Action Section */}
       <section className="py-20 bg-gradient-to-r from-[#ff6200] to-[#ff9f43] text-black text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Coding Journey Today 🚀</h2>
        <p className="text-lg mb-6">
          Join thousands of coders already learning, competing, and building on CodeBytes.
        </p>

        <button onClick={()=>navigate('/Problem')} className="bg-black hover:bg-gray-900 text-white py-3 px-8 rounded-2xl transition cursor-pointer">
          Join Now
        </button>
      </section> 

     
    </div>
  );
}
