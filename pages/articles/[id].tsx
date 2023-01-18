import React, { useEffect, useState } from "react";
import MainContainer from "../../components/mainContainer/MainContainer";
import { useRouter } from "next/router";
import ArticlePage from "../../components/articles/articlePage/ArticlePage";

export default function () {
    const [id, setId] = useState(null);
    const query = useRouter().query;

    useEffect(() => {
        if (query) {
            if (Array.isArray(query.id)) {
                setId(query.id[0]);
            } else {
                setId(query.id);
            }
        }
    }, [query])

    return (
        <>
            <MainContainer>
                {
                    id !== null && id !== undefined
                        ?
                        <ArticlePage id={id} />
                        :
                        <p>LOADING</p>
                }
            </MainContainer>
        </>
    )
}