import { screen } from "@testing-library/react";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import { EditableProfileCard } from "./EditableProfileCard";
import { Profile } from "@/entities/Profile";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";
import { profileReducer } from "../../model/slice/profileSlice";
import userEvent from "@testing-library/user-event";
import { $api } from "@/shared/api/api";

const profile: Profile = {
    id: '1',
    firstName: 'Ivan',
    lastName: 'Petrov',
    age: 22,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Moscow',
    username: 'admin',
    avatar: ''
}

const options = {
    initialState: {
        profile: {
            data: profile,
            form: profile,
            readonly: true
        },
        user: {
            authData: {
                id: '1',
                username: 'Ivan'
            }
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
}

describe('features/EditableProfileCard', () => {
    test('Режим readonly должен переключиться - появляется кнопка отмены', async () => {
        componentRender(<EditableProfileCard id="1" />, options)
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
    })

    test('При отменене данные профиля должны вернуться к первоначальным', async () => {
        componentRender(<EditableProfileCard id="1" />, options)

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
        // clear fields
        await userEvent.clear(screen.getByTestId('ProfileCard.firstName'))
        await userEvent.clear(screen.getByTestId('ProfileCard.lastName'))
        // enter smth in input
        await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'test')
        await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'test')
        // check data in input
        expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('test')
        expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('test')
        // click cancel button
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))
        // check data in input
        expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('Ivan')
        expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('Petrov')
    })

    test('Проверка валидации - должна появиться ошибка', async () => {
        componentRender(<EditableProfileCard id="1" />, options)

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
        // clear fields
        await userEvent.clear(screen.getByTestId('ProfileCard.firstName'))
        // save
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()

    })

    test('Все верно, на сервер должен уйти PUT-запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put')
        componentRender(<EditableProfileCard id="1" />, options)

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
        // clear fields
        await userEvent.clear(screen.getByTestId('ProfileCard.firstName'))
        await userEvent.clear(screen.getByTestId('ProfileCard.lastName'))
        // enter smth in input
        await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'Sergey')
        await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'Volkov')
        // check data in input
        expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('Sergey')
        expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('Volkov')
        // click cancel button
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))
        // check call of method
        expect(mockPutReq).toHaveBeenCalled()
    })
});