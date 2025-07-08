import { MessageIcon } from "@/components";
import { getData } from "../actions";
import { headers } from "next/headers";

import Share from "../_components/share";
import CounterLabel from "../_components/count";
import Like from "../_components/like";
interface TagRel {
  slug: string;
  name: string;
}

interface TagPostRel {
  tag_rel: TagRel;
}

export default async function Content() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const slug = pathname ? pathname.split("/").pop() : "";
  const { data } = slug ? await getData(slug) : { data: null };
  const tags = data.tag_posts_rel;

  return (
    <div className="lg:flex justify-center">
      <div className="w-full lg:flex grid justify-start gap-x-24 gap-y-4 sm:pt-0">
        <div>
          <div className="flex gap-x-4">
            <div className="flex border border-select divide-x-2 justify-center items-center rounded-full h-[64px] px-3">
              <div className="flex items-center justify-center px-2">
                <a className="p-1 rounded-full flex justify-center items-center bg-white cursor-pointer hover:bg-gray-200 text-primary-blue-light font-clan-pro-news text-[25px] gap-x-2">
                  <Like slug={slug} count={data.like} />
                </a>
              </div>
              <div className="flex items-center justify-center  px-2">
                <a className="p-1 rounded-full flex justify-center items-center bg-white text-primary-blue-light font-clan-pro-news text-[25px] gap-x-2">
                  <CounterLabel /> <MessageIcon />
                </a>
              </div>
            </div>
            <Share
              url={`https://www.solgas.com.pe/noticia/${data.slug}`}
              slug={data.slug}
              count={data?.shared}
            />
          </div>
          <div className="flex flex-wrap w-full max-w-[320px] py-8 gap-4">
            {tags.map((tag: TagPostRel) => (
              <div
                key={tag.tag_rel.slug}
                className="bg-gray h-[40px] flex items-center px-5 rounded-full font-clan-pro-new text-[15px] text-primary-blue"
              >
                #{tag.tag_rel.name}
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-full max-w-[787px]"
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        />
      </div>
    </div>
  );
}
