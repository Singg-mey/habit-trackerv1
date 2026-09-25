import { useState } from "react";
import { supabase } from "../lib/supabase";

function SimpleUpload({ userId }) {
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);

const handleUpload = async (event) => {
    try {
        setUploading(true);

    const file = event.target.files[0];
        if (!file) return;

    // Build the file path: userId/avatar.ext
        const fileExt = file.name.split(".").pop();
        const fileName = `${userId}/avatar.${fileExt}`;

    // Upload to the "avatars" bucket
        const { error } = await supabase.storage
            .from("avatars")
            .upload(fileName, file, { upsert: true });
        //                                      ↑ upsert: overwrite if exists

    if (error) throw error;

    // Get the public URL
        const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(fileName);

    setAvatarUrl(data.publicUrl);
        } catch (error) {
        alert(`Upload failed: ${error.message}`);
        } finally {
        setUploading(false);
        }
    };

    return (
        <div className="p-4 text-center">
        {avatarUrl && (
            <img
            src={avatarUrl}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
        )}
        <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="avatar-upload"
        />
        <label
            htmlFor="avatar-upload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded inline-block"
        >
            {uploading ? "Uploading..." : "Choose Avatar"}
        </label>
        </div>
    );
}

export default SimpleUpload;