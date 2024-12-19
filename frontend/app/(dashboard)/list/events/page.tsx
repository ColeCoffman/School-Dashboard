import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, eventsData } from "@/app/lib/data";
import prisma from "@/app/lib/prisma";
import { ITEMS_PER_PAGE } from "@/app/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";

type EventList = {
  id: number;
  title: string;
  class: { name: string } | null;
  startTime: Date;
  endTime: Date;
};

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
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

function EventRow(item: EventList) {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolSky"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class?.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(item.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(item.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(item.endTime)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default async function EventsListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;

  const query: Prisma.EventWhereInput = {};
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
    prisma.event.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.event.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-schoolYellow flex items-center justify-center">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={EventRow} data={data} />
      {/* Pagination */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
}
