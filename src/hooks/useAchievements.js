import { useCallback, useEffect, useState } from "react";
import { getAchievements } from "../services/achievementService";

const useAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAchievements();

      setAchievements(data || []);
    } catch (err) {
      console.error("Failed to load achievements:", err);
      setError("Unable to load achievements.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return {
    achievements,
    loading,
    error,
    refreshAchievements: fetchAchievements,
  };
};

export default useAchievements;