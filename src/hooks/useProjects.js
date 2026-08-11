import { useCallback, useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      setProjects(data || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refreshProjects: fetchProjects,
  };
};

export default useProjects;