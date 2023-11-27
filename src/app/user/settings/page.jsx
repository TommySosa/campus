'use client'
import { useState, useRef } from 'react';
import ProfileImage from "@/components/ProfileImage";

export default function Home() {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [description, setDescription] = useState('');

  const [showChangeImage, setShowChangeImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setProfileImageUrl(imageUrl);
    setShowChangeImage(false);
  };

  const handleDeleteClick = () => {
    setProfileImageUrl(null);
    console.log('Eliminar imagen');
  };

  const handleDescriptionChange = (event) => {
    // Limitar la descripción a 255 caracteres
    const limitedDescription = event.target.value.slice(0, 255);
    setDescription(limitedDescription);
  };

  const handleModifyClick = () => {
    console.log('Modificar descripción');
    // Lógica para la acción "Modificar"
  };

  const handleSaveClick = () => {
    console.log('Guardar cambios');
    // Lógica para la acción "Guardar"
  };

  return (
    <>
      <div className="p-8 flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto flex space-x-8">
          {/* Contenedor de Perfil (Izquierda) */}
          <div className="p-8 bg-white shadow flex-1 rounded-md overflow-hidden">
            <label htmlFor="profileImageInput" className="cursor-pointer block mb-6">
              <div
                className="w-64 h-64 bg-indigo-100 mx-auto rounded-full shadow-2xl relative flex items-center justify-center overflow-hidden"
                onClick={() => setShowChangeImage(!showChangeImage)}
              >
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <ProfileImage />
                )}
              </div>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
  
            <div className="flex justify-between mb-8">
              <button
                className="text-white py-2 px-3 uppercase rounded bg-blue-500 hover:bg-blue-600 font-medium transition transform hover:-translate-y-0.5"
                onClick={handleChangeClick}
              >
                Cambiar
              </button>
              <button
                className="text-white py-2 px-3 uppercase rounded bg-red-500 hover:bg-red-600 font-medium transition transform hover:-translate-y-0.5"
                onClick={handleDeleteClick}
              >
                Eliminar
              </button>
            </div>
  
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                maxLength="255"
                className="p-2 border border-gray-300 rounded-md w-full resize-none"
                placeholder="Ingresa tu descripción"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
  
            <div className="flex justify-between">
              <button
                className="text-white py-2 px-4 uppercase rounded-full bg-blue-500 hover:bg-blue-600 font-medium transition transform hover:-translate-y-0.5"
                onClick={handleModifyClick}
              >
                Modificar
              </button>
              <button
                className="text-white py-2 px-4 uppercase rounded-full bg-red-500 hover:bg-red-600 font-medium transition transform hover:-translate-y-0.5"
                onClick={handleSaveClick}
              >
                Guardar
              </button>
            </div>
          </div>
  
          {/* Contenedor de Contraseña y Seguridad (Derecha) */}
          <div className="p-8 bg-white shadow flex-1 rounded-md overflow-hidden">
            <h2 className="text-lg font-semibold mb-2">Contraseña y Seguridad</h2>
  
            {/* Descripción */}
            <p className="text-xs text-gray-500 mb-2">
              Se cerrarán todas las sesiones, excepto esta, para proteger tu cuenta si alguien intenta acceder a ella.
            </p>
            <p className="text-xs text-gray-500 mb-4">
              La contraseña debe tener al menos seis caracteres e incluir una combinación de números, letras y caracteres especiales (!$@%).
            </p>
  
            {/* Formulario de cambio de contraseña */}
            <form className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña nueva
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="repeatNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Repetir contraseña nueva
                </label>
                <input
                  type="password"
                  id="repeatNewPassword"
                  name="repeatNewPassword"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
                 {/* hola */}
              {/* Botón redondo para guardar la contraseña */}
              <button
                type="button"
                className="text-white py-2 px-4 uppercase rounded-full bg-blue-500 hover:bg-blue-600 font-medium transition transform hover:-translate-y-0.5 self-center"
              >
                Guardar contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
 }