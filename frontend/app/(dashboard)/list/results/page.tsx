import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role } from "@/app/lib/data";
import prisma from "@/app/lib/prisma";
import { ITEMS_PER_PAGE } from "@/app/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";

type ResultList = {
  id: number;
  title: string;
  studentSurname: string;
  studentName: string;
  score: number;
  teacherName: string;
  teacherSurname: string;
  className: string;
  startTime: Date;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

function ResultRow(item: ResultList) {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolSky"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>
        {item.studentName} {item.studentSurname}
      </td>
      <td>{item.score}</td>
      <td className="hidden md:table-cell">
        {item.teacherName} {item.teacherSurname}
      </td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(item.startTime)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                <FormModal table="result" type="update" data={item} />
                <FormModal table="result" type="delete" id={item.id} />
              </>
            ))}
        </div>
      </td>
    </tr>
  );
}

export default async function ResultsListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;

  const query: Prisma.ResultWhereInput = {};

  // URL PARAMS
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value as string;
            break;
          case "search":
            query.OR = [
              {
                exam: {
                  title: {
                    contains: value as string,
                    mode: "insensitive",
                  },
                },
              },
              {
                assignment: {
                  title: {
                    contains: value as string,
                    mode: "insensitive",
                  },
                },
              },
              {
                student: {
                  name: {
                    contains: value as string,
                    mode: "insensitive",
                  },
                },
              },
              {
                exam: {
                  lesson: {
                    teacher: {
                      name: {
                        contains: value as string,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
              {
                assignment: {
                  lesson: {
                    teacher: {
                      name: {
                        contains: value as string,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
              {
                exam: {
                  lesson: {
                    class: {
                      name: {
                        contains: value as string,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
              {
                assignment: {
                  lesson: {
                    class: {
                      name: {
                        contains: value as string,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  const data = dataRes
    .map((result) => {
      const assessment = result.exam || result.assignment;
      if (!assessment) return null;
      const isExam = "startTime" in assessment;
      return {
        id: result.id,
        title: assessment.title,
        studentSurname: result.student.surname,
        studentName: result.student.name,
        score: result.score,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        className: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : assessment.startDate,
      };
    })
    .filter((item) => item !== null);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={ResultRow} data={data} />
      {/* Pagination */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
}
