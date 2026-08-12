import { supabase } from "../lib/supabase";

export const createMessage = async (message) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        name: message.name.trim(),
        email: message.email.trim(),
        company: message.company?.trim() || null,
        subject: message.subject?.trim() || null,
        message: message.message.trim(),
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getMessages = async () => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
};

export const markMessageAsRead = async (id) => {
  const { data, error } = await supabase
    .from("messages")
    .update({
      status: "read",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteMessage = async (id) => {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) throw error;
};