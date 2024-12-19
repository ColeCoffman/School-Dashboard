import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, parentsData } from "@/app/lib/data";
import prisma from "@/app/lib/prisma";
import { ITEMS_PER_PAGE } from "@/app/lib/settings";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";

type ParentList = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  address: string;
  students: { name: string }[];
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Name",
    accessor: "studentName",
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

function ParentRow(item: ParentList) {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolSky"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((student) => student.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" id={item.id} />
              <FormModal table="parent" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default async function ParentsListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;

  const query: Prisma.ParentWhereInput = {};

  // URL PARAMS
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
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
    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.parent.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="parent" type="create" />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={ParentRow} data={data} />
      {/* Pagination */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
}
