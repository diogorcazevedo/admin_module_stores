import {Head, useForm, usePage} from "@inertiajs/react"
import React from 'react';
import Auth from '@/Layouts/Auth';
import InputMask from "react-input-mask";
import moment from "moment/moment";

  export default function Edit({support,url}) {

    const {auth} = usePage().props

    const { data, setData, post, processing, errors} = useForm({
        necessidade: support.necessidade,
        providencia: support.providencia,
        canal:       support.canal,
        dt_retorno:  support.dt_retorno ? moment(support.dt_retorno).format('DD-MM-YYYY'):moment().add(3, 'days').format('DD-MM-YYYY'),

        url: url,

    })

    function submit(e) {
      e.preventDefault()
      post(route('support.update',{id:support.id}))
    }


    return (
        <Auth auth={auth} errors={errors} >
          <Head title="Users" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
                <div className="shadow mt-6 p-4 flex flex-row">
                    <div className="basis-1/3">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Atendimento</h2>
                    </div>
                </div>
                <form className="space-y-8 divide-y divide-gray-200" onSubmit={submit}>
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="obs" className="block text-sm font-medium text-gray-700"> Necessidade: </label>
                                <div className="mt-1">
                                        <textarea
                                            required="required"
                                            rows="5"
                                            value={data.necessidade}
                                            onChange={e => setData('necessidade', e.target.value)}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                            {data.necessidade}
                                        </textarea>
                                    {errors.necessidade && <div className="text-red-600">{errors.necessidade}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="providencia" className="block text-sm font-medium text-gray-700"> Providência: </label>
                                <div className="mt-1">
                                        <textarea
                                            required="required"
                                            rows="5"
                                            value={data.providencia}
                                            onChange={e => setData('providencia', e.target.value)}
                                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                            {data.providencia}
                                        </textarea>
                                    {errors.providencia && <div className="text-red-600">{errors.providencia}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="canal" className="block text-sm font-medium text-gray-700"> Canal: </label>
                                <select
                                    name="canal"
                                    required="required"
                                    id="canal"
                                    onChange={e => setData('canal', e.target.value)}
                                    value={data.canal}
                                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option> - </option>
                                    <option  value="INSTAGRAM">INSTAGRAM</option>
                                    <option  value="FACEBOOK">FACEBOOK</option>
                                    <option  value="SITE">SITE</option>
                                    <option  value="OUTRO">OUTRO</option>
                                </select>
                                {errors.canal && <div className="text-red-600">{errors.canal}</div>}
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="dt_retorno"
                                       className="block text-sm font-medium text-gray-700"> Data de Retorno </label>
                                <div className="mt-1">
                                    <InputMask
                                        required
                                        type="text"
                                        id="dt_retorno"
                                        name="dt_retorno"
                                        autoComplete="dt_retorno"
                                        mask="99-99-9999"
                                        value={data.dt_retorno}
                                        onChange={e => setData('dt_retorno', e.target.value)}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    ></InputMask>
                                    {errors.dt_retorno && <div className="text-red-600">{errors.dt_retorno}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                disabled={processing}>
                                SALVAR
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </Auth>
    )
  }
