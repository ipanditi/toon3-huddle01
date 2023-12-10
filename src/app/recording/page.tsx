"use client"
import { useRef, useState } from "react"

const Page = () => {

    const inputFile = useRef(null)

    const [isOpen, setIsWindowOpen] = useState(false);
    const handleClick = () => {
        setIsWindowOpen(!isOpen)
        inputFile.current.click();



    }

    const onChangeFile = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        console.log(file);

    }


    return (


        <div className="flex h-screen justify-center items-center">



            <div className="w-1/7">
                <button
                    onClick={handleClick}

                    className="flex items-center justify-center bg-yellow-200 text-black rounded-md p-2 mt-2 w-full"            >
                    Toggle File Upload
                </button>

                {isOpen && <div className="mt-8">
                    <input type='file' id='file' ref={inputFile} />



                </div>}
            </div>

        </div>

    )
}

export default Page