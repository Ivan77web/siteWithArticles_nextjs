import React from "react";
import Create_article from "../../components/admin/create_article/Create_article";
import Menu from "../../components/admin/menu/Menu";
import MainContainer from "../../components/mainContainer/MainContainer";

export default function () {
    return (
        <MainContainer>
            <div style={{ background: "rgb(228, 228, 228)" }}>
                <div className="container">
                    <Menu />
                    <Create_article />
                </div>
            </div>
        </MainContainer>
    )
}