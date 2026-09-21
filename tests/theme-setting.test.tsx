import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { ThemeSetting } from "@/components/ThemeSetting";

const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

let systemUsesDark = false;
let listeners = new Set<(event: MediaQueryListEvent) => void>();

function mediaQueryList(): MediaQueryList {
  return {
    get matches() {
      return systemUsesDark;
    },
    media: DARK_MODE_QUERY,
    onchange: null,
    addEventListener: (_type, listener) => {
      listeners.add(listener as (event: MediaQueryListEvent) => void);
    },
    removeEventListener: (_type, listener) => {
      listeners.delete(listener as (event: MediaQueryListEvent) => void);
    },
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
  };
}

function setSystemTheme(dark: boolean) {
  systemUsesDark = dark;
  const event = { matches: dark, media: DARK_MODE_QUERY } as MediaQueryListEvent;
  listeners.forEach((listener) => listener(event));
}

beforeEach(() => {
  systemUsesDark = false;
  listeners = new Set();
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: () => mediaQueryList(),
  });
});

describe("ThemeSetting", () => {
  it("følger systemet som standard og reagerer når systemtemaet endres", async () => {
    systemUsesDark = true;
    render(<ThemeSetting />);

    const select = screen.getByRole("combobox", { name: "Utseende" });
    expect(select).toHaveValue("system");
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("dark"));

    setSystemTheme(false);
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("light"));
  });

  it("gjenoppretter et eksplisitt lagret valg", async () => {
    window.localStorage.setItem("lableksion-theme", "dark");
    render(<ThemeSetting />);

    const select = screen.getByRole("combobox", { name: "Utseende" });
    await waitFor(() => expect(select).toHaveValue("dark"));
    expect(document.documentElement.dataset.theme).toBe("dark");

    setSystemTheme(true);
    setSystemTheme(false);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("lagrer lyst og mørkt, mens Følg system fjerner overstyringen", async () => {
    const user = userEvent.setup();
    render(<ThemeSetting />);

    const select = screen.getByRole("combobox", { name: "Utseende" });
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("light"));

    await user.selectOptions(select, "dark");
    expect(window.localStorage.getItem("lableksion-theme")).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");

    systemUsesDark = true;
    await user.selectOptions(select, "system");
    expect(window.localStorage.getItem("lableksion-theme")).toBeNull();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
