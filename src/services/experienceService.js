import { supabase } from "../lib/supabase";

export const getExperiences = async () => {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return data || [];
};

export const createExperience = async (experience) => {
  const { data, error } = await supabase
    .from("experiences")
    .insert([experience])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateExperience = async (id, experience) => {
  const { data, error } = await supabase
    .from("experiences")
    .update(experience)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteExperience = async (id) => {
  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", id);

  if (error) throw error;
};