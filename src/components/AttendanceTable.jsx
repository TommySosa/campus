"use client"
import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

const TABLE_HEAD = ["Usuario", "Rol", "DNI", "Fecha de ingreso"];


export default function AttendanceTable() {
    const [attendance, setAttendance] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4001/api/attendance')
            const result = await response.data
            setAttendance(result)
        }
        fetchData()
    }, [])

    const dateFormatter = (date) => {
        let fecha = new Date(date);

        let day = fecha.getDate();
        let month = fecha.getMonth() + 1;
        let year = fecha.getFullYear();
        let hours = fecha.getHours();
        let min = fecha.getMinutes();

        let formattedHours = (hours < 10 ? '0' : '') + hours;
        let formattedMinutes = (min < 10 ? '0' : '') + min;

        let dateFormatted = day + '/' + (month < 10 ? '0' : '') + month + '/' + year + " " + formattedHours + ":" + formattedMinutes;
        return dateFormatted;
    };

    const filteredAttendance = attendance.filter(
        ({ name, surname, email, dni, date }) =>
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(dni).toLowerCase().includes(searchTerm.toLowerCase()) ||
            dateFormatter(date).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="h-full w-full m-4">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 ml-4 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Lista de asistencia
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Mira la información de asistencia de todos los usuarios.
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                    <div className=" w-72 mb-6 ">
                        <label >Buscar: </label>
                        <input placeholder="Ej. Tomás Sosa" className="border-black-200 border-2 rounded-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendance.map(
                            ({ id, profile_url, name, surname, email, id_rol, date, dni }, index) => {
                                const isLast = index === attendance.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={profile_url ? profile_url : 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png'} alt={name} size="sm" />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name + ' ' + surname}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {id_rol == 1 ? 'Estudiante' : 'Profesor'}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                {dni}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {dateFormatter(date)}
                                                {/* {date} */}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}