import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import "@fontsource/poppins";

function Navbar() {
  const location = useLocation();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("mindmirrorUser") ||
      "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("mindmirrorUser");

    setMenuOpen(false);

    navigate("/login");

    window.location.reload();
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navButtonClass = (path) =>
    `px-3 py-2 rounded-xl transition text-sm whitespace-nowrap ${
      isActive(path)
        ? "bg-white/10 text-white"
        : "text-slate-300 hover:text-white"
    }`;

  const mobileNavButtonClass = (path) =>
    `w-full text-left px-5 py-4 rounded-2xl transition text-base ${
      isActive(path)
        ? "bg-white/10 text-white"
        : "text-slate-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10"
      style={{
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="shrink-0"
          onClick={closeMenu}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="flex items-center gap-3"
          >
            <div className="bg-cyan-500/20 p-2 rounded-xl flex items-center justify-center">
              <img
                src="/favicon.PNG"
                alt="MindMirror Logo"
                className="w-8 h-8 object-contain"
              />
            </div>

            <div>
              <h1 className="text-lg md:text-xl font-bold text-white leading-tight">
                MindMirror
              </h1>

              <p className="text-[9px] md:text-[10px] text-cyan-200 tracking-[0.22em] uppercase">
                Emotional Wellness
              </p>
            </div>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center justify-end gap-1 md:gap-2">
          <Link to="/">
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              className={navButtonClass("/")}
            >
              Home
            </motion.button>
          </Link>

          <Link to="/quizzes">
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              className={navButtonClass("/quizzes")}
            >
              Assessments
            </motion.button>
          </Link>

          <Link to="/blogs">
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              className={navButtonClass("/blogs")}
            >
              Insights
            </motion.button>
          </Link>

          {user ? (
            <>
              <Link to="/contribute">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  className={navButtonClass("/contribute")}
                >
                  Contribute
                </motion.button>
              </Link>

              <Link to="/dashboard">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  className={navButtonClass("/dashboard")}
                >
                  Dashboard
                </motion.button>
              </Link>

              {user?.user?.role === "admin" && (
                <Link to="/admin">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    className={navButtonClass("/admin")}
                  >
                    Admin
                  </motion.button>
                </Link>
              )}

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={handleLogout}
                className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-white text-sm font-semibold hover:bg-white/20 transition whitespace-nowrap"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  className="text-slate-300 hover:text-white transition px-3 py-2 text-sm whitespace-nowrap"
                >
                  Login
                </motion.button>
              </Link>

              <Link to="/register">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-lg shadow-blue-500/20 whitespace-nowrap"
                >
                  Begin Journey
                </motion.button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden shrink-0 bg-white/10 border border-white/10 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-xl hover:bg-white/20 transition"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="md:hidden px-4 pb-5"
        >
          <div className="bg-slate-950/95 border border-white/10 rounded-3xl p-3 shadow-2xl space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
            >
              <button className={mobileNavButtonClass("/")}>
                Home
              </button>
            </Link>

            <Link
              to="/quizzes"
              onClick={closeMenu}
            >
              <button className={mobileNavButtonClass("/quizzes")}>
                Assessments
              </button>
            </Link>

            <Link
              to="/blogs"
              onClick={closeMenu}
            >
              <button className={mobileNavButtonClass("/blogs")}>
                Insights
              </button>
            </Link>

            {user ? (
              <>
                <Link
                  to="/contribute"
                  onClick={closeMenu}
                >
                  <button className={mobileNavButtonClass("/contribute")}>
                    Contribute
                  </button>
                </Link>

                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                >
                  <button className={mobileNavButtonClass("/dashboard")}>
                    Dashboard
                  </button>
                </Link>

                {user?.user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                  >
                    <button className={mobileNavButtonClass("/admin")}>
                      Admin
                    </button>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/20 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                >
                  <button className={mobileNavButtonClass("/login")}>
                    Login
                  </button>
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                >
                  <button className="w-full text-left px-5 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20">
                    Begin Journey
                  </button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Navbar;