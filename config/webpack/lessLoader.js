const getStyleRule = require('@rails/webpacker/package/utils/get_style_rule')
const { getThemeVariables } = require('antd/dist/theme')

module.exports = getStyleRule(/\.less$/i, false, [
  {
    loader: 'less-loader',
    options: {
      lessOptions: {
        modifyVars: {
          // ...getThemeVariables({
          //   dark: true,
          //   compact: true,
          // }),
          'primary-color': '#ea2b4b', 
          'card-radius': '0',
          'layout-header-background': "#000",
          'link-decoration': 'underline',
          'link-hover-color': '#268785',
          'rate-star-hover-scale': 'scale(1)',
          'rate-star-size': '14px',
        },
        javascriptEnabled: true,
      },
    },
  }
])