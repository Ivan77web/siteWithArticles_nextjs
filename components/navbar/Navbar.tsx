import Link from "next/link";
import { useState } from "react"
import Categories from "../categories/Сategories"
import cl from "./Navbar.module.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cl.navbar}>
            <ul className={cl.menuItems}>
                <li className={cl.menuItem}>
                    <Link href={"/top"}>Лучшее</Link>
                </li>

                <li
                    className={cl.menuItem}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Рубрики
                </li>

                <li className={cl.menuItem}>
                    <Link href={"/"}>Мероприятия</Link>
                </li>

                <li className={cl.menuItem}>
                    <Link href={"/admin"}>Админ</Link>
                </li>

                <li className={cl.menuItem}>
                    Еще что-то
                </li>
            </ul>

            <div className={cl.categories}>
                <Categories isOpen={isOpen} />
            </div>
        </div>
    )
}

export default Navbar