require('@babel/register')({ extensions: ['.js', '.jsx'] });

const { createElement } = require('react')
const { renderToString } = require('react-dom/server');
const express = require('express');
const webpack = require('webpack');
const App = require('./src/App').default;
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);

app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(
  require(`webpack-hot-middleware`)(compiler, {
    log: false,
    path: `/__webpack_hmr`,
    heartbeat: 10 * 1000,
  })
);

app.get('*', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WHM React App</title>
  </head>
  <body>
    <div id="app">${renderToString(createElement(App))}</div>
    <script async src="/bundle.js"></script>
  </body>
</html>`);
});

app.listen(8080, () => console.log('App is listening on port 8080!'));
