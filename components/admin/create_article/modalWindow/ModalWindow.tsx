import React, { useEffect, useRef, useState } from "react";
import { IOneBlock } from "../Create_article";
import cl from "./ModalWindow.module.css"
import firestore from "../../../../firebase/clientApp"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import Select from "react-select";
import { tagsOptions } from "./tagsOptions";
import makeAnimated from 'react-select/animated';


interface IModalWindowProps {
    setIsOpenModalWindow: (value: boolean) => void,
    article: IOneBlock[],
}

interface INumberOfArticles {
    number: number
}

interface IOption {
    value: string,
    label: string
}

const ModalWindow: React.FC<IModalWindowProps> = ({ setIsOpenModalWindow, article }) => {
    const storage = getStorage();
    const route = useRouter();

    // теги
    const animatedComponents = makeAnimated();
    const [tags, setTags] = useState(null); // теги
    const [tagsValue, setTagsValue] = useState<IOption[]>(null);

    // название статьи
    const [nameArticle, setNameArticle] = useState("");

    //photo

    const photoBlockRef = useRef(null);




    const [numberOfArticles, loadingNumber] = useCollectionData<INumberOfArticles>(
        firestore.collection("number_of_articles")
    )

    const closeWindow = (e) => {
        if (!(e.target.closest(`.${cl.windowFull}`))) {
            setIsOpenModalWindow(false);
        }
    }

    const inputPhotoRef = useRef<HTMLInputElement>(null);

    function updateImageDisplay() {
        const curFiles = inputPhotoRef.current.files;
        console.log(curFiles);
        photoBlockRef.current.src = window.URL.createObjectURL(curFiles[0])
        // setPhoto()
        // addPhotoOnArticle(curFiles[0])
    }

    // const addPhotoOnArticle = (fileValue: File) => {
    //     const newBlock: IOneBlock = {
    //         type: "photo",
    //         id: article ? article.length : 1,
    //         fileValue: fileValue,
    //         indent: indent,
    //     }

    //     setArticle([...article, newBlock]);
    // }

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

    useEffect(() => {
        if (tagsValue) {
            let newTags = [];

            tagsValue.map(tag => {
                newTags.push(tag.value)
            })

            setTags(newTags);
        }
    }, [tagsValue])

    return (
        <div className={cl.app} onClick={e => closeWindow(e)}>
            {
                !loadingNumber
                    ?
                    article.length
                        ?
                        <div className={cl.windowFull}>
                            <div>
                                <input
                                    className={cl.input}
                                    placeholder="Название статьи"
                                    value={nameArticle}
                                    onChange={e => setNameArticle(e.target.value)}
                                />

                                <div className={cl.select}>
                                    <Select
                                        closeMenuOnSelect={false}
                                        onChange={setTagsValue}
                                        components={animatedComponents}
                                        defaultValue={[]}
                                        isMulti
                                        name="tags"
                                        options={tagsOptions}
                                        className="basic-multi-select"
                                    />
                                </div>

                                <div className={cl.photoCover}>
                                    <img className={cl.photo} ref={photoBlockRef} />
                                </div>

                                <form method="post" encType="multipart/form-data" className={cl.photoForm}>
                                    <input
                                        ref={inputPhotoRef}
                                        onChange={updateImageDisplay}
                                        type="file"
                                        id="image_uploads"
                                        name="image_uploads"
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: "none" }}
                                    />

                                    <label className={cl.button_add_photo} htmlFor="image_uploads">Добавить обложку</label>
                                </form>
                            </div>

                            <div className={cl.buttons}>
                                <p className={cl.btn} onClick={() => setIsOpenModalWindow(false)}>Вернуться</p>
                                <p className={cl.btn} onClick={() => sendArticle()}>Опубликовать</p>
                            </div>
                        </div>
                        :
                        <div className={cl.window}>
                            <p>Статья еще не написана :(</p>

                            <div className={cl.buttons}>
                                <p className={cl.btn} onClick={() => setIsOpenModalWindow(false)}>Вернуться</p>
                                <p className={cl.notActiveBtn} onClick={() => sendArticle()}>Опубликовать</p>
                            </div>
                        </div>
                    :
                    <p>LOADING</p>
            }
        </div>
    )
}

export default ModalWindow