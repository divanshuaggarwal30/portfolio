import { supabase } from "../lib/supabase";

export const getEducation = async () => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return data || [];
};

export const createEducation = async (education) => {
  const { data, error } = await supabase
    .from("education")
    .insert([education])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateEducation = async (id, education) => {
  const { data, error } = await supabase
    .from("education")
    .update(education)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteEducation = async (id) => {
  const { error } = await supabase
    .from("education")
    .delete()
    .eq("id", id);

  if (error) throw error;
};