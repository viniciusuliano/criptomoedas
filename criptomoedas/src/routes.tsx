import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { NotFound } from "./pages/notfound";
import { Layout } from "./layout";

// Configurações das rotas do aplicativo
const router = createBrowserRouter([
    {
        element: <Layout />, // Define o layout principal que envolve todas as rotas
        children: [
            {
                index: true, // Define esta rota como a rota padrão
                element: <Home />
            },
            {
                path: '/details/:cripto', // Rota para a página de detalhes com um parâmetro de URL
                element: <Details />
            },
            {
                path: '*', // Rota para a página de não encontrado (404)
                element: <NotFound />
            }
        ]
    }
]);

export { router };
