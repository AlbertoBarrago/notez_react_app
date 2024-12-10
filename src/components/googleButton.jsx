import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@/components/ui/button.jsx';
const GoogleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
    >
        <path
            fill="#4285F4"
            d="M46.617 20.256H24v7.488h12.945C35.363 34.509 30.404 39 24 39c-8.276 0-15-6.724-15-15s6.724-15 15-15c3.826 0 7.293 1.481 9.942 3.884l5.03-5.044C34.357 4.36 29.444 2 24 2 10.745 2 0 12.745 0 26s10.745 24 24 24c12.702 0 23-9.298 23-22C47 25.482 46.822 22.819 46.617 20.256z"
        />
    </svg>
);
import React from 'react';

const CustomGoogleLoginButton = ({ operation, isLogin = false }) => {
    const googleLogin = useGoogleLogin({
        flow: 'implicit',
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userData = await userInfo.json();

                const payload = {
                    credential: tokenResponse.access_token,
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                };


                await operation(payload, isLogin);
            } catch (error) {
                console.error('OAuth Error:', error);
            }
        },
        onError: (error) => console.error('Login Failed:', error),
        scope: 'email profile openid'
    });


    return (
        <Button
            className="w-full mb-4"
            variant="outline"
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                googleLogin()
            }}
        >

            {isLogin ? 'Log In' : 'Sign Up'} <GoogleIcon className="mr-2" />oogle
        </Button>
    );
};

export default CustomGoogleLoginButton;