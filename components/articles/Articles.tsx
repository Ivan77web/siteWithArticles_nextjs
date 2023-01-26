import React, { useEffect } from "react";
import cl from "./Articles.module.css"
import ArticleCard from "./articleCard/ArticleCard";
import { useRouter } from "next/router";

interface IArticlesProps {
    articles: IArticleFromDB[],
    isErrorTags: boolean,
}

export interface IArticleFromDB {
    article: IArticleData
}

// Это потому что в бд объект в объекте

export interface IArticleData {
    blocks: IBlock[],
    id: number,
    tags: string[],
    title: string,
    srcMainPhoto: string,
}

interface IBlock {
    id: number,
    indent: string,
    type: string,

    fontSize?: number,
    italics?: boolean,
    location?: string,
    thickness?: string,
    value?: string,

    src?: string,
}

const Articles: React.FC<IArticlesProps> = ({ articles, isErrorTags }) => {
    const route = useRouter();

    useEffect(() => {
        if (isErrorTags) {
            route.push("/error")
        }
    }, [])

    return (
        <div className={cl.window}>
            {
                articles.length
                    ?
                    <div className="container">
                        <div className={cl.articles}>
                            {
                                articles.map(article =>
                                    <ArticleCard article={article} key={article.article.id} />
                                )
                            }
                        </div>
                    </div>
                    :
                    <p>В данной рубрике еще нет статей</p>
            }
        </div>
    )
}

export default Articles