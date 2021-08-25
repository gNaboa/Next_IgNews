import styles from './styles.module.scss'
import {signIn, useSession} from 'next-auth/client'
import { api } from '../../../services/api'
import { getStripeJS } from '../../../services/stripe-js'

export function SubscribeButton(){

    const [session] = useSession()
    
    async function handleSubscribe(){
        if(!session){
            signIn('github')
            return
        }
         
        try{
         const response = await api.post('/subscribe')
         const {sessionId} = response.data
         
         const stripe = await getStripeJS()
         await stripe.redirectToCheckout({sessionId:sessionId})

        }catch(err){
            alert(err.message)
        }
    }  

    return(
        <button
        onClick={handleSubscribe}
         type="button"
         className={styles.subscribeButton}>
             Subscribe now
        </button>
    )
}