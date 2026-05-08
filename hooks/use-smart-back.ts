"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

const AUTH_PATH = /\/(login|signup|sign-up|sign-in|auth|profile-setup)(\/|$|\?)/i;

/**
 * "Ortga" navigatsiyasi — history bor bo'lsa back, aks holda fallback.
 * Hozirgi sahifa o'zi auth sahifasi bo'lsa fallback (loop oldini olish).
 */
export function useSmartBack(fallback: string) {
  const router = useRouter();

  return useCallback(() => {
    if (typeof window === "undefined") {
      router.push(fallback);
      return;
    }

    if (AUTH_PATH.test(window.location.pathname)) {
      router.push(fallback);
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallback);
  }, [router, fallback]);
}
