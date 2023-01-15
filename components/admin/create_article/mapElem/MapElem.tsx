import React, { useState } from "react";
import { IArticleFull, IOneBlock } from "../Create_article";
import EditBlock from "../editBlock/EditBlock";
import cl from "./MapElem.module.css"

interface IMapElemProps {
    elem: IOneBlock,
    article: IArticleFull,
    setArticle: (value: IArticleFull) => void,
}

const MapElem: React.FC<IMapElemProps> = ({ elem, article, setArticle }) => {
    const [isOpenEditor, setIsOpenEditor] = useState(false);

    const deleteBlock = (id: number) => {
        const oldArticle = article;

        let newArticle : IArticleFull;

        newArticle.title = article.title

        newArticle.blocks = oldArticle.blocks.filter(elem => elem.id !== id);

        if (newArticle.blocks?.length) {
            for (let i = 0; i < newArticle.blocks.length; i++) {
                newArticle[i].id = i;
            }
        }

        setArticle(newArticle);
    }

    return (
        <div key={elem.id} className={cl.elem}>
            {
                isOpenEditor
                    ?
                    <EditBlock article={article} setArticle={setArticle} id={elem.id} setIsOpenEditor={setIsOpenEditor} />
                    :
                    <div className={cl.card}>
                        {
                            elem.type === "text"
                                ?
                                <p className={cl.text}>{elem.value}</p>
                                :
                                "Фото"

                        }

                        <div className={cl.buttons}>
                            {elem.type === "text" && <div className={cl.btnEdit} onClick={() => setIsOpenEditor(true)}>Ред</div>}

                            <div className={cl.btnDelete} onClick={() => deleteBlock(elem.id)}>
                                Удалить
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default MapElem