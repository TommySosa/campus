"use client"
import { useState } from "react";

export default function CreateCourseForm() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image_url: "",
        id_category: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    return (
        <form className="flex flex-col w-2/3">
            <label htmlFor="name" className="my-2">Nombre</label>
            <input type="text" id="name" name="name"
                className="w-2/3 p-1 max-sm:w-full" placeholder="English level basic" onChange={handleChange} value={formData.name}/>
            <label htmlFor="description" className="my-2">Descripción</label>
            <input type="text" id="description" name="description"
                className="w-2/3 p-1 max-sm:w-full"
                placeholder="Curso destinado a personas sin conocimientos previos..." onChange={handleChange} value={formData.description}/>
            <label htmlFor="url_image" className="my-2">Imagen</label>
            <input type="file" id="url_image" name="url_image" accept="image/png, image/gif, image/jpeg"
                className="w-2/3 p-1 max-sm:w-full" onChange={handleChange} value={formData.image_url}/>

            <label htmlFor="category" className="my-2">Categoria</label>
            <select id="category" name="category"
                className="w-2/3 p-1 max-sm:w-full" onChange={handleChange} value={formData.id_category}>
                <option value="1">Inglés</option>
                {/* <option value="2">Módulo 2</option>
                <option value="3">Módulo 3</option> */}
            </select>
            <br />
            <button type="submit"
                className="py-2 px-4 bg-white w-20 rounded-lg mt-5">
                Crear</button>
        </form>
    )
}