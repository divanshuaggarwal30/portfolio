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

  return data;
};

export const updateProfile = async (id, profile) => {
  const { data, error } = await supabase
    .from("profile")
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("updateProfile error:", error);
    throw error;
  }

  return data;
};