import Link from "next/link";
import React from "react";
import cl from "./Menu.module.css"

const Menu = () => {
    return(
        <div className={cl.menu}>
            <ul className={cl.items}>
                <li className={cl.item}>
                    <Link href="/admin/create_article">Создать статью</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu