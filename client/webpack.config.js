var config = {
    entry: {
      adminIndex: "./src/admin/index.js"
    },
    output: {
      path: "./build/bundles",
      filename: "[name].bundle.js"
    },
    devtool: "source-map"
};

module.exports = config;
