import { useState } from 'react'
import { BanknotesIcon, CheckBadgeIcon, ClockIcon } from "@heroicons/react/20/solid"
import { FaUserClock } from "react-icons/fa"
import { AiFillBank } from 'react-icons/ai'
import { RiErrorWarningFill } from 'react-icons/ri'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Status = ({ trackId }) => {
    const [pendingStat, setPendingStat] = useState(false)
    const [confirming, setConfirming] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [err, setErr] = useState(null)

    const url = "https://crypto.allbillsarena.com.ng/api/checkStatus.php";
    const urlHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      const urlBody = JSON.stringify(
        {
            tId: trackId
        }
      )

      fetch(url, {
        method: "POST",
        header: urlHeader,
        body: urlBody
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if(data.data.status !== "success"){
            throw Error(data.data.message)
        }
        if(data.data.data === 'processing') {
            setPendingStat(true)
            setCompleted(false)
            setConfirming(false)
        }
        if(data.data.data === 'received') {
            setPendingStat(false)
            setCompleted(false)
            setConfirming(true)
        }
        if(data.data.data === 'complete') {
            setPendingStat(false)
            setCompleted(true)
            setConfirming(false)
        }
        setErr(null)
      })
      .catch(error => {
        setErr(error.message)
        setCompleted(false)
        setConfirming(false)
        setPendingStat(false)
      })




    return(
        <>
            <h3 className='text-center mb-10 font-semibold'>Transaction Id: <span className='text-yellow-600 cursor-pointer' >{trackId}</span></h3>
            {err && <>
            <ExclamationTriangleIcon className="w-1/6 text-white cursor-wait px-2 py-2 bg-red-600 rounded-full mb-3 mx-auto" />
            <div className="font-semibold text-lg text-center">An error occurred </div>
            <div className="text-sm text-center">{err}</div>
            </>}
            {pendingStat && <>
            <ClockIcon className="w-1/6 text-yellow-600 cursor-wait animate-bounce mx-auto" />
            <div className="font-semibold text-lg text-center">Confirming your Request</div>
            <div className="text-sm text-center">your Request have been submitted</div>
            </>}
            {confirming && <>
            <BanknotesIcon className="w-1/6 text-yellow-600 cursor-wait animate-bounce mx-auto" />
            <div className="font-semibold text-lg text-center">Your request has been confirmed</div>
            <div className="text-sm text-center">We are Sending your funds...</div>
            </>}
            {completed && <>
            <CheckBadgeIcon className="w-1/6 text-green-600 animate-bounce mx-auto" />
            <div className="font-semibold text-lg text-center">Transaction Complete</div>
            <div className="text-sm text-center">We have Successfully sent your funds.</div>
            <div className="flex justify-between">
                <a href="https://wa.link/e3daf4" target='_blank' className="text-yellow-600 text-sm font-semibold">didn't receive funds</a>
                <a href="https://wa.link/qashw7" target='_blank' className="text-yellow-600 text-sm font-semibold">Talk to support</a>
            </div>
            </>}
        </>
    )
}

export default Status