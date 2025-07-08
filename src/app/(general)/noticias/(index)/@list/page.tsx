import { getCategories, getData, getElements } from "../actions";
import { Body } from "./_components/body";

export default async function List() {
  const { data } = await getData();
  const { data: elements } = await getElements(
    "page=1&per_page=12&sort_by=publication_at&descending=DESC"
  );
  const { data: categories } = await getCategories();
  return <Body data={data} elements={elements} categories={categories} />;
}
