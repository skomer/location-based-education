var config = {
    entry: {
      adminIndex: "./src/admin/index.js"
    },
    output: {
      path: "./build",
      filename: "[name].bundle.js"
    },
    devtool: "source-map"
};

module.exports = config;
