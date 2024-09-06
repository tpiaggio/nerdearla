"use client";

import { Container, Box } from "@mui/material";
import Upload, { type onReadyProps } from "./component/upload";
import { useState, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { FIREBASE_APP_CONFIG } from "./config";

const app = initializeApp(FIREBASE_APP_CONFIG);
const functions = getFunctions(app);

const imageAnalysisFlow = httpsCallable(functions, "imageAnalysisFlow");

const apiCall = async (data: onReadyProps): Promise<string> => {
  const { data: result } = await imageAnalysisFlow({
    url: data.url,
    contentType: data.contentType,
  });

  return `${result || ""}`;
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
