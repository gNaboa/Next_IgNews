import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {fauna} from '../../../services/fauna'
import {query as q} from 'faunadb'
import { session } from 'next-auth/client'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope:'read:user'
    }),
    // ...add more providers here
  ],callbacks:{


    
    async signIn(user, account, profile) {
      

     const {email} = user

     try{
      await fauna.query(
       q.If(
         q.Not(
           q.Exists(
             q.Match(
               q.Index('users_by_email'),
             q.Casefold(user.email)
            )
         )
       ),
       q.Create(
        q.Collection('users'),
        {data:{email}}
      ),
      q.Get(
        q.Match(
          q.Index('users_by_email'),
        q.Casefold(email)
       )
      )

     )
   )
     return true
     }catch{
       return false
     }

     
    }
  }



})