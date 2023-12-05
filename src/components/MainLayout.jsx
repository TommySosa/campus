'use client'
/* eslint-disable @next/next/no-img-element */
import defaultImage from '../assets/default_profile.webp'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import AccesibilityButtons from './AccesibilityButtons'
const navigation = [
  { name: 'Inicio', href: '/home' },
  // { name: 'Cursos', href: '/courses' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainLayout() {
  const pathname = usePathname()
  const { data: session, status } = useSession();
  const loginRoute = pathname === '/auth/login'
  const registerRoute = pathname === '/auth/register'
  const teacherRoute = pathname === '/teacher'
  const attendanceRoute = pathname === '/attendance'
  const courseRoute = pathname === '/courses'
  const homeRoute = pathname === '/home'
  const forumRoute = pathname === '/forum'
  const [enableAccesibility, setEnableAccesibility] = useState(false)
  const [disabled, setDisabled] = useState(false);
  const [sizes, setSizes] = useState(false)

  const handleEnableAccesibility = () => {
    setEnableAccesibility(!enableAccesibility)

    localStorage.setItem("disabled", enableAccesibility)
  }

  useEffect(() => {
    const disabledValue = localStorage.getItem("disabled");
    const isDisabled = disabledValue === "true";
    setDisabled(isDisabled);
    const savedSizes = localStorage.getItem("tamaños");
    setSizes(savedSizes)
  }, [enableAccesibility]);


  return (
    <Disclosure as="nav" className="bg-elf-green-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link href={'/home'} className={classNames(
                      homeRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}>
                      Inicio
                    </Link>
                    {
                      session ? (
                        <>
                          {
                            session.user.id_rol === 2 ? (
                              <>
                                <Link href={'/courses'} className={classNames(
                                  courseRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                                  'block rounded-md px-3 py-2 text-base font-medium'
                                )}>
                                  Cursos
                                </Link>
                                <Link href={'/teacher'} className={classNames(
                                  teacherRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                                  'block rounded-md px-3 py-2 text-base font-medium'
                                )}>
                                  Profesor
                                </Link>
                                <Link href={'/attendance'} className={classNames(
                                  attendanceRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                                  'block rounded-md px-3 py-2 text-base font-medium'
                                )}>
                                  Asistencia
                                </Link>
                              </>
                            ) : null
                          }
                          {
                            session.user ? (
                              <Link href={'/forum'} className={classNames(
                                forumRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                              )}>
                                Foro
                              </Link>
                            ) : null
                          }
                          {
                            session.user.id_rol === 1 ? (
                              <Link href={'/courses'} className={classNames(
                                courseRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                              )}>
                                Cursos
                              </Link>
                            ) : null
                          }
                        </>) : null
                    }
                    {
                      !session ? (
                        <>
                          <Link href={'/auth/login'} className={classNames(
                            loginRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-sm font-medium'
                          )}>
                            Iniciar sesión
                          </Link>
                          <Link href={'/auth/register'} className={classNames(
                            registerRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-sm font-medium'
                          )}>
                            Registrarse
                          </Link>

                        </>
                      ) : null
                    }
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}

                {
                  session ? (<>
                    {
                      disabled !== true ? <AccesibilityButtons sizes={sizes} /> : null
                    }
                    <button
                      type="button"
                      className="relative rounded-full bg-elf-green-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <div className='w-8 h-8 rounded-full overflow-hidden'>
                            {
                              session.user.profile_url ? <Image
                                className="h-full w-full object-cover"
                                src={session.user.profile_url}
                                width={100}
                                height={100}
                                alt=""
                              /> : <Image
                                className="h-full w-full object-cover"
                                src={defaultImage}
                                alt=""
                              />
                            }
                          </div>
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/user"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Mi perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleEnableAccesibility}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Activar accesibilidad
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/user/settings"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Configuración
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/api/auth/signout"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Cerrar sesión
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu></>) : (
                    null
                  )
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        isActive ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  )
                )
              })}
              {
                session ? (
                  <>
                    {
                      session.user.id_rol === 2 ? (
                        <>
                          <Link href={'/teacher'} className={classNames(
                            teacherRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                          )}>
                            Profesor
                          </Link>

                        </>
                      ) : null
                    }
                  </>) : null
              }
              {
                session ? (
                  <>
                    {
                      session.user.id_rol === 1 ? (
                        <>
                          <Link href={'/teacher'} className={classNames(
                            courseRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                          )}>
                            Cursos
                          </Link>
                        </>
                      ) : null
                    }
                  </>
                ) : null
              }
              {
                session ? (
                  <>
                    <Link href={'/forum'} className={classNames(
                            courseRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                          )}>
                        Foro
                    </Link>
                </>
                ) : null
              }
              {
                !session ? (
                  <>
                    <Link href={'/auth/login'} className={classNames(
                      loginRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}>
                      Iniciar sesión
                    </Link>
                    <Link href={'/auth/register'} className={classNames(
                      registerRoute ? 'bg-elf-green-800 text-white' : 'text-gray-300 hover:bg-elf-green-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}>
                      Registrarse
                    </Link>

                  </>
                ) : null
              }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}