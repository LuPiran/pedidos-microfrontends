const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // No servidor o React compartilhado quebra o SSR. A federação vale para o
    // bundle do navegador, que é o remoteEntry consumido pelo container.
    if (isServer) return config;

    config.plugins.push(
      new NextFederationPlugin({
        name: "pedido",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Pedido": "./components/Pedido.js",
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: false },
          "react-dom": { singleton: true, eager: true, requiredVersion: false },
        },
        extraOptions: {
          exposePages: true,
        },
      }),
    );
    return config;
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
