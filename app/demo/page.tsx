import SubNav from "../components/SubNav"
import CardSet from "../flashcards/components/CardSet"

const demoWords = [
    { id: 1, term: "book", translation: "kniha", example: "I read a new book today.", priority: 1 },
    { id: 2, term: "apple", translation: "jablko", example: "She ate a red apple.", priority: 1  },
    { id: 3, term: "house", translation: "dům", example: "Their house is near the park.", priority: 1  },
    { id: 4, term: "car", translation: "auto", example: "He washed his car yesterday.", priority: 1  },
    { id: 5, term: "music", translation: "hudba", example: "They play music at the party.", priority: 1  },
    { id: 6, term: "friend", translation: "přítel", example: "My friend called me this morning.", priority: 1  },
    { id: 7, term: "coffee", translation: "káva", example: "I need coffee every day.", priority: 1  },
    { id: 8, term: "city", translation: "město", example: "The city looks beautiful at night.", priority: 1  },
    { id: 9, term: "garden", translation: "zahrada", example: "She waters her garden daily.", priority: 1  },
    { id: 10, term: "movie", translation: "film", example: "We watched a movie last night.", priority: 1  }
  ];
  

const page = () => {
  return (
    <div className="container mx-auto px-4">
    <SubNav name="Kartičky" description="Demo" returnPath="/"/>
    <CardSet demo={true} initialWords={demoWords} lang="EN"/>
  </div>
  )
}

export default page