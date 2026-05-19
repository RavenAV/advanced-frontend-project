import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { selectByTestId } from "cypress/helpers/selectByTestId"

export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click()
    cy.getByTestId('ProfileCard.firstName').clear().type(firstname)
    cy.getByTestId('ProfileCard.lastName').clear().type(lastname)
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: {
            Authorization: 'asdasd',
        },
        body: {
            "id": "4",
            "firstName": "test",
            "lastName": "user",
            "age": 24,
            "currency": "EUR",
            "country": "USA",
            "city": "New York",
            "avatar": "https://i.pinimg.com/originals/b3/fb/b3/b3fbb35513f83899650b018905fec02a.jpg",
            "username": "testuser"
        },
    })
}

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            resetProfile(profileId: string): Chainable<void>
        }
    }
}