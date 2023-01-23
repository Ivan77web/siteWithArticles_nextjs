import React from "react";
import cl from "./ArticlePage.module.css";
import { IArticleData } from "../Articles";

interface IArticlePageProps {
    article: IArticleData
}

const ArticlePage: React.FC<IArticlePageProps> = ({ article }) => {
    return (
        <div className={cl.window}>
            <div className={cl.article}>
                {
                    article.blocks.map(elem => {
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

                                    <img className={cl.photoOnArticle} src={elem.src} />
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default ArticlePage