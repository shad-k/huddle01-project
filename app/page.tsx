import MeetingControls from "./components/MeetingControls";
import Participants from "./components/Participants";
import Sidebar from "./components/Sidebar";

const Home = () => {
  return (
    <main className="min-h-screen w-full p-4">
      <Sidebar />
      <Participants />
      <MeetingControls />
    </main>
  );
};

export default Home;
