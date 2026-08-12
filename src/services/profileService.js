import { supabase } from "../lib/supabase";

export const getProfile = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .limit(1);

  if (error) {
    throw error;
  }

  return data?.[0] || null;
};

export const updateProfile = async (id, profile) => {
  const { data, error } = await supabase
    .from("profile")
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .limit(1);

  if (error) {
    throw error;
  }

  return data?.[0] || null;
};