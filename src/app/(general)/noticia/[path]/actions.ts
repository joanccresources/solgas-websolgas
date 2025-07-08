 
import { get, post } from "@/utils/fetch";

export const getData = async (slug: string) => {
  const data = await get({ path: `/blog/post/${slug}` });
  return data;
} 

export const createComment = async (formData: FormData,slug: string) => {
  const params = Object.fromEntries(formData);
  const result = await post({ path: `/blog/save-comment-post/${slug}`, params });
  return result;
};


export const sharedPost = async (slug: string) => { 
  const result = await get({ path: `/blog/action/shared/${slug}`});
  return result;
};

export const likePost = async (slug: string) => { 
  const result = await get({ path: `/blog/action/like/${slug}`});
  return result;
};


export const dislikePost = async (slug: string) => { 
  const result = await get({ path: `/blog/action/dislike/${slug}`});
  return result;
};

