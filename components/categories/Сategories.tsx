import Link from "next/link"
import React from "react"
import { allTags } from "../../helpers/allTags"
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
                            {
                                allTags.map( tag => 
                                    <li className={cl.item}>
                                        <Link href={`/allarticles/${tag.value}`}>
                                            {tag.title}
                                        </Link>
                                    </li>    
                                )
                            }
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default Categories
