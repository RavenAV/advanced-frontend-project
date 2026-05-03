import { componentRender } from "@/shared/lib/tests/componentRender/componentRender"
import AppRouter from "./AppRouter"
import { getRouteAbout, getRouteAdminPanel, getRouteProfile } from "@/shared/const/router"
import { screen } from "@testing-library/react"
import { UserRole } from "@/entities/User"

// ProfilePage  MainPage NotFoundPage ForbiddenPage AdminPanelPage

describe('AppRouter tests', () => {
    test('Страница должна отрендериться', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout()
        })

        const page = await screen.findByTestId('AboutPage')
        expect(page).toBeInTheDocument()
    })

    test('Страница не найдена', async () => {
        componentRender(<AppRouter />, {
            route: '/ahsbashbajhs'
        })

        const page = await screen.findByTestId('NotFoundPage')
        expect(page).toBeInTheDocument()
    })

    test('Пользователь не авторизован и пытается зайти на страницу профиля - перенаправляем на главную', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1')
        })

        const page = await screen.findByTestId('MainPage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ к закрытой странице для авторизованного пользователя - перенаправляем на страницу профиля', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: {
                    _inited: true,
                    authData: {}
                }
            }
        })

        const page = await screen.findByTestId('ProfilePage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ запрещен - отсутсвует роль - перенаправляем на страницу 403', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: {
                    _inited: true,
                    authData: {}
                }
            }
        })

        const page = await screen.findByTestId('ForbiddenPage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ разрешен - есть роль - отрендерить страницу админа', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: {
                    _inited: true,
                    authData: {
                        roles: [UserRole.ADMIN]
                    }
                }
            }
        })

        const page = await screen.findByTestId('AdminPanelPage')
        expect(page).toBeInTheDocument()
    })
})

