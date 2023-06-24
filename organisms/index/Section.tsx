import Link from "next/link";
import { PropsWithChildren } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Section(props: { title: string, subtitle: string, link?: string; } & PropsWithChildren) {
    return <div className="flex flex-col justify-start">
        <div>
            {
                props.link ?
                    <Link className='flex items-end w-fit' href={props.link}>
                        <h1
                            className='no-underline hover:underline'
                            style={{ fontSize: '36px', fontWeight: '600', marginTop: '24px' }}>
                            {props.title}
                        </h1>
                        <ChevronRightIcon className='my-2' style={{ fontSize: '36px' }} />
                    </Link> :
                    <h1
                        className='no-underline hover:underline'
                        style={{ fontSize: '36px', fontWeight: '600', marginTop: '24px' }}>
                        {props.title}
                    </h1>
            }
        </div>
        <h6 style={{ fontSize: '16px', fontWeight: '400', marginTop: '4px' }}>{props.subtitle}</h6>
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 justify-center' style={{ minHeight: '574px' }}>
            {props.children}
        </div>
    </div>;
}