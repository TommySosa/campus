"use client"
import CreateDiscussionModal from "@/components/CreateDiscussionModal";
import Discussion from "@/components/Discussion";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
    const [discussions, setDiscussions] = useState([])
    const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false)

    async function fetchDiscussions() {
        try {
            const response = await axios.get('http://localhost:4001/api/discussions')
            const data = await response.data
            console.log(data);
            setDiscussions(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchDiscussions()
    }, [])
    const handleRefresh = () => {
        fetchDiscussions()
    }
    const onCreateDiscussion = () => {
        setOpenCreateDiscussion(!openCreateDiscussion)
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Foro de Discusiones</h1>
                <button
                    onClick={onCreateDiscussion}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Crear Discusión
                </button>
            </div>
            {
                discussions && discussions.length > 0 ? discussions.map((discussion) => (
                    <Discussion id_discussion={discussion.id_discussion} title={discussion.title} content={discussion.content} author={discussion.author} key={discussion.id_discussion} />
                )) : null
            }
            {
                        openCreateDiscussion ? <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <CreateDiscussionModal
                                isOpen={openCreateDiscussion}
                                onClose={onCreateDiscussion}
                                handleRefresh={handleRefresh}
                            />
                        </div> : null
                    }

        </div >
    )
}