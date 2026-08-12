import { supabase } from "../lib/supabase";

export const getAchievements = async () => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return data || [];
};

export const createAchievement = async (achievement) => {
  const { data, error } = await supabase
    .from("achievements")
    .insert([achievement])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateAchievement = async (id, achievement) => {
  const { data, error } = await supabase
    .from("achievements")
    .update(achievement)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteAchievement = async (id) => {
  const { error } = await supabase
    .from("achievements")
    .delete()
    .eq("id", id);

  if (error) throw error;
};