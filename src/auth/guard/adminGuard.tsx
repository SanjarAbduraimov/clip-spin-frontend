import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "../../hooks/useRouter";
import { useAuthContext } from "../hooks/useAuthContext";

type Props = {
  children: React.ReactNode;
};

export function AdminGuard({ children }: Props) {
  const { loading, user } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <div>Access denied. Admin role required.</div>;
  }

  return <Container>{children}</Container>;
}

function Container({ children }: Props) {
  const router = useRouter();
  const { authenticated, user } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated || !user || user.role !== "admin") {
      router.replace("/dashboard");
    } else {
      setChecked(true);
    }
  }, [authenticated, user, router]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) {
    return null;
  }

  return children;
}
