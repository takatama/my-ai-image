// 自分で作成したTurnstileのSite Keyを記入してください
const SITE_KEY = "0x4AAAAAAAzs018lIIK5s9-R";

async function handleTurnstileResponse(token) {
  const formData = new FormData();
  formData.set("cf-turnstile-response", token);
  const response = await fetch("/auth", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("認証に失敗しました");
  }
  translateBtn.disabled = false;
  generateBtn.disabled = false;
}

function initializeTurnstile() {
  turnstile.render("#turnstile-widget", {
    sitekey: SITE_KEY,
    callback: handleTurnstileResponse,
    "error-callback": () => {
      translateBtn.disabled = true;
      generateBtn.disabled = true;
    },
    "expired-callback": resetToTurnstile,
  });
}

function resetToTurnstile() {
  translateBtn.disabled = true;
  generateBtn.disabled = true;
  turnstile.reset();
}

async function verifyResponse(response) {
  if (response.ok) return true;
  if (response.status === 401) {
    resetToTurnstile();
    throw new Error(
      "セッションの有効期限が切れました。もう一度試してください。"
    );
  }
  const errorData = await response.json();
  throw new Error(`エラー: ${errorData.error}`);
}