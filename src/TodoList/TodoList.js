import React, { useRef, useState } from 'react';
import OpenInputBox from './OpenInputBox/OpenInputBox';
import TaskList from './TaskList/TaskList';
import swal from 'sweetalert';
import UpdateTask from '../UpdateTask/UpdateTask';

const TodoList = () => {

    const [pinTaskList, setPinTaskList] = useState([]);
    const [unPinTaskList, setUnPinTaskList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    //initial input data
    const titleRef = useRef();
    const descRef = useRef();

    //current select task data
    const [currentTitle, setCurrentTitle] = useState([])
    const [currentDesc, setCurrentDesc] = useState([])

    //capture date and time
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    const handleAddTask = (e) => {
        const title = titleRef.current.value;
        const description = descRef.current.value;
        const newTask = { title, description, time, date, complete: false, pin: false }

        fetch(`${process.env.REACT_APP_URL}/task`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.insertedId) {
                    swal("New Task Added!", "Your Task is added successfully", "success");
                    e.target.reset();
                }
            });

        setShowModal(false);
        e.preventDefault()
    }

    const handleEdit = (id, title, desc) => {
        console.log('edit is firedd', id, title, desc);
        setCurrentTitle(title);
        setCurrentDesc(desc);
        setShowEditModal(true)
    }

    return (
        <div className="container mx-auto p-4">
            <div className='sticky top-0 bg-white shadow mb-4 rounded-xl p-4 flex justify-between'>
                <h1 className='text-xl md:text-4xl font-semibold px-3 py-3 '>Add Your Task We will Store It For You ☺</h1>
                <button
                    className="text-purple-600 rounded-full active:bg-purple-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                ><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="#7950EA">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Add Task
                </button>
            </div>
            <div >

                {showModal ? (
                    <>
                        <OpenInputBox
                            handleAddTask={handleAddTask}
                            titleRef={titleRef}
                            descRef={descRef}
                            setShowModal={setShowModal}
                        />
                    </>
                ) : null}

                {showEditModal ? (
                    <>
                        <UpdateTask
                            currentTitle={currentTitle}
                            currentDesc={currentDesc}
                            setShowEditModal={setShowEditModal}
                        />
                    </>
                ) : null}

                <TaskList
                    pinTaskList={pinTaskList}
                    unPinTaskList={unPinTaskList}
                    setPinTaskList={setPinTaskList}
                    setUnPinTaskList={setUnPinTaskList}
                    handleEdit={handleEdit} ></TaskList>
            </div>
        </div>
    );
};

export default TodoList;