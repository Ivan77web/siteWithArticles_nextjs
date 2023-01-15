import Articles from "../components/articles/Articles"
import MainContainer from "../components/mainContainer/MainContainer"

const top = () => {
    return (
        <MainContainer>
            <div className="container">
                Лучшее
                <Articles/>
            </div>
        </MainContainer>
    )
}

export default top