import React, { useState } from 'react'

const SignUp = () => {

    const [input, setInput] = useState({
        Name: '',
        Email: '',
        Password: ''
    })

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setInput(input);
        console.log(input)
        setInput({
            Name: '',
            Email: '',
            Password: ''
        })
    }





    return (

        <div className="relative h-screen w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
            <div className='flex flex-row items-center h-screen justify-center'>
                <div className='bg-slate-200 text-black flex flex-col p-10 rounded-2xl gap-5 min-h-80'>
                    <h1 className='text-4xl'>Welcome to  <span className='text-blue-600'>ClassMate</span></h1>
                    <p className='flex justify-center text-xl'>Sign In to register</p>

                    <input onChange={handleChange} name='Name' value={input.Name} className='p-2 rounded-md' type="text" placeholder='Name' />

                    <input onChange={handleChange} name='Email' value={input.Email} className='p-2 rounded-md' type="text" placeholder='Email' />
                    <input onChange={handleChange} name='Password' value={input.Password} className='p-2 rounded-md' type="password" placeholder='Password' />

                    <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign In</button>

                </div>
            </div>




        </div></div>



    )
}

export default SignUp