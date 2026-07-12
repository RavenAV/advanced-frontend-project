import { memo, useCallback } from "react"
import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './Code.module.scss'
import { Button, ButtonTheme } from "@/widgets/Button"
import CopyIcon from '@/shared/assets/icons/copy.svg'

interface CodeProps {
    className?: string
    text: string
}

export const Code = memo((props: CodeProps) => {
    const {
        className,
        text
    } = props

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={cls.Code}>
            <Button onClick={onCopy} className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code className={classNames('', {}, [className])} >
                {text}
            </code>
        </pre>
    )
})