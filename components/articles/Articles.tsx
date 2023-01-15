import React, { useEffect } from "react";
import cl from "./Articles.module.css"
import firestore from "../../firebase/clientApp"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IOneBlock } from "../admin/create_article/Create_article";

interface IArticle{
    article: IOneBlock[]
}

const Articles = () => {
    const [articles, loadingArticles] = useCollectionData<IArticle>(
        firestore.collection("articles")
    )

    useEffect( () => {
        if(articles){
            articles.map(article => console.log(article.article));
        }
    }, [articles])

    return (
        <div>
            {
                !loadingArticles && articles
                    ?
                    <div>
                        {
                            articles.map( article => 
                                <div>{article.article[0].value}</div>
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