import Image from "next/image";
import { Container, Typography, Box } from "@mui/material";
import UploadContainer from './uploadContainer';

export default function Home() {
  return (
    <>
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
      <Container
        maxWidth="sm"
        sx={{
          mt: 10,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="50vh" // Adjust height as needed
        >
          <Image src="/nerd-animated.svg" width={150} height={150} alt="The IDX logo" />
          <Image src="/idx.png" width={150} height={150} alt="The IDX logo" />
          <Image src="/googleCloud.svg" width={150} height={150} alt="The IDX logo" />
          <Image src="/firebase.svg" width={150} height={150} alt="The IDX logo" />
          <Typography variant="subtitle1" gutterBottom>
            Una versión de Gemini para las amantes del fútbol.
          </Typography>
          <UploadContainer />
        </Box>
      </Container>
    </>
  );
}

