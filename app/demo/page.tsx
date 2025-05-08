import SubNav from "../components/SubNav"
import CardSet from "../flashcards/components/CardSet"

const demoWords = [
    { id: 1, term: "book", translation: "kniha", example: "I read a new book today." },
    { id: 2, term: "apple", translation: "jablko", example: "She ate a red apple." },
    { id: 3, term: "house", translation: "dům", example: "Their house is near the park." },
    { id: 4, term: "car", translation: "auto", example: "He washed his car yesterday." },
    { id: 5, term: "music", translation: "hudba", example: "They play music at the party." },
    { id: 6, term: "friend", translation: "přítel", example: "My friend called me this morning." },
    { id: 7, term: "coffee", translation: "káva", example: "I need coffee every day." },
    { id: 8, term: "city", translation: "město", example: "The city looks beautiful at night." },
    { id: 9, term: "garden", translation: "zahrada", example: "She waters her garden daily." },
    { id: 10, term: "movie", translation: "film", example: "We watched a movie last night." }
  ];
  

const page = () => {
  return (
    <div className="container mx-auto px-4">
    <SubNav name="Kartičky" desctiprion="Demo" returnPath="/"/>
    <CardSet initialWords={demoWords} />
  </div>
  )
}

export default page