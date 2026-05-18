export const CATEGORY_GRADIENTS = {
  "Security Measures": "linear-gradient(135deg, #F43F5E 0%, #F97316 100%)",
  Introduction: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
  Insights: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
  Product: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  Tutorials: "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
};
export const DEFAULT_CATEGORY_GRADIENT =
  "linear-gradient(135deg, #64748B 0%, #94A3B8 100%)";

export const getCategoryGradient = (category) =>
  CATEGORY_GRADIENTS[category] ?? DEFAULT_CATEGORY_GRADIENT;

export const stripHtml = (html = "") =>
  String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const truncate = (text = "", max = 160) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

export const formatDate = (iso, locale = "en-US") => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const estimateReadTime = (html = "") => {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
};
