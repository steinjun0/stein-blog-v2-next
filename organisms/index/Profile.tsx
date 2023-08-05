import { keyframes, styled } from "@mui/material";
import Image from 'next/image';
import Link from "next/link";


const MovingImageKeyframes = keyframes`
from {
  transform: rotate(0deg);
  left : 0%;
}

8% {
  transform-origin: 100% 100%;
  transform: rotate(0deg);
  left : 0%;
}

10% {
  transform: rotate(2deg);
  left : 2%;
}

12% {
  transform: rotate(0deg);
  left : 2%;
}

50% {
  transform-origin: 100% 100%;
  transform: rotate(0deg);
  left : 2%;
}

52% {
  transform: rotate(2deg);
  left : 4%;
}

54% {
  transform: rotate(0deg);
  left : 4%;
}

70% {
  transform-origin: 0% 100%;
  transform: rotate(0deg);
  left : 4%;
}

72% {
  transform: rotate(-2deg);
  left : 2%;
}

74% {
  transform: rotate(0deg);
  left : 2%;
}

80% {
  transform-origin: 0% 100%;
  transform: rotate(0deg);
  left : 2%;
}

82% {
  transform: rotate(-2deg);
  left : 0%;
}

84% {
  transform: rotate(0deg);
  left : 0%;
}

to {
  transform: rotate(0deg);
  left : 0%;
}
`;

const MovingContainer = styled('div')({
  animation: `${MovingImageKeyframes} 10s infinite ease`,
});

export default function Profile() {
  return <div className='hidden sm:flex flex-col gap-4 sm:flex-row'>
    <div className='flex p-4 sm:p-0 sm:w-1/2 min-[1023.9px]:w-1/3'>
      <Link href={'/profile'} className='relative w-full' style={{ paddingBottom: '100%' }} >
        <Image
          className="object-contain"
          src={'/images/profile.png'}
          alt='profile'
          fill
          sizes="100vw,
          (min-width: 768px) 50vw,
          (min-width: 768px) 33vw"
          priority
        />
      </Link>
    </div>
    <div className='flex flex-col justify-center items-start sm:w-1/2 min-[1023.9px]:w-2/3'>
      <div className='flex flex-col p-0 sm:p-4'>
        <MovingContainer>
          <Link href={'/profile'} className='relative w-full h-0' style={{ paddingBottom: '100%' }} >
            <h1 className='hover:underline cursor-pointer w-fit' style={{ fontSize: '48px', fontWeight: '700' }}>stein</h1>
          </Link>
        </MovingContainer>

        <pre style={{ fontSize: '24px', wordBreak: 'keep-all', whiteSpace: 'pre-wrap', lineHeight: '1.75rem' }}>
          Web Developer
          <br />
          <br />
          University of Seoul<br />
          <span>&#9;</span>Electrical and Computer Engineering
          <br />
          <br />
          Love with <br />
          <span>&#9;</span>Web, Music, Piano, Guitar, and Drawing
        </pre>
      </div>
    </div>
  </div>;
}