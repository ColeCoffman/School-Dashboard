import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, lessonsData } from "@/app/lib/data";
import prisma from "@/app/lib/prisma";
import { ITEMS_PER_PAGE } from "@/app/lib/settings";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type LessonList = {
  id: number;
  subject: { name: string };
  class: { name: string };
  teacher: { name: string; surname: string };
};

const columns = [
  {
    header: "Subject",
    accessor: "subject",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

function LessonRow(item: LessonList) {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolSky"
    >
      <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">
        {item.teacher.name + " " + item.teacher.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="lesson" type="update" data={item} />
              <FormModal table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default async function LessonsListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;

  const query: Prisma.LessonWhereInput = {};

  // URL PARAMS
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.teacherId = value as string;
            break;
          case "subjectId":
            query.subjectId = parseInt(value as string);
            break;
          case "classId":
            query.classId = parseInt(value as string);
            break;
          case "search":
            {
              query.OR = [
                {
                  subject: {
                    name: {
                      contains: value as string,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  teacher: {
                    name: {
                      contains: value as string,
                      mode: "insensitive",
                    },
                  },
                },
              ];
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        teacher: true,
        subject: true,
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.lesson.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="lesson" type="create" />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={LessonRow} data={data} />
      {/* Pagination */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
}
