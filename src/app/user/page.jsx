import ProfileData from "@/components/ProfileData";
import ProfileImage from "@/components/ProfileImage";
import axios from "axios"

export default function Home() {
    // const response = await axios.get('/api/profile')
    // const data = await response.json()
    // console.log(data);
    // const { data: session, status } = useSession();


    // const handleClick = async () => {
    //     const response = await axios.get('/api/profile')
    //     // const data = await response.json()
    //     console.log(response.data);
    // }

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-1">
                
                    <div className="relative">
                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-40 flex items-center justify-center text-indigo-500">
                            <ProfileImage/>
                        </div>
                    </div>

                    {/* <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                        <button
                            className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        // onClick={handleClick}>
                        >
                            Editar 
                        </button>
                      
                        
                        <button
                            className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                            Configurar
                        </button>
                    </div> */}
                
                </div>

                <ProfileData />

            </div>
        </div>
    )
}