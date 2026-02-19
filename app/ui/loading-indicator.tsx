"use client";

import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
  // todo figure if dfelete this
  const { pending } = useLinkStatus();
  return (
    <span aria-hidden className={`link-hint ${pending ? "is-pending" : ""}`} />
  );
}
