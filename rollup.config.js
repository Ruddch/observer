import typescript from "rollup-plugin-typescript";

export default [
  {
    input: './src/index.ts',
    output: {
      file: './build/bundle.js',
      format: 'es'
    },
    plugins: [
      typescript() // so Rollup can convert TypeScript to JavaScript
    ]
  }
];
