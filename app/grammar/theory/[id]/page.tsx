import SubNav from "@/app/components/SubNav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.theory?.map((item, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                <ul>
                  {item.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
                  </CardContent>
              </Card>
            ))}
          </div>
      </div>
  )
}
