"use client";

import { Container, Box } from "@mui/material";
import Upload, { type onReadyProps } from "./component/upload";
import { useState, useCallback } from "react";

const fakeApiCall = async (_data: onReadyProps): Promise<string> => {
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
    const text = await fakeApiCall(data);
    setGeminiResponse(text);
  }, []);

  return (
    <Container>
      <Upload onImgUrlChange={onUpdateImgUrl} onReadyToUpload={onReadyToUpload} />
      {imgSrc && <img src={imgSrc} alt="User uploaded" />}
      <Box>{geminiResponse}</Box>
    </Container>
  );
}
