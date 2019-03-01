let path = require('path');

let conf = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, './prod'),
    filename: 'main.js',
    publicPath: 'prod/'
  },

  devServer: {
    overlay: true, //красивая ошибка в браузере, если она есть
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
};

// module.exports = (env, options) => {
//   conf.devtool = options.mode === "production" ?
//                   false:
//                   "cheap-module-eval-source-map";
//   return conf;                
// }; типа при отладке полезно, но фиг знает, я разницы не увидел
module.exports = conf;
