import { useState } from "react";
import {
  FileText,
  ExternalLink,
  Trash2,
  Upload,
} from "lucide-react";

import {
  uploadResume,
  deleteResume,
} from "../../services/storageService";

import {
  updateProfile,
} from "../../services/profileService";

import {
  useProfileContext,
} from "../../contexts/ProfileContext";

const MediaManager = () => {
  const {
    profile,
    loading,
    error: profileError,
    refreshProfile,
  } = useProfileContext();

  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      setError("Please select a PDF first.");
      return;
    }

    if (!profile?.id) {
      setError("Profile record is not available.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      console.log("Uploading resume...");
      console.log("Profile ID:", profile.id);

      const uploaded = await uploadResume(resumeFile);

      console.log("Storage upload successful:", uploaded);

      /*
       * Save the new URL and path in the profile table.
       */

      const updatedProfile = await updateProfile(
        profile.id,
        {
          resume_url: uploaded.publicUrl,
          resume_path: uploaded.path,
        }
      );

      console.log(
        "Profile updated successfully:",
        updatedProfile
      );

      /*
       * Delete old resume only after the database
       * successfully points to the new one.
       */

      if (
        profile.resume_path &&
        profile.resume_path !== uploaded.path
      ) {
        try {
          await deleteResume(
            profile.resume_path
          );
        } catch (deleteError) {
          console.warn(
            "Old resume could not be deleted:",
            deleteError
          );
        }
      }

      setResumeFile(null);

      await refreshProfile();

      setMessage(
        "Resume uploaded successfully."
      );
    } catch (err) {
      console.error(
        "Complete resume upload error:",
        err
      );

      setError(
        err?.message ||
          "Unable to upload resume."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!profile?.resume_path) {
      setError("No resume to delete.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your current resume?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deleteResume(
        profile.resume_path
      );

      await updateProfile(
        profile.id,
        {
          resume_url: null,
          resume_path: null,
        }
      );

      await refreshProfile();

      setMessage(
        "Resume deleted successfully."
      );
    } catch (err) {
      console.error(
        "Resume deletion error:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete resume."
      );
    }
  };

  if (loading) {
    return (
      <section className="mt-10 rounded-2xl border border-white/10 bg-[#080808] p-8">
        <p className="text-sm text-white/40">
          Loading resume settings...
        </p>
      </section>
    );
  }

  if (profileError || !profile) {
    return (
      <section className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
        <p className="text-sm text-red-400">
          {profileError ||
            "Profile data could not be loaded."}
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-white/30">
          Recruiter assets
        </p>

        <h2 className="mt-2 text-xl font-medium">
          Resume
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/35">
          Upload your latest resume. The public
          portfolio will automatically use the latest
          version.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
          {message}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-[#080808] p-6 sm:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10">
              <FileText
                size={20}
                strokeWidth={1.5}
              />
            </div>

            <div>
              <p className="text-sm font-medium">
                Current resume
              </p>

              {profile.resume_url ? (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1.5 text-xs text-white/35 hover:text-white"
                >
                  Open current resume
                  <ExternalLink size={12} />
                </a>
              ) : (
                <p className="mt-1 text-xs text-white/25">
                  No resume uploaded
                </p>
              )}
            </div>
          </div>

          {profile.resume_url && (
            <button
              type="button"
              onClick={handleDeleteResume}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/10 px-4 py-2.5 text-xs text-red-400/60 hover:border-red-400/20 hover:text-red-400"
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}
        </div>

        <div className="my-7 h-px bg-white/10" />

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/30">
            Upload new resume
          </p>

          <input
            type="file"
            accept="application/pdf"
            onChange={(event) => {
              setResumeFile(
                event.target.files?.[0] || null
              );

              setError("");
              setMessage("");
            }}
            className="mt-4 block w-full text-xs text-white/35"
          />

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleResumeUpload}
              disabled={
                !resumeFile || uploading
              }
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Upload size={16} />

              {uploading
                ? "Uploading..."
                : "Upload resume"}
            </button>

            <p className="text-xs text-white/20">
              PDF • Maximum 10MB
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaManager;