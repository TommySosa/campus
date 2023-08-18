import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex items-center justify-center min-h-screen'>
      <form>
        <label>Inicia sesión</label>
        <input type="text" 
        placeholder='Ingrese nombre de usuario'
        className='block'/>
        <label>Contraseña</label>
        <input type="text" 
        placeholder='Ingrese su contraseña'
        className='block'/>
        <button className='bg-teal-400 p-2 rounded-md'>Ingresar</button>
      </form>
    </main>
  )
}
