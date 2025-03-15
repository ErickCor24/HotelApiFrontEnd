import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface OptionsProps {
    value: string;
    link: string;
}

interface PropsDrop {
    label: string;
    options: OptionsProps[];
}

export const AsideDropDown = (props: PropsDrop) => {

    const [active, setActive] = useState<boolean>(true);
    const option = useRef<HTMLDivElement>(null);
    const heroe = useRef<HTMLDivElement>(null);
    const arrow = useRef<SVGSVGElement>(null);

    useEffect(() => {
        heroe.current?.addEventListener('click', () => {
            if (active) {
                arrow.current?.classList.remove('rotate-90');
                option.current?.classList.remove('h-0');
                setActive(false);
            } else {
                arrow.current?.classList.add('rotate-90');
                option.current?.classList.add('h-0');
                setActive(true);
            }
        });
    }, [active]);

    return (
        <div className="ml-5">
            <div ref={heroe} className="box-border flex hover:scale-105 py-2 rounded justify-between items-center transition w-5/6 font-semibold text-secondary-100">
                <p  className="text-xl">{props.label}</p>
                <svg ref={arrow} className="w-4 text-secondary-20 rotate-90 transition-all duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                </svg>
            </div>
            <div ref={option} id={props.label.toLowerCase() + "_id"} className="flex gap-1 flex-col h-0 overflow-hidden ml-2 text-lg text-secondary-50">
                {props.options.map((option) =>
                    (<Link to={option.link}>{option.value}</Link>)
                )}
            </div>
        </div>
    )
}