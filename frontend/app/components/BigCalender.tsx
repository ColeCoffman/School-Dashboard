"use client";

import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "../lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

export default function BigCalendar() {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleViewChange}
      min={new Date(2025, 1, 0, 7, 0, 0)}
      max={new Date(2025, 1, 0, 19, 0, 0)}
    />
  );
}
