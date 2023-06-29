import React, { Fragment } from 'react'
import {Head, usePage} from "@inertiajs/react";
import {Menu, Transition} from "@headlessui/react";
import {ChartBarIcon} from "@heroicons/react/20/solid/index.js";
import Auth from "@/Layouts/Auth";
import SlideClientCacYear from "@/Pages/Reports/Components/ClientComponents/Cac/SlideClientCacYear.jsx";
import SidebarReports from "@/Pages/Reports/Components/SidebarReports.jsx";
import ModalClientCacSelectYearAndMonth from "@/Pages/Reports/Components/ClientComponents/Cac/ModalClientCacSelectYearAndMonth.jsx";
import ModalClientSalesSelectYearAndMonthSales from "@/Pages/Reports/Components/ClientComponents/Sales/ModalClientSalesSelectYearAndMonth.jsx";
import SlideClientSalesYear from "@/Pages/Reports/Components/ClientComponents/Sales/SlideClientSalesYear.jsx";
import SlideClientQuantityYear from "@/Pages/Reports/Components/ClientComponents/Quantity/SlideClientQuantityYear.jsx";
import ModalClientQuantitySelectYearAndMonth from "@/Pages/Reports/Components/ClientComponents/Quantity/ModalClientQuantitySelectYearAndMonth.jsx";
import SlideClientGenderYear from "@/Pages/Reports/Components/ClientComponents/Gender/SlideClientGenderYear.jsx";
import ModalClientGenderSelectYearAndMonth from "@/Pages/Reports/Components/ClientComponents/Gender/ModalClientGenderSelectYearAndMonth.jsx";

export default function Client({year,month}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    function menuQuantityItems(){
        let menuItems = [];

        for (let i = 2017; i < 2025; i++) {
            menuItems.push(
                <Menu.Item key={i}>
                    {({ active }) => (
                        <SlideClientQuantityYear year={i}/>
                    )}
                </Menu.Item>
            );
        }
        return menuItems;
    }
    function menuGenderItems(gender){
        let menuItems = [];

        for (let i = 2017; i < 2025; i++) {
            menuItems.push(
                <Menu.Item key={i}>
                    {({ active }) => (
                        <SlideClientGenderYear gender={gender} year={i}/>
                    )}
                </Menu.Item>
            );
        }
        return menuItems;
    }
    function menuSalesItems(){
        let menuItems = [];

        for (let i = 2017; i < 2025; i++) {
            menuItems.push(
                <Menu.Item key={i}>
                    {({ active }) => (
                        <SlideClientSalesYear year={i}/>
                    )}
                </Menu.Item>
            );
        }
        return menuItems;
    }
    function menuCacItems(){
        let menuItems = [];

        for (let i = 2017; i < 2025; i++) {
            menuItems.push(
                <Menu.Item key={i}>
                    {({ active }) => (
                        <SlideClientCacYear year={i}/>
                    )}
                </Menu.Item>
            );
        }
        return menuItems;
    }


    return (
        <>
            <Head title="Reports" />
            <Auth auth={auth} errors={errors} >
                <div className="flex min-h-full flex-col">
                    <header className="shrink-0 bg-teal-800">
                        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div><h1 className="text-white">Reports Center Clientes</h1></div>
                        </div>
                    </header>
                    <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
                        <div className="flex-1 xl:flex">
                            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                                <ul role="list" className="py-4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8">

                                    <li className="overflow-hidden rounded-xl border border-gray-200">
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-sm font-medium leading-6 text-gray-900">Faturamento
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-xs font-medium leading-6 text-teal-800">(ordenado por
                                                faturamento, quantidade, mês ou ano)
                                            </div>
                                        </div>
                                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    <Menu as="div" className="relative inline-block text-left">
                                                        <div>
                                                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                                                <span className="group inline-flex w-full text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                                                    <ChartBarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-white group-hover:text-gray-500" aria-hidden="true"/>
                                                                    <span className="text-white group-hover:text-gray-700 text-xs">Relatório por Ano</span>
                                                                </span>
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
                                                            <Menu.Items className="z-50 origin-top-right  right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div className="py-1 z-50">
                                                                    {menuSalesItems()}
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </dt>
                                                <dt className="text-gray-500"><ModalClientSalesSelectYearAndMonthSales year={year} month={month}/></dt>
                                            </div>
                                        </dl>
                                    </li>
                                    <li className="overflow-hidden rounded-xl border border-gray-200">
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-sm font-medium leading-6 text-gray-900">Quantidade peças
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-xs font-medium leading-6 text-teal-800">(ordenado por
                                                faturamento, quantidade, mês ou ano)
                                            </div>
                                        </div>
                                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    <Menu as="div" className="relative inline-block text-left">
                                                        <div>
                                                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                                                <span className="group inline-flex w-full text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                                                    <ChartBarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-white group-hover:text-gray-500" aria-hidden="true"/>
                                                                    <span className="text-white group-hover:text-gray-700 text-xs">Relatório por Ano</span>
                                                                </span>
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
                                                            <Menu.Items className="z-50 origin-top-right  right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div className="py-1 z-50">
                                                                    {menuQuantityItems()}
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </dt>
                                                <dt className="text-gray-500"><ModalClientQuantitySelectYearAndMonth year={year} month={month}/></dt>
                                            </div>
                                        </dl>
                                    </li>
                                    <li className="overflow-hidden rounded-xl border border-gray-200">
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-sm font-medium leading-6 text-gray-900">Clientes Mulheres
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-xs font-medium leading-6 text-teal-800">(ordenado por
                                                faturamento, quantidade, mês ou ano)
                                            </div>
                                        </div>
                                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    <Menu as="div" className="relative inline-block text-left">
                                                        <div>
                                                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                                                <span className="group inline-flex w-full text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                                                    <ChartBarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-white group-hover:text-gray-500" aria-hidden="true"/>
                                                                    <span className="text-white group-hover:text-gray-700 text-xs">Relatório por Ano</span>
                                                                </span>
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
                                                            <Menu.Items className="z-50 origin-top-right  right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div className="py-1 z-50">
                                                                    {menuGenderItems('F')}
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </dt>
                                                <dt className="text-gray-500"><ModalClientGenderSelectYearAndMonth gender={'F'} year={year} month={month}/></dt>
                                            </div>
                                        </dl>
                                    </li>
                                    <li className="overflow-hidden rounded-xl border border-gray-200">
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-sm font-medium leading-6 text-gray-900">Clientes Homens
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-xs font-medium leading-6 text-teal-800">(ordenado por
                                                faturamento, quantidade, mês ou ano)
                                            </div>
                                        </div>
                                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    <Menu as="div" className="relative inline-block text-left">
                                                        <div>
                                                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                                                <span className="group inline-flex w-full text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                                                    <ChartBarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-white group-hover:text-gray-500" aria-hidden="true"/>
                                                                    <span className="text-white group-hover:text-gray-700 text-xs">Relatório por Ano</span>
                                                                </span>
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
                                                            <Menu.Items className="z-50 origin-top-right  right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div className="py-1 z-50">
                                                                    {menuGenderItems('M')}
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </dt>
                                                <dt className="text-gray-500"><ModalClientGenderSelectYearAndMonth gender={'M'} year={year} month={month}/></dt>
                                            </div>
                                        </dl>
                                    </li>




                                    <li className="overflow-hidden rounded-xl border border-gray-200">
                                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-sm font-medium leading-6 text-gray-900">CAC
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <div className="text-xs font-medium leading-6 text-teal-800">(Relatório de Aquisição de Clientes)</div>
                                        </div>
                                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    <Menu as="div" className="relative inline-block text-left">
                                                        <div>
                                                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
                                                                <span className="group inline-flex w-full text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-teal-800 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                                                    <ChartBarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-white group-hover:text-gray-500" aria-hidden="true"/>
                                                                    <span className="text-white group-hover:text-gray-700 text-xs">Relatório por Ano</span>
                                                                </span>
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
                                                            <Menu.Items className="z-50 origin-top-right  right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div className="py-1 z-50">
                                                                    {menuCacItems()}
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </dt>
                                                <dt className="text-gray-500"><ModalClientCacSelectYearAndMonth year={year} month={month}/></dt>
                                            </div>
                                        </dl>
                                    </li>



                                    {/*<li className="overflow-hidden rounded-xl border border-gray-200">*/}
                                    {/*    <div*/}
                                    {/*        className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">*/}
                                    {/*        <div className="text-sm font-medium leading-6 text-gray-900">Clientes Mulheres</div>*/}
                                    {/*    </div>*/}
                                    {/*    <div*/}
                                    {/*        className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">*/}
                                    {/*        <div className="text-xs font-medium leading-6 text-teal-800">(ordenado por*/}
                                    {/*            faturamento, quantidade, mês ou ano)*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">*/}
                                    {/*        <div className="flex justify-between gap-x-4 py-3">*/}
                                    {/*            <dt className="text-gray-500"> <SlideClientCacYear year={year}/></dt>*/}
                                    {/*            <dt className="text-gray-500"><SlideClientCacYearAndMonth year={year} month={month}/></dt>*/}
                                    {/*        </div>*/}
                                    {/*    </dl>*/}
                                    {/*</li>*/}
                                    {/*<li className="overflow-hidden rounded-xl border border-gray-200">*/}
                                    {/*    <div*/}
                                    {/*        className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">*/}
                                    {/*        <div className="text-sm font-medium leading-6 text-gray-900">Clientes Homens</div>*/}
                                    {/*    </div>*/}
                                    {/*    <div*/}
                                    {/*        className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">*/}
                                    {/*        <div className="text-xs font-medium leading-6 text-teal-800">(ordenado por*/}
                                    {/*            faturamento, quantidade, mês ou ano)*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">*/}
                                    {/*        <div className="flex justify-between gap-x-4 py-3">*/}
                                    {/*            <dt className="text-gray-500"> <SlideClientCacYear year={year}/></dt>*/}
                                    {/*            <dt className="text-gray-500"><SlideClientCacYearAndMonth year={year} month={month}/></dt>*/}
                                    {/*        </div>*/}
                                    {/*    </dl>*/}
                                    {/*</li>*/}





                                </ul>
                            </div>
                        </div>
                        <SidebarReports />
                    </div>
                </div>
            </Auth>
        </>
    )
}
