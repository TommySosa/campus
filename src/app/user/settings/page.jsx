'use client'
import { UserConfig, useSession } from "next-auth/react";
import { useState, useRef } from 'react';
import ProfileImage from "@/components/ProfileImage";
import "firebase/storage";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Spinner from "@/components/Spinner";
import axios from "axios";

export default function Settings() {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [description, setDescription] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showChangeImage, setShowChangeImage] = useState(false);
  const [feedBack, setFeedBack] = useState("")
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null)
  // const router = useRouter();
  const [userData, setUserData] = useState({
    profile_url: null,
    description: null,
    // id_genre: 0
  })
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('userData', userData);
    const response = await axios.patch(`http://localhost:4001/api/user/${session.user.id_user}`,userData)
    console.log(response);

  };

  const handleChangeClick = () => {
    fileInputRef.current.click();

  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      const imageRef = ref(storage, `/profile_pictures/image-${Date.now()}`)
      console.log(event.target.files[0]);
      uploadBytes(imageRef, event.target.files[0]).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setUserData({
            ...userData,
            profile_url: url,
          });
          setFeedBack("Imágen subida correctamente.")
        })
          .catch(() => {
            setFeedBack("Húbo un error al subir la imágen.")
          })
        setSelectedFile(null)
      }).catch(() => {
        console.log('error obteniendo la imagen');
        setFeedBack("Húbo un error al subir la imágen.")
      })
    } else {
      console.log('Seleccione la foto');
    }
  };

  const handleDeleteClick = () => {
    setProfileImageUrl(null);
    console.log('Eliminar imagen');
  };

  const handleDescriptionChange = (event) => {
    // Limitar la descripción a 255 caracteres
    const limitedDescription = event.target.value.slice(0, 255);
    setDescription(limitedDescription);
    setUserData({
      ...userData,
      description: limitedDescription
    })
  };

  return (
    <div className="p-8 flex justify-center items-center bg-gray-100 md:w-full">
      <div className="flex space-x-8 md:w-3/4 w-full">
        <div className="p-8 bg-white shadow flex-1 rounded-md overflow-hidden">

          <div className="flex items-center justify-center ">
            {profileImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profileImageUrl}
                alt="Profile"
                className=" flex items-center justify-center object-cover rounded-full shadow-2xl"
              />
            ) : (
              <ProfileImage />
            )}
          </div>
          {/* </div> */}
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <div className="flex justify-around mb-8">
            {/* <button
              className="text-white py-2 px-3 uppercase rounded bg-red-500 hover:bg-red-600 font-medium transition transform hover:-translate-y-0.5"
              onClick={handleDeleteClick}
            >
              Eliminar
            </button> */}
            <button
              className="text-white py-2 px-3 uppercase rounded bg-blue-500 hover:bg-blue-600 font-medium transition transform hover:-translate-y-0.5"
              onClick={handleChangeClick}
            >
              Cambiar
            </button>
          </div>
          <p className="text-center">{feedBack}</p>

          <div className="mb-6"> 
          <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
              Genero: {session.user.genre}
            </label>
            <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
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


          <div className="flex justify-center">
            <button
              className="text-white py-2 px-4 text-center uppercase rounded-full bg-blue-500 hover:bg-blue-600 font-medium transition transform hover:-translate-y-0.5"
              onClick={handleSubmit}
            >
              Guardar cambios
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}  
