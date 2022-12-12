import React, { useRef, useState } from "react";
import OpenInputBox from "./OpenInputBox/OpenInputBox";
import TaskList from "./TaskList/TaskList";
import swal from "sweetalert";
import UpdateTask from "../UpdateTask/UpdateTask";
import add from "../assets/add.apng";

const TodoList = () => {
  const [isDataChange, setIsDataChange] = useState(0); //it will load data from db if any data is changed
  const [pinTaskList, setPinTaskList] = useState([]); //store pinned task
  const [unPinTaskList, setUnPinTaskList] = useState([]); //store unpinned task
  const [showModal, setShowModal] = useState(false); //open up the input modal
  const [showEditModal, setShowEditModal] = useState(false); //open up edit modal

  //initial input data
  const titleRef = useRef();
  const taglineRef = useRef();
  const descRef = useRef();

  //current select task data
  const [updateId, setUpdateId] = useState([]);
  const [currentTag, setCurrentTag] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);
  const [currentDesc, setCurrentDesc] = useState([]);

  //capture date and time
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  // New task add button
  const handleAddTask = (e) => {
    const title = titleRef.current.value;
    const tag = taglineRef.current.value;
    const description = descRef.current.value;
    const newTask = {
      title,
      tag,
      description,
      time,
      date,
      complete: false,
      pin: false,
    };

    fetch(`${process.env.REACT_APP_URL}/task`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.data?._id) {
          setIsDataChange(isDataChange + 1);
          swal("New Task Added!", "Your Task is added successfully", "success");
          e.target.reset();
        }
      });

    setShowModal(false);
    e.preventDefault();
  };

  const handleEdit = (id, tag, title, desc) => {
    setUpdateId(id);
    setCurrentTag(tag);
    setCurrentTitle(title);
    setCurrentDesc(desc);
    setShowEditModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 bg-white shadow mb-4 rounded-xl p-2 flex justify-between">
        <h1 className="text-xl md:text-3xl h-full font-semibold p-3 my-auto">
          “If you do not write the thoughts of the moments, it is lost forever.”
        </h1>
        {/* task add button */}
        <button
          className="hover:bg-purple-100 text-purple-600 rounded-full font-bold uppercase text-sm px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <img style={{ width: 100 }} src={add} alt="+" />
          Add Task
        </button>
      </div>
      <div>
        {/* input modal */}
        {showModal ? (
          <>
            <OpenInputBox
              handleAddTask={handleAddTask}
              titleRef={titleRef}
              descRef={descRef}
              taglineRef={taglineRef}
              setShowModal={setShowModal}
            />
          </>
        ) : null}
        {/* update modal */}
        {showEditModal ? (
          <>
            <UpdateTask
              id={updateId}
              time={time}
              date={date}
              currentTitle={currentTitle}
              currentTag={currentTag}
              currentDesc={currentDesc}
              setShowEditModal={setShowEditModal}
            />
          </>
        ) : null}
        {/* task section */}
        <TaskList
          isDataChange={isDataChange}
          setIsDataChange={setIsDataChange}
          pinTaskList={pinTaskList}
          unPinTaskList={unPinTaskList}
          setPinTaskList={setPinTaskList}
          setUnPinTaskList={setUnPinTaskList}
          handleEdit={handleEdit}
        ></TaskList>
      </div>
    </div>
  );
};

export default TodoList;
