/* eslint-disable react/jsx-no-useless-fragment */

import React, { useCallback, useEffect } from "react";

import { useRouter } from "@/hooks/useRouter";
import { useSearchParams } from "@/hooks/useSearchParams";

import { useAuthContext } from "../hooks/useAuthContext";

type Props = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? "loading" : <Container>{children}</Container>}</>;
}

function Container({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") || "/";

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
