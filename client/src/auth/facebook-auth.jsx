import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ThreeBody from "../components/loading"
import { setToken } from "./setToken-localstorage"

export const FacebookAuth = () => {
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const token = searchParams.get('token');
        console.log(token)
        setToken(token)
        window.location.replace('/')
    }, [])
  return (
    <ThreeBody />
  )
}
