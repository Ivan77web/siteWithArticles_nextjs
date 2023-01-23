import React, { useEffect, useState } from "react";
import MainContainer from "../../components/mainContainer/MainContainer";
import { useRouter } from "next/router";
import ArticlePage from "../../components/articles/articlePage/ArticlePage";
import { doc, getDoc } from "firebase/firestore";
import firestore from "../../firebase/clientApp";

export default function ({ article }) {
    return (
        <>
            <MainContainer>
                <ArticlePage article={article} />
            </MainContainer>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let article;

    const docRef = doc(firestore, "articles", `articles_${params.id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let dataValue = docSnap.data().article;
        article = dataValue;
    }

    return {
        props: { article }
    }
}