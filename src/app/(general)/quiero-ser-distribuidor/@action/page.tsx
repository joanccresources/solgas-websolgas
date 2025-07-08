import { getData } from "../actions";
import ActionWithModalSection from "./_components/action-modal";

export default async function Action() {
  const { data } = await getData();

  return <ActionWithModalSection data={data} />;
}
