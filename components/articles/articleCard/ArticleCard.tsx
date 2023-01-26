import React from "react";
import { IArticleFromDB } from "../Articles";
import cl from "./ArticleCard.module.css"
import Link from "next/link";

interface IArticleCardProps {
    article: IArticleFromDB,
}

const ArticleCard: React.FC<IArticleCardProps> = ({ article }) => {
    return (
        <Link href={`/articles/${article.article.id}`}>
            <div className={cl.card}>
                <div className={cl.photo}>
                    <img src={article.article.srcMainPhoto} className={cl.img} />
                </div>

                <div className={cl.header}>
                    {article.article.title}
                </div>

                <div className={cl.tags}>
                    {
                        article.article.tags.map((tag, index) => 
                            (index === 0)
                                ?
                                <p className={cl.tag} key={index}>{tag.toLowerCase()}</p>
                                :
                                <p className={cl.tag} key={index}>&nbsp;/ {tag.toLowerCase()}</p>
                        )
                    }
                </div>

                <div className={cl.autor}>
                    <div className={cl.avatar}>

                    </div>

                    <div className={cl.name}>
                        Иван Иванов
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ArticleCard