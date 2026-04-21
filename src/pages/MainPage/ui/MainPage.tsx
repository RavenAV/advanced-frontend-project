import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { RatingCard } from "@/entities/Rating";

const MainPage = () => {
    const { t } = useTranslation('')

    return (
        <Page className="app">
            {t('main-page')}
            <RatingCard
                title={t('your-feedback')}
                feedbackTitle={t('your-feedback-article')}
                hasFeedback
            />
        </Page>
    )
}
export default MainPage;