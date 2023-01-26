import Articles from "../../components/articles/Articles"
import MainContainer from "../../components/mainContainer/MainContainer"
import { collection, getDocs } from "firebase/firestore";
import firestore from "../../firebase/clientApp"
import { checkTag } from "../../helpers/checkTag";
import { getNameTag } from "../../helpers/getNameTag";

const allarticles = ({ articles, isErrorTags }) => {
    return (
        <MainContainer>
            <Articles articles={articles} isErrorTags={isErrorTags}/>
        </MainContainer>
    )
}

export default allarticles

export async function getServerSideProps({ params }) {
    let articles = [];
    
    if(checkTag(params.category)){
        const querySnapshot = await getDocs(collection(firestore, "articles"));
        const ruParam = getNameTag("ru", params.category)

        querySnapshot.forEach((doc) => {
            if (doc.data().article.tags.includes(ruParam)) {
                articles.push(doc.data());
            }
        });
    }else{
        return{
            props: {isErrorTags: true}
        }
    }

    return {
        props: { articles }
    }
}