

// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useState } from "react";
// import Logo from "../assets/Aitrade.png";

// // Small reusable component for nav items
// const NavItem = ({ label, path, onClick }) => (
//   <>
//     {label === "pricing" ? (
//       <Link to="/pricing">pricing</Link>
//     ) : (
//       <a
//         href={path}
//         onClick={onClick}
//         className="text-gray-400 hover:text-gray-400 text-sm font-medium"
//       >
//         {label}
//       </a>
//     )}
//   </>
// );

// export default function Navbar() {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // 🔥 Get email from Local Storage
//   const userEmail = localStorage.getItem("userEmail");

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Features", path: "#features" },
//     { name: "How it works", path: "#how-it-works" },
//     { name: "FAQ", path: "#faq" },
//     { name: "pricing", path: "#pp" },
//   ];

//   const handleLogout = async () => {
//     try {
//       await logout();

//       //  Clear email from LocalStorage
//       localStorage.removeItem("userEmail");

//       navigate("/");
//       setMobileMenuOpen(false);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   //  Updated Buttons (Token only when logged in)
//   const AuthButtons = () => (
//     <>
//       {userEmail ? (
//         <>
//           {/* TOKEN - Only when email exists */}
//           <Link
//             to="/chartAnalyis"
//            className="text-gray-300 hover:text-white text-sm font-medium"
//           >
//             Token
//           </Link>

//           <Link
//             to="/dashboard"
//             className="text-gray-300 hover:text-white text-sm font-medium"
//           >
//             Dashboard
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 text-sm text-gray-300 hover:text-white"
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <Link
//           to="/login"
//           className="text-gray-300 hover:text-white text-sm font-medium"
//         >
//           Login
//         </Link>
//       )}
//     </>
//   );

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
//         <div className="flex items-center justify-between h-16 md:h-20">
          
//           {/* LOGO */}
//           <Link to="/" className="flex items-center">
//             <div className="relative group">
//               <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-60 group-hover:bg-blue-500/30 transition" />
//               <img
//                 src={Logo}
//                 alt="Tradorr Logo"
//                 className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 h-auto object-contain transition-transform group-hover:scale-105"
//               />
//             </div>
//           </Link>

//           {/* DESKTOP NAV LINKS */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <NavItem key={link.name} label={link.name} path={link.path} />
//             ))}
//           </div>

//           {/* DESKTOP AUTH BUTTONS */}
//           <div className="hidden md:flex items-center space-x-4">
//             <AuthButtons />
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             className="md:hidden text-white p-2"
//             onClick={() => setMobileMenuOpen((p) => !p)}
//           >
//             {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {mobileMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           className="md:hidden backdrop-blur-lg bg-white/5 border-t border-white/10"
//         >
//           <div className="px-4 py-4 flex flex-col space-y-4">
//             {navLinks.map((link) => (
//               <NavItem
//                 key={link.name}
//                 label={link.name}
//                 path={link.path}
//                 onClick={() => setMobileMenuOpen(false)}
//               />
//             ))}

//             <div className="pt-4 border-t border-white/10 space-y-3">
//               <AuthButtons />
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// }



import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import Logo from "../assets/Aitrade.png";

// Small reusable component for nav items
const NavItem = ({ label, path, onClick }) => (
  <>
    {label === "pricing" ? (
      <Link to="/pricing">pricing</Link>
    ) : (
      <a
        href={path}
        onClick={onClick}
        className="text-gray-400 hover:text-gray-400 text-sm font-medium"
      >
        {label}
      </a>
    )}
  </>
);

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔥 Get saved email (meaning user logged in)
  const userEmail = localStorage.getItem("userEmail");

  // 🔥 TOKEN state
  const [tokens, setTokens] = useState(0);

  // Load tokens from localStorage on mount
  useEffect(() => {
  const updateTokens = () => {
    const savedTokens = Number(localStorage.getItem("tokens")) || 0;
    setTokens(savedTokens);
  };

  // Initial load
  updateTokens();

  // 🔥 Listen for storage changes
  window.addEventListener("storage", updateTokens);

  return () => {
    window.removeEventListener("storage", updateTokens);
  };
}, []);


  // Token click → reduce token
  const handleTokenClick = () => {
    navigation.navigate("/chartAnalyis")
   
  };

  // Logout clears everything
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("tokens");

    navigate("/");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "#features" },
    { name: "How it works", path: "#how-it-works" },
    { name: "FAQ", path: "#faq" },
    { name: "pricing", path: "#pp" },
  ];

  // AUTH + TOKEN BUTTON (updated)
  const AuthButtons = () => (
    <>
      {userEmail ? (
        <>
          {/* TOKEN BUTTON → only show if tokens > 0 */}
          {tokens > 0 && (
            <button
              onClick={handleTokenClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
              Tokens: {tokens}
            </button>
          )}

          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-white text-sm font-medium"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="text-gray-300 hover:text-white text-sm font-medium"
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-32 object-contain"
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavItem key={link.name} label={link.name} path={link.path} />
            ))}
          </div>

          {/* DESKTOP AUTH + TOKEN */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthButtons />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen((p) => !p)}
          >
            {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden backdrop-blur-lg bg-white/5 border-t border-white/10 px-4 py-4 space-y-4"
        >
          {navLinks.map((link) => (
            <NavItem
              key={link.name}
              label={link.name}
              path={link.path}
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}

          {/* MOBILE TOKEN + AUTH */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            
            {/* TOKEN → only show when > 0 */}
            {userEmail && tokens > 0 && (
              <button
                onClick={handleTokenClick}
                className="w-full py-2 bg-blue-500 text-white rounded-md"
              >
                Tokens: {tokens}
              </button>
            )}

            {userEmail ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
