let profileId = ''

describe('Работа со страницей профиля', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      profileId = data.id
      cy.visit(`profile/${data.id}`)
    })
  })
  afterEach(() => {
    cy.resetProfile(profileId)
  })
  it('Успешная загрузка профиля', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'test')
  })
  it('Редактирование профиля', () => {
    const newName = 'newFN'
    const newLastName = 'newLN'
    cy.updateProfile(newName, newLastName)
    cy.getByTestId('ProfileCard.firstName').should('have.value', newName)
    cy.getByTestId('ProfileCard.lastName').should('have.value', newLastName)
  })
})