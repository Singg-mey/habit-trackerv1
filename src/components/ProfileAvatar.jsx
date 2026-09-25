// src/components/ProfileAvatar.jsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import AvatarUpload from "./AvatarUpload";

function ProfileAvatar({ userId }) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAvatar() {
        const { data, error } = await supabase
            .from("profiles")
            .select("avatar_url")
            .eq("user_id", userId)
            .single();

        if (!error && data?.avatar_url) {
            setAvatarUrl(data.avatar_url);
        }
        setLoading(false);
        }

        if (userId) {
        loadAvatar();
        }
    }, [userId]);

    if (loading) return <p className="text-gray-500">Loading avatar...</p>;

    return (
        <div className="text-center">
        {avatarUrl ? (
            <img
            src={avatarUrl}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
            />
        ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center text-gray-400 font-medium">
            No avatar
            </div>
        )}
        <AvatarUpload userId={userId} onUpload={setAvatarUrl} />
        </div>
    );
}

export default ProfileAvatar;