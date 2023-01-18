import React, { useEffect, useState } from "react";
import { IArticleFromDB } from "../Articles";
import { getStorage, getDownloadURL, ref } from "@firebase/storage";
import cl from "./ArticleCard.module.css"
import Link from "next/link";

interface IArticleCardProps {
    article: IArticleFromDB,
}

const ArticleCard: React.FC<IArticleCardProps> = ({ article }) => {
    const storage = getStorage();
    const [src, setSrc] = useState<string>();

    useEffect(() => {
        getDownloadURL(ref(storage, `articles_${article.article.id}_mainPhoto`))
            .then((url) => {
                setSrc(url);
            });
    }, [])

    if (src) {
        return (
            <Link href={`/articles/${article.article.id}`}>
                <div className={cl.card}>
                    <div className={cl.photo}>
                        <img src={src} className={cl.img} />
                    </div>

                    <div className={cl.header}>
                        {article.article.title}
                    </div>

                    <div className={cl.opinion}>
                        Описание статьи Описание статьи Описание статьи Описание статьи Описание статьи
                        Описание статьи Описание статьи Описание статьи Описание статьи Описание статьи
                        Описание статьи Описание статьи Описание статьи Описание статьи Описание статьи
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
    } else {
        return (
            <div>
                LOADING
            </div>
        )
    }

    return (
        <div>
            LOADING
        </div>
    )
}

export default ArticleCard