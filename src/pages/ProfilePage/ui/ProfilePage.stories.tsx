import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { RouteDecorator } from 'shared/config/storybook/RouteDecorator/RouteDecorator';

const meta = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            profile: {
                form: {
                    username: 'username',
                    age: 25,
                    country: Country.Russia,
                    lastName: 'lastName',
                    firstName: 'firstName',
                    city: 'city',
                    currency: Currency.RUB
                }
            }
        })
    ]
}

export const Dark: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            profile: {
                form: {
                    username: 'username',
                    age: 25,
                    country: Country.Russia,
                    lastName: 'lastName',
                    firstName: 'firstName',
                    city: 'city',
                    currency: Currency.RUB
                }
            }
        })
    ]
}