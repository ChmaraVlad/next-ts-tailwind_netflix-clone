// core
import Image from "next/image"
import { useTogglersRedux } from "../redux/bus/client/togglers"
import { useMovie } from "../redux/bus/movie"

// types
import { Movie } from "../types"
interface Props {
     movie: Movie 
     // when using firebase 
     // movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
     const { setTogglerAction } = useTogglersRedux()
     const { addCurrentMovie } = useMovie()
     
     return (
          <div
               className="relative h-28 min-w-[180px] cursor-pointer
               transition duration-200 ease-out md:min-w-[260px] md:hover:scale-105"
               onClick={
                    () => {
                         movie && addCurrentMovie(movie)
                         setTogglerAction({ type: 'showModal', value: true })
                    }
               }
               >
               <Image
                    src={
                         `https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path
                         }`
                    }
                    className="rounded-sm object-cover md:rounded"
                    layout="fill"
               />
          </div>
     )
}

export default Thumbnail