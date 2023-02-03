import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Work() {
    const [category, setCategory] = useState<String>('All')
    const imagesAndLink: { image: string, link: string }[] = [
        { image: '/images/DapadaSquare.png', link: 'https://dapada.co.kr/app/' },
        { image: '/images/CareerDiveSquare.png', link: 'https://careerdive.co.kr/' },
        { image: '/images/DapadaEduSquare.png', link: 'https://dapada.co.kr/edu/' },
        { image: '/images/DaconSquare.png', link: 'https://dacon.io/' }
    ]

    return (
        <div className="flex-col  w-full mt-10 justify-start">
            <div className="flex items-end">
                <h1 className="text-7xl mr-3 font-medium">Work</h1>
                <span >as an Engineer.</span>
            </div>
            <Divider style={{ marginLeft: '186px' }} color={'black'} />

            {/* <div className="flex w-52 mt-10 justify-between [&>span]:cursor-pointer">
                {['All', 'Product', 'Project'].map(
                    (e, i) =>
                        <span key={i} className={category === e ? 'underline decoration-solid' : 'text-gray-300'}
                            onClick={() => setCategory(e)}>{e}</span>)}
            </div> */}

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-0 mt-8">
                {imagesAndLink.map(
                    (e, i) =>
                        <div key={i} className="relative w-full h-0"
                            style={{ paddingBottom: '100%' }}>
                            <a href={e.link} target="_blank">
                                <Image
                                    src={e.image}
                                    alt='work'
                                    fill
                                />
                            </a>

                        </div>
                )}

            </div>

        </div >
    );
}