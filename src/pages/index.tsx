import { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import Nav from '../components/nav'

const IndexPage: NextPage = () => {

  const [session, loading] = useSession()


  return (
    <div>
      <Nav />
      <div className="text-3xl">
      {!session && <>
        Not signed in <br />
        <button onClick={(): Promise<void> => signIn('auth0')}>Sign in</button>
      </>}
      </div>
      <div className="text-3xl">
      {session && <>
        Signed in as {session.user.email} <br />
        <button onClick={(): Promise<void> => signOut()}>Sign out</button>
      </>}
      </div>
      {loading && (
        // Aqui seria legal por um componente de Spinner
        <div className="text-3xl text-center" >
          Carregando...
        </div>
      )}

    </div>
  )
}

export default IndexPage;
