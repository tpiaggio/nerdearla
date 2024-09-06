import { Container, Typography, Box } from "@mui/material";
import UploadContainer from "./uploadContainer";
import Footer from "./component/footer";
import Background from "./component/background";

export default function Home() {
  return (
    <>
      <Background />
      <Container
        maxWidth="sm"
        sx={{
          mt: 10,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="subtitle1" gutterBottom>
            Utiliza el botón "Subir imagen" para enviar una foto de un equipo relacionado con el
            fútbol y obtén información de Gemini sobre los equipos que aparecen en la imagen.
          </Typography>
          <UploadContainer />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
