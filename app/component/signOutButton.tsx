"use client";

import { auth } from "@/lib/firebase";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";

export default function SignOutButton() {
  return (
    <Button
      className="bg-white text-black hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
      onClick={() => signOut(auth)}
    >
      Sign out
    </Button>
  )
}