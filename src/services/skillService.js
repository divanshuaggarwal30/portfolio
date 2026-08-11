import { supabase } from "../lib/supabase";

export const getSkills = async () => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return data || [];
};

export const createSkill = async (skill) => {
  const { data, error } = await supabase
    .from("skills")
    .insert([skill])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateSkill = async (id, skill) => {
  const { data, error } = await supabase
    .from("skills")
    .update(skill)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteSkill = async (id) => {
  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);

  if (error) throw error;
};