export const getImageUrl = (path) => {
  if (path.startsWith("http")) return path;

  return `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
};
