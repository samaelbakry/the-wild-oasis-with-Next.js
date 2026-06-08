import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservations({ cabin }) {
  const [settings, bookingDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <>
      <div className="grid grid-cols-2 border border-primary-800 p-5 rounded-lg">
        <DateSelector
          cabin={cabin}
          settings={settings}
          bookingDates={bookingDates}
        />
        {session?.user ? (
          <>
            <ReservationForm cabin={cabin}  user={session.user}/>
          </>
        ) : (
          <>
          <LoginMessage/>
          </>
        )}
      </div>
    </>
  );
}
