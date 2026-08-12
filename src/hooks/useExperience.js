import { useCallback, useEffect, useState } from "react";
import { getExperiences } from "../services/experienceService";

const useExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExperiences();

      setExperiences(data || []);
    } catch (err) {
      console.error("Failed to load experience:", err);
      setError("Unable to load experience.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences,
    loading,
    error,
    refreshExperiences: fetchExperiences,
  };
};

export default useExperience;