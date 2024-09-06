import { Box, Skeleton, Typography, Fade } from "@mui/material";

interface InteractionContainerProps {
  /**
   * Image url (base64 encoded).
   */
  imgSrc?: string;
  /**
   * Gemini response text.
   */
  geminiResponse?: string;
}

export default function InteractionContainer({
  imgSrc = "",
  geminiResponse = "",
}: InteractionContainerProps) {
  return (
    <Fade in={true}>
      <Box>
        <Box sx={{ mt: 2 }}>
          <img src={imgSrc} alt="User uploaded" />
        </Box>
        <Box sx={{ mt: 2, width: "100%" }}>
          <Typography variant="body1">
            {geminiResponse ? (
              geminiResponse
            ) : (
              <>
                <Skeleton sx={{ bgcolor: "grey.900" }} />
                <Skeleton sx={{ bgcolor: "grey.900" }} />
                <Skeleton sx={{ bgcolor: "grey.900" }} />
                <Skeleton sx={{ bgcolor: "grey.900" }} />
                <Skeleton sx={{ bgcolor: "grey.900" }} />
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}
