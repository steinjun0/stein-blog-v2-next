import { Icon, iconClasses, Slide } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function HomeTitle({ selectIndex, setSelectIndex }: { selectIndex: number, setSelectIndex: Dispatch<SetStateAction<number>> }) {

  const [hoverIndex, setHoverIndex] = useState<number>(-1)

  return (
    <div className='flex-col overflow-y-clip' >
      <div
        onClick={() => setSelectIndex(0)}
        onMouseEnter={() => setHoverIndex(0)}
        onMouseLeave={() => setHoverIndex(-1)}
        className="flex justify-start items-end"
        style={{ cursor: 'pointer', overflowY: 'clip' }}
      >

        {selectIndex === 0 ?
          <p className="font-bold transition-all" style={{ fontSize: '13.8vw', lineHeight: '13.8vw' }}>Post</p>
          :
          <p
            onClick={() => setSelectIndex(0)}
            className="font-bold transition-all"
            style={{ lineHeight: '13.8vw', WebkitTextStroke: 'calc(0.005em + 1px) #000', color: 'transparent', fontSize: '15.2vw' }}>
            Post
          </p>
        }
        <div style={{ overflow: 'hidden' }}>
          <Slide direction="right" in={selectIndex === 0}>
            <ChevronRightIcon style={{ fontSize: '15.2vw', height: '10.2vw' }} />
          </Slide>
        </div>
      </div>

      <div
        onClick={() => setSelectIndex(1)}
        onMouseEnter={() => setHoverIndex(1)}
        onMouseLeave={() => setHoverIndex(-1)}
        className="flex justify-start items-end"
        style={{ cursor: 'pointer', overflowY: 'clip' }}
      >
        {selectIndex === 1 ?
          <p className="font-bold transition-all" style={{ fontSize: `${selectIndex === 1 ? '13.8vw' : '15.2vw'}`, lineHeight: '13.8vw' }}>Work</p>

          :
          <p
            onClick={() => setSelectIndex(1)}
            className="font-bold transition-all"
            style={{ lineHeight: '13.8vw', WebkitTextStroke: 'calc(0.005em + 1px) #000', color: 'transparent', fontSize: `${hoverIndex === 1 ? '13.8vw' : '15.2vw'}` }}>
            Work
          </p>
        }
        <div style={{ overflow: 'hidden' }}>
          <Slide direction="right" in={selectIndex === 1}>
            <ChevronRightIcon style={{ fontSize: '15.2vw', height: '10.2vw' }} />
          </Slide>
        </div>
      </div>

    </div>
  );
}
