// core
import {
     createUserWithEmailAndPassword,
     onAuthStateChanged,
     signInWithEmailAndPassword,
     signOut,
     User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../../firebase'
import { useSubscription } from './useSubscription'

// types
interface Props {
     children: React.ReactNode
}
interface IAuth {
     user: User | null
     signUp: (email: string, password: string) => Promise<void>
     signIn: (email: string, password: string) => Promise<void>
     logout: () => Promise<void>
     error: string | null
     loading: boolean
}

// create context
const AuthContext = createContext<IAuth>({
     user: null,
     signUp: async () => { },
     signIn: async () => { },
     logout: async () => { },
     error: null,
     loading: false,
})

// hook
export const AuthProvider = ({ children }: Props) => {
     const [user, setUser] = useState<User | null>(null)
     const [loading, setLoading] = useState(false)
     const [error, setError] = useState<string | null>(null)
     const [initialLoading, setInitialLoading] = useState(true)
     const router = useRouter()

     const { setTogglerAction } = useSubscription(user)


     useEffect(
          () =>
               onAuthStateChanged(auth, (user) => {
                    if (user) {
                         // Logged in...
                         setUser(user)
                         setLoading(false)
                    } else {
                         // Not logged in...
                         setUser(null)
                         setLoading(true)
                         router.push('/login')
                    }

                    setInitialLoading(false)
               }),
          [auth]
     )

     const signUp = async (email: string, password: string) => {
          setLoading(true)

          await createUserWithEmailAndPassword(auth, email, password)
               .then((userCredential) => {
                    setUser(userCredential.user)
                    router.push('/')
               })
               .catch((error) => alert(error.message))
               .finally(() => setLoading(false))
     }

     const signIn = async (email: string, password: string) => {
          setLoading(true)

          await signInWithEmailAndPassword(auth, email, password)
               .then((userCredential) => {
                    setUser(userCredential.user)
                    router.push('/')
               })
               .catch((error) => alert(error.message))
               .finally(() => setLoading(false))
     }

     const logout = async () => {
          setLoading(true)

          await signOut(auth)
               .then(() => {
                    setTogglerAction({ type: 'subscription', value: false })
                    setUser(null)
                    router.reload()

               })
               .catch((error) => alert(error.message))
               .finally(() => setLoading(false))
     }

     const memoedValue = useMemo(() => ({
          user, signUp, signIn, logout, loading, error
     }), [user, loading, error])

     return (
          <AuthContext.Provider
               value={memoedValue}
          >
               {
                    !initialLoading && children
               }
          </AuthContext.Provider>
     )
}

export default function useAuth() {
     return useContext(AuthContext)
}