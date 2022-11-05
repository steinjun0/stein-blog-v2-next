import { Icon, iconClasses, Slide } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from "next/router";

export default function HomeTitle({ selectIndex, setSelectIndex }: { selectIndex: number, setSelectIndex: Dispatch<SetStateAction<number>> }) {

  const [hoverIndex, setHoverIndex] = useState<number>(-1)
  const router = useRouter();

  return (
    <div className='flex-col overflow-y-clip' >
      <div
        onClick={() => selectIndex == 0 ? router.push('post') : setSelectIndex(0)}
        onMouseEnter={() => setHoverIndex(0)}
        onMouseLeave={() => setHoverIndex(-1)}
        className="flex-col justify-start items-end"
        style={{ cursor: 'pointer', overflowY: 'clip' }}
      >
        <div className="flex items-end">
          {selectIndex === 0 ?
            <p className="font-bold transition-all" style={{ fontSize: '13.5vw', lineHeight: '100%' }}>Post</p>
            :
            <p
              onClick={() => setSelectIndex(0)}
              className="font-bold transition-all"
              style={{ lineHeight: '100%', WebkitTextStroke: 'calc(0.005em + 1px) #000', color: 'transparent', fontSize: '15.5vw' }}>
              Post
            </p>
          }
          <div style={{ overflow: 'hidden' }}>
            <Slide direction="right" in={selectIndex === 0}>
              <ChevronRightIcon style={{ fontSize: '11.5vw' }} />
            </Slide>
          </div>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }} >
          <Slide direction="right" in={selectIndex === 0 && hoverIndex == 0} >
            <hr className="bg-black h-1" style={{ width: '39vw' }} />
          </Slide>
        </div>
      </div>

      <div
        onClick={() => selectIndex == 1 ? router.push('work') : setSelectIndex(1)}
        onMouseEnter={() => setHoverIndex(1)}
        onMouseLeave={() => setHoverIndex(-1)}
        className="flex-col justify-start items-end"
        style={{ cursor: 'pointer', overflowY: 'clip' }}
      >
        <div className="flex items-end">
          {selectIndex === 1 ?
            <p className="font-bold transition-all " style={{ fontSize: '13.5vw', lineHeight: '100%' }}>Work</p>
            :
            <p
              onClick={() => setSelectIndex(1)}
              className="font-bold transition-all"
              style={{ lineHeight: '100%', WebkitTextStroke: 'calc(0.005em + 1px) #000', color: 'transparent', fontSize: '15.5vw' }}>
              Work
            </p>
          }
          <div style={{ overflow: 'hidden' }}>
            <Slide direction="right" in={selectIndex === 1}>
              <ChevronRightIcon style={{ fontSize: '11.5vw' }} />
            </Slide>
          </div>
        </div>


        <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }} >
          <Slide direction="right" in={selectIndex === 1 && hoverIndex == 1} >
            <hr className="bg-black h-1" style={{ width: '45vw' }} />
          </Slide>
        </div>

      </div>

    </div>
  );
}
