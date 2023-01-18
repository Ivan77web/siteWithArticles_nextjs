import React, { useEffect, useState } from "react";
import cl from "./ArticlePagePhoto.module.css";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

interface IArticlePagePhotoProps {
    articleId: number,
    blockId: number,
}

const ArticlePagePhoto: React.FC<IArticlePagePhotoProps> = ({ articleId, blockId }) => {
    const storage = getStorage();
    const [src, setSrc] = useState<string>();

    useEffect(() => {
        getDownloadURL(ref(storage, `articles_${articleId}_${blockId}`)).then((url) => {
            setSrc(url);
        });
    }, [])

    return (
        <div>
            {
                src
                    ?
                    <img className={cl.photoOnArticle} src={src} />
                    :
                    <p>LOADING</p>
            }
        </div>
    )
}

export default ArticlePagePhoto