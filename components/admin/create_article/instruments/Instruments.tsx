import React from "react";
import Select from "react-select";
import cl from "./Instruments.module.css"

interface IInstrumentsProps{
    thickness: string, 
    setThickness: (value: string) => void,
    location: string,  
    setLocation: (value: string) => void,
    indent: string, 
    setIndent: (value: string) => void,
    italics: boolean,  
    setItalics: (value: boolean) => void,
    optionsFontSize: any, 
    setFontSizeValue: any,
}

const Instruments: React.FC<IInstrumentsProps> = ({
    thickness, setThickness,
    location, setLocation,
    indent, setIndent,
    italics, setItalics,
    optionsFontSize, setFontSizeValue,
}) => {

    return (
        <div className={cl.instruments}>
            <div className={cl.thickness}>
                <p className={cl.text_setting}>Толщина</p>

                <div className={cl.buttons_thickness}>
                    <div
                        className={
                            thickness === "regular"
                                ?
                                cl.button_setting + " " + cl.button_regular + " " + cl.button_setting_active
                                :
                                cl.button_setting + " " + cl.button_regular + " "
                        }
                        onClick={() => setThickness("regular")}
                    >
                        Обычный
                    </div>

                    <div
                        className={
                            thickness === "bold"
                                ?
                                cl.button_setting + " " + cl.button_bold + " " + cl.button_setting_active
                                :
                                cl.button_setting + " " + cl.button_bold
                        }
                        onClick={() => setThickness("bold")}
                    >
                        Жирный
                    </div>
                </div>
            </div>

            <div className={cl.location}>
                <p className={cl.text_setting}>Расположение</p>

                <div className={cl.buttons_location}>
                    <div
                        className={
                            location === "left"
                                ?
                                cl.button_setting + " " + cl.button_left + " " + cl.button_setting_active
                                :
                                cl.button_setting + " " + cl.button_left
                        }
                        onClick={() => setLocation("left")}
                    >
                        Слева
                    </div>

                    <div
                        className={
                            location === "center"
                                ?
                                cl.button_setting + " " + cl.button_center + " " + cl.button_setting_active
                                :
                                cl.button_setting + " " + cl.button_center
                        }
                        onClick={() => setLocation("center")}
                    >
                        Центр
                    </div>
                </div>
            </div>

            <div className={cl.indent}>
                <p className={cl.text_setting}>Отступ</p>

                <div className={cl.buttons_indent}>
                    <div
                        className={
                            indent === "small"
                                ?
                                cl.button_setting + " " + cl.button_small_indent + " " + cl.button_setting_active
                                :
                                cl.button_setting + " " + cl.button_small_indent
                        }
                        onClick={() => setIndent("small")}
                    >
                        Без
                    </div>

                    <div
                        className={
                            indent === "normal"
                                ?
                                cl.button_setting + " " + cl.button_normal_indent + " " + cl.button_setting_active
                                :
                                cl.button_setting + " " + cl.button_normal_indent
                        }
                        onClick={() => setIndent("normal")}
                    >
                        Средний
                    </div>

                    <div
                        className={
                            indent === "big"
                                ?
                                cl.button_setting + " " + cl.button_big_indent + " " + cl.button_setting_active
                                :
                                cl.button_setting + " " + cl.button_big_indent
                        }
                        onClick={() => setIndent("big")}
                    >
                        Большой
                    </div>
                </div>
            </div>

            <div className={cl.italics}>
                <div
                    className={
                        italics
                            ?
                            cl.button_setting + " " + cl.button_italics + " " + cl.button_setting_active
                            :
                            cl.button_setting + " " + cl.button_italics
                    }
                    onClick={() => setItalics(!italics)}
                >
                    Курсив
                </div>
            </div>

            <div className={cl.font_size}>
                <p className={cl.fontsizeText}>Размер шрифта</p>

                <div className={cl.selectBlock}>
                    <Select
                        defaultValue={optionsFontSize[4]}
                        onChange={setFontSizeValue}
                        options={optionsFontSize}
                    />
                </div>
            </div>
        </div>
    )
}

export default Instruments