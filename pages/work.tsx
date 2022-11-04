import { Divider } from "@mui/material";
import { useState } from "react";

export default function Work() {
    const [category, setCategory] = useState<String>('All')

    return (
        <div className="flex-col  w-full mt-10 justify-start">
            <div className="flex items-end">
                <h1 className="text-7xl mr-3">Work</h1>
                <span >as an engineer.</span>
            </div>
            <Divider style={{ marginLeft: '186px' }} color={'black'} />

            <div className="flex w-52 mt-10 justify-between [&>span]:cursor-pointer">
                {['All', 'Product', 'Project'].map(
                    (e) =>
                        <span className={category === e ? 'underline decoration-solid' : 'text-gray-300'}
                            onClick={() => setCategory(e)}>{e}</span>)}
            </div>
        </div >
    );
}