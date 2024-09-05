"use client";

import { Container, Box } from "@mui/material";
import Upload, { type onReadyProps } from "./component/upload";
import { useState, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

const app = initializeApp({
  apiKey: "",
  authDomain: "nerdearla-workshop.firebaseapp.com",
  projectId: "nerdearla-workshop",
  storageBucket: "nerdearla-workshop.appspot.com",
  messagingSenderId: "693219596825",
  appId: "1:693219596825:web:70b9361c200af6160ee888",
});
const functions = getFunctions(app);
connectFunctionsEmulator(
  functions,
  "3100-idx-nerdearla-1724776699374.cluster-t23zgfo255e32uuvburngnfnn4.cloudworkstations.dev",
  3100,
);

const imageAnalisysFlow = httpsCallable(functions, "imageAnalisysFlow");

const apiCall = async (data: onReadyProps): Promise<string> => {
  const { data: result } = await imageAnalisysFlow({
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
