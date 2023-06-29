import {Head, useForm, usePage} from "@inertiajs/react"
import React from 'react';
import Auth from '@/Layouts/Auth';

  export default function Create({url,states}) {

      const {auth} = usePage().props


    const { data, setData, post, processing, errors} = useForm({
        nome: '',
        instagram: '',
        telefone: '',
        city: '',
        uf: '',
        url: url,

    })

    function submit(e) {
      e.preventDefault()
      post(route('lead.store'))
    }



    return (
        <Auth auth={auth} errors={errors} >
          <Head title="Users" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
                <div className="shadow mt-6 p-4 flex flex-row">
                    <div className="basis-1/3">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Cadastrar Lead</h2>
                    </div>
                </div>
                <form onSubmit={submit}>
                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                    <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                        <div className="col-span-3 sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            {errors.nome && <div>{errors.nome}</div>}
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="nome"
                                    value={data.nome}
                                    onChange={e => setData('nome', e.target.value)}
                                    name="nome"
                                    autoComplete="nome"
                                    className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 sm:col-span-4">
                            <label htmlFor="cel" className="block text-sm font-medium text-gray-700">
                                Instagram
                            </label>
                            {errors.instagram && <div>{errors.instagram}</div>}
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="instagram"
                                    name="instagram"
                                    value={data.instagram}
                                    onChange={e => setData('instagram', e.target.value)}
                                    autoComplete="instagram"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 sm:col-span-4">
                            <label htmlFor="cel" className="block text-sm font-medium text-gray-700">
                                Telefone
                            </label>
                            {errors.telefone && <div>{errors.telefone}</div>}
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    value={data.telefone}
                                    onChange={e => setData('telefone', e.target.value)}
                                    autoComplete="telefone"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                city
                            </label>
                            {errors.city && <div>{errors.city}</div>}
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                    autoComplete="city"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 sm:col-span-4">
                            <label htmlFor="uf" className="block text-sm font-medium text-gray-700">
                                UF
                            </label>
                            {errors.uf && <div>{errors.uf}</div>}
                            <div className="mt-1">
                                <select
                                    name="uf"
                                    required="required"
                                    id="uf"
                                    onChange={e => setData('uf', e.target.value)}
                                    value={data.uf}
                                    className="max-w-lg block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option>Estado</option>
                                    {states.map((state, index) => {
                                        return (
                                            <option key={index} value={state.id}>
                                                {state.uf}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" value={url} name="url" id="url"/>
                    <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
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
        </Auth>
    )
  }
