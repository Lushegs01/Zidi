import next from "eslint-config-next";

/** eslint-config-next ships a flat config array in Next 16 — use it directly. */
const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "assets/**"] },
  ...next,
];

export default config;
