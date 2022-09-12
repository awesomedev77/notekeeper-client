import React from 'react';

const UnPinnedTask = ({ unPinTaskList, handleEdit, handleCompletebtn, handleDeletebtn }) => {
    //pin button event
    const handlePin = id => {
        console.log('pinned', id);
        const url = `http://localhost:5000/pin/task/${id}`
        fetch(url, {
            method: "put"
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })

    }
    return (
        <div className='bg-purple-100 rounded-xl p-4 mt-5'>
            <h1 className='text-center text-3xl font-bold text-purple-700'>Unpinned Task</h1>
            {
                unPinTaskList?.map(task => <div key={task._id} className='bg-white grid grid-cols-12 gap-4 content-between p-4 mt-4 rounded-lg shadow hover:shadow-lg hover:bg-indigo-200  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 '>

                    <div onClick={handleEdit} id={task._id} className='col-span-7 md:col-span-9 lg:col-span-10'>
                        <h3 className='capitalize text-2xl font-semibold mb-2 text-purple-600'>{task.title} <small className='text-sm text-gray-600 font-light'>Task Added in: {task.date} at <span className='text-black font-normal'>{task.time}</span></small></h3>
                        <p>{task.description}</p>
                    </div>

                    <div className='col-span-5 md:col-span-3 lg:col-span-2 justify-items-end'>
                        <div className='flex-wrap lg: inline-flex justify-end gap-1'>
                            {/* complete btn  */}
                            <button onClick={() => { handleCompletebtn(task._id) }} className="w-full hover:bg-green-600 hover:text-white bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Complete</button>

                            {/* Edit btn */}
                            <button onClick={() => { handlePin(task._id) }} className="w-full bg-yellow-300 hover:bg-yellow-500 
                            hover:text-white text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">

                                <svg className="fill-current h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                                <span>Pin</span>
                            </button>

                            {/* delete btn */}
                            <button onClick={() => { handleDeletebtn(task._id) }} className="w-full hover:bg-red-600 hover:text-white bg-red-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>Delete
                            </button>
                        </div>

                    </div>
                </div>
                )
            }
        </div>
    );
};

export default UnPinnedTask;