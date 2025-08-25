import ScheduleList from "@/client/components/schedule/ScheduleList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OT25 Schedule",
  description: "What's happening during Orientation '25? Check out the full schedule of events, activities, and sessions designed to kickstart your college journey!",
}

export default function SchedulePage() {
  return (
    <ScheduleList />
  )
}