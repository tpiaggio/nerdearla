import { FIREBASE_APP_CONFIG } from "./config";

import { initializeApp, getApps } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";

const app =
  getApps().length === 0 ? initializeApp(FIREBASE_APP_CONFIG) : getApps()[0];
const auth = getAuth(app);
const functions = getFunctions(app);

export {functions, auth};