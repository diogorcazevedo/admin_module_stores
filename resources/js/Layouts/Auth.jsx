import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {Link, usePage} from "@inertiajs/react"
import {FolderIcon, GlobeAmericasIcon, Bars3Icon,} from '@heroicons/react/24/solid'
import {XMarkIcon} from '@heroicons/react/24/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Auth({ auth, children }) {

    const userNavigation = [
        { name: 'Editar', method:'get', href: route("user.edit",{user:auth.user.id}) },
        { name: 'Sair',  method:'post', href: route('logout') },
    ]
    const navigation = [
        { name: 'Dashboard',                href: route("dashboard"), icon: GlobeAmericasIcon, current: true },
        // { name: 'Dashboard',                href: route("dashboard"), icon: HomeIcon, current: false },
        { name: 'Vendas',                   href: route("sales.index"), icon: FolderIcon, current: false },
        { name: 'Propostas',                href: route("proposal.index"), icon: FolderIcon, current: false },
        { name: 'Atendimentos',             href: route("support.seller",{id:auth.user.id}), icon: FolderIcon, current: false },
        { name: 'Clientes',                 href: route("user.index"), icon: FolderIcon, current: false },
        { name: 'Aniversários',             href: route("user.birthdays"), icon: FolderIcon, current: false },
        { name: 'Produtos',                 href: route("product.index"), icon: FolderIcon, current: false },
        { name: 'Entregas Pendentes',       href: route("shipping.open"), icon: FolderIcon, current: false },
        { name: 'Reversos',                 href: route("shipping.reverse.logistic.index"), icon: FolderIcon, current: false },
        { name: 'Ordens de Serviço',        href: route("service.dashboard"), icon: FolderIcon, current: false },
        // { name: 'OS - joias de Venda CB',   href: route("service.sales.index"), icon: FolderIcon, current: false },
        // { name: 'OS - joias Antigas CB',    href: route("service.legacy.index"), icon: FolderIcon, current: false },
        // { name: 'OS - joias Externas',      href: route("service.external.index"), icon: FolderIcon, current: false },
        { name: 'Relatórios',               href: route("report.index"), icon: FolderIcon, current: false },
        // { name: 'Pesquisar serviços',           href: route("service.index"), icon: FolderIcon, current: false },
        { name: 'Lancar Venda',         href: route("order.client"), icon: FolderIcon, current: true },


    ]

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { flash } = usePage().props;
    const [message, setMessage] = useState(flash.message);

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex z-40">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex-shrink-0 flex items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src={"/online/storage/images/white_logo.png"}
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                        <nav className="px-2 space-y-1">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-teal-800' : 'text-teal-900 group-hover:text-teal-800',
                                                            'mr-4 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="flex-shrink-0 w-14" aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* flash */}
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                        <div className="flex items-center justify-center place-content-center place-self-center place-items-center h-16 flex-shrink-0 px-4 bg-teal-900">
                            <img
                                src={"/online/storage/images/white_logo.png"}
                                className="h-16 w-auto"
                            />
                        </div>
                        <div className="flex-1 flex flex-col overflow-y-auto">
                            <nav className="flex-1 px-2 py-4 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-teal-900 text-white' : 'text-gray-300 hover:bg-teal-900 hover:text-white',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-teal-800' : 'text-teal-900 group-hover:text-teal-800',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col">
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 px-4 flex justify-between">
                            <div className="flex-1 flex">
                                {/*
                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search-field"
                                            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                            name="search"
                                        />
                                    </div>
                                </form>
                                 */}
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                {/*
                                <button
                                    type="button"
                                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                */}

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <span className="sr-only">Open user menu</span>
                                            <p>{auth.user.name}</p>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <Link
                                                            as="button"
                                                            method={item.method}
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <main className="flex-1">
                        {flash.message && (
                            <div className="flex items-center gap-x-6 bg-teal-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                                <p className="text-sm leading-6 text-white">
                                    <div className="alert">{flash.message}</div>
                                </p>
                                <div className="flex flex-1 justify-end">
                                    <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
                                        <span className="sr-only">Dismiss</span>
                                        <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
