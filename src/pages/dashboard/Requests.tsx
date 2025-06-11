import { ProjectRequests } from "./ProjectRequests";

const Dashboard = () => {
  return (
    <div className="container mx-auto max-w-[960px] px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <ProjectRequests />
    </div>
  );
};

export default Dashboard;
