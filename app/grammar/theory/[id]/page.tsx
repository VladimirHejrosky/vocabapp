import SubNav from "@/app/components/SubNav"
import { getGrammarById } from "@/lib/json/json-actions"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{id:string}>
}

export default async function TheoryPage({params}: Props) {
  const { id } = await params
  const data = await getGrammarById(id)

  if (!data) {
    notFound()
  }


  return (
    <div className="container mx-auto px-4">
     <SubNav name="Teorie" description={data.title} returnPath="/grammar" />
          <div>
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, laborum cupiditate. Quaerat, eligendi atque iusto adipisci, officiis incidunt voluptatibus dignissimos, unde dolorum expedita rerum placeat. Facilis voluptatem officia maiores magni?</p>
          </div>
      </div>
  )
}
