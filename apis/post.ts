import { AxiosResponse } from "axios";
import api, { API_BASE_URL, convertInterface } from "./API";
import { ICategory, IPost } from "interfaces/post";

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

interface IApiPostPost {
  postRes: IApiPost,
  fileRes: number[],
}

interface IPostPost {
  postRes: IPost,
  fileRes: number[],
}

function convertApiPostToPost(post: IApiPost): IPost {
  const newPost = structuredClone(post) as any;
  newPost.createdAt = new Date(newPost.created_at);
  newPost.updatedAt = new Date(newPost.created_at);
  return newPost;
}

function convertApiPostPostToPost(res: { postRes: IApiPost, fileRes: number[]; }): { postRes: IPost, fileRes: number[]; } {
  const newPost = structuredClone(res.postRes) as any;
  newPost.createdAt = new Date(newPost.created_at);
  newPost.updatedAt = new Date(newPost.created_at);
  return { postRes: newPost, fileRes: res.fileRes };
}

export default {
  async getPost({ id }: { id: number; }): Promise<AxiosResponse<IPost>> {
    const postRes = api.get<IApiPost>(`/post/${id}`)
      .then((res) => {
        return convertInterface<IApiPost, IPost>(res, convertApiPostToPost);
      }) as Promise<AxiosResponse<IPost>>;
    return postRes;
  },

  async getPostList(option?: { page?: number, take?: number, categoryFilters?: string[]; }): Promise<AxiosResponse<IPost[]>> {
    const postListRes = api.get<IApiPost[]>(
      `/post?${option?.categoryFilters?.map(category => `categoryFilters=${category}&`).join('') ?? ''}${option?.page !== undefined ? `page=${option.page}&` : ''}${option?.take !== undefined ? `take=${option.take}&` : ''}`
    )
      .then((res) => {
        return convertInterface<IApiPost, IPost>(res, convertApiPostToPost);
      }) as Promise<AxiosResponse<IPost[]>>;
    return postListRes;
  },

  async getPostsByIds({ ids }: { ids: number[]; }) {
    const postRes = api.get<IApiPost[]>(`/post?${ids.map(id => `ids=${id}&`).join('')}`)
      .then((res) => {
        return convertInterface<IApiPost, IPost>(res, convertApiPostToPost);
      }) as Promise<AxiosResponse<IPost[]>>;
    return postRes;
  },

  async getCategories() {
    const categoryRes = await api.get<ICategory[]>(`/post/category`);
    return categoryRes;
  },

  getServerPostImageUrl({ postId, fileName }: { postId: number | 'temp', fileName: string; }) {
    return `${process.env.NEXT_PUBLIC_SERVER_API_URL}/file/post/${postId}/${fileName}`;
  },

  getPostFileUrl({ postId, fileName }: { postId: number | 'temp', fileName: string; }) {
    return `${API_BASE_URL}/file/post/${postId}/${fileName}`;
  },

  async postPost(data: { title: string, subtitle: string, body: string, categories?: Array<string>, files?: Array<string>; }) {
    const postRes = api.post<IApiPostPost>(`/post`, data)
      .then((res) => {
        return convertInterface<IApiPostPost, IPostPost>(res, convertApiPostPostToPost);
      }) as Promise<AxiosResponse<IPostPost>>;
    return postRes;
  },

  async patchPost(postId: number, data: { title: string, subtitle: string, body: string, categories?: Array<string>, files?: Array<string>; }) {
    const postRes = api.patch<IApiPost>(`/post/${postId}`, data)
      .then((res) => {
        return convertInterface<IApiPost, IPost>(res, convertApiPostToPost);
      }) as Promise<AxiosResponse<IPost>>;
    return postRes;
  },

  async deletePost(postId: number) {
    const postRes = api.delete<IApiPost>(`/post/${postId}`);
    return postRes;
  },

};

