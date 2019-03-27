const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  // toma el index.js el cual sera la inicializacion de la aplicacion
  entry: './src/public/index.js',
  output: {
    // crea una carpeta al lado de src
    path: path.join(__dirname, 'dist'),
    //copiar archiso y asignar nombre
    filename: 'bundle.js',
  },
  // servidor desarrollo
  devServer: {
    port: 3800,
  },
  //reglas de webpack
  // resolve: {
  //   alias: {
  //     'socket.io-client': path.join(__dirname, 'node_modules', 'socket.io-client', 'socket.io.js'),
  //   },
  // },
  module: {
    // noParse: [/socket.io-client/],
    rules: [
      {
        // testee todos los .css
        test: /\.css$/,
        // y carguelos con style-loader y css-loader
        // para llamar el css dentro de  javascropt
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // copiar un html de un lado a otro
    new HtmlWebPackPlugin({
      template: './src/public/index.html',
    }),
  ],
};
