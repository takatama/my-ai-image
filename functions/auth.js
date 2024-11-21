import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";

export const onRequestPost = [
  // Turnstile認証
  async (context) => {
    return turnstilePlugin({
      secret: context.env.TURNSTILE_SECRET_KEY,
    })(context);
  },
  async ({ request, env }) => {
    const response = new Response("Authenticated", { status: 200 });
    return response;
  },
];
