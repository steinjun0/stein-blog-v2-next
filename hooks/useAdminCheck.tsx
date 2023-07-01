import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import EtcAPI from "apis/etc";
import { useSession } from "next-auth/react";

export default function useAdminCheck() {
  // const router = useRouter();
  // const { data: session } = useSession();

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

  // useEffect(() => {
  //   if (router.isReady) {
  //     // const accessToken = localStorage.getItem('access_token');
  //     const adminUrlList = ['/posts/edit/[id]'];
  //     if (adminUrlList.includes(router.pathname)) {
  //       checkAdmin('accessToken');
  //     }
  //   }
  // }, [router.asPath, router.isReady]);
}