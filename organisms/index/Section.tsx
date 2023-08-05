import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Section(props: { title: string, subtitle: string, link?: string; } & PropsWithChildren) {
    return <div className="flex flex-col justify-start">
        <div className=" font-semibold">
            {
                props.link ?
                    <Link className='flex items-center w-fit no-underline hover:underline' href={props.link}>
                        <h1
                            className='text-3xl sm:text-4xl'>
                            {props.title} →
                        </h1>
                    </Link> :
                    <h1
                        className='text-3xl sm:text-4xl'>
                        {props.title}
                    </h1>
            }
        </div>
        <h6 className="hidden sm:block" style={{ fontSize: '16px', fontWeight: '400', marginTop: '4px' }}>{props.subtitle}</h6>
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 justify-center' >
            {props.children}
        </div>
    </div>;
}