import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EtcAPI from "apis/etc";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function useAdminCheck(session: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated') {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // function checkAdmin(accessToken: string | null) {
  //   // if (session) {
  //   //   router.push('/');
  //   //   Swal.fire({
  //   //     title: '허가되지 않은 사용자',
  //   //     text: '여긴 허가된 사용자만 접속할 수 있는 URL입니다',
  //   //     icon: 'warning',
  //   //     color: 'black',
  //   //     confirmButtonColor: 'black',
  //   //     iconColor: 'black'
  //   //   });
  //   // } else if (session) {
  //   //   EtcAPI.getIsAdmin({ accessToken: accessToken! }).then((res) => {
  //   //     if (res.data !== true) {
  //   //       router.push('/');
  //   //       Swal.fire({
  //   //         title: '허가되지 않은 사용자',
  //   //         text: '여긴 허가된 사용자만 접속할 수 있는 URL입니다',
  //   //         icon: 'warning',
  //   //         color: 'black',
  //   //         confirmButtonColor: 'black',
  //   //         iconColor: 'black'
  //   //       }).catch(() => {
  //   //         router.push('/');
  //   //         Swal.fire({
  //   //           title: '허가되지 않은 사용자',
  //   //           text: '네트워크 오류로 인증에 실패했습니다.',
  //   //           icon: 'warning',
  //   //           color: 'black',
  //   //           confirmButtonColor: 'black',
  //   //           iconColor: 'black'
  //   //         });
  //   //       });
  //   //     }
  //   //   });
  //   // } else {
  //   //   // isValid === null -> 아직 체크중
  //   // }
  //   if (!session || (session && session.user!.id === '2651014525')) {
  //     router.push('/');
  //     Swal.fire({
  //       title: '허가되지 않은 사용자',
  //       text: '여긴 허가된 사용자만 접속할 수 있는 URL입니다',
  //       icon: 'warning',
  //       color: 'black',
  //       confirmButtonColor: 'black',
  //       iconColor: 'black'
  //     });
  //   }
  // }

  useEffect(() => {
    if (status === 'loading') { }
    else if (status === 'authenticated') {
      if (session && session.user!.id === '2651014525') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        Swal.fire({
          title: '허가되지 않은 사용자',
          text: '여긴 허가된 사용자만 접속할 수 있는 URL입니다',
          icon: 'warning',
          color: 'black',
          confirmButtonColor: 'black',
          iconColor: 'black'
        });
      }
    }
    else if (status === 'unauthenticated') {
      router.push('/');
      Swal.fire({
        title: '허가되지 않은 사용자',
        text: '여긴 허가된 사용자만 접속할 수 있는 URL입니다',
        icon: 'warning',
        color: 'black',
        confirmButtonColor: 'black',
        iconColor: 'black'
      });
    }
  }, [status]);

  return isAdmin;
}