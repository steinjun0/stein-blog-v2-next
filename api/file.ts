import api from "api/API";

export default {
    async postFile({ file, name }: { file: Blob, name?: string; }) {
        const data = new FormData();
        data.append('file', file, name);
        const res = await api.post(`/file/post`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        return res;
    }
};