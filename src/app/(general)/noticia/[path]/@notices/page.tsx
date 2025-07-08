import { headers } from "next/headers";
import { getData } from "../actions";
import CarouselNotice, { ItemCarouselNotice } from "@/components/carousel/notices";

export default async function Notices() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const slug = pathname ? pathname.split("/").pop() : "";
  const { data } = slug ? await getData(slug) : { data: null };
  const posts = data.similar_post_rels.map((item: { similar_post_rel:  ItemCarouselNotice }) => item.similar_post_rel);
 
  return (
    posts?.length > 0 ?
    <div>
      <div className="flex justify-center lg:mx-[70px]">
        <div className="max-w-[1440px] w-full lg:px-0 px-8 relative lg:pb-20 md:pb-16 sm:pb-8 pb-4">
          <CarouselNotice items={posts} />
        </div>
      </div>
    </div> : null
  );
}
