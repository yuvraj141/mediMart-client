'use client'
import { AppStore, makeStore } from '@/redux/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// import { makeStore, AppStore } from '../lib/store'
import {persistStore} from 'redux-persist'
import Loading from '@/components/ui/loading'
export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
const persistedStore=persistStore(storeRef.current)
  return (
  <Provider store={storeRef.current}><PersistGate loading={<Loading/>} persistor={persistedStore}>{children}</PersistGate>
  </Provider>)
}