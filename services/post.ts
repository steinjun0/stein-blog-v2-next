import EtcAPI from "apis/etc";
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
    },
    updateProgrammers() {
        EtcAPI.getProgrammersData().then((res) => {
            if (document.getElementById('solved-num'))
                document.getElementById('solved-num')!.innerHTML = `${numberWithCommas(res.data.solvedChallengesCount)}문제`;
            if (document.getElementById('programmers-score'))
                document.getElementById('programmers-score')!.innerHTML = `점수 ${numberWithCommas(res.data.score)}점`;
            if (document.getElementById('programmers-rating'))
                document.getElementById('programmers-rating')!.innerHTML = `순위 ${numberWithCommas(res.data.rank)}등`;
        });
    }
};