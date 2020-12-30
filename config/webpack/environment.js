const { environment } = require('@rails/webpacker')
const lessLoader = require('./lessLoader')
environment.loaders.prepend('style', lessLoader)

module.exports = environment
