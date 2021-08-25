import styles from './home.module.scss'
import {SubscribeButton} from '../src/components/Subscribe/index'
import {GetServerSideProps} from 'next'
import { stripe } from '../services/stripe'

interface HomeProps{
  product:{
    priceId:string,
    amount:number
  }
}


export default function Home({product}:HomeProps) {
  
 return (
        <>
        <main className={styles.content}>
         <section className={styles.hero}>
              <span>Hey welcome ,</span>
              <h1>News about the <span>React</span> world</h1>
              <p>
                Get acess to all publications  <br />
                <span>for {product.amount} month</span>
              </p>
              <SubscribeButton/>
         </section>
         <img  src="/images/avatar.svg" alt="" />
        </main>
       </>
  )
}

export const getServerSideProps:GetServerSideProps = async ()=> {
      
    const price = await stripe.prices.retrieve('price_1Iuf3ZJA4qmMctPJgAfwpW4T',{
      expand:['product']
    })
   
   const product = {
     priceId:price.id,
     amount:new Intl.NumberFormat('en-US',{
       style:'currency',
       currency:'USD'
     }).format(price.unit_amount/100)
   }

    return{
      props:{
        product
      }
    }
}
