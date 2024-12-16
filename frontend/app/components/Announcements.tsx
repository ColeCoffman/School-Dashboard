export default function Announcements() {
  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-sm text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {/* Announcement */}
        <div className="bg-schoolSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md">
              Parent-Teacher Conference Scheduled for Next Week
            </h2>
            <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">
              December 15, 2024, 9:30 AM
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            We are excited to announce that the Parent-Teacher Conference will
            take place next week. This is a great opportunity for parents to
            discuss their child's progress and...
          </p>
        </div>
        {/* Announcement */}
        <div className="bg-schoolYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md">Annual Sports Day Registration Now Open</h2>
            <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">
              December 18, 2024, 2:45 PM
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            We are excited to announce that the Annual Sports Day will take
            place next week.
          </p>
        </div>
        {/* Announcement */}
        <div className="bg-schoolPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md">
              Holiday Schedule for Winter Break Released
            </h2>
            <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">
              December 20, 2024, 11:15 AM
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            We are excited to announce that the Holiday Schedule for Winter
            Break will be released next week.
          </p>
        </div>
      </div>
    </div>
  );
}
