// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "innovative-intake",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const domain = "innovativeintake.jetbridge.com";
    const router = new sst.aws.Router("Router", {
      domain: {
        name: domain,
        aliases: [`*.${domain}`],
      },
    });
    new sst.aws.Nextjs("MyWeb", { route: { router } });
  },
});
