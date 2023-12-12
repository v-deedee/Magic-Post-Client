import { useEffect, useState } from "react"
import { testApi } from "../../services/api"

const TestApiPage: React.FC = () => {
    const [data, setData] = useState<Result | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: Result = await testApi();
                setData(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return(
        <div>
            <h1>{data?.count}</h1>
            <ul>
                {data?.results.map((quote: Quote) => <li>{quote.author} : {quote.content} || {quote.dateAdded.toString()}</li>)}
            </ul>
        </div>
    )
}

export default TestApiPage