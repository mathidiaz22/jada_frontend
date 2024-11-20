export const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://jada-backend.vercel.app";
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://jada-frontend.vercel.app";
