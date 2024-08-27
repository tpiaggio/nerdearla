import Image from "next/image";

import { Container, Button, Typography, Box } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}> 
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        height="50vh" // Adjust height as needed
      >
        <Typography variant="h4" gutterBottom>
          Upload Your File
        </Typography>
        <Button 
          variant="contained" 
          component="label" // Makes the button act as a label for the file input
          startIcon={<UploadIcon />}
        >
          Upload
          <input 
            type="file"
            hidden
            accept="image/*"
            multiple={false}
          />
        </Button>
      </Box>
    </Container>
  );
}
