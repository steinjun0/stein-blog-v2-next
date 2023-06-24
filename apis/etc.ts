import { AxiosResponse } from "axios";
import api from "./API";

export default {

  async getProxy({ url }: { url: string; }): Promise<AxiosResponse<any>> {
    const proxyRes = api.get(`/etc/proxy?url=${url}`);
    return proxyRes;
  },

  async getIsAdmin({ accessToken }: { accessToken: string; }): Promise<AxiosResponse<any>> {
    const isAdminRes = api.get(`/etc/auth/admin?access-token=${accessToken}`);
    return isAdminRes;
  },

  async getBaekjoonData(): Promise<AxiosResponse<{ solvedacTierImg: string, solved: number, rating: number; }>> {
    const baekjoonRes = api.get(`/etc/baekjoon/solved-problems`);
    return baekjoonRes;
  },

  async getProgrammersData(): Promise<AxiosResponse<{ name: string, rank: number, score: number, solvedChallengesCount: number; }>> {
    const config = {
      headers: {
        Cookie: '_programmers_session_production=e91d3e62439297fdb4b58d613ae31be4;',
      },
    };
    const programmersRes = this.getProxy({ url: 'https://school.programmers.co.kr/api/v1/school/challenges/users&config=' + JSON.stringify(config) });
    return programmersRes;
  },

  async getSolvedAcData(): Promise<AxiosResponse<{ rank: number; }>> {
    const solvedAcRes = this.getProxy({ url: 'https://solved.ac/api/v3/user/show?handle=1142308' });
    return solvedAcRes;
  },

};



