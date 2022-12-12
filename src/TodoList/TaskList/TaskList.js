import React, { useEffect, useState } from "react";
import PinnedTask from "../../PinnedTask/PinnedTask";
import UnPinnedTask from "../../UnPinnedTask/UnPinnedTask";
import swal from "sweetalert";

const TaskList = ({
  pinTaskList,
  setPinTaskList,
  unPinTaskList,
  setUnPinTaskList,
  handleEdit,
  isDataChange,
  setIsDataChange,
}) => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 6;

  // tasklist and pagination
  useEffect(() => {
    setIsDataChange(isDataChange + 1);
  }, [page]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/task?page=${page}&&size=${size}`)
      .then((resp) => resp.json())
      .then((data) => {
        const pinned = [];
        const unpinned = [];
        for (const task of data?.data?.result) {
          if (task.pin === true) {
            pinned.push(task);
          } else {
            unpinned.push(task);
          }
        }
        const count = data?.data?.totalTask;
        const pageNumber = Math.ceil(count / 6);
        setPageCount(pageNumber);
        setPinTaskList(pinned);
        setUnPinTaskList(unpinned);
        setIsDataChange(isDataChange + 1);
      });
  }, [isDataChange]);

  //complete button event
  const handleCompletebtn = (id) => {
    const task = document.getElementById(id);
    task.classList.add("complete-text");
    const url = `${process.env.REACT_APP_URL}/task/complete/${id}`;
    fetch(url, {
      method: "put",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.data?.modifiedCount > 0) {
          setIsDataChange(isDataChange + 1);
          console.log(data);
          swal(
            "Task complete!",
            "Your task is complete successfully",
            "success"
          );
        } else {
          swal(
            "Task complete Error!",
            "An error occured during the complete operation",
            "error"
          );
        }
      });
  };

  //delete button event
  const handleDeletebtn = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${process.env.REACT_APP_URL}/task/${id}`;
        fetch(url, {
          method: "delete",
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remainingTasks = unPinTaskList.filter(
                (task) => task._id !== id
              );
              setUnPinTaskList(remainingTasks);
              setIsDataChange(1);
            }
          });
        swal("Your task has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your task is safe!");
      }
    });
  };

  return (
    <div>
      {/* Pinned Task List */}
      {pinTaskList?.length ? (
        <PinnedTask
          isDataChange={isDataChange}
          setIsDataChange={setIsDataChange}
          pinTaskList={pinTaskList}
          handleEdit={handleEdit}
          handleCompletebtn={handleCompletebtn}
          handleDeletebtn={handleDeletebtn}
          page={page}
        />
      ) : (
        <></>
      )}

      {/* unpinned task list */}
      {unPinTaskList?.length ? (
        <UnPinnedTask
          isDataChange={isDataChange}
          setIsDataChange={setIsDataChange}
          unPinTaskList={unPinTaskList}
          handleEdit={handleEdit}
          handleCompletebtn={handleCompletebtn}
          handleDeletebtn={handleDeletebtn}
          page={page}
        />
      ) : (
        <>
          {" "}
          <h1
            style={{ marginBottom: -15 }}
            className="text-center my-10 text-xl lg:text-2xl text-purple-700"
          >
            <span className="bg-purple-300 shadow rounded-2xl p-4">
              Task Bar is Empty
            </span>
          </h1>
        </>
      )}

      {/* pagination */}
      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={number === page ? "selected" : ""}
            key={number}
            onClick={() => {
              setPage(number);
            }}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
