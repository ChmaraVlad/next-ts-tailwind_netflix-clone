// core
import Head from 'next/head'

// Components
import { Plans, Header, Row, Banner, Modal } from '../components'

// Utils
import useAuth from '../tools/hooks/useAuth'
import customRequests from '../tools/utils/customRequests'
import { useModal, useSubscription } from '../tools/hooks'

// Types
import { Movie } from '../types'

// data products
import { products } from "../dataLocal/products"
import { useEffect } from 'react'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {

  const { loading, user } = useAuth()
  const { subscription } = useSubscription(user)
  const { showModal } = useModal()

  if (loading || subscription === null) return null
  
  if (subscription === false) return <Plans products={products} />

  return (
    <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />
        <section
          className="md:space-y-24"
        >
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>

      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(customRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(customRequests.fetchTrending).then((res) => res.json()),
    fetch(customRequests.fetchTopRated).then((res) => res.json()),
    fetch(customRequests.fetchActionMovies).then((res) => res.json()),
    fetch(customRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(customRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(customRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(customRequests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }

}
