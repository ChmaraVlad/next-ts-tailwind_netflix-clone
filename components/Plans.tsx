// core
import { CheckIcon } from "@heroicons/react/outline"
import Head from "next/head"
import Link from "next/link"

// tools
import useAuth from "../tools/hooks/useAuth"
import { useSubscription } from "../tools/hooks"

// components
import { Table, Loader } from "./"

// types
import { Product } from "../types"

interface Props {
     products: Product[]
}

export const Plans = ({ products }: Props) => {

     const { logout, user } = useAuth()
     const { selectedPlan, setSelectedPlan, isBillingLoading, setTogglerAction } = useSubscription(user)

     const subscribeToPlan = () => {
          setTogglerAction({type:'subscription', value: true})          
     }

     return (
          <div>
               <Head>
                    <title>Netflix</title>
                    <link rel="icon" href="/favicon.ico" />
               </Head>

               <header
                    className="border-b border-white/10 bg-[#141414]"
               >
                    <Link href="/">
                         <img
                              src="https://rb.gy/ulxxee"
                              alt="Netflix"
                              width={150}
                              height={90}
                              className="cursor-pointer object-contain"
                         />
                    </Link>

                    <button
                         className="text-lg font-medium hover:underline"
                         onClick={logout}
                    >
                         Sign Out
                    </button>
               </header>

               <main
                    className="mx-auto pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10"
               >
                    <h1
                         className="mb-3 text-3xl font-meduim"
                    >
                         Choose the plan that's right for you.
                    </h1>

                    <ul>
                         <li className="flex items-center gap-x-2 text-lg">
                              <CheckIcon className="h-7 w-7 text-[#E50914]" />
                              Watch all you want.
                              Ad-free.
                         </li>
                         <li className="flex items-center gap-x-2 text-lg">
                              <CheckIcon className="h-7 w-7 text-[#E50914]" />
                              Recommendations
                              just for you.
                         </li>
                         <li className="flex items-center gap-x-2 text-lg">
                              <CheckIcon className="h-7 w-7 text-[#E50914]" />
                              Change or cancel
                              your plan anytime.
                         </li>
                    </ul>

                    <div
                         className="mt-4 flex flex-col space-y-4"
                    >
                         <div
                              className="flex w-full items-center justify-center self-end md:w-3/5"
                         >
                              {
                                   products.map(product => {
                                        return (
                                             <div
                                                  key={product.id}
                                                  className={`plan-box ${selectedPlan?.id === product.id ? "opacity-100" : "opacity-40"}`}
                                                  onClick={() => setSelectedPlan(product)}
                                             >
                                                  {product.name}
                                             </div>
                                        )
                                   })
                              }
                         </div>

                         <Table products={products} selectedPlan={selectedPlan} />

                         <button
                              disabled={!selectedPlan || isBillingLoading}
                              className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isBillingLoading && 'opacity-60'
                                   }`}
                              onClick={subscribeToPlan}
                         // onClick={() => console.log('subscribe')}
                         >
                              {isBillingLoading ? (
                                   <Loader color="dark:fill-gray-300" />
                              ) : (
                                   'Subscribe'
                              )}
                         </button>

                    </div>
               </main>
          </div>
     )
}
