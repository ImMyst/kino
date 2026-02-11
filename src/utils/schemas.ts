import { type } from "arktype";

// Schema pour les search params de la page d'accueil
export const homeSearchSchema = type({
  "week?": "string",
});

// Type inféré depuis le schema
export type HomeSearch = typeof homeSearchSchema.infer;
