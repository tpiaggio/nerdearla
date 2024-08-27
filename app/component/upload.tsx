import { Button, Typography, Box } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

export default function Upload() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Button
        variant="contained"
        component="label" // Makes the button act as a label for the file input
        startIcon={<UploadIcon />}
      >
        Upload
        <input type="file" hidden accept="image/*" multiple={false} />
      </Button>
    </Box>
  );
}
