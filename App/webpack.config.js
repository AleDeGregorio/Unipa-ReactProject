const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  resolve = {
    alias: {
      "react-native$": "react-native-web/dist/index.js",
      react$: "preact/compat",
      "react-dom$": "preact/compat",
      "react-dom/unstable-native-dependencies$": "preact-responder-event-plugin",
    }
  }
  return config;
};
