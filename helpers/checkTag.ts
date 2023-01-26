import { allTags } from "./allTags"

export const checkTag = (tag: string) => {
    let res = false;

    allTags.map( elem => {
        if(elem.value === tag){
            res = true;
        }
    })

    return res;
}