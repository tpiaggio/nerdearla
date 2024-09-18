"use client";

import { Container, TextField, Typography, Skeleton, Button, Stack } from "@mui/material";
import Upload, { type onReadyProps } from "./component/upload";
import type React from "react";
import { useState, useCallback, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { FIREBASE_APP_CONFIG } from "../lib/config";
import useSession from "@/hooks/useSession";
import InteractionContainer from "./component/interactionContainer";
import GeminiQuestion from "./component/geminiQuestion";

const app = initializeApp(FIREBASE_APP_CONFIG);
const functions = getFunctions(app);

/**
 * Firebase function to analyze images.
 */
const imageAnalysisFlow = httpsCallable(functions, "imageAnalysisFlow");

/**
 * Firebase API call to imageAnalysisFlow.
 */
const callImageAnalysisFlow = async (data: onReadyProps): Promise<string> => {
  const { data: result = "" } = await imageAnalysisFlow(data);
  return `${result}`;
};

export default function UploadContainer() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [geminiResponse, setGeminiResponse] = useState<string>("");
  const user = useSession();

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
    const text = await callImageAnalysisFlow(data);
    setGeminiResponse(text);
  }, []);

  if (!user) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        Inicia sesión para subir una imagen.
      </Typography>
    );
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="subtitle1" gutterBottom>
          Utiliza el botón "Subir imagen" para enviar una foto de un equipo relacionado con el
          fútbol y obtén información de Gemini sobre los equipos que aparecen en la imagen.
        </Typography>
        <Upload onImgUrlChange={onUpdateImgUrl} onReadyToUpload={onReadyToUpload} />
        {imgSrc && <InteractionContainer imgSrc={imgSrc} geminiResponse={geminiResponse} />}
        {geminiResponse && <GeminiQuestion geminiResponse={geminiResponse} />}
      </Stack>
    </Container>
  );
}
