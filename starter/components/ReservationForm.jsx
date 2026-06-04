function ReservationForm({ cabin, user }) {
  // CHANGE
  const { maxCapacity } = cabin;

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 rounded-lg mb-2 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p className="px-5">Logged in as</p>

        <div className="flex gap-2 items-center px-5">
          <img
            referrerPolicy="no-referrer"
            className="size-7 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col rounded-lg m-1 p-5 ">
        <div className="space-y-2">
          <label htmlFor="numGuests" className="px-4 py-2">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <p className="text-primary-300 text-base">Start by selecting dates</p>

        <button className="bg-accent-500 px-8 py-4 rounded-lg text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          Reserve now
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
