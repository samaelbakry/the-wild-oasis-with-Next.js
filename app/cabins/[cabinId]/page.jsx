import { Suspense } from "react";
import Cabin from "../../_components/Cabin";
import Reservations from "../../_components/Reservations";
import Spinner from "../../_components/Spinner";
import { getCabin, getCabins } from "../../_lib/data-service";

export const generateMetadata = async ({ params }) => {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name} - Details and Reservation` };
};

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-5">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
