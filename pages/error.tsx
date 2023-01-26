import Link from "next/link";
import React from "react";
import MainContainer from "../components/mainContainer/MainContainer";

export default function () {
    return (
        <MainContainer>
            <p>Вы перешли по несуществующей странице</p>

            <Link href="/allarticles">
                <p>Все статьи</p>
            </Link>
        </MainContainer>
    )
}