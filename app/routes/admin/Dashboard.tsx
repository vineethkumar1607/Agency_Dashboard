import Header from "components/Header";
import StatsCard from "components/StatsCard";
import TripsCard from "components/TripsCard";
import { dashboardStats, allTrips, users } from "app/constants/index";

const Dashboard = () => {
  const user = { name: "Vineeth" };

  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } =
    dashboardStats;
  return (
    // dahsboard wrapper
    <main className=" md:m-5 flex flex-col gap-10   pb-20  w-full max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title={`Welcome ${user?.name ?? "Guest"}`}
        description={
          "Track real-time visitor activity and popular destinations."
        }
      />
      <section className=" flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonth={usersJoined.currentMonth}
            lastMonth={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonth={tripsCreated.currentMonth}
            lastMonth={tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonth={userRole.currentMonth}
            lastMonth={userRole.lastMonth}
          />
        </div>
      </section>
      <section className="flex flex-col gap-6">
        {/* <div className="flex flex-row md:flex-col-reverse xl:flex-row xl:items-center gap-3 justify-between"></div> */}
        <h1 className="text-xl font-semibold to-dark-100">Created Trips</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
          {allTrips
            .slice(0, 4)
            .map(
              ({
                id,
                name,
                imageUrls,
                itinerary,
                tags,
                travelStyle,
                estimatedPrice,
              }) => (
                <TripsCard

                  key={id}
                  id={id.toString()}
                  name={name}
                  imageUrls={imageUrls ? [imageUrls[0]] : []}
                  location={itinerary?.[0]?.location ?? ""}
                  tags={tags}
                  travelStyle={travelStyle}
                  estimatedPrice={estimatedPrice}
                />
              )
            )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
