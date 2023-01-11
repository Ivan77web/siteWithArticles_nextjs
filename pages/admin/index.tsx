import React from "react";
import Menu from "../../components/admin/menu/Menu";
import MainContainer from "../../components/mainContainer/MainContainer"

export default function () {
    return (
        <MainContainer>
            <div className="container">
                <Menu/>
                Admin page
            </div>
        </MainContainer>
    )
}