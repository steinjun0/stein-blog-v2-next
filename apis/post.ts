import { ICategory, IPost } from "interfaces/post";
import api, { API_BASE_URL } from "./API";

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
  newPost.updatedAt = new Date(newPost.updated_at);
  return newPost;
}

function convertApiPostPostToPost(res: { postRes: IApiPost, fileRes: number[]; }): { postRes: IPost, fileRes: number[]; } {
  const newPost = structuredClone(res.postRes) as any;
  newPost.createdAt = new Date(newPost.created_at);
  newPost.updatedAt = new Date(newPost.updated_at);
  return { postRes: newPost, fileRes: res.fileRes };
}

export default {
  // get
  async getPost({ id }: { id: number; }) {
    return api.get<IApiPost>(
      `/post/${id}`
    )
      .then(res => convertApiPostToPost(res.data));
  },

  async getPostList(option?: { page?: number, take?: number, categoryFilters?: string[]; }) {
    return api.get<IApiPost[]>(
      `/post?${option?.categoryFilters?.map(category => `categoryFilters=${category}&`).join('') ?? ''}${option?.page !== undefined ? `page=${option.page}&` : ''}${option?.take !== undefined ? `take=${option.take}&` : ''}`
    )
      .then(res => res.data.map(post => convertApiPostToPost(post)));
  },

  async getPostsByIds({ ids }: { ids: number[]; }) {
    return api.get<IApiPost[]>(
      `/post?${ids.map(id => `ids=${id}&`).join('')}`
    )
      .then(res => res.data.map(post => convertApiPostToPost(post)));
  },

  async getCategories() {
    const categoryRes = await api.get<ICategory[]>(`/post/category`);
    return categoryRes;
  },

  // static 
  getServerPostImageUrl({ postId, fileName }: { postId: number | 'temp', fileName: string; }) {
    return `${process.env.NEXT_PUBLIC_SERVER_API_URL}/file/post/${postId}/${fileName}`;
  },

  getPostFileUrl({ postId, fileName }: { postId: number | 'temp', fileName: string; }) {
    return `${API_BASE_URL}/file/post/${postId}/${fileName}`;
  },

  // post
  async postPost(data: { title: string, subtitle: string, body: string, categories?: Array<string>, files?: Array<string>; }) {
    return api.post<IApiPostPost>(`/post`, data)
      .then(res => convertApiPostPostToPost(res.data));
  },

  // patch
  async patchPost(postId: number, data: { title: string, subtitle: string, body: string, categories?: Array<string>, files?: Array<string>; }) {
    return api.patch<IApiPost>(`/post/${postId}`, data)
      .then(res => convertApiPostToPost(res.data));
  },

  // delete
  async deletePost(postId: number) {
    return api.delete<IApiPost>(`/post/${postId}`);
  },
};

