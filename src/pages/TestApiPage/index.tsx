import { useEffect, useState } from "react"
import { testApi } from "../../services/api"
import { listManager } from "../../services/bossApi"
import { useLoaderData } from "react-router-dom"


export const loader = async () => {
    
    const data = await listManager()
    const managers = data.data.data.payload.managers
    return managers

}

const TestApiPage: React.FC = () => {
    

    const managers = useLoaderData()
    return(
        <div>
            {managers.map((item) => (<h1>{item.username} | {item.firstname} | {item.lastname} </h1>))}
        </div>
    )
}

export default TestApiPage