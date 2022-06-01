// core
import Image from "next/image"
import { useEffect, useState } from "react"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { FaPlay } from 'react-icons/fa'

// constants
import { baseUrl } from "../constants/movie"

// types
import { Movie } from "../types"

// bus
import { useMovie } from "../redux/bus/movie"
import { useTogglersRedux } from "../redux/bus/client/togglers"

interface Props {
     netflixOriginals: Movie[]
}

export const Banner = ({ netflixOriginals }: Props) => {
     const [movie, setMovie] = useState<Movie | null>(null)
     const { setTogglerAction } = useTogglersRedux()
     const { addCurrentMovie } = useMovie()
     
     useEffect(() => {
          setMovie(
               netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
               )
          
     }, [netflixOriginals])

     return (
          <div
               className="flex flex-col space-y-2 py-16 md:space-y-4
               lg:h-[65vh] lg:justify-end">
               <div
                    className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
                    <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                         layout='fill'
                         objectFit="cover" />
               </div>
               <h1
                    className="text-2xl md:text-4l lg:text-7xl">
                    {
                         movie?.title || movie?.name || movie?.original_name
                    }
               </h1>
               <p
                    className="max-w-xs test-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                    {movie?.overview}
               </p>
               <div
                    className="flex space-x-3">
                    <button
                         className="banner__button bg-white text-black">
                         <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                         Play
                    </button>
                    <button
                         className="banner__button bg-[gray]/70"
                         onClick={
                              () => {
                                   movie && addCurrentMovie(movie)
                                   setTogglerAction({ type: 'showModal', value: true })
                              }
                         }
                    >
                         More Info
                         <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
                    </button>
               </div>
          </div>
     )
}

