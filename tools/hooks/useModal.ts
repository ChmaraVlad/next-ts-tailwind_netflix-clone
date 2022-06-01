// core
import { useEffect, useState } from "react"

// bus
import { useTogglersRedux } from "../../redux/bus/client/togglers"
import { useMovie } from "../../redux/bus/movie"

// types
import { Element, Genre } from "../../types"

export const useModal = () => {
     const { togglersRedux: { showModal }, setTogglerAction } = useTogglersRedux()
     const { movie } = useMovie()

     const [trailer, setTrailer] = useState('')
     const [genres, setGenres] = useState<Genre[]>([])
     const [muted, setMuted] = useState(true)

     const handleClose = () => {
          setTogglerAction({ type: 'showModal', value: false })
     }

     useEffect(() => {
          if (!movie) return

          const fetchMovie = async () => {
               const data = await fetch(
                    `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
                    }/${movie?.id
                    }?api_key=${process.env.NEXT_PUBLIC_API_KEY
                    }&language=en-US&append_to_response=videos`
               )
                    .then((response) => response.json())
                    .catch((error) => console.error(error.message))

               if (data.videos) {
                    console.log('data.videos', data.videos);
                    
                    const index = data.videos.results.findIndex(
                         (element: Element) => element.type === 'Trailer'
                    )
                    setTrailer(data.videos.results[index].key)
               }
               
               if(data.genres) {
                    setGenres(data.genres)
               }
          }

          fetchMovie()
     }, [movie])

     

     return ({
          showModal,
          setTogglerAction,
          handleClose,
          trailer,
          muted,
          setMuted,
          genres
     })
}
