import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  // ESM and CJS builds for React
  {
    input: "src/frameworks/react/index.ts",
    output: [
      {
        file: "dist/react/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/react/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["react"],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        jsx: "react",
      }),
    ],
  },
  // Type definitions for React
  {
    input: "src/frameworks/react/index.ts",
    output: {
      file: "dist/react/index.d.ts",
      format: "es",
    },
    external: ["react"],
    plugins: [dts()],
  },
];
