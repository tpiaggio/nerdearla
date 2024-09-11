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

/**
 * Firebase function to analyze images.
 */
const imageAnalysisFlow = httpsCallable(functions, "imageAnalysisFlow");

/**
 * Firebase API call to imageAnalysisFlow.
 */
const apiCall = async (data: onReadyProps): Promise<string> => {
  const { data: result = "" } = await imageAnalysisFlow(data);
  return `${result}`;
};

export default function UploadContainer() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [geminiResponse, setGeminiResponse] = useState<string>("");

  /**
   * Sets the user uploaded high resolution image URL, and clears the Gemini response.
   */
  const onUpdateImgUrl = useCallback((url: string) => {
    // Cleanup the Gemini response when image URL changes.
    setImgSrc(url);
    setGeminiResponse("");
  }, []);

  /**
   * React callback to handle when the image is ready to be uploaded.
   */
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
