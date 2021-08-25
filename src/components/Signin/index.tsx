import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'
import {useSession,signIn,signOut} from 'next-auth/client'


export function SigninButton(){

  const [session] = useSession()

    return session? (
      <button className={styles.signinButton} onClick={()=>{signOut()}} >
        <FaGithub color="#04d361" /> {session.user.name}
        <FiX   className={styles.rightIcon} />
      </button>
    ):(
        
        <button className={styles.signinButton} onClick={()=>{signIn('github')}}>
          <FaGithub color="#eba417"/> Signin with Github
        </button>
    )
}