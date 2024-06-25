import React, { useState } from 'react'
import Networks from './Networks'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/All-Bills-Arena-logos_black-e1695771379443.png'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { FaSpinner } from 'react-icons/fa'

const networks = [
  {
    id: 1,
    name: 'Select Coin',
    avatar:
      'https://previews.123rf.com/images/ikalvi/ikalvi1712/ikalvi171200304/92411494-technology-and-network-icon-design-networking-and-internet-symbol-template.jpg',
  },
  {
    id: 2,
    name: 'BTC',
    avatar:
      'https://th.bing.com/th/id/OIP.Og7n6Xfry_wsuuh5wxucxwHaHa?pid=ImgDet&rs=1',
  },
  {
    id: 3,
    name: 'ETH',
    avatar:
      'https://th.bing.com/th/id/R.885a120ce6f74437a9092bb15f133812?rik=g8mDPvgucZRHNw&pid=ImgRaw&r=0',
  },
  {
    id: 4,
    name: 'USDT',
    avatar:
      'https://th.bing.com/th/id/R.ded9ec4ca6bb7fffd9d814bbe6fe9924?rik=SRodUWoQRTKPEQ&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fcjdowner%2fcryptocurrency-flat%2f1024%2fTether-USDT-icon.png&ehk=IT1RX%2b8v8hAQLprQLJbOWmW3UaelZIlgy0Q7iypa%2bwk%3d&risl=&pid=ImgRaw&r=0',
  }
]

const FormReUsableCryptoBuy = (props) => {
const pageTitle = props.pageTitle
const pageButton = props.button
const rate = 1055
const [amount, setAmount] = useState(false)
const [phone, setPhone] = useState()
const [email, setEmail] = useState()
const [tId, setTId] = useState()
const [submitMessage, setSubmitMessage] = useState(null)
const price = amount * rate;
const [selected, setSelected] = useState(networks[0])
const [subLoad, setSubLoad] = useState(false)
const [error, setError] = useState(null)
let NigerianNaira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN'
})

const navigate = useNavigate()

const handleSubmission = (event) => {
  event.preventDefault();

  const tId = Math.random().toString(16).slice(2)
  
  setSubLoad(true)
  const urlHeader2 = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const sellUrl = "https://crypto.allbillsarena.com.ng/api/buy.php"

  const sellBody = JSON.stringify(
    {
      coin: selected.name,
      phone: phone,
      email: email,
      tId: tId,
      amount: amount,
      ngn_amount: NigerianNaira.format(price),
    }
  )
  fetch(sellUrl, {
    method: "POST",
    header: urlHeader2,
    body: sellBody
  })
  .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch Data for this particular resource.')
        }
        return res.json();
    })
    .then(data => {
        if (data.data.status === 'error') {
            throw Error(data.message)
        }
        if (data.data.status === 'success') {
          console.log(data.data.status)
          setSubLoad(false)
          setTimeout(() => {
            navigate("/transaction/" + tId)
          }, 3000);
          setSubmitMessage("Form Submission Success! The account you provided will be credited as soon as Coin as been received.")
        }
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        //console.log("Result Aborted!")
      }else{
        console.log(err)
        setSubLoad(false)
      }
    })

  // setSubLoad(true)
  // setTimeout(()=> {
  //   setSubLoad(false)
  // },5000)
  // setSubmitMessage("Form Submission Success! the account you provided as soon as Coin as been received")
}

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
            src={Logo}
            alt="All Bills Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {pageTitle}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmission}>
            <Networks selected={selected} setSelected={setSelected} networks={networks} title="Select Coin" rate={rate} />
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
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
                  autoComplete="phone"
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                    {email}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event => setEmail(event.target.value))}
                  placeholder='ie. example@emailDomain.com'
                  autoComplete="email"
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="tId" className="block text-sm font-medium leading-6 text-gray-900">
                  Wallet Id
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                    {tId}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="tId"
                  name="tId"
                  type="text"
                  value={tId}
                  onChange={(event => setTId(event.target.value))}
                  placeholder='ie. 1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH'
                  autoComplete="off"
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Amount" className="block text-sm font-medium leading-6 text-gray-900">
                  Amount in USD
                </label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                      You Will Pay: {NigerianNaira.format(price)}
                    </a>
                  </div>
              </div>
              <div className="mt-2">
                <input
                  id="Amount"
                  name="Amount"
                  type="number"
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder='Tell Us How Much You sent'
                  autoComplete="current-password"
                  value={amount}
                  min={"50"}
                  required
                  className="block pl-2 w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='text-center text-sm text-green-600 font-medium'>
                {submitMessage && <div>{submitMessage}</div>}
            </div>
            <div>
              {!subLoad && <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-neutral-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                {pageButton}
              </button>}
              {subLoad && <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-neutral-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
               <FaSpinner className='w-6 animate-spin' />
              </button>}
            </div>
            <div>
              <Link
                to={"/Crypto"}
                className="font-semibold text-yellow-600 hover:text-yellow-500"
              >
                Click Here To Sell Your Crypto
              </Link>
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-bold text-gray-500">
            All Bills Arena&#8482; {' '}
            <a href="#" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
              A Crypto Revolution Has Just Begone
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default FormReUsableCryptoBuy
