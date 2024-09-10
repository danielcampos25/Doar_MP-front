import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/Logo.svg';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [user, setUser] = useState<{ name: string; pfp: string }>({
        name: '',
        pfp: '/pfp.svg', // default image
    });
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('No token found');
                    return;
                }

                // Make request to the backend
                const response = await axios.get('http://localhost:3001/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Assuming the response contains the user object
                const userData = response.data;
                const userId = response.data.sub
                const role = response.data.role
                console.log(userData)

                let realUserData
                let userPhoto

                if (role === "user") {
                    const response2 = await axios.get(`http://localhost:3001/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    realUserData = response2.data
                    console.log(response2)

                    const response3 = await axios.get(`http://localhost:3001/users/foto/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    userPhoto = response3.data
                    console.log('response3', response3)
                }

                console.log(realUserData)

                // Update state with the user data
                setUser({
                    name: realUserData.nome,
                    pfp: '/pfp.svg', // Use default if no pfp is returned
                });
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                // Optionally redirect to login if the token is invalid
                router.push('/Login');
            }
        };

        fetchUserData();
    }, [router]);

    return (
        <div className="h-52 w-screen bg-softBlack bg-opacity-25 px-40 flex items-center justify-between">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" />
                <h1 className="font-questrial text-9xl text-white pl-10">doar.com</h1>
            </div>
            <div className="flex items-center hover:bg-opacity-10 bg-softBlack bg-opacity-0 p-4 rounded-lg">
                <Link href="/User-Profile">
                    <h1 className="font-questrial text-4xl text-white pr-10 cursor-pointer">
                        {user.name || 'Loading...'}
                    </h1>
                </Link>
                <Link href="/User-Profile">
                    <Image src={user.pfp} alt="user pfp" width={112} height={112} className="cursor-pointer" />
                </Link>
            </div>
        </div>
    );
}
