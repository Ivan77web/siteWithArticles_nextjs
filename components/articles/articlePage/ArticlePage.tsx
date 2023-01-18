import React, { useEffect, useState } from "react";
import cl from "./ArticlePage.module.css";
import { IOneBlock } from "../../admin/create_article/Create_article";
import ArticlePagePhoto from "./articlePagePhoto/ArticlePagePhoto";
import firestore from "../../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";

interface IArticlePageProps {
    id: string
}

interface IRightArticle {
    blocks: IOneBlock[],
    id: number,
    tags: string[],
    title: string,
}

const ArticlePage: React.FC<IArticlePageProps> = ({ id }) => {
    const [rightArticle, setRightArticle] = useState<IRightArticle>();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const docRef = doc(firestore, "articles", `articles_${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let dataValue = docSnap.data().article;
            setRightArticle(dataValue);
        }
    }

    return (
        <div className={cl.window}>
            {
                rightArticle?.blocks.length
                    ?
                    <div className={cl.article}>
                        {
                            rightArticle?.blocks.length
                                ?
                                rightArticle.blocks.map(elem => {
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

                                                <ArticlePagePhoto articleId={rightArticle.id} blockId={elem.id} />
                                                {/* <img className={cl.photoOnArticle} src={ } /> */}
                                            </div>
                                        )
                                    }
                                })
                                :
                                <p>LOADING1</p>
                        }
                    </div>
                    :
                    <p>LOADING2</p>
            }
        </div>
    )
}

export default ArticlePage