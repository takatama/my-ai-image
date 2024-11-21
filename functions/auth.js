import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";

export const onRequestPost = [
  // Turnstile認証
  async (context) => {
    return turnstilePlugin({
      secret: context.env.TRUNSTILE_SECRET_KEY,
    })(context);
  },
];
