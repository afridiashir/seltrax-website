// Where "Get Started" / "Login" CTAs point. Override with NEXT_PUBLIC_APP_URL / NEXT_PUBLIC_LOGIN_URL.
export const APP_URL =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://admin.seltrax.com";
export const LOGIN_URL =
    process.env.NEXT_PUBLIC_LOGIN_URL ?? `${APP_URL}/login`;
export const REGISTER_URL =
    process.env.NEXT_PUBLIC_REGISTER_URL ?? `${APP_URL}/register`;
