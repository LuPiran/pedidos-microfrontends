const path = require("path");
const webpack = require("webpack");
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const vazio = path.resolve(__dirname, "components/remoto-vazio.js");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // O plugin no compilador do servidor troca o React e derruba o SSR.
    // No servidor os imports dos micros apontam para um componente vazio.
    // No navegador o Module Federation carrega os remoteEntry de verdade.
    if (isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^cardapio\/Cardapio$/, vazio),
        new webpack.NormalModuleReplacementPlugin(/^pedido\/Pedido$/, vazio),
      );
      return config;
    }

    config.plugins.push(
      new NextFederationPlugin({
        name: "container",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          cardapio: "cardapio@http://localhost:3001/_next/static/chunks/remoteEntry.js",
          pedido: "pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js",
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: false },
          "react-dom": { singleton: true, eager: true, requiredVersion: false },
        },
      }),
    );
    return config;
  },
};

module.exports = nextConfig;
