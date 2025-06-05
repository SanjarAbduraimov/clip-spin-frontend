import { Link } from "../Link";

export const Navigation = () => {
  return (
    <nav>
      <ul className="flex gap-4">
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
