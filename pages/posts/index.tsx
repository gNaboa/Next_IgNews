import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import {RichText} from 'prismic-dom'
import Prismic from '@prismicio/client'
import styles from './styles.module.scss'
import Link from 'next/link'


type Post ={
    slug:string,
    title:string,
    content:string,
    updatedAt:string
}

interface PostProps{
    posts:Post[]
}


export default function Posts({posts} : PostProps){


    return(
        <>
          <Head>

              <title>Posts | Ignews</title>
          </Head>
        
        <main className={styles.container}>

            <div className={styles.content}>
               {posts.map(post=>(
                   <Link href={`/posts/${post.slug}`}>
                     <a key={post.slug} >
                     <time>{post.updatedAt}</time>
                     <strong>{post.title}</strong>
                     <p>{post.content}</p>
                    </a>
                 </Link>
               ))}
       
            </div>
        </main>
            
        </>
    )
}


export const getStaticProps:GetStaticProps = async ()=>{
 

   const prismic = getPrismicClient()

   const response = await prismic.query([
       Prismic.predicates.at('document.type','post'),
   ],
   {
       fetch:['post.title','post.content'],
       pageSize:100
   }
     
   )

  const posts = response.results.map(post=>{
      return{
          slug:post.uid,
          title:RichText.asText(post.data.title),
          content:post.data.content.find(content=>content.type=='paragraph')?.text ?? '',
          updatedAt: new Date(post.last_publication_date).toLocaleString('pt-BR',{
              day:'2-digit',
              month:'long',
              year:'numeric'
          })
      }
  })

   return{
       props:{
           posts
       },
       
   }

}