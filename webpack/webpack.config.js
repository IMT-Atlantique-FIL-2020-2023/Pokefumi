module.exports = (config, context) => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.html$/i,
          use: 'raw-loader',
        },
      ],
    },
    externals: {
      "_http_common": "commonjs2 _http_common",
      "encoding": "commonjs2 encoding"
    }
  };
};