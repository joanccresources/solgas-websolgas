import { Divider, Text } from "@/components";
import { getData } from "../actions";
import { headers } from "next/headers"; 
import FormComment from "../_components/message";
import ListComments from "../_components/list";
import CounterLabel from "../_components/count";

export default async function Comments() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const slug = pathname ? pathname.split("/").pop() : "";
  const { data } = slug ? await getData(slug) : { data: null };
  const comments = data.comments;

  return (
    <div className=" w-full max-w-[1200px]">
      <div className=" text-primary-blue">
        <Text font="bold" className="text-[26px]">
          <CounterLabel />{" "}
          {comments?.length === 1 ? `Comentario` : "Comentarios"}
        </Text>
        <Divider className="lg:mb-12 mb-8 mt-2" />
      </div> 
        <FormComment slug={data.slug} /> 
        <Divider className="my-6" /> 
        <ListComments data={comments} />
    </div>
  );
}
