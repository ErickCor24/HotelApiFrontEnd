interface ButtonProps {
    text: string;
    href?: string;
    style?: string;
}

const styleButton = "bg-principal-600 hover:bg-principal-700 text-white font-bold py-2 px-4 rounded transition";

export const Button = (props: ButtonProps) => {

    const { text, style = styleButton, href } = props;

    if (href) return <a className={style} href={href}>{text}</a>
    
    return <button type="submit" className={style} >{text}</button>
}