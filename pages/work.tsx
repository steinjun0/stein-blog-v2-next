import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Work() {
    const [category, setCategory] = useState<String>('All')

    return (
        <div className="flex-col  w-full mt-10 justify-start">
            <div className="flex items-end">
                <h1 className="text-7xl mr-3 font-medium">Work</h1>
                <span >as an Engineer.</span>
            </div>
            <Divider style={{ marginLeft: '186px' }} color={'black'} />

            <div className="flex w-52 mt-10 justify-between [&>span]:cursor-pointer">
                {['All', 'Product', 'Project'].map(
                    (e) =>
                        <span className={category === e ? 'underline decoration-solid' : 'text-gray-300'}
                            onClick={() => setCategory(e)}>{e}</span>)}
            </div>

            <div className="grid grid-cols-2 gap-0 mt-4">
                {['/images/DapadaSquare.png', '/images/CareerDiveSquare.png', '/images/DapadaEduSquare.png', '/images/DaconSquare.png'].map(
                    (e) => <Link href={'/work/1'}>
                        <div className="relative w-full h-0 cursor-pointer"
                            style={{ paddingBottom: '100%' }}>
                            <Image
                                src={e}
                                alt='work'
                                fill
                            />
                        </div>
                    </Link>

                )}

            </div>

        </div >
    );
}