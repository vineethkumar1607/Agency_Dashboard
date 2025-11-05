import Header from "components/Header";

const Dashboard = () => {
  const user = {
    name: "Vineeth",
  };
  return (
    // dahsboard wrapper
    <main className=" flex flex-col gap-10   pb-20  w-full max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title={`Welcome ${user?.name ?? "Guest"}`}
        description={
          "Track real-time visitor activity and popular destinations."
        }
      />
    </main>
  );
};

export default Dashboard;
