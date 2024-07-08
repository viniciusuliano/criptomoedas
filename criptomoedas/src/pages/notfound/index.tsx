import { Link } from "react-router-dom"
export function NotFound() {

    return (
        <>
        <h1>Erro 404, página não encontrada</h1>
        <Link to='/'>Home</Link>
        <Link to='/detalhes'>Detalhes</Link>
        </>
    )
  }
  
  