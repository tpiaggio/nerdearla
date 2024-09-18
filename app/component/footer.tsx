import { Box } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bottom: "20px",
        width: "100%",
        gap: "20px",
        maxWidth: "100vw",
        overflow: "hidden",
        mt: 2,
        alignSelf: 'flex-end'
      }}
    >
      <Image src="/nerd-animated.svg" width={50} height={50} alt="Nerd logo" />
      <Image src="/idx.png" width={150} height={150} alt="IDX logo" />
      <Image src="/googleCloud.svg" width={150} height={150} alt="Google Cloud logo" />
      <Image src="/firebase.svg" width={150} height={150} alt="Firebase logo" />
    </Box>
  );
}
