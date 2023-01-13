import React from "react";
import { IOneBlock } from "../Create_article";
import cl from "./ModalWindow.module.css"
import firestore from "../../../../firebase/clientApp"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";

interface IModalWindowProps {
    setIsOpenModalWindow: (value: boolean) => void,
    article: IOneBlock[],
}

interface INumberOfArticles {
    number: number
}

const ModalWindow: React.FC<IModalWindowProps> = ({ setIsOpenModalWindow, article }) => {
    const storage = getStorage();
    const route = useRouter();
    
    const [numberOfArticles, loadingNumber] = useCollectionData<INumberOfArticles>(
        firestore.collection("number_of_articles")
    )

    const closeWindow = (e) => {
        if (!(e.target.closest(`.${cl.window}`))) {
            setIsOpenModalWindow(false);
        }
    }

    const sendArticle = async () => {
        const photos = article.filter(elem => elem.type === "photo") || [];
        let textData = article
        
        textData.map(elem => {
            if (elem.type === "photo") {
                delete elem.fileValue
            }
        })

        for (let i = 0; i < photos.length; i++) {
            const storageRef = ref(storage, `articles_${numberOfArticles[0].number + 1}_${photos[i].id}`);
            uploadBytes(storageRef, photos[i].fileValue);
        }

        await setDoc(doc(firestore, "articles", `articles_${numberOfArticles[0].number + 1}`), { article: textData });
        await setDoc(doc(firestore, "number_of_articles", `number`), { number: numberOfArticles[0].number + 1 });

        route.push("/admin")
    }

    return (
        <div className={cl.app} onClick={e => closeWindow(e)}>
            {
                !loadingNumber &&
                <div className={cl.window}>
                    {
                        article.length
                            ?
                            <p>Вы хотите опубликовать статью?</p>
                            :
                            <p>Статья еще не написана :(</p>
                    }

                    <div className={cl.buttons}>
                        <p className={cl.btn} onClick={() => setIsOpenModalWindow(false)}>Вернуться</p>
                        <p className={article.length ? cl.btn : cl.notActiveBtn} onClick={() => sendArticle()}>Опубликовать</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default ModalWindow