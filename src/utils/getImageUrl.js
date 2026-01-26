export const getImageUrl = (image, imagePath) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (image === "http") return image;

  if (imagePath) {
    return `${baseUrl}/${imagePath}/${image}`;
  }
  return `${baseUrl}/${image}`;
};
