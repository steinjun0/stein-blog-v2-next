import { AxiosResponse } from "axios";
import api, { updateData } from "./API";
import { IPost } from "interfaces/post";

export interface IApiPost {
  id: number,
  image?: string,
  categories: Array<{ name: string, id: number; }>,
  title: string,
  subtitle: string,
  body: string,
  files: Array<{ id: number, name: string; }>;
  created_at: string,
  updated_at: string,
}

function convertApiPostToPost(post: IApiPost): IPost {
  const newPost = structuredClone(post) as any;
  newPost.createdAt = new Date(newPost.created_at);
  newPost.updatedAt = new Date(newPost.created_at);
  return newPost;
}

export default {
  async getPost({ id }: { id: number; }): Promise<AxiosResponse<IPost>> {
    const postRes = api.get<IApiPost>(`/post/${id}`)
      .then((res) => {
        return updateData<IApiPost, IPost>(res, convertApiPostToPost);
      }) as Promise<AxiosResponse<IPost>>;
    return postRes;
  },

  async getPostList(option?: { page?: number, take?: number, tagFilter?: string; }): Promise<AxiosResponse<IPost[]>> {
    if (option) {
      const postListRes = api.get<IApiPost[]>(`/post?${option.tagFilter ? `tagFilter=${option.tagFilter}&` : ''}${option.page ? `page=${option.page}&` : ''}${option.take ? `take=${option.take}&` : ''}`)
        .then((res) => {
          return updateData<IApiPost, IPost>(res, convertApiPostToPost);
        }) as Promise<AxiosResponse<IPost[]>>;
      return postListRes;
    } else {
      const postListRes = api.get<IApiPost[]>(`/post`)
        .then((res) => {
          return updateData<IApiPost, IPost>(res, convertApiPostToPost);
        }) as Promise<AxiosResponse<IPost[]>>;
      return postListRes;
    }
  },

  async getPostsByIds({ ids }: { ids: number[]; }): Promise<AxiosResponse<IPost[]>> {
    const postRes = api.get<IApiPost[]>(`/post?${ids.map(id => `ids=${id}&`).join('')}`)
      .then((res) => {
        return updateData<IApiPost, IPost>(res, convertApiPostToPost);
      }) as Promise<AxiosResponse<IPost[]>>;
    return postRes;
  },


};

