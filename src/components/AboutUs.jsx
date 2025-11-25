


import { 
  ExternalLink, Code2, Layers, Trophy, 
  MessageSquare, PlaySquare, Map, Cpu, 
  Database, Linkedin, Twitter, Github 
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="p-6 mt-15 bg-white dark:bg-[#121212] min-h-screen 
    text-black dark:text-white transition">

      {/* ================== TOP HEADING ================== */}
      <h1 className="text-4xl font-bold text-center mb-4 text-[#ff6200]">
        About CodeBytes
      </h1>

      <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">
        CodeBytes is a platform crafted for coders who want to learn, practice,
        and compete in real coding challenges. Our goal is to make learning
        programming simple, fun, and engaging.
      </p>

      {/* ================== SECTION 1 : OUR MISSION ================== */}
      <div
        className="
          p-6 rounded-xl mb-10 
          bg-white dark:bg-[#1f1f1f] 
          border border-gray-300 dark:border-[#ff6200]/30
          hover:scale-[1.02] hover:-translate-y-1 
          hover:shadow-[0_0_25px_#ff6200]
          transition cursor-pointer
        "
      >
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-[#ff6200]">
          <Layers /> Our Mission
        </h2>

        <p className="text-gray-700 dark:text-gray-300">
          CodeBytes aims to empower coders worldwide by providing challenges,
          tutorials, and a collaborative platform to improve coding skills.
          We ensure that every learner—from beginner to advanced—gets the
          right environment to grow.
        </p>
      </div>

      {/* ================== SECTION 2 : WHAT WE OFFER ================== */}
      <h2 className="text-3xl font-bold mb-6 text-center text-[#ff6200]">
        What We Offer
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Coding Challenges",
            icon: <Code2 size={26} />,
            content:
              "Solve structured problems to sharpen your DSA & algorithmic thinking.",
          },
          {
            title: "Interactive Code Editor",
            icon: <PlaySquare size={26} />,
            content: "Write and execute code instantly using our embedded code editor.",
          },
          {
            title: "Leaderboard",
            icon: <Trophy size={26} />,
            content: "Compete globally and climb the leaderboard to showcase your skills.",
          },
          {
            title: "Discussion Forum",
            icon: <MessageSquare size={26} />,
            content: "Ask doubts, share solutions, and connect with other coders.",
          },
          {
            title: "Learning Paths",
            icon: <Map size={26} />,
            content:
              "Follow beginner to advanced guided roadmaps tailored for developers.",
          },
          {
            title: "Contest Mode",
            icon: <Layers size={26} />,
            content:
              "Participate in timed contests designed to simulate real interviews.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="
              bg-white dark:bg-[#1f1f1f] 
              p-6 rounded-lg 
              border border-gray-300 dark:border-[#ff6200]/20
              hover:shadow-[0_0_20px_#ff6200]
              hover:-translate-y-1 hover:scale-105
              transition cursor-pointer
            "
          >
            <div className="flex items-center gap-3 mb-2 text-[#ff6200]">
              {item.icon}
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {item.content}
            </p>
          </div>
        ))}
      </div>

      {/* ================== SECTION 3 : OUR TECHNOLOGY ================== */}
      <h2 className="text-3xl font-bold mb-6 text-center text-[#ff6200]">
        Our Technology
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">

        {/* FRONTEND */}
        <a
          href="https://react.dev/"
          target="_blank"
          className="
            bg-white dark:bg-[#1f1f1f] 
            p-6 rounded-lg
            border border-gray-300 dark:border-[#ff6200]/20 
            hover:shadow-[0_0_20px_#ff6200]
            hover:-translate-y-1 transition cursor-pointer
          "
        >
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-[#ff6200]">
            <Cpu size={20} /> Frontend <ExternalLink size={18} />
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            React.js & TailwindCSS
          </p>
        </a>

        {/* BACKEND */}
        <a
          href="https://expressjs.com/"
          target="_blank"
          className="
            bg-white dark:bg-[#1f1f1f] 
            p-6 rounded-lg
            border border-gray-300 dark:border-[#ff6200]/20
            hover:shadow-[0_0_20px_#ff6200] 
            hover:-translate-y-1 transition cursor-pointer
          "
        >
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-[#ff6200]">
            <Layers size={20} /> Backend <ExternalLink size={18} />
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Node.js & Express.js
          </p>
        </a>

        {/* DATABASE */}
        <a
          href="https://www.mongodb.com/docs/"
          target="_blank"
          className="
            bg-white dark:bg-[#1f1f1f]
            p-6 rounded-lg
            border border-gray-300 dark:border-[#ff6200]/20
            hover:shadow-[0_0_20px_#ff6200]
            hover:-translate-y-1 transition cursor-pointer
          "
        >
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-[#ff6200]">
            <Database size={20} /> Database <ExternalLink size={18} />
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            MongoDB Atlas
          </p>
        </a>
      </div>

      {/* ================== SECTION 4 : OUR TEAM ================== */}
      <h2 className="text-3xl font-bold mb-6 text-center text-[#ff6200]">
        Our Team
      </h2>

      <div className="flex justify-center">
        <div
          className="
            bg-white dark:bg-[#1f1f1f] p-6 rounded-2xl 
            w-[300px] border border-gray-300 dark:border-[#ff6200]/30
            hover:scale-105 text-center 
            hover:shadow-[0_0_25px_#ff6200] 
            hover:-translate-y-1 transition cursor-pointer
          "
        >
          <img
            src="https://res.cloudinary.com/djsxyiw6n/image/upload/v1764071144/AKASH_afxepg.jpg"
            className="w-32 h-32 mx-auto rounded-full mb-4 object-cover 
            border-2 border-[#ff6200]"
            alt="Team"
          />

          <h3 className="text-xl font-bold mb-1 text-[#ff6200]">
            Akash Kumar
          </h3>

          <p className="text-gray-700 dark:text-gray-300 text-sm">
            The mind and muscle behind CodeBytes, Akash is a passionate developer
            dedicated to creating tools that empower coders. He built CodeBytes
            to solve the common hurdles faced by learners in the tech space.
          </p>

          <p className="flex justify-center items-center gap-5 mt-5">
            <a className="hover:text-orange-500 transition" 
               href="https://www.linkedin.com/in/akash-kumar-579301286/" target="_">
              <Linkedin />
            </a>
            <a className="hover:text-orange-500 transition" 
               href="https://x.com/akash_rajp2922" target="_">
              <Twitter />
            </a>
            <a className="hover:text-orange-500 transition" 
               href="https://github.com/akashkumar919" target="_">
              <Github />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
