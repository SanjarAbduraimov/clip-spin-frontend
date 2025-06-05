import { FC, ReactNode } from "react";

import { Spinner } from "../Spinner";

interface PageLoadingProps {
  text?: ReactNode;
}

export const PageLoading: FC<PageLoadingProps> = ({ text }) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-3 bg-background">
      <Spinner size="lg" />
      {text && <p className="text-center text-lg text-text-tertiary">{text}</p>}
    </div>
  );
};
