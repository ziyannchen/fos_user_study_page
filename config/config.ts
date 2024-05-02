import { defineConfig } from 'umi';
import routes from './routes'
const path = require('path');

export default defineConfig({
    title: 'FOS User Study',
    favicon: '/favicon.svg',
    history: { type: 'hash' },
    hash: true,
    antd: {},
    theme: {
      'primary-color': '#005DC9', // 全局主色
      'link-color': '#005DC9', // 链接色
      'success-color': '#00B365', // 成功色
      'warning-color': '#FF8800', // 警告色
      'error-color': '#F5483B', // 错误色
      'heading-color': 'rgba(0, 0, 0, 0.87)', // 标题色
      'text-color': 'rgba(0, 0, 0, 0.72)', // 主文本色
      'text-color-secondary': 'rgba(0, 0, 0, 0.60)', // 次文本色
      'disabled-color': 'rgba(0, 0, 0, 0.24)', // 失效色
      'border-color-base': 'rgba(0, 0, 0, 0.10)', // 边框色
    },
    routes,
    sass: {},
    locale: {
      default: 'en-US',
      antd: true,
    },
    cssLoader: {
      localsConvention: 'camelCase'
    },
    define: {
      env: process.env.NODE_ENV,
      publicPath: process.env['PUBLIC_PATH'] || './',
    },
    publicPath: process.env['PUBLIC_PATH'] || './',
    headScripts: [
      {src: `${process.env['PUBLIC_PATH'] || './'}d3.min.js`, defer: true}
    ],
    // chunks: ['vendors', 'umi'],
    chainWebpack: (config: any) => {
      config.module
        .rule('scss')
        .test(/\.scss$/)
        .oneOf('css')
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: path.resolve(__dirname, '../src/assets/stylesheet/variable.scss'),
        })
        .end();
    },
  
    proxy: {
      '/api': {
        'target': 'http://1.1.1.1:8080',
        'changeOrigin': true,
        'pathRewrite': { '^/api' : '/api' },
      },
    },

    targets: {
      ie: 11
    },
  
    nodeModulesTransform: {
      type: 'none',
    },
    // mfsu: {},
    mfsu: false,
    // 开启 mfsu 的情况下 fastRefresh 属性不用打开
    // fastRefresh: {},
    webpack5: {
      // lazyCompilation: {},
    },
    dynamicImport: {
      loading: '@/Loading',
    },
  });
  