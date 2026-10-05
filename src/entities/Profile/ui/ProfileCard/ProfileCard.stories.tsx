import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/stitch.jpg'
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
    }
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const normalArgs = {
    data: {
        username: 'username',
        age: 25,
        country: Country.Russia,
        lastName: 'lastName',
        firstName: 'firstName',
        city: 'city',
        currency: Currency.RUB,
        avatar: avatar
    }
}

export const ProfileCardPrimary: Story = {
    args: normalArgs
}

export const ProfileCardPrimaryRedesigned: Story = {
    args: normalArgs,
    decorators: [
        NewDesignDecorator
    ]
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
