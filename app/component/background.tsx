import { Container, Typography, Box } from "@mui/material";

export default function Background() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "-20vw",
        top: "-20vh",
        width: "150vw",
        minWidth: "150vh",
        height: "150vh",
        minHeight: "150vw",
        backgroundImage: "url(/soccer-ball.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        animation: "spin 60s linear infinite",
        "@keyframes spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        transformOrigin: "center center",
        zIndex: -1,
      }}
    />
  );
}
