## Entity Rating is for

### Назначение

Предоставляет UI-компонент карточки рейтинга пользователей (`RatingCard`).

### Public API (из `index.ts`)

- `RatingCard` — UI карточка/виджет для выставления/просмотра рейтинга
- `Rating` — тип рейтинга (re-export)

### Selectors

Нет. Entity Rating не содержит Redux selectors.

### Models / slices (и где лежит)

- `model/types/types.ts` — тип `Rating`

### UI

- `RatingCard` (из `ui/RatingCard/RatingCard.tsx`)
  - props:
    - `title?: string`, `feedbackTitle?: string`, `hasFeedback?: boolean`
    - `rate?: number`
    - `onCancel?(starsCount: number)`
    - `onAccept?(starsCount: number, feedback?: string)`
  - использует `StarRating`, `Modal` (desktop) и `Drawer` (mobile)
