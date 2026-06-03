import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "../../starter/components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";

export default async function Reservations({cabin}) {
  const [settings, bookingDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <>
      <div className="grid grid-cols-2 border border-primary-800 p-5 rounded-lg">
        <DateSelector  cabin={cabin} settings={settings} bookingDates={bookingDates} />
        <ReservationForm cabin={cabin} />
      </div>
    </>
  );
}
