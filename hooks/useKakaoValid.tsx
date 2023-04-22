import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function useKakaoValid() {
  const [userData, setUserData] = useState<{ id: number; }>({ id: -1 });
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken === null) {
        setIsValid(false);
      }
      else {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init('1add2d01ae1a29668f10cd0d48ce63c5');
        }
        window.Kakao.Auth.setAccessToken(accessToken);
        axios.get('https://kapi.kakao.com/v1/user/access_token_info', { headers: { Authorization: `Bearer ${accessToken}` } })
          .then((res) => {
            setUserData({ 'id': localStorage.getItem('id') ? +localStorage.getItem('id')! : -1 });
            setIsValid(true);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              ['id', 'access_token', 'nickname', 'profile_image', 'thumbnail_image']
                .forEach((e) => { localStorage.removeItem(e); });
              Swal.fire({
                title: '로그인 안내',
                text: '카카오 로그인이 만료되었어요! 로그인이 필요한 서비스를 이용하시려면 다시 로그인 해주세요!',
                icon: 'info',
                color: 'black',
                confirmButtonColor: 'black',
                iconColor: 'black'
              });
            } else if (error.response.status === 400) {
              if (error.response.data.code === -1) {
                alert('카카오 플랫폼 서비스의 일시적 내부 장애 상태 입니다. 잠시 뒤에 다시 시도해주세요.');
              } else if (error.response.data.code === -2) {
                alert(`필수 인자가 포함되지 않은 경우나 호출 인자값의 데이터 타입이 적절하지 않거나 허용된 범위를 벗어난 경우
                      요청 시 주어진 액세스 토큰 정보가 잘못된 형식인 경우로 올바른 형식으로 요청했는지 확인. code: -2`);
              }
            } else {
              alert('unknown error');
            }
            setIsValid(false);
          });
      }
    }

  }, [router.asPath, router.isReady]);

  return { userData, isValid };
}