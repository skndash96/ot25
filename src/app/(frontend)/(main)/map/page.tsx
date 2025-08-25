import Map from "@/client/components/map/Map";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'OT25 Campus Map',
  description: 'Explore the OT25 Campus Map with interactive features to discover key locations and amenities.',
}

export default function MapPage() {
  return (
    <Map />
  )
}