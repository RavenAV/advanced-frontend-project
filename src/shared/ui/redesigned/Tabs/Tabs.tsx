import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Tabs.module.scss'
import { memo, ReactNode, useCallback } from "react";
import { Card } from "../Card/ui/Card";
import { Flex, FlexDirection } from "../Stack/Flex/Flex";

export interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps {
    className?: string
    tabs: TabItem[]
    value: string
    direction?: FlexDirection
    onTabClick: (tab: TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        direction = 'row',
        onTabClick
    } = props

    // замыкание нужно, потому что inClick принимает ивент на блоке, а нам надо пробросить таб
    const clickHandle = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab)
        }
    }, [onTabClick])

    return (
        <Flex
            direction={direction}
            gap={'8'}
            className={classNames(cls.Tabs, {}, [className])}
            align={'start'}
        >
            {tabs.map(tab => {
                const isSelected = tab.value === value
                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        key={tab.value}
                        className={classNames(cls.tab, {[cls.selected]: isSelected })}
                        onClick={clickHandle(tab)}
                        border={'round'}
                    >
                        {tab.content}
                    </Card>
            )})}
        </Flex>
    )
})