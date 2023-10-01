import { useAuth } from "../hooks/useauth";

export const HomePage = () => {
    const { user} = useAuth();
    console.log(user);
    return (
    <>
        <h1>Hola {user.name}</h1>
    </>
  )
}
