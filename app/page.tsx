import { Container, Typography, Box } from "@mui/material";
import UploadContainer from "./uploadContainer";
import Footer from "./component/footer";
import Background from "./component/background";
import GoogleLoginButton from "./component/googleLoginButton";

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
          <UploadContainer />
          <GoogleLoginButton />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
