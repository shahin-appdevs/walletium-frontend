export const getErrorMessage = (error, fallback = ["Something went wrong"]) => {
  if (!error) return "Something went wrong";

  return (
    error?.data?.message?.error ||
    // error?.data?.message ||
    // error?.data?.error ||
    // error?.message ||
    fallback
  );
};
