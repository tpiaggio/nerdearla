"use client";

import { Container, Box } from "@mui/material";
import Upload, { type onReadyProps } from "./component/upload";
import { useState, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
});
const functions = getFunctions(app);

const imageAnalysisFlow = httpsCallable(functions, "imageAnalysisFlow");

const apiCall = async (data: onReadyProps): Promise<string> => {
  const { data: result } = await imageAnalysisFlow({
    url: data.url,
    contentType: data.contentType,
  });

  console.log(result);
  return "The Gemini text response goes here.";
};

export default function InteractionContainer() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [geminiResponse, setGeminiResponse] = useState<string>("");

  const onUpdateImgUrl = useCallback((url: string) => {
    setImgSrc(url);
    if (!url) {
      // Cleanup the Gemini response text when there is no image.
      setGeminiResponse("");
    }
  }, []);

  const onReadyToUpload = useCallback(async (data: onReadyProps) => {
    // TODO: Backend API call with data.
    const text = await apiCall(data);
    setGeminiResponse(text);
  }, []);

  return (
    <Container>
      <Upload onImgUrlChange={onUpdateImgUrl} onReadyToUpload={onReadyToUpload} />
      {
        // eslint-disable-next-line @next/next/no-img-element
        imgSrc && <img src={imgSrc} alt="User uploaded" />
      }
      <Box>{geminiResponse}</Box>
    </Container>
  );
}
