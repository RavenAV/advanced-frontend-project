import { ArticleDetails } from "@/entities/Article"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './ArticleDetailsPage.module.scss'
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { Page } from "@/widgets/Page"
import { articleDetailsPageReducer } from "../../model/slices"
import ArticleDetailsPageHeader from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader"
import { VStack } from "@/shared/ui/Stack"
import { ArticleRecommendationsList } from "@/features/ArticleRecommendationsList"
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments"
import { ArticleRating } from "@/features/ArticleRating"
import { getFeatureFlags } from "@/shared/lib/features"
import { Counter } from "@/entities/Counter"

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article-details')
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const isArticleRatingEnabled = getFeatureFlags('isArticleRatingEnabled')
    const isCounterEnabled = getFeatureFlags('isCounterEnabled')

    if (!id) {
        return (
            <Page className={classNames('', {}, [className])}>
                {t('article-not-found')}
            </Page>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    {isArticleRatingEnabled && <ArticleRating articleId={id} />}
                    {isCounterEnabled && <Counter />}
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)