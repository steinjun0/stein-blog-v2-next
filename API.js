import axios from 'axios'
import { AxiosError } from 'axios'

const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.blog.steinjun.net' : '//localhost:8888'

// let accessToken = localStorage.getItem('AccessToken')
let accessToken = null
let tokenHeader = false


if (accessToken !== null) {
    tokenHeader = { headers: { Authorization: `${accessToken}` } }
} else {
    tokenHeader = false
}



export default {
    // api default

    refreshUserData() {
        // let accessToken = localStorage.getItem('AccessToken')
        let accessToken = null

        if (accessToken !== null) {
            tokenHeader = { headers: { Authorization: `${accessToken}` } }
        } else {
            tokenHeader = false
        }
    },
    async getAxios(url) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.get(url, tokenHeader) : await axios.get(url)
        return res
    },
    async getAxiosBinary(url) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.get(url, tokenHeader) : await axios.get(url)
        return res
    },
    async getAxiosZip(url) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.get(url, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, accept: 'application/x-zip-compressed' } }) : await axios.get(url, { headers: { accept: 'application/x-zip-compressed' } })
        return res
    },
    async getAxiosWithParams(url, param) {
        this.refreshUserData()
        const res = await axios.get(url, {
            headers: { Authorization: `${tokenHeader.headers.Authorization}` },
            params: param,
        }, tokenHeader)
        return res
    },
    async postAxios(url, data) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.post(url, data, tokenHeader) : await axios.post(url, data)
        return res
    },
    async postAxiosFormData(url, data) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.post(url, data, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, 'Content-Type': 'multipart/form-data' } }) : await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        return res
    },
    async patchAxios(url, data) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.patch(url, data, tokenHeader) : await axios.patch(url, data)
        return res
    },
    async patchAxiosFormData(url, data) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.patch(url, data, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, 'Content-Type': 'multipart/form-data' } }) : await axios.patch(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        return res
    },

    async putAxios(url) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.put(url, tokenHeader) : await axios.put(url)
        return res
    },

    async deleteAxios(url) {
        this.refreshUserData()
        const res = tokenHeader ? await axios.delete(url, tokenHeader) : await axios.delete(url)
        return res
    },

    // api

    async getPostList() {
        const postListRes = await this.getAxios(`${API_URL}/post`)
        return postListRes
    },

    async getPost({ id }) {
        const postRes = await this.getAxios(`${API_URL}/post/${id}`)
        return postRes
    },

    async getConsultSchedule(year, month, mentorId) {
        const scheduleRes = await this.getAxiosWithParams(`${API_URL}/consult/schedule`, { 'Year': year, 'Month': month, 'MentorID': +mentorId })
        return scheduleRes
    },

    async postAccount(email, password, nickname) {
        const res = await this.postAxios(`${API_URL}/account`, { email, password, nickname })
        return res
    },

    async postAccountMentorFile(id, file) {
        const scheduleRes = await this.postAxiosFormData(`${API_URL}/account/mentor/${id}/file`, file)
        return scheduleRes
    },

    async patchAccount(userData) {
        const userRes = await this.patchAxios(`${API_URL}/account/update`, userData)
        return userRes
    },


    async patchConsultApprove(consultId) {
        const consultRes = await this.patchAxios(`${API_URL}/consult/${consultId}/approve`)
        return consultRes
    },

    async deleteConsultSchedule(shceduleId) {
        const deleteRes = await this.deleteAxios(`${API_URL}/consult/schedule/${shceduleId}`)
        return deleteRes
    },


}
