var config = {
    entry: {
      adminIndex: "./src/admin/index.js",
      adminAddQuiz: "./src/admin/addQuiz.js"
    },
    output: {
      path: "./build/bundles",
      filename: "[name].bundle.js"
    },
    devtool: "source-map"
};

module.exports = config;
