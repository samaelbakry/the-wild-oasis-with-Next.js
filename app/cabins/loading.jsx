import Spinner from "../_components/Spinner";

export default function Loading() {
  return <div className="grid items-center justify-center">
    <Spinner/>
    <span>loading cabins data</span>
  </div>;
}
