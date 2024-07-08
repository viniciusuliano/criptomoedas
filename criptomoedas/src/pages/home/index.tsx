import {Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FormEvent, useState, useEffect} from 'react'
import style from './home.module.css'


export interface CoinsProp {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
    formatedPrice?: string;
    formatedPriceCompact?: string;
    formatedVol?: string;
  }

interface DataProps{
    data: CoinsProp[]
}
export function Home() {
    const [input, setInput] = useState('')
    const [coins, setCoins] = useState<CoinsProp[]>([])
    const [offset, setOffset] = useState(0)
    const navigate = useNavigate();
    
    useEffect(()=>{
        getData();
    },
    [offset])

    async function getData(){
        fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
        .then(response => response.json())
        .then((data: DataProps) =>{
            const coinsData = data.data
            const priceFormater = Intl.NumberFormat("en-US", {
                style: 'currency',
                currency: 'USD'
            })

            const priceCompact = Intl.NumberFormat("en-US", {
                style: 'currency',
                currency: 'USD',
                notation: 'compact'
            })

            const FormatedResult = coinsData.map((item)=>{
                const formated = {
                    ...item,
                    formatedPrice: priceFormater.format(Number(item.priceUsd)),
                    formatedPriceCompact: priceCompact.format(Number(item.marketCapUsd)),
                    formatedVol: priceCompact.format(Number(item.volumeUsd24Hr))
                }
                return formated
            })
            const listCoins = [...coins, ...FormatedResult]
            setCoins(listCoins)
        })
    }


    function searchCoin(e: FormEvent){
        e.preventDefault();
        if(input === '') return
        navigate(`/details/${input}`)
        
    }

    function loadingTable(){
        if(offset === 0){
            setOffset(10)
            return
        }

        setOffset(offset + 10)
    }

    return (

        <main className={style.container_main_home}>
          <form className={style.form_home}>
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
            <tbody id={style.tbody}>
                {coins.length > 0 && coins.map((item)=>(
                          <tr className={style.tr_home} key={item.id}>
                          <td className={style.tr_home} data-label="Moeda">
                              <div className={style.name_home}>
                                <img className={style.logo} alt='logocripto' src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`}/>
                                  <Link to={`/details/${item.id}`}>
                                  <span>{item.name}</span> | {item.symbol}
                                  </Link>
                              </div>
                          </td>
                          <td className={style.td_nome} data-label="Valor mercado">
                              {item.formatedPriceCompact}
                          </td>
                          
                          <td className={style.td_nome} data-label="Preço">
                              {item.formatedPrice}
                          </td>
  
                          <td className={style.td_nome} data-label="Volume">
                            {item.formatedVol}
                          </td>
                          <td className={Number(item.changePercent24Hr)> 0 ? style.tdProfit : style.tdLoss} data-label="Mudança 24h">
                              <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                          </td>
                      </tr>
                ))}
                </tbody>
        </table>
        <button className={style.loading_button} onClick={loadingTable}>Carregar mais...</button>

        </main>
    
    )
  }
  
  