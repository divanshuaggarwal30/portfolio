import { useCallback, useEffect, useState } from "react";
import { getEducation } from "../services/educationService";

const useEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEducation = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEducation();

      setEducation(data || []);
    } catch (err) {
      console.error("Failed to load education:", err);
      setError("Unable to load education.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  return {
    education,
    loading,
    error,
    refreshEducation: fetchEducation,
  };
};

export default useEducation;