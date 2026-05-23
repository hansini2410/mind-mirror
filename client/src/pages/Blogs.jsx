import { useEffect, useState } from "react";

import axios from "axios";

import { useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaSearch,
  FaBrain,
  FaHeart,
  FaExternalLinkAlt,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_URL = import.meta.env.VITE_API_URL;

function Blogs() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialTopic =
    searchParams.get("topic") || "";

  const [search, setSearch] =
    useState(initialTopic);

  const [blogs, setBlogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchBlogs(initialTopic);
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchBlogs(search);

      if (search.trim()) {
        setSearchParams({
          topic: search.trim(),
        });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () =>
      clearTimeout(delaySearch);
  }, [search]);

  const fetchBlogs = async (
    topic = ""
  ) => {
    try {
      setLoading(true);

      setError("");

      const endpoint = topic.trim()
        ? `${API_URL}/blogs/search?topic=${encodeURIComponent(
            topic.trim()
          )}`
        : `${API_URL}/blogs`;

      const response =
        await axios.get(endpoint);

      setBlogs(response.data);
    } catch (error) {
      console.log(error);

      setError(
        "Unable to load psychology resources. Please check whether your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden relative"
      style={{
        fontFamily:
          "Poppins, sans-serif",

        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-8 pt-32 md:pt-40 pb-20 md:pb-32">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-14 md:mb-20"
        >
          <div className="inline-flex max-w-full items-center gap-3 bg-white/10 border border-white/10 px-5 py-3 rounded-full mb-8 backdrop-blur-xl">
            <FaBrain className="text-blue-300 shrink-0" />

            <p className="uppercase tracking-[0.18em] md:tracking-widest text-blue-200 text-xs md:text-sm leading-relaxed">
              MindMirror Psychology Library
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight break-words max-w-full">
            Explore Emotional
            <br className="hidden sm:block" />

            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent break-words">
              Wellness Resources
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl md:text-2xl leading-8 md:leading-10 max-w-4xl">
            Search psychology-related topics,
            emotional wellness concepts, and
            self-awareness resources from
            trusted external sources.
          </p>
        </motion.div>

        <div className="mb-10 relative">
          <FaSearch className="absolute top-5 md:top-6 left-5 md:left-6 text-slate-400 text-lg md:text-xl" />

          <input
            type="text"
            placeholder="Search anxiety, stress, trauma, relationships..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 pl-14 md:pl-16 text-base md:text-xl outline-none focus:border-blue-400 transition placeholder:text-slate-400"
          />
        </div>

        {loading ? (
          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 md:p-10 text-xl md:text-2xl text-slate-300">
            Loading psychology resources...
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-400/20 backdrop-blur-xl rounded-[32px] p-8 md:p-10 text-lg md:text-xl text-red-200">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              No matching resources found
            </h2>

            <p className="text-slate-300 text-lg md:text-xl leading-8 md:leading-9">
              Try searching another psychology
              or emotional wellness topic.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={`${blog.title}-${index}`}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.04,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
              >
                <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-blue-300 mb-6">
                  <FaHeart />
                </div>

                <p className="text-cyan-300 text-xs md:text-sm uppercase tracking-widest mb-4 break-words">
                  {blog.category}
                </p>

                <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight break-words">
                  {blog.title}
                </h2>

                <p className="text-slate-300 leading-8 mb-8 break-words">
                  {blog.description}
                </p>

                <div className="space-y-4">
                  {blog.links &&
                    blog.links.map(
                      (
                        link,
                        linkIndex
                      ) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-cyan-500/10 hover:border-cyan-400/30 transition overflow-hidden"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="text-base md:text-lg font-semibold text-white mb-2 break-words">
                                {link.title}
                              </h3>

                              <p className="text-slate-400 text-sm break-words">
                                {link.source}
                              </p>
                            </div>

                            <FaExternalLinkAlt className="text-cyan-300 mt-1 shrink-0" />
                          </div>
                        </a>
                      )
                    )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;