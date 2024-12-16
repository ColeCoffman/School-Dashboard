import EventCalender from "@/app/components/EventCalender";
import Announcements from "@/app/components/Announcements";
import BigCalendar from "@/app/components/BigCalender";

export default function StudentPage() {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">
            Schedule <span className="text-sm text-gray-500">(9th Grade)</span>
          </h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  );
}
