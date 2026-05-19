let currentArticleId = ''
describe('Страница деталей статьи', () => {
  // создали статью, потестировали, удалили
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((article) => {
      currentArticleId = article.id
      cy.visit(`articles/${article.id}`)
    })
  })
  afterEach(() => {
    cy.removeArticle(currentArticleId)
  })

  it('Статья загрузилась и отобразилась', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')
  })
  it('Подгружается список рекомендаций', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist')
  })
  it('Отправка комментария', () => {
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('AddCommentForm').scrollIntoView()
    cy.addComment('test comment')
    cy.getByTestId('CommentCard.Content').should('have.length', 1)
  })
  it('Отправка рейтинга', () => {
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.setRating(4, 'feedback')
    cy.get('[data-selected=true]').should('have.length', 4)
  })
  it('Отправка рейтинга - пример со стабом на фикстурах', () => {
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' })
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.setRating(4, 'feedback')
    cy.get('[data-selected=true]').should('have.length', 4)
  })
})