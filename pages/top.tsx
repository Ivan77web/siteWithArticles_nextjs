import Articles from "../components/articles/Articles"
import MainContainer from "../components/mainContainer/MainContainer"
import { collection, getDocs } from "firebase/firestore";
import firestore from "../firebase/clientApp"

const top = ({ articles }) => {
    return (
        <MainContainer>
            <div className="container">
                <Articles articles={articles} />
            </div>
        </MainContainer>
    )
}

export default top

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