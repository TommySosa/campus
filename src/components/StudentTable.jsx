"use client"
import UpdateModal from "./UpdateStudentModal"
import CreateModal from "./CreateStudentModal"
import DeleteModal from "./DeleteStudentModal"
import { useEffect, useState } from "react"
import axios from "axios"
export default function StudentTable({inscriptions, openCreate, handleOpenCreate, handleRefresh}) {
    const [selectedUpdateCourseId, setSelectedUpdateCourseId] = useState(null);
    const [users, setUsers] = useState([])

    const handleOpenUpdate = (courseId) => {
        setSelectedUpdateCourseId(courseId);
    };

    const [selectedDeleteCourseId, setSelectedDeleteCourseId] = useState(null);

    const handleOpenDelete = (courseId) => {
        setSelectedDeleteCourseId(courseId);
    };

    useEffect(()=> {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:4001/api/users')
                const data = await response.data
                console.log(data);
                setUsers(data)
            } catch (error) {
                console.log(error);
            }
        }

        // if(!students){
        //     fetchUsers()

        // }
    },[])
    return (
        <>
        <table className="w-full text-left text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50   dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-4 py-4">Nombre</th>
                    <th scope="col" className="px-4 py-3">Curso</th>
                    {/* <th scope="col" className="px-4 py-3">Email</th> */}
                    {/* <th scope="col" className="px-4 py-3">DNI</th> */}
                    <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Acciones</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    inscriptions && inscriptions.length > 0 ? inscriptions.map((inscription) => (
                        // <>
                            <tr className="border-b border-gray-700" key={inscription.id_student_course}>
                                <th scope="row" className="px-8 py-3 font-medium text-gray-900 whitespace-nowrap ">{inscription.name + " "+ inscription.surname}</th>
                                <td className="px-8 py-3">{inscription.course_name}</td>
                                {/* <td className="px-4 py-3">{student.email}</td> */}
                                {/* <td className="px-4 py-3">{student.dni}</td> */}
                                <td className="px-4 py-3 flex items-center justify-end">
                                    <button
                                        type="button"
                                        data-modal-target="updateProductModal"
                                        data-modal-toggle="updateProductModal"
                                        className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
                                        onClick={() => handleOpenUpdate(inscription.id_student_course)}
                                    >
                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                        </svg>
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        data-modal-target="readProductModal"
                                        data-modal-toggle="readProductModal"
                                        className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
                                    >
                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Ver
                                    </button>

                                    <button
                                        type="button"
                                        data-modal-target="deleteModal"
                                        data-modal-toggle="deleteModal"
                                        className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-red-500 hover:text-red-400"
                                        onClick={() => handleOpenDelete(inscription.id_student_course)}
                                    >
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                        </svg>
                                        Borrar
                                    </button>

                                </td>
                            </tr>
                        // </>
                    // )) : users && users.length > 0 ? users.map((student) => (
                    //         // <>
                    //             <tr className="border-b border-gray-700" key={student.id_user}>
                    //                 <th scope="row" className="px-8 py-3 font-medium text-gray-900 whitespace-nowrap ">{student.name}</th>
                    //                 <td className="px-8 py-3">{student.surname}</td>
                    //                 <td className="px-4 py-3">{student.email}</td>
                    //                 <td className="px-4 py-3">{student.dni}</td>
                    //                 <td className="px-4 py-3 flex items-center justify-end">
                    //                     <button
                    //                         type="button"
                    //                         data-modal-target="updateProductModal"
                    //                         data-modal-toggle="updateProductModal"
                    //                         className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
                    //                         onClick={() => handleOpenUpdate(student.id_user)}
                    //                     >
                    //                         <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    //                             <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    //                             <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    //                         </svg>
                    //                         Editar
                    //                     </button>
    
                    //                     <button
                    //                         type="button"
                    //                         data-modal-target="readProductModal"
                    //                         data-modal-toggle="readProductModal"
                    //                         className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
                    //                     >
                    //                         <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    //                             <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    //                             <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                    //                         </svg>
                    //                         Ver
                    //                     </button>
    
                    //                     <button
                    //                         type="button"
                    //                         data-modal-target="deleteModal"
                    //                         data-modal-toggle="deleteModal"
                    //                         className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-red-500 hover:text-red-400"
                    //                         onClick={() => handleOpenDelete(student.id_user)}
                    //                     >
                    //                         <svg className="w-4 h-4 mr-2" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    //                             <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                    //                         </svg>
                    //                         Borrar
                    //                     </button>
    
                    //                 </td>
                    //             </tr>
                            // </>
                        )) : <p className="text-center">No se pudo obtener los usuarios</p>
                    
                }

                {
                    selectedUpdateCourseId !== null && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <UpdateModal
                                isOpen={selectedUpdateCourseId !== null}
                                onClose={() => setSelectedUpdateCourseId(null)}
                                id_student_course={selectedUpdateCourseId}
                                handleRefresh={handleRefresh}
                            />
                        </div>
                    )
                }

                {
                    openCreate ? <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <CreateModal
                            isOpen={openCreate}
                            onClose={handleOpenCreate}
                            handleRefresh={handleRefresh}
                        />
                    </div> : null
                }

                {
                    selectedDeleteCourseId !== null && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <DeleteModal
                                isOpen={selectedDeleteCourseId !== null}
                                onClose={() => setSelectedDeleteCourseId(null)}
                                id_student_course={selectedDeleteCourseId}
                                handleRefresh={handleRefresh}
                            />
                        </div>
                    )
                }

            </tbody>
        </table>
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center py-8  space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Mostrando
            <span className="font-semibold text-gray-900  "> {users.length} </span>
            de
            <span className="font-semibold text-gray-900  "> {users.length} </span>
        </span>

    </nav>
</>
    )
}