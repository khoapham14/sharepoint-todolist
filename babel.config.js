  // babel.config.js
  module.exports = {
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      '@babel/preset-flow',
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
  };