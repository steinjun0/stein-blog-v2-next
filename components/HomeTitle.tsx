import { useState } from "react";

export default function HomeTitle() {

  const [selectIndex, setSelectIndex] = useState<number>(0)
  const [hoverIndex, setHoverIndex] = useState<number>(-1)

  return (
    <div className='flex-col' >
      <div
        onClick={() => setSelectIndex(0)}
        onMouseEnter={() => setHoverIndex(0)}
        onMouseLeave={() => setHoverIndex(-1)}
        className="flex-col justify-end"
        style={{ cursor: 'pointer' }}
      >

        {selectIndex === 0 ?
          <p className="font-bold" style={{ fontSize: `${selectIndex === 0 ? '220px' : '200px'}`, lineHeight: '200px' }}>Post</p>
          :
          <p
            onClick={() => setSelectIndex(0)}
            className="font-bold transition-all"
            style={{ lineHeight: '180px', WebkitTextStroke: 'calc(0.005em + 1px) #000', color: 'transparent', fontSize: `${hoverIndex === 0 ? '220px' : '200px'}` }}>
            Post
          </p>
        }
      </div>

      <div
        onClick={() => setSelectIndex(1)}
        onMouseEnter={() => setHoverIndex(1)}
        onMouseLeave={() => setHoverIndex(-1)}
        className="flex-col justify-end"
        style={{ cursor: 'pointer', overflowY: 'clip' }}
      >
        {selectIndex === 1 ?
          <p className="font-bold" style={{ fontSize: `${selectIndex === 1 ? '220px' : '200px'}`, lineHeight: '200px' }}>Work</p>
          :
          <p
            onClick={() => setSelectIndex(1)}
            className="font-bold transition-all"
            style={{ lineHeight: '200px', WebkitTextStroke: 'calc(0.005em + 1px) #000', color: 'transparent', fontSize: `${hoverIndex === 1 ? '220px' : '200px'}` }}>
            Work
          </p>
        }
      </div>

    </div>
  );
}
