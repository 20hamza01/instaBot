import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
import React from 'react'
import Sidebar from '@/components/global/sidebar'
import Navbar from '@/components/global/navbar'
import { PrefetchUserProfile, PrefetchUserAutomations } from '@/react-query/prefetch'

type Props = {
    children:React.ReactNode
    params:{slug:string}
}

const Layout = async ({children,params}: Props) => {

  const {slug} = await params;
    // Query Client
    // WIP: Query client fetch data

    const query = new QueryClient()

    await PrefetchUserProfile(query)

    await PrefetchUserAutomations(query)

  return (
    <HydrationBoundary state={dehydrate(query)}>
        <div className='p-3'>
            {/* Sidebar */}
            <Sidebar slug={slug}/>
            {/* Naviagtion */}
            <div className='
              lg:ml-[250px] 
              lg:pl-10 
              lg:py-5 
              flex 
              flex-col 
              overflow-auto
            '>
              <Navbar slug={slug}/>
              {children}
            </div>
        </div>
    </HydrationBoundary>
    
  )
}

export default Layout