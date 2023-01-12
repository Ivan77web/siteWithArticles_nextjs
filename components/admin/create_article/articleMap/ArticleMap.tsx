import React from "react";
import cl from "./ArticleMap.module.css"
import { IOneBlock } from "../Create_article";
import MapElem from "../mapElem/MapElem";

interface IArticleMapProps {
    article: IOneBlock[]
    setArticle: (value: IOneBlock[]) => void
}

const ArticleMap: React.FC<IArticleMapProps> = ({ article, setArticle }) => {
    return (
        <div className={cl.map}>
            <p className={cl.intro}>Карта статьи</p>

            {
                article.map(elem =>
                    <div key={elem.id}>
                        <MapElem
                            elem={elem}
                            article={article}
                            setArticle={setArticle}
                        />
                    </div>
                )
            }
        </div >
    )
}

export default ArticleMap