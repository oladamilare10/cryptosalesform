import React, { useState } from 'react'
import Networks from './Networks'

const networks = [
  {
    id: 1,
    name: 'Select Network',
    avatar:
      'https://previews.123rf.com/images/ikalvi/ikalvi1712/ikalvi171200304/92411494-technology-and-network-icon-design-networking-and-internet-symbol-template.jpg',
  },
  {
    id: 2,
    name: 'Airtel',
    avatar:
      'https://www.airtel.com.ng/assets/images/ug/airtel-icon-ug.png',
  },
  {
    id: 3,
    name: 'MTN',
    avatar:
      'https://mymtn.com.ng/assets/icons/mtnIcon.png',
  },
  {
    id: 4,
    name: 'Glo',
    avatar:
      'https://mobileapp.gloworld.com/static/media/Logo.c88a78df.png',
  },
  {
    id: 5,
    name: '9 Mobile/Etisalat',
    avatar:
      'https://9mobile.com.ng/wp-content/uploads/2020/08/logo3.png',
  }
]

const FormReUsable = (props) => {
const pageTitle = props.pageTitle
const [amount, setAmount] = useState(false)
const [phone, setPhone] = useState()

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {pageTitle}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <Networks networks={networks} title="Select Network" />
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {phone}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(event => setPhone(event.target.value))}
                  placeholder='ie. 08012345678'
                  autoComplete="email"
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Amount" className="block text-sm font-medium leading-6 text-gray-900">
                  Amount
                </label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Amount to Pay: ₦{amount}
                    </a>
                  </div>
              </div>
              <div className="mt-2">
                <input
                  id="Amount"
                  name="Amount"
                  type="number"
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder='Minimum Amount: ₦50'
                  autoComplete="current-password"
                  value={amount}
                  min={"50"}
                  required
                  className="block pl-2 w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buy
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default FormReUsable
