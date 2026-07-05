import { Link } from 'react-router-dom';
import { FaTrash, FaPaw, FaTshirt, FaUtensils, FaFileAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-start py-12 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/photo-1506744038136-46273834b3fb.avif')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-start w-full">
        {/* Heading */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-6 text-center animate-still">
          🌱 Welcome to EcoConnect 🌍
        </h1>

        {/* Subheading */}
        <p className="text-white text-lg sm:text-xl mb-12 text-center max-w-3xl">
          Join hands to make the world cleaner and safer. Report unclean areas, rescue animals, donate clothes, and share food to those in need.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl">
          {/* Garbage Cleaner */}
          <Link
            to="/garbage-cleaner"
            className="bg-green-600/80 hover:bg-green-700/90 text-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-500 group backdrop-blur-md"
          >
            <FaTrash className="text-5xl mb-4 group-hover:animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Garbage Cleaner</h2>
            <p className="text-white/90 text-center">
              Report unclean areas and get help fast!
            </p>
          </Link>

          {/* Animal Rescue */}
          <Link
            to="/animal-rescue"
            className="bg-orange-600/80 hover:bg-orange-700/90 text-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-500 group backdrop-blur-md"
          >
            <FaPaw className="text-5xl mb-4 group-hover:animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">Animal Rescue</h2>
            <p className="text-white/90 text-center">
              Help rescue stray or injured animals quickly.
            </p>
          </Link>

          {/* Cloth Donation */}
          <Link
            to="/cloth-donation"
            className="bg-purple-700/80 hover:bg-purple-800/90 text-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-500 group backdrop-blur-md"
          >
            <FaTshirt className="text-5xl mb-4 group-hover:animate-bounce" />
            <h2 className="text-2xl font-bold mb-2">Cloth Donation</h2>
            <p className="text-white/90 text-center">
              Donate unused clothes to people in need.
            </p>
          </Link>

          {/* 🍱 Food LeftoverBuddy */}
          <Link
            to="/food-donation"
            className="bg-blue-600/80 hover:bg-blue-700/90 text-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-500 group backdrop-blur-md"
          >
            <FaUtensils className="text-5xl mb-4 group-hover:animate-spin" />
            <h2 className="text-2xl font-bold mb-2 text-center leading-tight">
              Food
              <br />
              Leftover-Buddy
            </h2>
            <p className="text-white/90 text-center">
              Share leftover meals and reduce food waste!
            </p>
          </Link>
        </div>
      </div>

      {/* 🟢 Floating Reports Button (with label) */}
      <Link
        to="/reports"
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center space-x-2"
        title="View Reports"
      >
        <FaFileAlt className="text-2xl" />
        <span className="font-semibold text-lg">Work Reports</span>
      </Link>
    </div>
  );
}
