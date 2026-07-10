import { classNames } from "@/shared/lib/classNames/classNames";
import { ReactNode } from "react";
import { Flex, FlexProps } from "../Flex/Flex";

type HStackProps = Omit<FlexProps, 'direction'>

/**
 * Устарел, используются новые компоненты из папки redesigned
 * @deprecated
 */
export const HStack = (props: HStackProps) => {
    return (
        <Flex {...props} direction={'row'} />
    )
}
