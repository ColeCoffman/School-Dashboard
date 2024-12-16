"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: "evt-001",
    title: "Team Standup",
    time: "9:30 AM - 10:00 AM",
    description: "Daily team sync meeting",
  },
  {
    id: "evt-002",
    title: "Client Presentation",
    time: "11:00 AM - 12:30 PM",
    description: "Q1 results presentation for stakeholders",
  },
  {
    id: "evt-003",
    title: "Lunch & Learn: React Best Practices",
    time: "12:30 PM - 1:30 PM",
    description: "Workshop on React performance optimization",
  },
  {
    id: "evt-004",
    title: "Product Review",
    time: "2:00 PM - 3:30 PM",
    description: "Review new feature implementations",
  },
  {
    id: "evt-005",
    title: "Tech Interview",
    time: "4:00 PM - 5:00 PM",
    description: "Senior developer candidate interview",
  },
  {
    id: "evt-006",
    title: "Happy Hour",
    time: "5:30 PM - 7:00 PM",
    description: "Team social gathering at Local Brew",
  },
];

export default function EventCalender() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white rounded-md p-4">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md bg-gray-100 border-2 border-t-4 odd:border-t-schoolSky even:border-t-schoolPurple"
            key={event.id}
          >
            <div className="flex justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-sm text-gray-400">{event.time}</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
