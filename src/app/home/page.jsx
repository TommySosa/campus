import hero from '../../assets/hero.jpg'
import Image from "next/image";
export default function Home() {
    return (
        <>
            <div className="h-[93.1vh] flex flex-col justify-center text-white relative">
                <Image
                    src={hero}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt="Background Image"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
                <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
                        Bienvenido al Mundo del Inglés con Enfoque Personalizado
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-8">
                        Nuestro enfoque va más allá del aula tradicional. Creemos en la conexión personal y en brindarte la atención individualizada que necesitas para progresar en tu camino hacia la fluidez en inglés.
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl mb-8">
                        Explora nuestros cursos a continuación y comienza tu camino hacia la confianza en el inglés.
                    </p>
                </div>
            </div>
        </>
    );
}
