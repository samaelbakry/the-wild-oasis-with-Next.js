"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

async function checkAuthorization(bookingId) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("you are not allowed to do this action");
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error(
      "valid password must be consist atleast from 6 up to 12 chars",
    );

  const updatData = {
    nationalID,
    nationality,
    countryFlag,
  };
  const { data, error } = await supabase
    .from("guests")
    .update(updatData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");

  return data;
}

export async function createBooking(bookingData , formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const newBooking = {
    ...bookingData,
    guestId:session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice:0,
    totalPrice:bookingData.cabinPrice,
    isPaid:false,
    hasBreakfast:false,
    status:"unconfirmed"
  };
  
    const { error } = await supabase
    .from('bookings')
    .insert([newBooking])

  if (error)  throw new Error(error.message);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}


export async function updateBooking(formData) {
  const updatedData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
  };

  const bookingId = formData.get("bookingId");

  checkAuthorization(bookingId);

  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  checkAuthorization(bookingId);

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
