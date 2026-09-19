import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    rules: {
      // Reading localStorage session state must happen post-mount (client-only,
      // avoids SSR hydration mismatch) — setState-in-effect here is intentional.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
