
import MyOrders from '@/components/modules/myOrders'
import NMContainer from '@/components/ui/core/NMContainer'

import React from 'react'

const MyOrderedProductsPage =async () => {
    // const {data:getMyOrders}=await getMyOrderedProducts()
    // console.log(getMyOrders);
  return (
    <NMContainer className='mt-10'>
        <MyOrders/>
    </NMContainer>
  )
}

export default MyOrderedProductsPage