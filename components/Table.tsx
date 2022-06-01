import { CheckIcon } from '@heroicons/react/outline'
import React from 'react'

// types
import { Product } from "../types"

interface Props {
     products: Product[]
     selectedPlan: Product | null
}

export const Table = ({ products, selectedPlan }: Props) => {
     return (
          <table>
               <tbody
                    className='divide-y divide-[gray]'
               >
                    <tr
                         className='table-row'
                    >
                         <td
                              className='table-data-title'
                         >Monthly price</td>
                         {
                              products.map(product => {
                                   return (
                                        <td
                                             key={product.id}
                                             className={
                                                  `table-data-feature ${selectedPlan?.id === product.id ? 'text-[#e50914]' : 'text-[gray]'}`
                                             }
                                        >
                                             AED{product.prices[0].unit_amount}
                                        </td>
                                   )
                              })
                         }
                    </tr>

                    <tr
                         className='table-row'
                    >
                         <td
                              className='table-data-title'
                         >Video quality</td>
                         {
                              products.map(product => {
                                   return (
                                        <td
                                             key={product.id}
                                             className={
                                                  `table-data-feature ${selectedPlan?.id === product.id ? 'text-[#e50914]' : 'text-[gray]'}`
                                             }
                                        >
                                             {product.metadata.videoQuality}
                                        </td>
                                   )
                              })
                         }
                    </tr>

                    <tr
                         className='table-row'
                    >
                         <td
                              className='table-data-title'
                         >Resolution</td>
                         {
                              products.map(product => {
                                   return (
                                        <td
                                             key={product.id}
                                             className={
                                                  `table-data-feature ${selectedPlan?.id === product.id ? 'text-[#e50914]' : 'text-[gray]'}`
                                             }
                                        >
                                             {product.metadata.resolution}
                                        </td>
                                   )
                              })
                         }
                    </tr>

                    <tr
                         className='table-row'
                    >
                         <td
                              className='table-data-title'
                         >Watch on your TV, computer, mobile phone and tablet</td>

                         {products.map((product) => (
                              <td
                                   className={`table-data-feature ${selectedPlan?.id === product.id
                                        ? 'text-[#E50914]'
                                        : 'text-[gray]'
                                        }`}
                                   key={product.id}
                              >
                                   {product.metadata.portability === true && (
                                        <CheckIcon className="inline-block h-8 w-8" />
                                   )}
                              </td>
                         ))}
                    </tr>

               </tbody>
          </table>
     )
}
