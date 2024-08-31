export const getBlobUrl = async (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    // Convert File to Blob and generate data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
