import { supabase } from "../lib/supabase";

export const getProfile = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getProfile error:", error);
    throw error;
  }

  if (!data) {
    throw new Error("Profile record was not found.");
  }

  return data;
};

export const updateProfile = async (id, updates) => {
  if (!id) {
    throw new Error("Profile ID is required.");
  }

  const { data, error } = await supabase
    .from("profile")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("updateProfile error:", error);
    throw error;
  }

  if (!data) {
    throw new Error(
      "Profile could not be updated. Check your Supabase RLS policies."
    );
  }

  return data;
};