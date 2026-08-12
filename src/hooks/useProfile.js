import { useCallback, useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile:", err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    refreshProfile: fetchProfile,
  };
};

export default useProfile;