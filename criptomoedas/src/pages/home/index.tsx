import './home.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FormEvent, useState} from 'react'
export function Home() {

    const [input, setInput] = useState('')
    const navigate = useNavigate();

    function searchCoin(e: FormEvent){
        e.preventDefault();
        if(input === '') return
        navigate(`/details/${input}`)
        
    }

    function loadingTable(){
        alert('TESTE')
    }

    return (

        <main className="container_main_home">
          <form className='form_home'>
                <input type="text" placeholder="Digite o nome da moeda... ex Bitcoin" value={input} onChange={(e)=> setInput(e.target.value) }/>
                <button type='submit' onClick={searchCoin}>
                    <BsSearch size={30} color='#FFF'/>
                </button>
          </form>

        <table>
            <thead>
                <tr>
                    <th scope='col'>Moeda</th>
                    <th scope='col'>Valor de mercado</th>
                    <th scope='col'>Preço</th>
                    <th scope='col'>Volume</th>
                    <th scope='col'>Mundaça 24H</th>
                </tr>
            </thead>
            <tbody id='tbody'>
                    <tr className='tr_home'>
                        <td className='td_home' data-label="Moeda">
                            <div className='name_home'>
                                <Link to={"/detalhes"}>
                                <span>Bitcoin</span> | BTC
                                </Link>
                            </div>
                        </td>
                        <td className='td_nome' data-label="Valor mercado">
                            1BILHÃO
                        </td>
                        
                        <td className='td_nome' data-label="Preço">
                            8.000
                        </td>

                        <td className='td_nome' data-label="Volume">
                            2B
                        </td>
                        <td className='tdLoss' data-label="Mudança 24h">
                            <span>1.20</span>
                        </td>
                    </tr>
                </tbody>
        </table>
        <button className='loading_button' onClick={loadingTable}>Carregar mais...</button>

        </main>
    
    )
  }
  
  