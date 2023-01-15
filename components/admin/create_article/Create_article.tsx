import React, { useEffect, useRef, useState } from "react";
import ArticleMap from "./articleMap/ArticleMap";
import cl from "./Create_article.module.css"
import Instruments from "./instruments/Instruments";
import ModalWindow from "./modalWindow/ModalWindow";

// export interface IArticleFull{
//     blocks: IOneBlock[],
//     title: ITitleArticle
// }

export interface IOneBlock {
    type: string,
    fileValue?: File,
    value?: string,
    id: number,
    thickness?: string,
    location?: string,
    indent?: string,
    italics?: boolean,
    fontSize?: number
}

// export interface ITitleArticle{
//     header: string,
//     coverPhoto: File,
//     tags: string[],
// }

const Create_article = () => {
    const [article, setArticle] = useState<IOneBlock[]>([]);
    // const [article, setArticle] = useState<IArticleFull>();
    const [inputValue, setInputValue] = useState("");
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);

    //Instruments
    const [thickness, setThickness] = useState("regular");
    const [location, setLocation] = useState("left");
    const [indent, setIndent] = useState("small");
    const [italics, setItalics] = useState(false);
    const [fontSize, setFontSize] = useState(18);
    const [fontSizeValue, setFontSizeValue] = useState(null); // Для react select
    const optionsFontSize = [
        { value: '12', label: 12 },
        { value: '14', label: 14 },
        { value: '16', label: 16 },
        { value: '18', label: 18 },
        { value: '20', label: 20 },
        { value: '22', label: 22 },
        { value: '26', label: 26 },
        { value: '30', label: 30 },
        { value: '40', label: 40 },
    ]

    // Add photo
    const inputPhotoRef = useRef<HTMLInputElement>(null);

    function updateImageDisplay() {
        const curFiles = inputPhotoRef.current.files;
        addPhotoOnArticle(curFiles[0])
    }

    const addBlockOnArticle = () => {
        if (inputValue) {
            const newBlock: IOneBlock = {
                type: "text",
                value: inputValue,
                id: article ? article.length : 1,
                // id: article ? article.blocks.length : 1,
                thickness: thickness,
                location: location,
                indent: indent,
                italics: italics,
                fontSize: fontSize
            }

            setArticle([...article, newBlock]);
            setInputValue("");
            setThickness("regular");
            setLocation("left");
            setIndent("normal");
            setItalics(false);
        }
    }

    const addPhotoOnArticle = (fileValue: File) => {
        const newBlock: IOneBlock = {
            type: "photo",
            id: article ? article.length : 1,
            fileValue: fileValue,
            indent: indent,
        }

        setArticle([...article, newBlock]);
    }

    useEffect(() => {
        if (fontSizeValue) {
            setFontSize(fontSizeValue.label)
        }
    }, [fontSizeValue])

    return (
        <div className={cl.create_article}>
            {isOpenModalWindow && <ModalWindow setIsOpenModalWindow={setIsOpenModalWindow} article={article}/>}

            <Instruments
                thickness={thickness} setThickness={setThickness}
                location={location} setLocation={setLocation}
                indent={indent} setIndent={setIndent}
                italics={italics} setItalics={setItalics}
                optionsFontSize={optionsFontSize}
                setFontSizeValue={setFontSizeValue}
                setIsOpenModalWindow={setIsOpenModalWindow}
            />

            <ArticleMap article={article} setArticle={setArticle} />

            <div className={cl.pageOfArticle}>
                {
                    article.length
                        ?
                        article.map((elem: IOneBlock) => {
                            if (elem.type === "text") {
                                return (
                                    <div
                                        key={elem.id}
                                        className={
                                            elem.thickness === "regular" && elem.location === "left"
                                                ?
                                                cl.blockOnArticle + " " +
                                                cl.regular_left
                                                :
                                                elem.thickness === "regular" && elem.location === "center"
                                                    ?
                                                    cl.blockOnArticle + " " +
                                                    cl.regular_center
                                                    :
                                                    elem.thickness === "bold" && elem.location === "left"
                                                        ?
                                                        cl.blockOnArticle + " " +
                                                        cl.bold_left
                                                        :
                                                        elem.thickness === "bold" && elem.location === "center"
                                                            ?
                                                            cl.blockOnArticle + " " +
                                                            cl.bold_center
                                                            :
                                                            ""
                                        }
                                    >
                                        <div
                                            className={
                                                elem.indent === "small"
                                                    ?
                                                    cl.indentSmall
                                                    :
                                                    elem.indent === "normal"
                                                        ?
                                                        cl.indentNormal
                                                        :
                                                        cl.indentBig
                                            }
                                        ></div>
                                        <p
                                            style={elem.italics ?
                                                { fontStyle: "italic", fontSize: elem.fontSize, lineHeight: elem.fontSize + "px" } :
                                                { fontSize: elem.fontSize, lineHeight: elem.fontSize + "px" }}
                                        >
                                            {elem.value}
                                        </p>
                                    </div>
                                )
                            } else if (elem.type === "photo") {
                                return (
                                    <div key={elem.id}>
                                        <div
                                            className={
                                                elem.indent === "small"
                                                    ?
                                                    cl.indentSmall
                                                    :
                                                    elem.indent === "normal"
                                                        ?
                                                        cl.indentNormal
                                                        :
                                                        cl.indentBig
                                            }
                                        ></div>

                                        <img className={cl.photoOnArticle} src={window.URL.createObjectURL(elem.fileValue)} />
                                    </div>
                                )
                            }
                        })
                        :
                        <p className={cl.emptyText}>Пусто</p>
                }
            </div>

            <div className={cl.input_block}>
                <input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className={cl.input}
                    placeholder="Введите текст"
                />

                <div
                    onClick={addBlockOnArticle}
                    className={cl.button + " " + cl.button_send}
                >
                    Отпр
                </div>

                <div className={cl.button}>
                    <form method="post" encType="multipart/form-data">
                        <input
                            ref={inputPhotoRef}
                            onChange={updateImageDisplay}
                            type="file"
                            id="image_uploads"
                            name="image_uploads"
                            accept=".jpg, .jpeg, .png"
                            style={{ display: "none" }}
                        />

                        <label className={cl.button_add_photo} htmlFor="image_uploads">Фото</label>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Create_article