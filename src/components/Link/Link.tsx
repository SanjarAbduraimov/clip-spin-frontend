import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import { Button } from "../Button";

export const Link = ({ to, ...props }: { to: string } & RouterLinkProps) => {
  return (
    <Button size="link" variant="link" asChild>
      <RouterLink to={to} {...props} />
    </Button>
  );
};
