import { useTranslation } from 'react-i18next'
import { memo, useEffect, useState } from 'react'
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { isMobile } from 'react-device-detect';

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const { isArticlePageWasOpened } = useJsonSettings()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isArticlePageWasOpened) {
            setIsOpen(true)
            dispatch(saveJsonSettings({ isArticlePageWasOpened: true }))
        }
    }, [isArticlePageWasOpened, dispatch])

    const text = (
        <Text
            title={'Добро пожаловать на страницу статей'} 
            text={'Здесь вы можете искать и просматривать статьи на разные темы'}
        />
    )

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {text}
            </Drawer>
        )
    }
    
    return (
        <Modal lazy isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {text}
        </Modal>
    )
})