var postCssConfig = require('./postcss.config');

module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      cacheDirectory: false,
      presets: ['react', 'es2015']
    }
  },
  {
    test: /\.css$/,
    loaders: [
      'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[local]__[hash:base64:8]',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: postCssConfig,
          }
        },
    ],
    exclude: ['node_modules']
  },
];
