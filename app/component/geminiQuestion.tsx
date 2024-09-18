"use client";

import { TextField, Typography, Skeleton, Button, Stack } from "@mui/material";
import type React from "react";
import { useState, useCallback, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { FIREBASE_APP_CONFIG } from "../../lib/config";

const app = initializeApp(FIREBASE_APP_CONFIG);
const functions = getFunctions(app);

/**
 * Firebase function to analyze images.
 */
const contextAnswerFlow = httpsCallable(functions, "contextAnswerFlow");

/**
 * Firebase API call to imageAnalysisFlow.
 */
const callContextAnswerFlow = async (data: {
  contextMessage: string;
  userMessage: string;
}): Promise<string> => {
  const { data: result = "" } = await contextAnswerFlow(data);
  return `${result}`;
};

interface Props {
  geminiResponse: string;
}

export default function GeminiQuestion({ geminiResponse }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [geminiQuestion, setGeminiQuestion] = useState<string>("");
  const [geminiAnswer, setGeminiAnswer] = useState<string>("");
  const [userTypedQuestion, setUserTypedQuestion] = useState<string>("");

  /**
   * React callback to handle when the user submits a message to gemini.
   */
  const onChatMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const input = inputRef.current;

      if (!input) {
        return;
      }

      const textMessage = userTypedQuestion;
      setUserTypedQuestion("");
      input.focus();

      setGeminiQuestion(textMessage);
      setGeminiAnswer("");

      const text = await callContextAnswerFlow({
        contextMessage: geminiResponse,
        userMessage: textMessage,
      });

      setGeminiAnswer(text);
    },
    [geminiResponse, userTypedQuestion],
  );

  return (
    <Stack spacing={2}>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          fontWeight: "bold",
        }}
      >
        {geminiQuestion}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {geminiQuestion && !geminiAnswer && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {geminiQuestion && geminiAnswer}
      </Typography>
      <form onSubmit={onChatMessage}>
        <Typography variant="body2" gutterBottom>
          Ask gemini
        </Typography>
        <TextField
          ref={inputRef}
          id="text-message"
          type="text"
          label="Ask gemini"
          fullWidth
          variant="filled"
          value={userTypedQuestion}
          onChange={(event) => {
            setUserTypedQuestion(event.target.value);
          }}
        />
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </Stack>
  );
}
