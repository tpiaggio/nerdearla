"use client";

import { Button, Box } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useState, useCallback, useEffect } from "react";
import { type ImageCompressionOptions, resizeAndCompressImage } from "../utils/image";
import { getBlobUrl } from "../utils/file";
import { IMG_MAX_DIMENSION, IMG_QUALITY } from "../config";

export interface onReadyProps {
  /** The base64 encoded image url. */
  url: string;
  /** The mime type of the image. */
  contentType: string;
}

export interface UploadProps {
  /**
   * Called as soon as new file is selected.
   *
   * @param file
   * @returns
   */
  onFileChange?: (file: File | null) => void;
  /**
   * Called with the original image blob to render high resolution image in the DOM.
   */
  onImgUrlChange?: (url: string) => void;
  /**
   * Called when the image is processed and ready to upload.
   */
  onReadyToUpload?: (props: onReadyProps) => void;
}

export default function Upload({ onFileChange, onImgUrlChange, onReadyToUpload }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  // Update the resized image URL
  useEffect(() => {
    onImgUrlChange?.(imgUrl);
  }, [imgUrl, onImgUrlChange]);

  useEffect(() => {
    onFileChange?.(file);

    if (file) {
      // Render the high resolution file.
      getBlobUrl(file).then(setImgUrl);
      resizeAndCompressImage(file, {
        maxWidthOrHeight: IMG_MAX_DIMENSION,
        quality: IMG_QUALITY,
      } as ImageCompressionOptions)
        .then(async (resizedFile) => {
          const url = await getBlobUrl(resizedFile);
          return {
            url,
            contentType: resizedFile.type,
          };
        })
        .then(onReadyToUpload);
    }
  }, [file, onFileChange, onReadyToUpload]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setFile(null);
      return;
    }
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Button
        variant="contained"
        component="label" // Makes the button act as a label for the file input
        startIcon={<UploadIcon />}
      >
        Upload
        <input type="file" hidden accept="image/*" multiple={false} onChange={handleFileChange} />
      </Button>
    </Box>
  );
}
