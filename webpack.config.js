const RemovePlugin = require("remove-files-webpack-plugin");

/**
 * CDN用の「index.js」を作成するのために必要となる
 */
module.exports = {
  mode: "production",
  entry: "./src/cdn.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  output: {
    filename: "index.js"
  },
  resolve: {
    extensions: [".ts"]
  },
  plugins: [
    // cdn系はindex.jsだけあればいいので、混乱を招かないよう消す
    new RemovePlugin({
      after: {
        include: ["./dist/cdn.d.ts"]
      }
    })
  ]
};
