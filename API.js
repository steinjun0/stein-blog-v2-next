import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.blog.steinjun.net' : '//localhost:8888'

// let accessToken = localStorage.getItem('AccessToken')
let accessToken = null
let tokenHeader = false


if (accessToken !== null) {
    tokenHeader = { headers: { Authorization: `${accessToken}` } }
} else {
    tokenHeader = false
}


const getValidError = exception => {
    if (exception.response !== undefined && exception.response.data !== undefined && exception.response.data.errors !== undefined) {
        return exception.response.data.errors
    }
    return exception
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
        try {
            const res = tokenHeader ? await axios.get(url, tokenHeader) : await axios.get(url)
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },
    async getAxiosBinary(url) {
        this.refreshUserData()
        try {
            const res = tokenHeader ? await axios.get(url, tokenHeader) : await axios.get(url)
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },
    async getAxiosZip(url) {
        this.refreshUserData()
        try {
            const res = tokenHeader ? await axios.get(url, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, accept: 'application/x-zip-compressed' } }) : await axios.get(url, { headers: { accept: 'application/x-zip-compressed' } })
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },
    async getAxiosWithParams(url, param) {
        this.refreshUserData()
        try {
            const res = await axios.get(url, {
                headers: { Authorization: `${tokenHeader.headers.Authorization}` },
                params: param,
            }, tokenHeader)
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },
    async postAxios(url, data) {
        this.refreshUserData()
        try {
            const res = tokenHeader ? await axios.post(url, data, tokenHeader) : await axios.post(url, data)
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },
    async postAxiosFormData(url, data) {
        this.refreshUserData()
        try {
            const res = tokenHeader ? await axios.post(url, data, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, 'Content-Type': 'multipart/form-data' } }) : await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },
    async patchAxios(url, data) {
        this.refreshUserData()
        try {
            const res = tokenHeader ? await axios.patch(url, data, tokenHeader) : await axios.patch(url, data)
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },
    async patchAxiosFormData(url, data) {
        this.refreshUserData()
        try {
            const res = tokenHeader ? await axios.patch(url, data, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, 'Content-Type': 'multipart/form-data' } }) : await axios.patch(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },

    async putAxios(url) {
        this.refreshUserData()
        try {
            const res = tokenHeader ? await axios.put(url, tokenHeader) : await axios.put(url)
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },

    async deleteAxios(url) {
        this.refreshUserData()
        try {
            const res = tokenHeader ? await axios.delete(url, tokenHeader) : await axios.delete(url)
            return res
        } catch (e) {
            return { error: getValidError(e) }
        }
    },

    // api

    async getPostList() {
        const postListRes = await this.getAxios(`${API_URL}/post`)
        return postListRes
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
