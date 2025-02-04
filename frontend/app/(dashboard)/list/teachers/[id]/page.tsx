import Announcements from "@/app/components/Announcements";
import BigCalendar from "@/app/components/BigCalender";
import FormModal from "@/app/components/FormModal";
import Performance from "@/app/components/Performance";
import Image from "next/image";
import Link from "next/link";

export default function SingleTeacherPage() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* Left Side */}
      <div className="w-full xl:w-2/3">
        {/* TOP Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* User Info Card */}
          <div className="bg-schoolSky rounded-md px-4 py-6 flex-1 flex gap-4">
            {/* Avatar */}
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Avatar"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            {/* User Info */}
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">John Doe</h1>
                <FormModal
                  table="teacher"
                  type="update"
                  id={1}
                  data={{
                    id: 1,
                    username: "john.doe",
                    password: "12345678",
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@school.edu",
                    phone: "555012345",
                    bloodType: "A+",
                    address: "123 Main St, Anytown, USA",
                    birthDate: new Date("1990-01-01"),
                    sex: "male",
                    img: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
                  }}
                />
              </div>
              <p className="text-sm text-gray-500">Teacher</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                {/* User Details */}
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/blood.png"
                    alt="Blood Type"
                    width={16}
                    height={16}
                  />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="Date" width={16} height={16} />
                  <span>12/12/2024</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="Email" width={16} height={16} />
                  <span>john.doe@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="Phone" width={16} height={16} />
                  <span>09123456789</span>
                </div>
              </div>
            </div>
          </div>
          {/* Small Cards for additional info */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* Attendance Card */}
            <div className="bg-white p-4 rounded-md flex flex-col justify-between gap-4 w-full md:w-[48%] xl:w-[47%] 2xl:w-[48%]">
              <div className="flex gap-4">
                <Image
                  src="/singleAttendance.png"
                  alt="Attendance"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <h1 className="text-xl font-semibold">90%</h1>
              </div>
              <span className="text-sm text-gray-400 self-end">Attendance</span>
            </div>
            {/* Lessons Card */}
            <div className="bg-white p-4 rounded-md flex flex-col justify-between gap-4 w-full md:w-[48%] xl:w-[47%] 2xl:w-[48%]">
              <div className="flex gap-4">
                <Image
                  src="/singleLesson.png"
                  alt="Lessons"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <h1 className="text-xl font-semibold">6</h1>
              </div>
              <span className="text-sm text-gray-400 self-end">Lessons</span>
            </div>
            {/* Branches Card */}
            <div className="bg-white p-4 rounded-md flex flex-col justify-between gap-4 w-full md:w-[48%] xl:w-[47%] 2xl:w-[48%]">
              <div className="flex gap-4">
                <Image
                  src="/singleBranch.png"
                  alt="Branches"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <h1 className="text-xl font-semibold">2</h1>
              </div>
              <span className="text-sm text-gray-400 self-end">Branches</span>
            </div>
            {/* Classes Card */}
            <div className="bg-white p-4 rounded-md flex flex-col justify-between gap-4 w-full md:w-[48%] xl:w-[47%] 2xl:w-[48%]">
              <div className="flex gap-4">
                <Image
                  src="/singleClass.png"
                  alt="Classes"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <h1 className="text-xl font-semibold">10</h1>
              </div>
              <span className="text-sm text-gray-400 self-end">Classes</span>
            </div>
          </div>
        </div>
        {/* Bottom Section for Schedule */}
        <div className="bg-white mt-4 rounded-md p-4 h-[800px]">
          <h1 className="text-xl font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* Shortcuts Section */}
        <div className="bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              href={`/list/classes?supervisorId=${"teacher3"}`}
              className="p-3 rounded-md bg-schoolSkyLight"
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              href={`/list/students?teacherId=${"teacher3"}`}
              className="p-3 rounded-md bg-schoolPurpleLight"
            >
              Teacher&apos;s Students
            </Link>
            <Link
              href={`/list/lessons?teacherId=${"teacher3"}`}
              className="p-3 rounded-md bg-schoolYellowLight"
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              href={`/list/exams?teacherId=${"teacher3"}`}
              className="p-3 rounded-md bg-pink-50"
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              href={`/list/assignments?teacherId=${"teacher3"}`}
              className="p-3 rounded-md bg-schoolSkyLight"
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        {/* Performance and Announcements Components */}
        <Performance />
        <Announcements />
      </div>
    </div>
  );
}
