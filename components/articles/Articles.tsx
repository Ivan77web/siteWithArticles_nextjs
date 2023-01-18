import React from "react";
import cl from "./Articles.module.css"
import firestore from "../../firebase/clientApp"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IOneBlock } from "../admin/create_article/Create_article";
import ArticleCard from "./articleCard/ArticleCard";

export interface IArticleFromDB{
    article: IArticleData
}

// Это потому что в бд объект в объекте

interface IArticleData{
    blocks: IOneBlock[],
    id: number,
    tags: string[],
    title: string,
} 

const Articles = () => {
    const [articles, loadingArticles] = useCollectionData<IArticleFromDB>(
        firestore.collection("articles")
    )

    return (
        <div>
            {
                !loadingArticles && articles
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