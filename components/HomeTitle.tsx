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
            <p className="transition-all" style={{ fontSize: 'min(13.5vw, 190px)', fontWeight: 700, lineHeight: '100%' }}>Post</p>
            :
            <p
              onClick={() => setSelectIndex(0)}
              className="transition-all"
              style={{ lineHeight: '100%', fontWeight: 700, WebkitTextStroke: 'calc(0.005em + 1px) #000', color: 'transparent', fontSize: 'min(15.5vw, 220px)' }}>
              Post
            </p>
          }
          <div style={{ overflow: 'hidden' }}>
            <Slide direction="right" in={selectIndex === 0 && hoverIndex == 0}>
              <ChevronRightIcon style={{ fontSize: 'min(11.5vw, 170px)' }} />
            </Slide>
          </div>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }} >
          <Slide direction="right" in={selectIndex === 0 && hoverIndex == 0} >
            <hr className="border-black" style={{ width: '70%', borderWidth: '1px' }} />
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
            <p className="transition-all " style={{ fontSize: 'min(13.5vw, 190px)', fontWeight: 700, lineHeight: '100%' }}>Work</p>
            :
            <p
              onClick={() => setSelectIndex(1)}
              className="transition-all"
              style={{ fontWeight: 700, lineHeight: '100%', WebkitTextStroke: 'calc(0.005em + 1px) #000', color: 'transparent', fontSize: 'min(15.5vw, 220px)' }}>
              Work
            </p>
          }
          <div style={{ overflow: 'hidden' }}>
            <Slide direction="right" in={selectIndex === 1 && hoverIndex == 1}>
              <ChevronRightIcon style={{ fontSize: 'min(11.5vw, 170px)' }} />
            </Slide>
          </div>
        </div>


        <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }} >
          <Slide direction="right" in={selectIndex === 1 && hoverIndex == 1} >
            <hr className="border-black" style={{ width: '80%', borderWidth: '1px' }} />
          </Slide>
        </div>

      </div>

    </div>
  );
}
