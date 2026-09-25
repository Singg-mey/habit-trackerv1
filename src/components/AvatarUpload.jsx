// src/components/AvatarUpload.jsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AvatarUpload({ userId, url, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Sync url prop to local state when loaded
  useEffect(() => {
    if (url) setAvatarUrl(url);
  }, [url]);

  const handleFileChange = async (event) => {
    setErrorMsg("");
    const file = event.target.files[0];
    if (!file) return;

    // 1. Client-side Type Validation (Images only)
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select an image file (PNG, JPG, JPEG, GIF).");
      return;
    }

    // 2. Client-side Size Validation (<= 1 MB)
    const MAX_SIZE = 1 * 1024 * 1024; // 1 MB
    if (file.size > MAX_SIZE) {
      setErrorMsg("File size exceeds 1 MB. Please choose a smaller file.");
      return;
    }

    // 3. Show instant preview using URL.createObjectURL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // 4. Upload to Supabase
    uploadAvatar(file);
  };

  const uploadAvatar = async (file) => {
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const filePath = `${userId}/avatar.${fileExt}`;

      // Upload file with upsert: true to overwrite previous avatar
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Add timestamp to bypass browser cache
      const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

      // Save public URL to profiles table
      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({ id: userId, avatar_url: publicUrl, updated_at: new Date() });

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      if (onUpload) onUpload(publicUrl);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar Display / Instant Preview */}
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
        {preview || avatarUrl ? (
          <img
            src={preview || avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-xs">No Image</div>
        )}
      </div>

      {/* Select File Button */}
      <label className="cursor-pointer bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
        {uploading ? "Uploading..." : "Upload Avatar"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {/* Inline Error Message */}
      {errorMsg && (
        <p className="text-red-500 text-sm font-medium mt-1">{errorMsg}</p>
      )}
    </div>
  );
}