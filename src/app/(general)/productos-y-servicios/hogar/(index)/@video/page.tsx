import { getData } from "../actions";
import VideoSolgasExpert from "./_components/video";

export default async function SolgasExpert() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner Experta Solgas"
  )?.content_rels;
 
  const video =  section_fields?.video?.value_format
  const url_video = section_fields?.url_video?.value_format
  const description = section_fields?.descripcion?.value_format
  const btn_link =  section_fields?.enlace_boton?.value_format
  const image =  section_fields?.imagen_fondo?.value_format
  const btn_text = section_fields?.texto_boton?.value_format
 
  const url = video || url_video
  return ( 
      <VideoSolgasExpert 
        url={url} 
        description={description}
        btn_link={btn_link}
        image={image}
        btn_text={btn_text}
        /> 
  );
}
