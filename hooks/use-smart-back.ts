"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

const AUTH_PATH = /\/(login|signup|sign-up|sign-in|auth|profile-setup)(\/|$|\?)/i;

/**
 * Login/auth sahifalariga qaytarmaydigan "ortga" navigatsiyasi.
 * Agar history bo'sh bo'lsa yoki referrer auth sahifasi bo'lsa — fallback ochiladi.
 */
export function useSmartBack(fallback: string) {
  const router = useRouter();

  return useCallback(() => {
    if (typeof window === "undefined") {
      router.push(fallback);
      return;
    }

    const ref = document.referrer;
    const sameOrigin = ref.startsWith(window.location.origin);
    const refPath = sameOrigin ? ref.slice(window.location.origin.length) : "";
    const isAuthRef = sameOrigin && AUTH_PATH.test(refPath);
    const currentIsAuth = AUTH_PATH.test(window.location.pathname);

    if (window.history.length <= 1 || !sameOrigin || isAuthRef || currentIsAuth) {
      router.push(fallback);
      return;
    }

    router.back();
  }, [router, fallback]);
}
