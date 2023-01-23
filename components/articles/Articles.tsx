import React from "react";
import cl from "./Articles.module.css"
import ArticleCard from "./articleCard/ArticleCard";

interface IArticlesProps{
    articles: IArticleFromDB[]
}

export interface IArticleFromDB {
    article: IArticleData
}

// Это потому что в бд объект в объекте

interface IArticleData {
    blocks: IBlock[],
    id: number,
    tags: string[],
    title: string,
    srcMainPhoto: string,
}

interface IBlock{
    id: number,
    indent: string,
    type: string,

    fontSize?: number,
    italics?: boolean,
    location?: string,
    thickness?: string,
    value?:  string,

    src?: string,
}

const Articles: React.FC<IArticlesProps> = ({articles}) => {
    return (
        <div>
            {
                articles
                    ?
                    <div className={cl.articles}>
                        {
                            articles.map( article => 
                                <ArticleCard article={article} key={article.article.id}/>
                            )  
                        }
                    </div>
                    :
                    <p>LOADING</p>
            }
        </div>
    )
}

export default Articles