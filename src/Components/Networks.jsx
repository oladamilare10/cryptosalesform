import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Networks = (props) => {
    const selected = props.selected
    const networks = props.networks
    const setSelected = props.setSelected
    const selectionTitle = props.title
    const rate = props.rate


  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="flex items-center justify-between block text-sm font-medium leading-6 text-gray-900">
            <span>{selectionTitle}</span>
            <div className="text-sm">
              Rate: 
              <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                {' ₦' + rate}
              </a>/$
            </div>
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-yellow-600 ring-opacity-5 focus:outline-none sm:text-sm">
                {networks.map((network) => (
                  <Listbox.Option
                    key={network.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-yellow-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={network}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={network.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {network.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-yellow-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Networks
