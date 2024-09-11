import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/Logo.svg';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [user, setUser] = useState<{ name: string; pfp: string; role: string }>({
        name: '',
        pfp: '/pfp.svg', // default image
        role: '', // to store the user role
    });
    const router = useRouter();

    const myLoader = ({ src }: { src: string }) => {
        if (src.startsWith('http') || src.startsWith('/')) {
            return src;
        }
        return `http://localhost:3001/uploads/upload-user-photo/${src}`;
    };

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

                const userId = response.data.sub;
                const role = response.data.role;

                let realUserData;
                if (role === 'user') {
                    // Fetch user data
                    const response2 = await axios.get(`http://localhost:3001/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    realUserData = response2.data;

                    // Clean the file path to use only the relevant URL part
                    const cleanedPhotoPath = realUserData.fotoPerfil.replace(/^.*[\\\/]/, '');
                    setUser({
                        name: realUserData.nome,
                        pfp: cleanedPhotoPath ? `http://localhost:3001/uploads/upload-user-photo/${cleanedPhotoPath}` : '/pfp.svg',
                        role: 'user',
                    });
                } else {
                    // Fetch institution data
                    const response3 = await axios.get(`http://localhost:3001/instituicoes/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    realUserData = response3.data;

                    // Clean the file path for the institution's profile picture
                    const cleanedPhotoPath = realUserData.fotoPerfil.replace(/^.*[\\\/]/, '');
                    setUser({
                        name: realUserData.razaoSocial,
                        pfp: cleanedPhotoPath ? `http://localhost:3001/uploads/upload-institution-photo/${cleanedPhotoPath}` : '/pfp.svg',
                        role: 'institution',
                    });
                }
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
                <Link href={user.role === 'institution' ? '/Institution-Profile' : '/User-Profile'}>
                    <h1 className="font-questrial text-4xl text-white pr-10 cursor-pointer">
                        {user.name || 'Loading...'}
                    </h1>
                </Link>
                <Link href={user.role === 'institution' ? '/Institution-Profile' : '/User-Profile'}>
                    <Image
                        loader={myLoader}
                        src={user.pfp}
                        alt="user pfp"
                        width={160}
                        height={160}
                        className="cursor-pointer rounded-full"
                    />
                </Link>
            </div>
        </div>
    );
}
