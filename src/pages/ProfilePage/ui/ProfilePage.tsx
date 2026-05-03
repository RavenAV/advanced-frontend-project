import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import { Page } from "@/widgets/Page"
import { VStack } from "@/shared/ui/Stack"
import { EditableProfileCard } from "@/features/EditableProfileCard"
import { useParams } from "react-router-dom"

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()

    return (
        <Page className={classNames('', {}, [className])} data-testid="ProfilePage">
            <VStack gap={'16'} max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    )
}

export default ProfilePage