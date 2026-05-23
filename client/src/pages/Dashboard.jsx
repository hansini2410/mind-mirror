import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaMoon,
  FaBookOpen,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function Dashboard() {
  const navigate = useNavigate();

  const userData = JSON.parse(
    localStorage.getItem("mindmirrorUser") ||
      "null"
  );

  const userName =
    userData?.user?.name || "User";

  const [results, setResults] =
    useState([]);

  const [moodHistory, setMoodHistory] =
    useState([]);

  const [myContributions, setMyContributions] =
    useState([]);

  const [
    myBlogContributions,
    setMyBlogContributions,
  ] = useState([]);

  const [selectedMood, setSelectedMood] =
    useState("");

  const [intensity, setIntensity] =
    useState(5);

  const [note, setNote] =
    useState("");

  const [moodLoading, setMoodLoading] =
    useState(false);

  const [moodMessage, setMoodMessage] =
    useState("");

  useEffect(() => {
    const user = localStorage.getItem(
      "mindmirrorUser"
    );

    if (!user) {
      navigate("/login");
      return;
    }

    fetchResults();
    fetchMoods();
    fetchMyContributions();
    fetchMyBlogContributions();
  }, []);

  const getAuthHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    };
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/results`,
        getAuthHeaders()
      );

      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoods = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/moods`,
        getAuthHeaders()
      );

      setMoodHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyContributions = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/quizzes/my-contributions`,
        getAuthHeaders()
      );

      setMyContributions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyBlogContributions = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/blogs/my-contributions`,
        getAuthHeaders()
      );

      setMyBlogContributions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveMood = async () => {
    if (!selectedMood) {
      setMoodMessage(
        "Please choose how you feel before saving."
      );

      return;
    }

    try {
      setMoodLoading(true);

      setMoodMessage("");

      const response = await axios.post(
        `${API_BASE_URL}/moods`,
        {
          mood: selectedMood,
          intensity: Number(intensity),
          note,
        },
        getAuthHeaders()
      );

      setMoodHistory([
        response.data,
        ...moodHistory,
      ]);

      setMoodMessage(
        "Your emotional check-in has been saved."
      );

      setNote("");

      setIntensity(5);

      setSelectedMood("");
    } catch (error) {
      console.log(error);

      setMoodMessage(
        "Unable to save your mood right now. Please try again."
      );
    } finally {
      setMoodLoading(false);
    }
  };

  const getMoodSummary = () => {
    if (moodHistory.length === 0) {
      return {
        averageIntensity: null,
        mostFrequentMood: null,
        totalCheckIns: 0,
        insight:
          "Your emotional pattern summary will appear once you begin saving mood check-ins.",
      };
    }

    const totalIntensity =
      moodHistory.reduce(
        (total, item) =>
          total +
          Number(item.intensity || 0),
        0
      );

    const averageIntensity = (
      totalIntensity / moodHistory.length
    ).toFixed(1);

    const moodCounts = {};

    moodHistory.forEach((item) => {
      moodCounts[item.mood] =
        (moodCounts[item.mood] || 0) + 1;
    });

    const mostFrequentMood =
      Object.keys(moodCounts).sort(
        (a, b) =>
          moodCounts[b] - moodCounts[a]
      )[0];

    let insight =
      "Your recent emotional check-ins show a developing pattern of self-awareness.";

    if (averageIntensity <= 3) {
      insight =
        "Your recent check-ins suggest a calmer emotional pattern with lower intensity levels.";
    } else if (averageIntensity <= 6) {
      insight =
        "Your recent check-ins show a moderate emotional rhythm. You may be moving between calm and active emotional states.";
    } else {
      insight =
        "Your recent check-ins suggest higher emotional intensity. Gentle recovery, reflection, and grounding may help.";
    }

    return {
      averageIntensity,
      mostFrequentMood,
      totalCheckIns: moodHistory.length,
      insight,
    };
  };

  const getStatusStyle = (status) => {
    if (status === "approved") {
      return "bg-green-500/10 border-green-400/30 text-green-300";
    }

    if (status === "rejected") {
      return "bg-red-500/10 border-red-400/30 text-red-300";
    }

    return "bg-yellow-500/10 border-yellow-400/30 text-yellow-300";
  };

  const moodSummary = getMoodSummary();

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        fontFamily:
          "Poppins, sans-serif",

        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      {/* KEEP THE REST OF YOUR EXISTING JSX EXACTLY SAME */}
    </div>
  );
}

export default Dashboard;