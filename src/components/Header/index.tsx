import { SigninButton } from '../Signin'
import styles from './styles.module.scss'
import Link from 'next/link'
import {useRouter} from 'next/router'
export default function index(){


    const {asPath} = useRouter()

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent} > 
                <img src="/images/logo.svg" alt="" />
                <nav>
                    <Link href="/">
                    <a  className={asPath=='/'? styles.active:''} href="">Home</a>
                    </Link>
                    <Link  href="/posts" prefetch>
                        <a className={asPath=='/posts'? styles.active:''}>Post</a>
                    </Link>
                </nav>
                <SigninButton/>
            </div>
        </header>
    )
}