const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

function federar(config, opcoes) {
  if (opcoes.isServer) return config;
  config.plugins.push(new NextFederationPlugin(opcoes.plugin));
  return config;
}

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    return federar(config, {
      isServer,
      plugin: {
        name: "cardapio",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Cardapio": "./components/Cardapio.js",
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: false },
          "react-dom": { singleton: true, eager: true, requiredVersion: false },
        },
        extraOptions: {
          exposePages: true,
        },
      },
    });
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

module.exports = nextConfig;
