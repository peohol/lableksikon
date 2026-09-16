"use client";

/* eslint-disable react-hooks/refs, react-hooks/preserve-manual-memoization --
   Floating UI eier plassering og fokushåndtering gjennom sitt eget
   `refs`-objekt og `getReferenceProps`/`getFloatingProps`. Det er ikke
   React-refs lest under render, men React Compiler kan ikke se forskjellen. */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";

import { useCanHover, useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./ConceptLink.module.css";

/** Bare én forhåndsvisning er åpen om gangen; en ny lenke overtar umiddelbart. */
let activeCloser: (() => void) | null = null;

/** Escape skal lukke kortet — ikke lukke og åpne det igjen når fokus kommer tilbake. */
const REOPEN_GUARD_MS = 400;

export interface ConceptLinkProps {
  slug: string;
  label: string;
  title: string;
  definition: string;
  categoryName: string;
}

/**
 * Begrepslenke i løpende tekst med forhåndsvisning.
 *
 * Desktop: hover og tastaturfokus åpner kortet, klikk navigerer.
 * Touch: første trykk åpner kortet uten å navigere, nytt trykk lukker.
 * Kortet ligger `position: fixed` i en portal, så brødteksten flytter seg aldri.
 */
export function ConceptLink({ slug, label, title, definition, categoryName }: ConceptLinkProps) {
  const [open, setOpen] = useState(false);
  const dismissedAt = useRef(0);
  const canHover = useCanHover();
  const isNarrow = useMediaQuery("(max-width: 619px)");

  const changeOpen = useCallback((next: boolean) => {
    // Tidspunktet for lukking brukes til å hindre at kortet åpner seg igjen
    // idet fokus føres tilbake til lenken.
    if (!next) dismissedAt.current = Date.now();
    setOpen(next);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => changeOpen(false);
    activeCloser?.();
    activeCloser = close;
    return () => {
      if (activeCloser === close) activeCloser = null;
    };
  }, [open, changeOpen]);

  const close = useCallback(() => changeOpen(false), [changeOpen]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: changeOpen,
    placement: "bottom-start",
    strategy: "fixed",
    middleware: [offset(10), flip({ padding: 12 }), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
  });

  // Liten skjul-forsinkelse gir rom til å flytte pekeren ned i kortet, og
  // avbrytes når en annen lenke overtar.
  const hover = useHover(context, { enabled: canHover, delay: { open: 0, close: 200 } });
  const dismiss = useDismiss(context, { escapeKey: true, outsidePress: true });
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss, role]);

  const handleFocus = useCallback(() => {
    if (Date.now() - dismissedAt.current >= REOPEN_GUARD_MS) changeOpen(true);
  }, [changeOpen]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      // Uten hover er første trykk en forhåndsvisning, ikke en navigasjon.
      if (canHover) return;
      event.preventDefault();
      changeOpen(!open);
    },
    [canHover, changeOpen, open],
  );

  const handleFloatingBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const next = event.relatedTarget as Node | null;
      if (next && event.currentTarget.contains(next)) return;
      if (next && refs.domReference.current?.contains(next)) return;
      changeOpen(false);
    },
    [changeOpen, refs],
  );

  const closeAndRefocus = useCallback(() => {
    close();
    (refs.domReference.current as HTMLElement | null)?.focus();
  }, [close, refs]);

  return (
    <>
      <Link
        href={`/begrep/${slug}`}
        ref={refs.setReference}
        className={styles.link}
        aria-haspopup="dialog"
        {...getReferenceProps({ onFocus: handleFocus, onClick: handleClick })}
      >
        {label}
      </Link>
      {open ? (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            returnFocus
            order={["reference", "content"]}
          >
            <div
              ref={refs.setFloating}
              style={isNarrow ? undefined : floatingStyles}
              className={`${styles.popover} ${isNarrow ? styles.sheet : ""}`}
              aria-label={`Forhåndsvisning av ${title}`}
              {...getFloatingProps({ onBlur: handleFloatingBlur })}
            >
              <p className={`kicker kicker-accent ${styles.category}`}>{categoryName}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.definition}>{definition}</p>
              <div className={styles.actions}>
                <Link href={`/begrep/${slug}`} className="button button-primary" onClick={close}>
                  Gå til begrepet →
                </Link>
                <button type="button" className="button button-quiet" onClick={closeAndRefocus}>
                  Lukk
                </button>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      ) : null}
    </>
  );
}
