import { Outlet } from "react-router-dom";

const ClipSpinLayout = () => {
  return (
    <main className="min-h-screen w-full bg-bg-secondary-subtle">
      <Outlet />
    </main>
  );
};

export default ClipSpinLayout;
