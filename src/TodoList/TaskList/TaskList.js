import React, { useEffect } from 'react';
import PinnedTask from '../../PinnedTask/PinnedTask';
import UnPinnedTask from '../../UnPinnedTask/UnPinnedTask';
import swal from 'sweetalert';

const TaskList = ({ pinTaskList, setPinTaskList, unPinTaskList, setUnPinTaskList }) => {

    //task list fetch
    useEffect(() => {

        fetch(`${process.env.REACT_APP_URL}/task`)
            .then(resp => resp.json())
            .then(data => {
                const pinned = []
                const unpinned = []
                for (const task of data) {
                    if (task.pin === true) {
                        pinned.push(task)

                    } else {
                        unpinned.push(task)
                    }
                }
                setPinTaskList(pinned);
                setUnPinTaskList(unpinned);
            });
    }, [unPinTaskList]);

    //complete button event
    const handleCompletebtn = e => {
        const task = document.getElementById(e);
        task.classList.add('complete-text');
        console.log(task.classList);
    }

    //delete button event
    const handleDeletebtn = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const url = `http://localhost:5000/task/${id}`
                fetch(url, {
                    method: "delete"
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.deletedCount > 0) {

                            //this section is unfinished
                            const remainingTasks = unPinTaskList.filter(task => task._id !== id);
                            setUnPinTaskList(remainingTasks);
                        }
                    })
                swal("Your task has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your task is safe!");
            }
        });
    }

    //edit button event
    const handleEdit = () => {
        console.log('edit is fired');
    }



    return (
        <div>
            {/* Pinned Task List */}
            {
                pinTaskList?.length ? <PinnedTask
                    pinTaskList={pinTaskList}
                    handleEdit={handleEdit}
                    handleCompletebtn={handleCompletebtn}
                    handleDeletebtn={handleDeletebtn}
                /> : <></>
            }

            {/* unpinned task list */}
            {
                unPinTaskList?.length ? <UnPinnedTask
                    unPinTaskList={unPinTaskList}
                    handleEdit={handleEdit}
                    handleCompletebtn={handleCompletebtn}
                    handleDeletebtn={handleDeletebtn}
                /> : <></>
            }
        </div>
    );
};

export default TaskList;