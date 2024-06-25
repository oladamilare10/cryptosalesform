import React from 'react'
import Header from '../Components/Header'
import FormReUsableCryptoBuy from '../Components/FormReUsableCryptoBuy'
import { useEffect } from 'react'
import useFetch from '../Components/useFetch'
import { useParams } from 'react-router-dom'

const BuyCrypto = () => {
  return (
    <div>
      <Header />
      <FormReUsableCryptoBuy pageTitle='Buy Crypto' button='Buy' />
    </div>
  )
}

export default BuyCrypto
