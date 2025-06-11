import { useAuthContext } from "@/auth/hooks/useAuthContext";

import { Link } from "../Link";

export const Navigation = () => {
  const { user } = useAuthContext();

  return (
    <nav>
      <ul className="flex gap-4">
        {user?.role === "admin" && (
          <li>
            <Link to="/requests">Requests</Link>
          </li>
        )}
        <li>
          <Link to="/">Services</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>
    </nav>
  );
};
