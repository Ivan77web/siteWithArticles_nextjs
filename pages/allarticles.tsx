import Articles from "../components/articles/Articles"
import MainContainer from "../components/mainContainer/MainContainer"
import { collection, getDocs } from "firebase/firestore";
import firestore from "../firebase/clientApp"

const allarticles = ({ articles }) => {
    return (
        <MainContainer>
            <Articles articles={articles} isErrorTags={false}/>
        </MainContainer>
    )
}

export default allarticles

export async function getStaticProps() {
    let articles = [];

    const querySnapshot = await getDocs(collection(firestore, "articles"));
    querySnapshot.forEach((doc) => {
        articles.push(doc.data());
    });

    return {
        props: { articles }
    }
}