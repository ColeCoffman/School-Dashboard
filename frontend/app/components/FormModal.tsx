"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => React.ReactNode;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

export default function FormModal({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "class"
    | "lesson"
    | "result"
    | "exam"
    | "assignment"
    | "parent"
    | "subject"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-schoolYellow"
      : type === "update"
      ? "bg-schoolSky"
      : "bg-schoolPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="flex flex-col gap-4 p-4">
        <span className="text-center font-medium">
          Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "update" || type === "create" ? (
      forms[table](type, data)
    ) : (
      "Form not found"
    );
  };

  return (
    <>
      <button
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/${type}.png`}
          alt={`${type} icon`}
          width={16}
          height={16}
        />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="Close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
