import './Loader.scss'
import {classNames} from "@/shared/lib/classNames/classNames";

interface LoaderProps {
    className?: string
}

/**
 * Устарел, используются новые компоненты из папки redesigned
 * @deprecated
 */
export const Loader = ({className}: LoaderProps) => {
    return (
        <div
            className={classNames('lds-ellipsis', {}, [className])}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}