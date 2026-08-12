import { supabase } from "../lib/supabase";

const RESUME_BUCKET = "resume";

const generateFileName = (file) => {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return `${crypto.randomUUID()}.${extension}`;
};

export const uploadResume = async (file) => {
  if (!file) {
    throw new Error("Please select a resume.");
  }

  if (file.type !== "application/pdf") {
    throw new Error("Resume must be a PDF.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Resume must be smaller than 10MB.");
  }

  const fileName = generateFileName(file);

  const { error: uploadError } = await supabase.storage
    .from(RESUME_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: "application/pdf",
    });

  if (uploadError) {
    console.error("Resume storage upload error:", uploadError);
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(RESUME_BUCKET)
    .getPublicUrl(fileName);

  if (!publicUrl) {
    throw new Error(
      "Resume uploaded, but a public URL could not be generated."
    );
  }

  return {
    path: fileName,
    publicUrl,
  };
};

export const deleteResume = async (path) => {
  if (!path) return;

  const { error } = await supabase.storage
    .from(RESUME_BUCKET)
    .remove([path]);

  if (error) {
    console.error("Resume deletion error:", error);
    throw error;
  }
};