import hero from '../assets/hero.jpg'
import Image from "next/image";
export default function Home() {
    const imagen = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Fachada_de_la_UTN_-_Facultad_Regional_Tucum%C3%A1n.jpg"
    return (
        <>
            <div className="h-[93.1vh] flex flex-col justify-center text-white relative">
                <Image
                    src={imagen}
                    fill="responsive"
                    
                    quality={100}
                    priority
                    alt="Background Image"                
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
                <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
                    ¡Bienvenido al Campus Virtual!
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-8">
                    Sumérgete en una experiencia educativa innovadora con nuestro Campus Virtual, donde la excelencia académica se encuentra con la comodidad digital. Nuestra plataforma en línea está diseñada para ofrecer un aprendizaje interactivo, accesible desde cualquier lugar y en cualquier momento.                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl mb-8">
                        Inicia sesión y comienza tu aprendizaje.
                    </p>
                </div>
            </div>
        </>
    );
}
