import { RatingCard } from "@/entities/Rating";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useGetProfileRating, useRateProfile } from "../../api/profileRatingApi";

export interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
    const { className, profileId: profileId } = props
    const { t } = useTranslation()
    const userData = useSelector(getUserAuthData)

    const { data, isLoading } = useGetProfileRating({
        userId: userData?.id ?? '',
        profileId
    })

    const [rateProfileMutation] = useRateProfile()

    const handleRateProfile = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateProfileMutation({
                userId: userData?.id ?? '',
                profileId: profileId,
                rate: starsCount,
                feedback,
            })
        } catch (e) {
            // handle error
            console.log(e)
        }
    }, [profileId, rateProfileMutation, userData?.id])

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateProfile(starsCount, feedback)
    }, [handleRateProfile])

    const onCancel = useCallback((starsCount: number) => {
        handleRateProfile(starsCount)
    }, [handleRateProfile])

    if (isLoading) {
        return <Skeleton width="100%" height={120} />
    }

    const rating = data?.[0]

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('rate-profile')}
            feedbackTitle={t('your-feedback-profile')}
            hasFeedback
        />
    );
});

export default ProfileRating;