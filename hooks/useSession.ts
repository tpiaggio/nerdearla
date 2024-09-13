import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";


export default function useSession() {
  const [user, setUser] = useState<User | null>(null);

  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}