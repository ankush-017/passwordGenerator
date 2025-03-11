import React, { useCallback, useEffect, useState } from 'react';

function Password() {

    const [Length, setLength] = useState(8);
    const [Number, setNumber] = useState(false);
    const [Char, setChar] = useState(false);
    const [Password, setPassword] = useState("");

    const [copy,setcopy] = useState(false);

    const passwordGenerator = ()=>{

        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(Number){
            str += "1234567890";
        }
        if(Char){
            str += ")(*&^%$#@!~+_}][{|\?/><.,";
        }
        for(let i=1;i<=Length;i++){
            let idx = Math.floor(Math.random()*str.length)
            pass += str[idx];
        }

        setPassword(pass);
    }

    const CopyClipboard = useCallback(()=>{

        window.navigator.clipboard.writeText(Password);
        setcopy(true);

        setTimeout(()=> setcopy(false),1000); // reset after 2sec

    },[Password]);

    useEffect(()=>{

        passwordGenerator();

    },[Length,Number,Char])

    return (
        <div className='h-screen w-full bg-black flex flex-col justify-center items-center'>
            <h1 className='text-white text-2xl font-bold mb-6'>Password Generator</h1>

            <div className='bg-[#2c092e] px-7 py-5 rounded-lg w-96 shadow-lg'>
                {/* Input Field */}
                <div className='flex'>
                    <input
                        type="text"
                        value={Password}
                        className='w-full p-2 rounded-l-md outline-none text-lg placeholder-orange-600 text-center'
                        placeholder='Generated Password'
                        readOnly
                    />
                    <button className={`${copy? "bg-red-700":"bg-yellow-800"} px-2 rounded-r-md text-white font-semibold outline-none`} onClick={CopyClipboard} 
                         >{copy?"Copied":"Copy"}</button>
                </div>

                {/* Options */}
                <div className='flex flex-col gap-4 mt-5 text-white'>
                    {/* Length Slider */}
                    <div className='flex gap-5 items-center justify-center'>
                        <input id='len' type="range" className='cursor-pointer appearance-none bg-pink-800 h-3 rounded-lg accent-white'
                            min={5} max={20} value={Length} onChange={(e) => { setLength(e.target.value) }} />
                        <label htmlFor="len" className='cursor-pointer items-center text-yellow-500 font-semibold'>Length({Length})</label>
                    </div>

                    {/* Checkboxes */}
                    <div className='flex gap-9 justify-center'>
                        <div className='flex items-center gap-2'>
                            <input id='number' type="checkbox" className='cursor-pointer' defaultChecked={Number}
                                onChange={() => {
                                    setNumber((prev) => !prev)
                                }} />
                            <label htmlFor="number" className='cursor-pointer text-yellow-500 font-semibold'>Numbers</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input id='char' type="checkbox" className='cursor-pointer' defaultChecked={Char}
                                onChange={() => {
                                    setChar((prev) => !prev)
                                }} />
                            <label htmlFor="char" className='cursor-pointer text-yellow-500 font-semibold'>Characters</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Password;