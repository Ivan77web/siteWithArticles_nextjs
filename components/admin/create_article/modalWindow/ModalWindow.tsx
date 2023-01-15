import React, { useEffect, useRef, useState } from "react";
import { IArticleFull, IOneBlock } from "../Create_article";
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
    article: IArticleFull,
    setArticle: (value: IArticleFull) => void,
}

interface INumberOfArticles {
    number: number
}

interface IOption {
    value: string,
    label: string
}

const ModalWindow: React.FC<IModalWindowProps> = ({ setIsOpenModalWindow, article, setArticle }) => {
    const storage = getStorage();
    const route = useRouter();

    // теги
    const animatedComponents = makeAnimated();
    const [tags, setTags] = useState(null); // теги
    const [tagsValue, setTagsValue] = useState<IOption[]>(null);

    // название статьи
    const [nameArticle, setNameArticle] = useState("");
    const refInputNameArticle = useRef(null);

    //photo
    const [photo, setPhoto] = useState<File>(null);
    const photoBlockRef = useRef(null);
    const refPhotoCover = useRef(null);
    const inputPhotoRef = useRef<HTMLInputElement>(null);

    const [numberOfArticles, loadingNumber] = useCollectionData<INumberOfArticles>(
        firestore.collection("number_of_articles")
    )

    const closeWindow = (e) => {
        if (!(e.target.closest(`.${cl.windowFull}`))) {
            setIsOpenModalWindow(false);
        }
    }

    function updateImageDisplay() {
        const curFiles = inputPhotoRef.current.files;
        photoBlockRef.current.src = window.URL.createObjectURL(curFiles[0])
        setPhoto(curFiles[0]);
    }

    const sendArticle = async () => {
        if (!nameArticle) {
            refInputNameArticle.current.style.border = "1px solid rgb(164, 0, 0)"
        }

        if (!inputPhotoRef.current.files[0]) {
            refPhotoCover.current.style.border = "1px solid rgb(164, 0, 0)"
        }

        if (nameArticle && tags && inputPhotoRef.current.files[0]) {
            const photos = article.blocks.filter(elem => elem.type === "photo") || [];
            let textData = article.blocks

            textData.map(elem => {
                if (elem.type === "photo") {
                    delete elem.fileValue
                }
            })

            const objArticle = {
                blocks: textData,
                title: article.title.header,
                tags: article.title.tags
            }

            for (let i = 0; i < photos.length; i++) {
                const storageRef = ref(storage, `articles_${numberOfArticles[0].number + 1}_${photos[i].id}`);
                uploadBytes(storageRef, photos[i].fileValue);
            }

            const storageRef = ref(storage, `articles_${numberOfArticles[0].number + 1}_mainPhoto`);
            uploadBytes(storageRef, article.title.coverPhoto);

            await setDoc(doc(firestore, "articles", `articles_${numberOfArticles[0].number + 1}`), { article: objArticle });
            await setDoc(doc(firestore, "number_of_articles", `number`), { number: numberOfArticles[0].number + 1 });

            route.push("/admin")
        }
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

    useEffect( () => {
        let newArticle : IArticleFull = article;
        newArticle.title.header = nameArticle

        setArticle(newArticle);
    }, [nameArticle])

    useEffect( () => {
        let newArticle : IArticleFull = article;
        newArticle.title.tags = tags;

        setArticle(newArticle);
    }, [tags])

    useEffect( () => {
        let newArticle : IArticleFull = article;
        newArticle.title.coverPhoto = photo;

        setArticle(newArticle);
    }, [photo])

    return (
        <div className={cl.app} onClick={e => closeWindow(e)}>
            {
                !loadingNumber
                    ?
                    article.blocks.length
                        ?
                        <div className={cl.windowFull}>
                            <div>
                                <input
                                    className={cl.input}
                                    placeholder="Название статьи"
                                    value={nameArticle}
                                    onChange={e => setNameArticle(e.target.value)}
                                    ref={refInputNameArticle}
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

                                <div className={cl.photoCover} ref={refPhotoCover}>
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