import { getData } from "../actions";
import VideoSolgasExpert from "./_components/video";

export default async function SolgasExpert() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Video"
  )?.content_rels;

  const video = section_fields?.video?.value_format;
  const url_video = section_fields?.url_video?.value_format;

  const url = video || url_video;
  return <VideoSolgasExpert url={url} />;
}
