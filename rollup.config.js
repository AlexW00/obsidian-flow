import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-import-css";
import { env } from "process";

const config = {
  input: "src/index.ts",
  output: {
    format: "cjs",
    file: "dist/main.js",
    exports: "default",
  },
  external: ["obsidian", "fs", "os", "path"],
  plugins: [
    typescript(),
    resolve({
      browser: true,
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
    }),
    babel({
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
    }),
    commonjs({ sourceMap: false }), // speed up dev builds
    css({ output: "dist/styles.css" }),
  ],
};

export default config;
