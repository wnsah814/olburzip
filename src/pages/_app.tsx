import "@/styles/globals.css";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        AOS.init();
    });
    return (
        <Layout>
            <Component {...pageProps} />
            <Analytics />
        </Layout>
    );
}
