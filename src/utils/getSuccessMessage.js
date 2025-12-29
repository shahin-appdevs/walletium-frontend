export const getSuccessMessage = (result, fallback = ["Success"]) => {
  return result?.message?.success || fallback;
};
