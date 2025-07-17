import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import prisma from "@/app/lib/prisma";
import { ITEMS_PER_PAGE } from "@/app/lib/settings";
import { getRole } from "@/app/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { JSX } from "react";

type AnnouncementList = {
  id: number;
  title: string;
  class: { name: string } | null;
  date: Date;
};

const AnnouncementRow = (item: AnnouncementList, role: string): JSX.Element => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolSky"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class?.name}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(item.date)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="announcement" type="update" data={item} />
            <FormModal table="announcement" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

export default async function AnnouncementsListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;
  const role = await getRole();

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" ? [{ header: "Actions", accessor: "actions" }] : []),
  ];

  const query: Prisma.AnnouncementWhereInput = {};
  // URL PARAMS
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            {
              query.classId = parseInt(value as string);
            }
            break;
          case "search":
            {
              query.OR = [
                { title: { contains: value as string, mode: "insensitive" } },
                {
                  class: {
                    name: { contains: value as string, mode: "insensitive" },
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
    prisma.announcement.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.announcement.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table
        columns={columns}
        renderRow={(item) => AnnouncementRow(item, role ?? "guest")}
        data={data}
      />
      {/* Pagination */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
}
