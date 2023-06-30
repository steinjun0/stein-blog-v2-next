import axios, { AxiosResponse } from "axios";

export const API_BASE_URL = process.platform === 'linux' ? process.env.NEXT_PUBLIC_SERVER_API_URL : process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token?: string): void => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          // handle unauthorized error
          break;
        case 403:
          // handle forbidden error
          break;
        case 404:
          // handle not found error
          break;
        case 500:
          // handle internal server error
          break;
        default:
          // handle other error responses
          break;
      }
    } else {
      // handle network error
      alert("Network Error");
    }
    return Promise.reject(error);
  }
);

export { setAuthToken };
export function convertInterface<IApi, IData>(res: AxiosResponse<IApi | IApi[], any>, convertFunction: (data: IApi) => IData): AxiosResponse<IData | IData[]> {
  if (Array.isArray(res.data)) {
    const newData = res.data.map(convertFunction);
    res.data = newData as any;
    return res as AxiosResponse<IData[]>;
  } else {
    const newData = convertFunction(res.data);
    res.data = newData as any;
    return res as AxiosResponse<IData>;
  }
}
export default api;