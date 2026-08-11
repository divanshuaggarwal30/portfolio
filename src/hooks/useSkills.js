import { useCallback, useEffect, useState } from "react";
import { getSkills } from "../services/skillService";

const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSkills();

      setSkills(data);
    } catch (err) {
      console.error("Failed to load skills:", err);
      setError("Unable to load skills.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return {
    skills,
    loading,
    error,
    refreshSkills: fetchSkills,
  };
};

export default useSkills;