import { allTags } from "./allTags"

export const getNameTag = (resLang, value) => {
    let res;

    if(resLang === "ru"){
        allTags.map(tag => {
            if(tag.value === value){
                res = tag.title
            }
        })
    } else if(resLang === "eng"){
        allTags.map(tag => {
            if(tag.title === value){
                res = tag.value
            }
        })
    }

    return res
}