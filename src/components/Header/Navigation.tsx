import { useAuthContext } from "@/auth/hooks/useAuthContext";

import { Link } from "../Link";

export const Navigation = () => {
  const { user } = useAuthContext();

  return (
    <nav>
      <ul className="flex gap-4">
        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </>
        )}
        {!user?.subscription && (
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/usage">Usage</Link>
          </li>
        )}
        <li>
          <Link to="/#services">Services</Link>
        </li>
      </ul>
    </nav>
  );
};
