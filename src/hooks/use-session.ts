import { useEffect, useState } from "react";
import type { Session } from "@/lib/session";
import { getSession } from "@/lib/session";

export function useSession(): { session: Session | null; hydrated: boolean } {
  const [session, setSessionState] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSessionState(getSession());
    setHydrated(true);
    const handler = () => setSessionState(getSession());
    window.addEventListener("nhims-session", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("nhims-session", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { session, hydrated };
}
