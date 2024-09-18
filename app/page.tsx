import { Container, Box } from "@mui/material";
import UploadContainer from "./uploadContainer";
import Footer from "./component/footer";
import Background from "./component/background";
import GoogleLoginButton from "./component/googleLoginButton";

export default function Home() {
  return (
    <>
      <Background />
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          height: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            mt: 10,
            mb: 10,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <UploadContainer />
            <GoogleLoginButton />
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
}
