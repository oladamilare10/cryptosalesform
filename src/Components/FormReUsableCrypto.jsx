import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ArrowPathIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Networks from './Networks'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from './useFetch'
import PayPopUp from './PayPopUp'
import { AiFillSlackCircle } from 'react-icons/ai'
import Logo from '../assets/All-Bills-Arena-logos_black-e1695771379443.png'
import BitcoinBar from '../assets/bitCoin.svg'
import EthereumBar from '../assets/ETH.svg'
import UsdtBar from '../assets/usdtCode.svg'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'
import ImageUpload from './ImageUpload'

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
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const FormReUsableCrypto = (props) => {
const count = props.data;
const pageTitle = props.pageTitle
const pageButton = props.button
const country = count
const countries = props.countries
const bankers = props.bankers
const setBankers = props.setBankers
const selectionTitle = props.selectionTitle
const rate = 1000
const [amount, setAmount] = useState(false)
const [phone, setPhone] = useState("")
const [email, setEmail] = useState("")
const [bank, setBank] = useState(country[0])
const [number, setNumber] = useState("")
const [submitMessage, setSubmitMessage] = useState(null)
const [selected, setSelected] = useState(networks[0])
const [barCode, setBarCode] = useState(null)
const [cryptoAddress, setCryptoAddress] = useState(null)
const [subLoad, setSubLoad] = useState(false)
const [tImage, setTImage] = useState(null)
const [isPending, setIsPending] = useState(false)
const [atmTF, setAtmTF] = useState(false)
const [displayImage, setDisplayImage] = useState(false)
const [imageHolder, setImageHolder] = useState(null)
const price = amount * rate;
let NigerianNaira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN'
})
  const navigate = useNavigate()

const sellUrl = "https://crypto.allbillsarena.com.ng/api/sell.php"
const uploadUrl = "https://crypto.allbillsarena.com.ng/api/upload.php"
const url = 'https://api.ufitpay.com/v1/bank_validate'
const method = 'POST'
const urlHeader = {
    'Content-Type': 'application/json',
    'Api-Key': 'pub-0WB98vJPCcMsJPviZsNGRLQylMCG0kFL',
    'Api-Token': 'sec-soNdkopsFWVLUTEFefvV2KS7QLoO03SQ'
}
const urlBody = JSON.stringify({
  account_number: number,
  bank_code: bank.code
});
const {data: acc, isLoading, error} = useFetch(url, method, urlHeader, urlBody)


if (selected.id === 1) {
  setTimeout(()=> {
    setCryptoAddress(null)
    setBarCode(null)
  }, 200)
}
if (selected.id === 2) {
  setTimeout(()=> {
    setCryptoAddress("bc1qu07zyc65a2u6pdw29nfmmt5yg863nys570j4cp")
    setBarCode(BitcoinBar)
  }, 300)
}
if (selected.id === 3) {
  setTimeout(()=> {
    setCryptoAddress("0xEbb5c7aecBa984392A6F0F3c03724609aD7db7a7")
    setBarCode(EthereumBar)
  }, 300)
}
if (selected.id === 4) {
  setTimeout(()=> {
    setCryptoAddress("0xEbb5c7aecBa984392A6F0F3c03724609aD7db7a7")
    setBarCode(UsdtBar)
  }, 300)
}
const handleSubmission = (event) => {
  event.preventDefault();
  
  const tId = Math.random().toString(16).slice(2)
  
  setSubLoad(true)
  const urlHeader2 = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }


  const sellBody = JSON.stringify(
    {
      coin: selected.name,
      phone: phone,
      email: email,
      tId: tId,
      amount: amount,
      ngn_amount: NigerianNaira.format(price),
      bank: acc.data.bank,
      account_number: acc.data.account_number,
      accName: acc.data.account_name,
      tImage: "https://crypto.allbillsarena.com.ng/api/" + imageHolder
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
          setSubmitMessage("Your request has been sent, redirecting in a second...")
          setTimeout(() => {
            setSubLoad(false)
            navigate("/transaction/"+ tId)
          }, 3000);
        }
    })
    .catch(err => {
        console.log(err)
        setSubLoad(false)
    })

  
}
  return (
    <>      
      {displayImage && <ImageUpload setDisplayImage={setDisplayImage} imageHolder={imageHolder} setImageHolder={setImageHolder} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={Logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {pageTitle}
          </h2>
        </div>
        {!atmTF && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='mx-auto text-center'>
            <div className='cursor-pointer inline-block text-center text-sm font-semibold px-5 py-2 bg-gray-300 border border-black-100' onClick={() => setAtmTF(false)}>App Transfer</div>
            <div className='cursor-pointer inline-block text-center text-sm font-semibold px-5 py-2 bg-gray-100 border border-black-100' onClick={() => setAtmTF(true)}>ATM Transfer</div>
          </div>
        </div>}
        {atmTF && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='mx-auto text-center'>
            <div className='cursor-pointer inline-block text-center text-sm font-semibold px-5 py-2 bg-gray-100 border border-black-100' onClick={() => setAtmTF(false)}>App Transfer</div>
            <div className='cursor-pointer inline-block text-center text-sm font-semibold px-5 py-2 bg-gray-300 border border-black-100' onClick={() => setAtmTF(true)}>ATM Transfer</div>
          </div>
        </div>}
        {atmTF && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='mx-auto text-left text-xs transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer bg-yellow-100 p-2 border border-yellow-600'>
            Note: A transaction at a Bitcoin ATM normally entails a service charge of 7% to 20% and a
             spread applied directly to the 
            Bitcoin price 
            (this is specifically for ATMs that use exchanges to expedite their transfer).
          </div>
        </div>}

        {!atmTF && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmission} encType='multipart/form-data'>
            {barCode && <img src={barCode} alt="" />}
            {cryptoAddress && <span className='text-gray-700 bg-yellow-300' style={{fontSize: "80%", padding: "2px 5px", borderRadius: "5px"}}>{cryptoAddress}</span>}
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
                  Upload Screenshot
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                    
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <div
                  id="tId"
                  type="file"
                  onClick={()=> setDisplayImage(true)}
                  className="block pl-2 w-full font-semibold cursor-pointer bg-yellow-500 text-center rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                >Upload Image</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Amount" className="block text-sm font-medium leading-6 text-gray-900">
                  Amount in USD
                </label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                      You Will Receive: {NigerianNaira.format(price)}
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
            {countries && <Listbox value={bankers} onChange={setBankers}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-7 text-gray-900">Select Country</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">{bankers.name}</span>
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {countries.map((banker) => (
                          <Listbox.Option
                            key={banker.code}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-yellow-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={banker}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                  >
                                    {banker.name}
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
            </Listbox>}



            {country && <Listbox value={bank} onChange={setBank}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-7 text-gray-900">{selectionTitle}</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">{bank.name}</span>
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {country.map((banks) => (
                          <Listbox.Option
                            key={banks.code}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-yellow-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={banks}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                  >
                                    {banks.name}
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
            </Listbox>}

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="tId" className="block text-sm font-medium leading-6 text-gray-900">
                  Account Number/ID
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                    {isLoading && <div>Loading</div>}
                    {error || number && <div>{error}</div>}
                    {acc && <div>{acc.data.account_name}</div>}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="tId"
                  name="tId"
                  type="text"
                  value={number}
                  onChange={(event => setNumber(event.target.value))}
                  placeholder='ie. 1234567890'
                  autoComplete="off"
                  maxLength={'10'}
                  minLength={10}
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className='text-center text-sm text-green-600 font-medium'>
                {submitMessage && <PayPopUp title="Request Sent!" text={submitMessage} />}
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
                className="flex cursor-wait w-full justify-center rounded-md bg-neutral-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
               <FaSpinner className='w-6 animate-spin' />
              </button>}
            </div>
            <div>
              <Link
                to={"/Crypto/Buy"}
                className="font-semibold text-yellow-600 hover:text-yellow-500"
              >
                Click Here To Buy Crypto
              </Link>
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-bold text-gray-500">
            All Bills Arena&#8482; {' '}
            <a href="#" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
              A Crypto Revolution Has Just Begone
            </a>
          </p>
        </div>}


        {atmTF && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmission} encType='multipart/form-data'>
            {barCode && <img src={barCode} alt="" />}
            {cryptoAddress && <span className='text-gray-700 bg-yellow-300' style={{fontSize: "80%", padding: "2px 5px", borderRadius: "5px"}}>{cryptoAddress}</span>}
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
                  Upload Screenshot
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                    
                  </a>
                </div>
              </div>
              <div className="mt-2">
              <div
                  id="tId"
                  type="file"
                  onClick={()=> setDisplayImage(true) }
                  className="block pl-2 w-full font-semibold cursor-pointer bg-yellow-500 text-center rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                >Upload Image</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Amount" className="block text-sm font-medium leading-6 text-gray-900">
                  Amount in USD
                </label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                      You Will Receive: {NigerianNaira.format(price)}
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

            {countries && <Listbox value={bankers} onChange={setBankers}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-7 text-gray-900">Select Country</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">{bankers.name}</span>
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {countries.map((banker) => (
                          <Listbox.Option
                            key={banker.code}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-yellow-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={banker}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                  >
                                    {banker.name}
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
            </Listbox>}

            {country && <Listbox value={bank} onChange={setBank}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-7 text-gray-900">{selectionTitle}</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">{bank.name}</span>
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {country.map((banks) => (
                          <Listbox.Option
                            key={banks.code}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-yellow-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={banks}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                  >
                                    {banks.name}
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
            </Listbox>}

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="tId" className="block text-sm font-medium leading-6 text-gray-900">
                  Account Number/ID
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                    {isLoading && <div>Loading</div>}
                    {error || number && <div>{error}</div>}
                    {acc && <div>{acc.data.account_name}</div>}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="tId"
                  name="tId"
                  type="text"
                  value={number}
                  onChange={(event => setNumber(event.target.value))}
                  placeholder='ie. 1234567890'
                  autoComplete="off"
                  maxLength={'10'}
                  minLength={10}
                  required
                  className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className='text-center text-sm text-green-600 font-medium'>
                {submitMessage && <PayPopUp title="Request Sent!" text={submitMessage} />}
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
                to={"/Crypto/Buy"}
                className="font-semibold text-yellow-600 hover:text-yellow-500"
              >
                Click Here To Buy Crypto
              </Link>
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-bold text-gray-500">
            All Bills Arena&#8482; {' '}
            <a href="#" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
              A Crypto Revolution Has Just Begone
            </a>
          </p>
        </div>}
      </div>
    </>
  )
}

export default FormReUsableCrypto
