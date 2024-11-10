'use client'

import {SignInLogin} from "@/components/signIn_login.jsx";
import Layout from "../components/layout/index.jsx";


export default function AuthRoute() {

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen">
                <SignInLogin/>
            </div>
        </Layout>
    )
}