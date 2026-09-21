"use client";

import { useEffect, useRef } from "react";

import styles from "./ThemeSetting.module.css";

type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "lableksion-theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function savePreference(preference: ThemePreference) {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, preference);
    }
  } catch {
    // Temaet virker fortsatt for denne økten selv om lagring er utilgjengelig.
  }
}

function applyTheme(preference: ThemePreference, systemUsesDark: boolean) {
  const resolved =
    preference === "system" ? (systemUsesDark ? "dark" : "light") : preference;
  document.documentElement.dataset.theme = resolved;
}

export function ThemeSetting() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const preferenceRef = useRef<ThemePreference>("system");

  useEffect(() => {
    const media = window.matchMedia(DARK_MODE_QUERY);
    const preference = readPreference();

    preferenceRef.current = preference;
    if (selectRef.current) selectRef.current.value = preference;
    applyTheme(preference, media.matches);

    const onSystemThemeChange = (event: MediaQueryListEvent) => {
      if (preferenceRef.current === "system") {
        applyTheme("system", event.matches);
      }
    };

    media.addEventListener("change", onSystemThemeChange);
    return () => media.removeEventListener("change", onSystemThemeChange);
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const preference = event.target.value as ThemePreference;
    preferenceRef.current = preference;
    savePreference(preference);
    applyTheme(preference, window.matchMedia(DARK_MODE_QUERY).matches);
  };

  return (
    <label className={styles.setting}>
      <span className={styles.label}>Tema</span>
      <select
        ref={selectRef}
        defaultValue="system"
        onChange={onChange}
        aria-label="Utseende"
        className={styles.select}
      >
        <option value="system">Følg system</option>
        <option value="light">Lyst</option>
        <option value="dark">Mørkt</option>
      </select>
    </label>
  );
}
