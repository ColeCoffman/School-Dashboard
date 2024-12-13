import CountChart from "@/app/components/CountChart";
import UserCard from "@/app/components/UserCard";

export default function AdminPage() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* User Card */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        {/* Middle Chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Count Chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <CountChart />
          </div>
        </div>
        {/* Bottom Chart */}
        <div className="flex gap-4 justify-between flex-wrap">
          <CountChart />
        </div>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3">R</div>
    </div>
  );
}
