import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { RatingCard } from "@/entities/Rating";
import { Counter } from "@/entities/Counter";

const MainPage = () => {
    const { t } = useTranslation('')

    return (
        <Page className="app" data-testid="MainPage">
            {t('main-page')}
            <Counter />
            <RatingCard
                title={t('your-feedback')}
                feedbackTitle={t('your-feedback-article')}
                hasFeedback
            />
        </Page>
    )
}
export default MainPage;