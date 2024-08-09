/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|swf|ogv)$/, // Include the file types you need
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos',
            outputPath: 'static/videos',
            name: '[name].[hash].[ext]',
            esModule: false,
          },
        },
      });
  
      return config;
    },
};

module.exports = nextConfig;
