import { supabase } from "../lib/supabase";

export const getProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const createProject = async (project) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateProject = async (id, project) => {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteProject = async (id) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  };
};