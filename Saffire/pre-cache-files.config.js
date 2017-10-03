module.exports = {
    "swFile": "/service-worker.js",
    staticFileGlobs: [
      '/public/style.css',
      '/public/index.html',
      '/public/assets',      
    ],
    stripPrefix: 'app/',
    // runtimeCaching: [{
    //   urlPattern: /this\\.is\\.a\\.regex/,
    //   handler: 'networkFirst'
    // }]
  };