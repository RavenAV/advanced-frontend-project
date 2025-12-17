import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProfileCard } from './ProfileCard';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/stitch.jpg'

const meta = {
    title: 'entity/ProfileCard',
    component: ProfileCard,
    argTypes: {
    }
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileCardPrimary: Story = {
    args: {
        data: {
            username: 'username',
            age: 25,
            country: Country.Russia,
            lastName: 'lastName',
            firstName: 'firstName',
            city: 'city',
            currency: Currency.RUB,
            avatar: avatar
        },
    }
}

export const LoginFormWithError: Story = {
    args: {
        error: 'error'
    }
}

export const ProfileCardLoading: Story = {
    args: {
        isLoading: true
    }
}
