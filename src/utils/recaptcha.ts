import Cookies from "js-cookie";

export async function getCaptchaToken() {
    return new Promise<string | null>(resolve => {
      const recaptchaSiteKey = Cookies.get("recaptcha_site_key"); 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
      grecaptcha.ready(async () => {
        const siteKey = recaptchaSiteKey;
        if (!siteKey) {
          resolve(null);
          return;
        }
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const token = await grecaptcha.execute(siteKey, {
          action: "contact",
        });
        resolve(token);
      });
    });
  }
  
  export async function verifyCaptchaToken(token: string) {
    const secretKey = process.env.CAPTCHA_SECRET_KEY;
    if (!secretKey) {
      throw new Error("No secret key found");
    }
    const url = new URL("https://www.google.com/recaptcha/api/siteverify");
    url.searchParams.append("secret", secretKey);
    url.searchParams.append("response", token);
  
    const res = await fetch(url, { method: "POST" });
    const captchaData: CaptchaData = await res.json();
  
    if (!res.ok) return null;
  
    return captchaData;
  }
  
  type CaptchaData =
    | {
        success: true;
        challenge_ts: string;
        hostname: string;
        score: number;
        action: string;
      }
    | {
        success: false;
        "error-codes": ErrorCodes[];
      };
  
  type ErrorCodes =
    | "missing-input-secret"
    | "invalid-input-secret"
    | "missing-input-response"
    | "invalid-input-response"
    | "bad-request"
    | "timeout-or-duplicate";
 