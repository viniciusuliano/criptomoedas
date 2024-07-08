import {useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import style from './details.module.css'
import {CoinsProp} from '../home/index'


interface ResponseProps{
    data: CoinsProp
}

interface ErrorData{
    error:string
}

type DataProps = ResponseProps | ErrorData

export function Details() {

const navigate = useNavigate()
const [coins, setCoins] = useState<CoinsProp>()
const {cripto} = useParams()


useEffect(()=>{
    async function getCoins(){
    fetch(`https://api.coincap.io/v2/assets/${cripto}`)
    .then(response => response.json())
    .then((data:DataProps) =>{
        if("error" in data){
            navigate('/')
            return
        }
        const priceFormater = Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'USD'
        })

        const priceCompact = Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'USD',
            notation: 'compact'
        })

        const resultData = {
            ...data.data,
            formatedPrice: priceFormater.format(Number(data.data.priceUsd)),
            formatedPriceCompact: priceCompact.format(Number(data.data.marketCapUsd)),
            formatedVol: priceCompact.format(Number(data.data.volumeUsd24Hr))
        }

        setCoins(resultData)

    })
    .catch(()=>{
        navigate('/')
    })
    }

    getCoins()
},[cripto])

    return (
        <section className={style.contente}>
            <div className={style.container}>
                <img className={style.logo} alt="logo" src={`https://assets.coincap.io/assets/icons/${coins?.symbol.toLocaleLowerCase()}@2x.png`}/>
                <h2>{coins?.name} | {coins?.symbol}</h2>
                <span>Preço: {coins?.formatedPrice}</span>
                <span>Mercado: {coins?.formatedPriceCompact}</span>
                <span>Volume: {coins?.formatedVol}</span>
                <span className={Number(coins?.changePercent24Hr) > 0 ? style.Profit : style.Loss} >Mudanças 24H: {(Number(coins?.changePercent24Hr).toFixed(3))}</span>
            </div>
        </section>
        

    )
  }
  
  