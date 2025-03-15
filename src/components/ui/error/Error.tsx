interface ErrorProps {
    message: string;
    description?: string;
}

export const Error = (props: ErrorProps) => {

    const { message, description } = props;

    return (
        <div className="flex justify-center items-center gap-1">
            <img src="/icons/error.svg" className="h-16 w-16" />
            <div>
                <h1 className="font-bold text-principal-700">{message.toUpperCase()}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}