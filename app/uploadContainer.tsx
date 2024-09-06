"use client";

import { Container } from "@mui/material";
import Upload, { type onReadyProps } from "./component/upload";
import { useState, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { FIREBASE_APP_CONFIG } from "./config";
import InteractionContainer from "./component/interactionContainer";

const app = initializeApp(FIREBASE_APP_CONFIG);
const functions = getFunctions(app);

const imageAnalysisFlow = httpsCallable(functions, "imageAnalysisFlow");

const apiCall = async (data: onReadyProps): Promise<string> => {
  const { data: result = "" } = await imageAnalysisFlow(data);
  return `${result}`;
};

export default function UploadContainer() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [geminiResponse, setGeminiResponse] = useState<string>("");

  const onUpdateImgUrl = useCallback((url: string) => {
    // Cleanup the Gemini response when image URL changes.
    setImgSrc(url);
    setGeminiResponse("");
  }, []);

  const onReadyToUpload = useCallback(async (data: onReadyProps) => {
    // Request gemini to interpret the image and return a text.
    const text = await apiCall(data);
    setGeminiResponse(text);
  }, []);

  return (
    <Container>
      <Upload onImgUrlChange={onUpdateImgUrl} onReadyToUpload={onReadyToUpload} />
      {imgSrc && <InteractionContainer imgSrc={imgSrc} geminiResponse={geminiResponse} />}
    </Container>
  );
}
