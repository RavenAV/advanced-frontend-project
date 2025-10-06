import { Counter } from "entities/Counter";
import { useState } from "react";
import {useTranslation} from "react-i18next";
import { Input } from "shared/ui/Input/Input";

const MainPage = () => {
    const {t} = useTranslation('main')
    const [value, setValue] = useState('')

    const onChange = (value: string) => {
        setValue(value)
    }

    return(
        <div className="app">
            {t('main-page')}
            <Counter />
            <Input 
                onChange={onChange} 
                value={value}
                placeholder="Enter text..."
            />
        </div>
    )
}
export default MainPage;