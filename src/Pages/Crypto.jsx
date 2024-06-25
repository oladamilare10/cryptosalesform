import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import FormReUsableCrypto from '../Components/FormReUsableCrypto'
import useFetch from '../Components/useFetch'
import { RiLoader5Fill } from 'react-icons/ri'
import * as Ghana from '../assets/GhResponse.json'
import * as Nigeria from '../assets/NgResponse.json'
import * as SAfrica from '../assets/Zaresponse.json'



  const countries = [
    {code: "NG", name: "Nigeria", data: Nigeria},
    {code: "GH", name: "Ghana", data: Ghana},
    {code: "ZA", name: "South Africa", data: SAfrica},
  ]

  const Crypto = () => {
    
  const [bankers, setBankers] = useState(countries[0])


  const country = bankers.data.data





  return (
    <div>
      <Header />
      {/* {error && <div>{error}</div>}
      {isLoading && <RiLoader5Fill className='logo font-bold mt-16 text-indigo-600 hover:text-indigo-500' />} */}
      <FormReUsableCrypto data={country} bankers={bankers} setBankers={setBankers} countries={countries} selectionTitle="Select Bank" pageTitle='Sell Crypto' button='Sell' />
    </div>
  )
}

export default Crypto
