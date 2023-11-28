import Image from 'next/image'
import English1 from '../assets/English1.jpg'
import Link from 'next/link'

export default function Card({ course }) {
    return (
        <div className="relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-2">
            <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
                {
                    course.url_image ? (
                        <img src={course.url_image} alt={course.name}/>
                    ) : <Image
                        src={English1}
                        alt="English course"
                        width={500}
                        height={500}
                    />
                }

            </div>
            <div className="p-6 min-h-[200px]">
                <h5 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {course.name}
                </h5>
                <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
                    {course.description}
                </p>
            </div>
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center -space-x-3">
                    <Image
                        alt={'Código del profesor: ' + course.id_teacher}
                        src={English1}
                        className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center"
                        priority={true}
                    />
                    {/* <img src={course.url_image ? course.url_image : English1} alt={course.name} /> */}

                </div>
                <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                    {course.id_teacher}
                </p>
                <p className="block font-sans text-base font-normal leading-relaxed antialiased rounded-lg bg-black py-1.5 px-3 text-white">
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