import {useTranslation} from "react-i18next";

const AboutPage = () => {
    const {t} = useTranslation('about')

    return(
        <div className="app">
            {t('about-page')}
        </div>
    )
}
export default AboutPage;