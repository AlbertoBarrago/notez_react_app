'use client'

import {useState} from 'react'
import {SignInLogin} from "@/components/signIn_login.jsx";
import Auth from "@/services/auth/index.js";
import Layout from "../components/layout/index.jsx";


export default function AuthRoute() {
    const [isLoading, setIsLoading] = useState(false)
    const auth = new Auth()

    return (
        <Layout>
            <SignInLogin/>
        </Layout>
    )
}