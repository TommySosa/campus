/* eslint-disable @next/next/no-img-element */
"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Discussion = ({ title, content, author, id_discussion }) => {
    const { data: session, status } = useSession();
    const [newComment, setNewComment] = useState({
        content: "",
        author: session.user.name,
        id_discussion: id_discussion,
        id_user: session.user.id_user
    });
    const [comments, setComments] = useState([])

    async function fetchComments() {
        try {
            const response = await axios.get(`http://localhost:4001/api/discussion/comments/${id_discussion}`)
            const data = await response.data
            console.log(data);
            setComments(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchComments()
    }, [])

    const handleRefresh = ()=> {
        fetchComments()
    }

    const handleCommentSubmit = async() => {
        try {
            const response = await axios.post(`http://localhost:4001/api/discussion/comment/${id_discussion}`, newComment)
            if(response.status === 200){
                handleRefresh()
            }
        } catch (error) {
            
        }
    };
    const image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    return (
        <div className="container mx-auto mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 uppercase">{title}</h2>
                <p className="text-gray-500">Autor: {author}</p>
                <p className="text-gray-700 mb-4">{content}</p>

                <div className="mt-8">
                    <h3 className="font-semibold mb-4">Comentarios</h3>

                    <div>
                        {comments && comments.length > 0 ? comments.map((comment) => (
                            <div key={comment.id_comment} className="rounded bg-slate-100 p-2 mb-2 flex">
                                <div className="flex-shrink-0">
                                    <img
                                        src={comment.profile_url ? comment.profile_url : image}
                                        alt={comment.surname}
                                        className="rounded-full w-8 h-8"
                                    />
                                </div>

                                <div className="ml-2 flex-grow">
                                    <div className="font-semibold">
                                        {comment.name} {comment.surname}
                                    </div>
                                    <p className="">{comment.content}</p>
                                </div>
                            </div>
                        )) : <p>No hay comentarios</p>}
                    </div>
                    <div className="mt-4">
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Añade un comentario..."
                            value={newComment.content}
                            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                        ></textarea>
                        <button
                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                            onClick={handleCommentSubmit}
                        >
                            Agregar Comentario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discussion;