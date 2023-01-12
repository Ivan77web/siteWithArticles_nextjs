import React, { useEffect, useState } from "react";
import { IOneBlock } from "../Create_article";
import cl from "./EditBlock.module.css"
import Select from "react-select";

interface IEditBlockProps {
    article: IOneBlock[],
    setArticle: (value: IOneBlock[]) => void,
    id: number,
    setIsOpenEditor: (value: boolean) => void,
}

interface IOneOption {
    value: any,
    label: any
}

const EditBlock: React.FC<IEditBlockProps> = ({ article, setArticle, id, setIsOpenEditor }) => {
    const block = article[id];

    // Новые значения блока
    const [inputValue, setInputValue] = useState(block.value);
    const [thickness, setThickness] = useState(block.thickness);
    const [location, setLocation] = useState(block.location);
    const [indent, setIndent] = useState(block.indent);
    const [italics, setItalics] = useState(block.italics);
    const [fontSize, setFontSize] = useState(block.fontSize);

    // Для react select
    const [thicknessValue, setThicknessValue] = useState(null);
    const [locationValue, setLocationValue] = useState(null);
    const [indentValue, setIndentValue] = useState(null);
    const [fontSizeValue, setFontSizeValue] = useState(null);

    // Варианты для select
    const optionsThickness: IOneOption[] = [
        { value: "regular", label: "Обычный" },
        { value: "bold", label: "Жирный" },
    ]

    const optionsLocation: IOneOption[] = [
        { value: "left", label: "Слева" },
        { value: "center", label: "Центр" },
    ]

    const optionsIndent: IOneOption[] = [
        { value: "small", label: "Без" },
        { value: "normal", label: "Средний" },
        { value: "big", label: "Большой" },
    ]

    const optionsFontSize: IOneOption[] = [
        { value: 12, label: "12" },
        { value: 14, label: "14" },
        { value: 16, label: "16" },
        { value: 18, label: "18" },
        { value: 20, label: "20" },
        { value: 22, label: "22" },
        { value: 26, label: "26" },
        { value: 30, label: "30" },
        { value: 40, label: "40" },
    ]

    // Функция для определение дефолтных значений select
    const getDefaultData = (value: number | string | boolean, options: IOneOption[]) => {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                return i;
            }
        }
    }

    // Переменные дефолтных значений select
    const thicknessNumber = getDefaultData(thickness, optionsThickness);
    const locationNumber = getDefaultData(location, optionsLocation);
    const indentNumber = getDefaultData(indent, optionsIndent);
    const fontSizeNumber = getDefaultData(fontSize, optionsFontSize);

    // Обновление блока
    const updateArticle = (id: number) => {
        let newArticle = article;

        newArticle[id].value = inputValue;
        newArticle[id].thickness = thickness;
        newArticle[id].location = location;
        newArticle[id].indent = indent;
        newArticle[id].italics = italics;
        newArticle[id].fontSize = fontSize;

        console.log(newArticle);
        

        setArticle([...newArticle]);
    }

    useEffect(() => {
        if (thicknessValue) {
            setThickness(thicknessValue.value)
        }

        if (locationValue) {
            setLocation(locationValue.value)
        }

        if (indentValue) {
            setIndent(indentValue.value)
        }

        if (fontSizeValue) {
            setFontSize(fontSizeValue.value)
        }
    }, [thicknessValue, locationValue, indentValue, fontSizeValue])

    return (
        <div className={cl.window}>
            <p className={cl.text_setting}>Значение</p>

            <input className={cl.input} value={inputValue} onChange={e => setInputValue(e.target.value)} />

            <p className={cl.text_setting}>Толщина</p>

            <div className={cl.select}>
                <Select
                    defaultValue={optionsThickness[thicknessNumber]}
                    onChange={setThicknessValue}
                    options={optionsThickness}
                />
            </div>

            <p className={cl.text_setting}>Расположение</p>

            <div className={cl.select}>
                <Select
                    defaultValue={optionsLocation[locationNumber]}
                    onChange={setLocationValue}
                    options={optionsLocation}
                />
            </div>

            <p className={cl.text_setting}>Отступ</p>

            <div className={cl.select}>
                <Select
                    defaultValue={optionsIndent[indentNumber]}
                    onChange={setIndentValue}
                    options={optionsIndent}
                />
            </div>

            <div className={italics ? cl.button_italics_active : cl.italics} onClick={() => setItalics(!italics)}>
                Курсив
            </div>

            <p className={cl.fontsizeText}>Размер шрифта</p>

            <div className={cl.select}>
                <Select
                    defaultValue={optionsFontSize[fontSizeNumber]}
                    onChange={setFontSizeValue}
                    options={optionsFontSize}
                />
            </div>

            <div className={cl.buttons}>
                <div className={cl.btn_cancel} onClick={() => setIsOpenEditor(false)}>Отменить</div>

                <div className={cl.btn_save} onClick={() => updateArticle(block.id)}>Сохранить</div>
            </div>
        </div>
    )
}

export default EditBlock