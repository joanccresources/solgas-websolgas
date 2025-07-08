import { getData } from "./actions";
import { headers } from "next/headers";
import { metadata } from "@/utils/metadata"; 

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const slug = pathname ? pathname.split("/").pop() : "";
  const { data } = slug ? await getData(slug || "") : { data: null };
  const result = metadata();

  return {
    ...result,
    title: data.title,
    description: data.short_description,
    openGraph: {
      title: data.title,
      description: data.short_description,
      type: "website",
      url: `https://www.solgas.com.pe/noticia/${data.slug}`, 
      images: [
        {
          url:  data.thumbnail_format,
        },
      ],
    },
  };
}

export default async function Notice({
  content,
  title,
  comments,
  notices,
  banner
}: {
  content: React.ReactNode;
  title: React.ReactNode;
  comments: React.ReactNode;
  notices: React.ReactNode;
  banner: React.ReactNode;
}) { 
  return (
    <>
      {banner}
      <div>
        <div className="flex justify-center">
          <div className="grid  lg:gap-y-20 md:gap-y-16 gap-y-12 w-screen">
            <div className=" shadow-[0px_20px_59px_rgba(0,0,0,0.07)] lg:py-12 py-8">
              <div className="flex justify-center container sm:mx-auto md:px-0 px-4">
                {title}
              </div>
            </div>
            <div className="flex justify-center container sm:mx-auto md:px-0 px-4">
              {content}
            </div>
            <div className="flex justify-center container sm:mx-auto md:px-0 px-4">
              {comments}
            </div>
            <div className="flex justify-center container sm:mx-auto ">
              {notices}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
