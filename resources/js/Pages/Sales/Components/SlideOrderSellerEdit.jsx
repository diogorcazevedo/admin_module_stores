import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon,PencilSquareIcon } from '@heroicons/react/24/outline'
import {useForm} from '@inertiajs/react';

export default function SlideOrderSellerEdit({order,sellers}) {
    const [open, setOpen] = useState(false)

    const {data, setData, post, processing, errors} = useForm({
        vendedor: order.vendedor,
        order_id: order.id,
    })
    function submit(e) {
        e.preventDefault()
        setOpen(false);
        post(route("order.seller_change"));
    }

    return (
        <>
            <button onClick={() => setOpen(true)}
                    className="group inline-flex text-base font-medium border border-transparent items-center px-2.5 py-1.5 text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <PencilSquareIcon
                    className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="text-gray-500 group-hover:text-gray-700 text-xs">
                    {order.seller ? order.seller.name : order.vendedor}
                </span>
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0" />
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-teal-600"> GEMAS </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                    <div className="mt-6 grid grid-cols-1 gap-4 justify-end">
                                                        <form onSubmit={submit}>
                                                            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                                                <div className="mt-6 grid grid-cols-2 gap-4">
                                                                    <div className="">
                                                                        <label htmlFor="vendedor" className="block text-sm font-medium text-gray-700">
                                                                            Vendedores
                                                                        </label>
                                                                        <select name="vendedor"
                                                                                required="required"
                                                                                id="vendedor"
                                                                                onChange={e => setData('vendedor', e.target.value)}
                                                                                value={data.vendedor}
                                                                                className=" block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md">
                                                                            <option>-</option>
                                                                            {sellers.map((seller, index) => {
                                                                                return (
                                                                                    <option key={index} value={seller.id}>
                                                                                        {seller.name}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
                                                                        {errors.vendedor && <div className="text-red-600">{errors.vendedor}</div>}
                                                                    </div>
                                                                </div>

                                                                <div className="mt-16 grid grid-cols-3  gap-4 sm:items-end">
                                                                    <div></div>
                                                                    <div></div>
                                                                    <button
                                                                        type="submit"
                                                                        className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
                                                                        disabled={processing}>
                                                                        Salvar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
