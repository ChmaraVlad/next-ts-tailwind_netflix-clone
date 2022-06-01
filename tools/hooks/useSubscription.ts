// core
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// payment
// import {
//      onCurrentUserSubscriptionUpdate,
//      Subscription,
//    } from '@stripe/firestore-stripe-payments'

// data local
import { products } from '../../dataLocal/products'

// bus
import { useTogglersRedux } from '../../redux/bus/client/togglers'

// types
import { User } from 'firebase/auth'
import { Product } from '../../types'

export const useSubscription = (user: User | null) => {
     const router = useRouter()

     const {togglersRedux:{subscription}, setTogglerAction} = useTogglersRedux()
     const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[1])
     const [isBillingLoading, setIsBillingLoading] = useState(false)

     useEffect(() => {
          if (!user) return

          // if we need a payment logic
          // onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
          //      setSubscription(
          //           snapshot.subscriptions.filter(
          //                (subscription) =>
          //                     subscription.status === 'active' ||
          //                     subscription.status === 'trialing'
          //           )[0]
          //      )
          // })
     }, [user])

     // return subscription

     return {
          selectedPlan,
          setSelectedPlan,
          isBillingLoading,
          setIsBillingLoading,
          subscription,
          setTogglerAction,
          router
     }
}
