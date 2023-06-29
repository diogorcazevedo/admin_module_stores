import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage} from '@inertiajs/react';
import {
    AcademicCapIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'

const actions = [
    {
        title: 'OS - Joias de Venda CB',
        href: 'service.sales.index',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
        description: "Joias Vendidas por este sistema, portanto os dados da compra já estão cadastrados",


    },
    {
        title: 'OS - joias Antigas CB',
        href: 'service.legacy.index',
        icon: CheckBadgeIcon,
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
        description: "Joias Antigas da Carla Buaiz Joias mas vendida por outro sistema a muito tempo atrás, normalmente antes de 2018",

    },
    {
        title: 'OS - joias Externas',
        href: 'service.external.index',
        icon: UsersIcon,
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
        description: "Joias de outras marcas (não são produtos CB)",

    },
    // {
    //     title: 'Payroll',
    //     href: '#',
    //     icon: BanknotesIcon,
    //     iconForeground: 'text-yellow-700',
    //     iconBackground: 'bg-yellow-50',
    //      description: "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae",},
    // {
    //     title: 'Submit an expense',
    //     href: '#',
    //     icon: ReceiptRefundIcon,
    //     iconForeground: 'text-rose-700',
    //     iconBackground: 'bg-rose-50',
    //      description: "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae",
    // },
    // {
    //     title: 'Training',
    //     href: '#',
    //     icon: AcademicCapIcon,
    //     iconForeground: 'text-indigo-700',
    //     iconBackground: 'bg-indigo-50',
    //      description: "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae",
    // },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Index() {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
       <>
           <Head title="Services" />
           <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <header className="shrink-0 bg-teal-800">
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div><h1 className="text-white">OS Center</h1></div>
                        </div>
                    </header>
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-100 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                        {actions.map((action, actionIdx) => (
                            <div
                                key={action.title}
                                className={classNames(
                                    actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                                    actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                    'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                )}
                            >
                                <div>
                                <span
                                    className={classNames(
                                        action.iconBackground,
                                        action.iconForeground,
                                        'inline-flex rounded-lg p-3 ring-4 ring-white'
                                    )}
                                >
                                  <action.icon className="h-6 w-6" aria-hidden="true" />
                                </span>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                                        <a href={action.href} className="focus:outline-none">
                                            {/* Extend touch target to entire panel */}
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {action.title}
                                        </a>
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        { action.description}
                                    </p>
                                </div>
                                <span
                                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                                    aria-hidden="true"
                                >
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                </svg>
                              </span>
                            </div>
                        ))}
                    </div>
               </div>
           </Auth>
       </>
    );
}
