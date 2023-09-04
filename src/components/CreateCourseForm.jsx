export default function CreateCourseForm() {
    return (
        <form className="flex flex-col w-2/3">
            <label htmlFor="name" className="my-2">Nombre</label>
            <input type="text" id="name" name="name"
                className="w-2/3 p-1 max-sm:w-full" placeholder="English level basic" />
            <label htmlFor="description" className="my-2">Descripción</label>
            <input type="text" id="description" name="description"
                className="w-2/3 p-1 max-sm:w-full"
                placeholder="Curso destinado a personas sin conocimientos previos..." />
            <label htmlFor="url_image" className="my-2">Imagen</label>
            <input type="file" id="url_image" name="url_image" accept="image/png, image/gif, image/jpeg"
                className="w-2/3 p-1 max-sm:w-full" />

            <label htmlFor="category" className="my-2">Categoria</label>
            <select id="category" name="category"
                className="w-2/3 p-1 max-sm:w-full">
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