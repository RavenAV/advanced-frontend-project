import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Page } from '../../Page';
import { Text } from '../../shared/ui/Text/Text';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';

const meta = {
    title: 'shared/Page',
    component: Page,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLight: Story = {
    args: {
        children: <Text title={'title'} text={'text text'} />
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({})
    ]
}
