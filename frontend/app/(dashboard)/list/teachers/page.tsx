import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role } from "@/app/lib/data";
import prisma from "@/app/lib/prisma";
import { Class, Subject, Teacher, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEMS_PER_PAGE } from "@/app/lib/settings";

type TeacherList = {
  id: string;
  name: string;
  username: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  img: string | null;
  subjects: { name: string }[];
  classes: { name: string }[];
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

function TeacherRow(item: TeacherList) {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolSky"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img ?? "/noAvatar.png"}
          alt="Avatar"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((subject) => subject.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((classItem) => classItem.name).join(", ")}
      </td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 rounded-full bg-schoolSky flex items-center justify-center">
              <Image src="/view.png" alt="Edit" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
}

export default async function TeachersListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;

  const query: Prisma.TeacherWhereInput = {};
  // URL PARAMS
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            {
              query.lessons = {
                some: {
                  id: parseInt(value as string),
                },
              };
            }
            break;
          case "search":
            {
              query.name = {
                contains: value as string,
                mode: "insensitive",
              };
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: { select: { name: true } },
        classes: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.teacher.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={TeacherRow} data={data} />
      {/* Pagination */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
}
