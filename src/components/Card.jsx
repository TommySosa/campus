
import Image from 'next/image'
import English1 from '../assets/English1.jpg'
import Link from 'next/link'
import axios from 'axios'

export default async function Card({ course }) {
    // const teacherResponse = await fetch(`http://localhost:4001/api/teachers/${course.id_user}`)
    // const data = teacherResponse.json()
    // const teacher = data.data
    const data = await axios.get(`http://localhost:4001/api/teachers/${course.id_user}`)
    const teacher = data.data
    return (
        <div className="relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-2">
            <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
                <div className='h-80'>
                    {
                        course.url_image ? (
                            <Image src={course.url_image} alt={course.name} width={500} height={200} />
                        ) : <Image
                            src={English1}
                            alt="English course"
                            width={500}
                            height={500}
                        />
                    }
                </div>

            </div>
            <div className="p-6 min-h-[200px]">
                <h5 className="block font-sans font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {course.name}
                </h5>
                <p className="mt-3 block font-sans font-normal leading-relaxed text-gray-700 antialiased">
                    {course.description}
                </p>
            </div>
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center -space-x-3">
                    {
                        teacher.profile_url ? <Image
                        alt={'Profe: ' + teacher.name + " " + teacher.surname}
                        src={teacher.profile_url}
                        className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center"
                        priority={true} width={100} height={100}/> : <Image
                        alt={'Profe: ' + teacher.name + " " + teacher.surname}
                        src={English1}
                        className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center"
                        priority={true} width={100} height={100}/>
                    }
                </div>
                <p className="block font-sans  font-normal leading-relaxed text-inherit antialiased">
                   Profe {teacher.name + " "+ teacher.surname}
                </p>
                <p className="block font-sans font-normal leading-relaxed antialiased rounded-lg bg-black py-1.5 px-3 text-white">
                    <button>
                        <Link href={`/courses/${course.id_course}`}>
                            Entrar
                        </Link>
                    </button>
                </p>

            </div>
        </div>
    )
}