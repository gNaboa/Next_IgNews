import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { getPrismicClient } from "../../services/prismic"
import styles from './post.module.scss'
import {RichText} from 'prismic-dom'
import Head from "next/head"


type Post ={
    
    slug:string,
    title:string,
    content:string,
    updatedAt:string

}

interface PostProp{
    post:Post
}




export default function Post({post}:PostProp){

    return(


          <>
          <Head>
              <title>{post.title} | Ignews</title>
          </Head>
          <main className={styles.container}>
              <article className={styles.post}>
                  <h1>{post.title}</h1>
                  <time>{post.updatedAt}</time>
                  <div className={styles.postContent}
                  dangerouslySetInnerHTML={{__html:post.content}}></div>
              </article>
          </main>
          </>
   
    )
}

export const getServerSideProps:GetServerSideProps = async ({req,params}) =>{

    const session = await getSession({req})

    const {slug} = params

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('post',String(slug),{})



     const post = {
        slug,
        title:RichText.asText(response.data.title),
        content:RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR',{
            day:'2-digit',
            month:'long',
            year:'numeric'
        })
     }
    return{
        props:{
           post
        }
    }
}
