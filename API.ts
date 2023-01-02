import axios from 'axios'
import { AxiosError } from 'axios'

const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.blog.steinjun.net' : '//localhost:8888'

// let accessToken = localStorage.getItem('AccessToken')
let accessToken = null
let tokenHeader: { Authorization: string } | null = null


if (accessToken !== null) {
    tokenHeader = { Authorization: `${accessToken}` }
} else {
    tokenHeader = null
}

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?/;

function isIsoDateString(value: any): boolean {
    return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: string) {
    const jsonBody: { string: any } = JSON.parse(body)

    function recursiveChanger(json: { string: any }) {
        for (const key of Object.keys(json)) {
            const value = json[key as keyof { string: any }];
            if (typeof value === 'object')
                recursiveChanger(value)
            else if (isIsoDateString(value)) {
                json[key as keyof { string: any }] = new Date(value);
            }
        }
    }

    recursiveChanger(jsonBody)
    return jsonBody
}




export default {
    // api default

    refreshUserData() {
        // let accessToken = localStorage.getItem('AccessToken')
        let accessToken = null

        if (accessToken !== null) {
            tokenHeader = { Authorization: `${accessToken}` }
        } else {
            tokenHeader = null
        }
    },
    async getAxios(url: string) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.get(url, { transformResponse: handleDates, headers: tokenHeader })
            : await axios.get(url, { transformResponse: handleDates })
        return res
    },
    async getAxiosZip(url: string) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.get(url, { headers: { Authorization: tokenHeader.Authorization, accept: 'application/x-zip-compressed' } })
            : await axios.get(url, { headers: { accept: 'application/x-zip-compressed' }, transformResponse: handleDates })
        return res
    },
    async getAxiosWithParams(url: string, param: object) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.get(url, {
            transformResponse: handleDates,
            headers: tokenHeader,
            params: param,
        }) : await axios.get(url, {
            transformResponse: handleDates,
            params: param,
        })
        return res
    },
    async postAxios(url: string, data: object) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.post(url, data, { transformResponse: handleDates, headers: tokenHeader })
            : await axios.post(url, data, { transformResponse: handleDates })
        return res
    },
    async postAxiosFormData(url: string, data: object) {
        // You need to make data as a FormData
        this.refreshUserData()
        const res = tokenHeader ? await axios.post(url, data, { headers: { Authorization: tokenHeader.Authorization, 'Content-Type': 'multipart/form-data' }, transformResponse: handleDates })
            : await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' }, transformResponse: handleDates })
        return res
    },
    async patchAxios(url: string, data: object) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.patch(url, data, { headers: tokenHeader, transformResponse: handleDates }) : await axios.patch(url, data, { transformResponse: handleDates })
        return res
    },
    async patchAxiosFormData(url: string, data: object) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.patch(url, data, { headers: { Authorization: tokenHeader.Authorization, 'Content-Type': 'multipart/form-data' }, transformResponse: handleDates })
            : await axios.patch(url, data, { headers: { 'Content-Type': 'multipart/form-data' }, transformResponse: handleDates })
        return res
    },

    async putAxios(url: string) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.put(url, { headers: tokenHeader, transformResponse: handleDates })
            : await axios.put(url, { transformResponse: handleDates })
        return res
    },

    async deleteAxios(url: string) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.delete(url, { headers: tokenHeader, transformResponse: handleDates })
            : await axios.delete(url, { transformResponse: handleDates })
        return res
    },


    // static link
    getOrigin() {
        return API_URL
    },

    getPostFileUrl({ postId, fileName }: { postId: number | 'temp', fileName: string }) {
        return `${API_URL}/file/post/${postId}/${fileName}`
    },


    // api

    async getPostList() {
        const postListRes = await this.getAxios(`${API_URL}/post`)
        return postListRes
    },

    async getPost({ id }: { id: number }) {
        const postRes = await this.getAxios(`${API_URL}/post/${id}`)
        return postRes
    },

    async getCategories() {
        const categoryRes = await this.getAxios(`${API_URL}/post/category`)
        return categoryRes
    },

    // async getConsultSchedule(year, month, mentorId) {
    //     const scheduleRes = await this.getAxiosWithParams(`${API_URL}/consult/schedule`, { 'Year': year, 'Month': month, 'MentorID': +mentorId })
    //     return scheduleRes
    // },

    async postFile({ file, name }: { file: Blob, name?: string }) {
        const data = new FormData();
        data.append('file', file, name)
        const res = await this.postAxiosFormData(`${API_URL}/file/post`, data)
        return res
    },

    async postPost(data: { title: string, subtitle: string, body: string, categories?: Array<number>, files?: Array<string> }) {
        const scheduleRes = await this.postAxios(`${API_URL}/post`, data)
        return scheduleRes
    },

    // async patchAccount(userData) {
    //     const userRes = await this.patchAxios(`${API_URL}/account/update`, userData)
    //     return userRes
    // },


    // async patchConsultApprove(consultId) {
    //     const consultRes = await this.patchAxios(`${API_URL}/consult/${consultId}/approve`)
    //     return consultRes
    // },

    // async deleteConsultSchedule(shceduleId) {
    //     const deleteRes = await this.deleteAxios(`${API_URL}/consult/schedule/${shceduleId}`)
    //     return deleteRes
    // },


}
