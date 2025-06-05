import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const ClipSpinLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-bg-secondary-subtle">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default ClipSpinLayout;
