import EtcAPI from "api/etc";
import { numberWithCommas } from "utils";

export default {
    updateBeakjoon() {
        EtcAPI.getBaekjoonData().then((res) => {
            if (document.getElementById('baekjoon-tier'))
                document.getElementById('baekjoon-tier')?.setAttribute('src', res.data.solvedacTierImg);
            if (document.getElementById('solved-num'))
                document.getElementById('solved-num')!.innerHTML = `${numberWithCommas(res.data.solved)}문제`;
            if (document.getElementById('baekjun-rating'))
                document.getElementById('baekjun-rating')!.innerHTML = `${numberWithCommas(res.data.rating)}등`;
        });
        EtcAPI.getSolvedAcData().then((res) => {
            if (document.getElementById('solvedac-rating'))
                document.getElementById('solvedac-rating')!.innerHTML = `${numberWithCommas(res.data.rank)}등`;
        });
    }
};