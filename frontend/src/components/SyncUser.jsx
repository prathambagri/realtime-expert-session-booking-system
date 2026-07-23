import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const SyncUser = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const synced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || synced.current) return;

    synced.current = true;

    const syncUser = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/users/sync`, {
          clerkId: user.id,
          name:
            user.fullName ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            user.username ||
            user.primaryEmailAddress?.emailAddress.split("@")[0],
          email: user.primaryEmailAddress?.emailAddress,
          image: user.imageUrl,
        });

        console.log("✅ User synced");
      } catch (error) {
        console.error("User sync failed:", error);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);

  return null;
};

export default SyncUser;
