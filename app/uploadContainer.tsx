"use client";

import { Container, Typography } from "@mui/material";
import Upload, { type onReadyProps } from "./component/upload";
import { useState, useCallback } from "react";
import { httpsCallable } from "firebase/functions";
import InteractionContainer from "./component/interactionContainer";
import {functions} from "../lib/firebase";
import useSession from "@/hooks/useSession";

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
    const text = await apiCall(data);
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
    <>
      <Typography variant="subtitle1" gutterBottom>
        Utiliza el botón "Subir imagen" para enviar una foto de un equipo relacionado con el
        fútbol y obtén información de Gemini sobre los equipos que aparecen en la imagen.
      </Typography>
      <Container>
        <Upload onImgUrlChange={onUpdateImgUrl} onReadyToUpload={onReadyToUpload} />
        {imgSrc && <InteractionContainer imgSrc={imgSrc} geminiResponse={geminiResponse} />}
      </Container>
    </>
  );
}
