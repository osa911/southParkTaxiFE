const CracoLessPlugin = require("craco-less");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  // webpack: {
  //   plugins: [
  //     new BundleAnalyzerPlugin(),
  //   ]
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: { "@primary-color": "#1DA57A" },
          javascriptEnabled: true
        }
      }
    }
  ]
};
