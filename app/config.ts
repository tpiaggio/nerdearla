/** Defines the max width and height of an image, while keeps the aspect ratio. */
export const IMG_MAX_DIMENSION = 400;
/** Defines the JPEG compression level. */
export const IMG_QUALITY = 0.7;

export const FIREBASE_APP_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
