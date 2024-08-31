export interface ImageCompressionOptions {
  maxWidthOrHeight: number;
  quality: number;
}

/**
 * Resize and compress images, returning a jpeg file.
 */
export const resizeAndCompressImage = async (
  file: File,
  options: ImageCompressionOptions,
): Promise<File> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onerror = reject;
    reader.onload = (e) => {
      img.src = e.target?.result as string;

      img.onerror = reject;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Canvas context is not available.");
          return;
        }

        const width = img.width;
        const height = img.height;

        const maxHeight = options.maxWidthOrHeight;
        const maxWidth = options.maxWidthOrHeight;
        const quality = options.quality;

        if (width > maxWidth || height > maxHeight) {
          const scale = Math.min(maxWidth / width, maxHeight / height);
          canvas.width = width * scale;
          canvas.height = height * scale;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } else {
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
        }

        canvas.toBlob(
          (resizedBlob) => {
            if (resizedBlob) {
              const resizedFile = new File([resizedBlob], file.name, { type: "image/jpeg" });
              resolve(resizedFile);
            } else {
              reject(new Error("Failed to create resized blob."));
            }
          },
          file.type,
          quality,
        );
      };
    };

    reader.readAsDataURL(file);
  });
