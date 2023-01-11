import React from "react"
import cl from "./Categories.module.css"

interface ICategoriesProps {
    isOpen: boolean
}


const Categories: React.FC<ICategoriesProps> = ({ isOpen }) => {
    return (
        <>
            {isOpen &&
                <div className={cl.categories}>
                    <div className="container">
                        <ul className={cl.categoriesItems}>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                            <li className={cl.item}>1 Категория</li>
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default Categories
