"use client";

import useSession from "@/hooks/useSession";
import { auth } from "@/lib/firebase";
import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleLoginButton() {
  const user = useSession();
  const provider = new GoogleAuthProvider();

  if (user) {
    return null;
  }

  return (
    <Button
      className="bg-white text-black hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
      startIcon={<Google />}
      onClick={() => signInWithPopup(auth, provider)}
    >
      Log in with Google
    </Button>
  )
}