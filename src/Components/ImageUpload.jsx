import { CheckBadgeIcon } from "@heroicons/react/20/solid"
import axios from "axios"
import { useState } from "react"
import { FaSpinner, FaUpload } from "react-icons/fa"


const ImageUpload = ({setDisplayImage, imageHolder, setImageHolder})=> {
    const [tImage, setTImage] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    const handleFileUpload = (e) => {
        setTImage(e.target.files[0])
    }
    console.log(tImage)
    const uploadUrl = "https://crypto.allbillsarena.com.ng/api/upload.php"

    const handleImage = ()=> {
        setIsPending(true)
          const tImages = new FormData();
          tImages.append('image', tImage);
  
          setTimeout(()=> {
            axios.post(uploadUrl, tImages).then(res => {
                if(res.data === '') {
                    throw Error("please make sure you upload an image file")
                }
                if(res.data === 'File is not an image.') {
                    throw Error("File is not an image.")
                }
                if(res.data === 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.') {
                    throw Error("Sorry, only JPG, JPEG, PNG & GIF files are allowed.")
                }
                if(res.data === 'Sorry, your file was not uploaded.') {
                    throw Error("Sorry, your file was not uploaded.")
                }
                if(res.data === 'Sorry, there was an error uploading your file.') {
                    throw Error("Sorry, there was an error uploading your file.")
                }
              setImageHolder(res.data)
              setIsPending(false)
              setErrMsg(null)
          })
          .catch(err => {
              setIsPending(false)
              setErrMsg(err.message)
          })
          }, 900)
        }
    
    return(
        <>
            <div className="fixed z-10 items-center px-2 bg-gray-300/75 w-full h-full flex justify-center">
                <div className="absolute bg-white p-10 z-20 shadow-sm">
                    <input 
                     type="file" 
                     onChange={handleFileUpload} 
                     id=""
                     className="block pl-2 w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                     />
                     {errMsg && <div className="text-xs text-center text-red-600">{errMsg}</div>}
                    <div className="py-1 rounded-md cursor-pointer text-center text-white mt-5 mb-10 bg-yellow-600 text-sm w-2/6" onClick={handleImage}>
                        <span className="inline-block">Upload</span>
                        {!isPending && <FaUpload className="inline-block ml-2" />}
                        {isPending && <FaSpinner className="inline-block animate-spin ml-2" />}
                    </div>
                    {imageHolder && <CheckBadgeIcon className="w-10 absolute bottom-2 animate-bounce text-green-700" />}
                    {imageHolder && <div onClick={()=> setDisplayImage(false)} className="absolute rounded-md bottom-6 bg-blue-700 py-1 px-4 cursor-pointer shadow-sm text-white right-10">Done</div>}
                    {!imageHolder && <div onClick={()=> setDisplayImage(false)} className="absolute rounded-md bottom-6 bg-red-700 py-1 px-4 cursor-pointer shadow-sm text-white right-10">Cancel</div>}
                </div>
            </div>
        </>
    )
}

export default ImageUpload