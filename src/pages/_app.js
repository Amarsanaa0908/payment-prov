"use client"

import { MainProvider } from "@/context/MainContext"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { useRouter } from "next/router"
import { Toaster } from "sonner"
import Layout from "../components/Layout"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  const router = useRouter()

  const authPages = ["/login", "/signup", "/merchant/[slug]/[id]", "/"]
  const isAuthPage = authPages.includes(router.pathname)

  return (
    <MainProvider>
      <div className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        {isAuthPage ? (
          <>
          <Component {...pageProps} />
          <Toaster richColors position="top-right" />
          </>
        ) : (
          <Layout>
            <Component {...pageProps} />
            <Toaster richColors position="top-right" />
          </Layout>
        )}
      </div>
    </MainProvider>
  )
}
