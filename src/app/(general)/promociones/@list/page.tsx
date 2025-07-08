import { getData } from "../actions";
import { Body } from "./_components/body";

export default async function List() {
  const { data } = await getData();

  return (
    <div className="px-4">
      <Body data={data} />
    </div>
  );
}
