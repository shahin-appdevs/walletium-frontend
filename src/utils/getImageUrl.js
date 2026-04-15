import { ENV } from "@/config/env";

export const getImageUrl = (image, imagePath) => {
  const baseUrl = ENV.STORAGE_URL;
  if (image === "http") return image;

  if (imagePath) {
    return `${baseUrl}/${imagePath}/${image}`;
  }
  return `${baseUrl}/${image}`;
};
