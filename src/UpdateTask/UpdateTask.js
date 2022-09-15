import React from 'react';
import { useRef } from 'react';
import swal from 'sweetalert';

const UpdateTask = ({ id, setShowEditModal, currentTitle, currentDesc, time, date }) => {

    //update input data
    const updateTitleRef = useRef();
    const updatedescRef = useRef();

    const handleUpdateTask = e => {
        const title = updateTitleRef.current.value;
        const description = updatedescRef.current.value;
        const updateData = { title, description, time, date };

        fetch(`${process.env.REACT_APP_URL}/task/update/${id}`, {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateData)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.modifiedCount) {
                    swal("Task Updated!", "Your Task is updated successfully", "success");
                    e.target.reset();
                }
            });

        setShowEditModal(false);
        e.preventDefault()
    }
    return (
        <div>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                        <form onSubmit={handleUpdateTask}>
                            {/*header*/}
                            <div className="p-5 border-b border-solid border-slate-200 rounded-t">
                                <label htmlFor="task-title" className="form-label text-2xl font-semibold mb-2 text-gray-700"
                                >Task Title </label>
                                <input id="task-title"
                                    ref={updateTitleRef}
                                    defaultValue={currentTitle}
                                    type="text"
                                    placeholder="Add your task title"
                                    className="text-2xl font-semibold px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />

                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <label htmlFor="task-description" className="form-label text-lg font-semibold mb-2 text-gray-700"
                                >Task Description </label>

                                <textarea
                                    ref={updatedescRef}
                                    defaultValue={currentDesc}
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                    id="task-description"
                                    rows="3"
                                    placeholder="Write your task details here"
                                ></textarea>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Close
                                </button>
                                <button type="submit"
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                > Save Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
};

export default UpdateTask;