import { Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const engineerData: { image: string, link: string }[] = [
    { image: '/images/DapadaSquare.png', link: 'https://dapada.co.kr/app/' },
    { image: '/images/CareerDiveSquare.png', link: 'https://careerdive.co.kr/' },
    { image: '/images/DapadaEduSquare.png', link: 'https://dapada.co.kr/edu/' },
    { image: '/images/DaconSquare.png', link: 'https://dacon.io/' }
]
const funData: { image: string, link: string }[] = [
    { image: '/images/DapadaSquare.png', link: 'https://dapada.co.kr/app/' },
]

export default function Work() {
    const [category, setCategory] = useState<string>('as an Engineer')
    const [categories, setCategories] = useState<string[]>(['as an Engineer', 'for Fun'])


    const [imagesAndLink, setImagesAndLink] = useState<{ image: string, link: string }[]>(engineerData)

    useEffect(() => {
        if (category === 'as an Engineer') {
            setImagesAndLink(engineerData)
        } else if (category === 'for Fun') {
            setImagesAndLink(funData)

        }

    }, [category])


    return (
        <div className="flex-col  w-full mt-10 justify-start">
            <div className="flex items-end">
                <h1 className="text-7xl mr-3 font-medium">Work</h1>
                <div className="w-40" style={{ marginBottom: '-2px' }}>
                    <FormControl variant="standard" className="w-full" >
                        <InputLabel id="select-label"></InputLabel>
                        <Select
                            onChange={(e) => { setCategory(e.target.value as string) }}
                            value={category}
                            label={'Tag'}
                            sx={{ boxShadow: 'none', '::before': { border: '0 !important' }, '::after': { border: 0 } }}
                        >
                            {categories.map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                {/* <span >as an Engineer.</span> */}
            </div>
            <Divider style={{ marginLeft: '186px' }} color={'black'} />

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-0 mt-8">
                {imagesAndLink.map(
                    (e, i) =>
                        <div key={i} className="relative w-full h-0"
                            style={{ paddingBottom: '100%' }}>
                            <a href={e.link} target="_blank" rel="noreferrer">
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