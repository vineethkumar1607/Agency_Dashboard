import Header from "components/Header";

const Users = () => {
  return (

    // dashboard wrapper
    <main className=" flex flex-col gap-10  pb-20  w-full max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title={"Trips page"}
        description={"View our active users in real time."}
        />
    </main>
  );
};

export default Users;
