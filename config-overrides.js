module.exports = function override(config, env) {
  // Add your webpack configuration customizations here
  // For example, to add a fallback:
  config.resolve.fallback = {
    "buffer": require.resolve("buffer/"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util/"),
    "process": require.resolve("process/browser")
  };

  return config;
};
