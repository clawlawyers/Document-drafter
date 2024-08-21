export const NODE_API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://claw-app-dev.onrender.com/api/v1"
    : "http://localhost:8000/api/v1";

export function trimQuotes(text) {
  if (text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1);
  }
  return text;
}
