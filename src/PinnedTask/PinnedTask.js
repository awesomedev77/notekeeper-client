import React from "react";
import swal from "sweetalert";
import pin from "../assets/pin.png";
import trash from "../assets/trashbin.apng";
import complete from "../assets/complete.apng";

const PinnedTask = ({
  pinTaskList,
  handleEdit,
  handleCompletebtn,
  handleDeletebtn,
  isDataChange,
  setIsDataChange,
  page,
}) => {
  //unpin button event
  const handleUnPin = (id) => {
    console.log("unpinned", id);
    const url = `${process.env.REACT_APP_URL}/task/unpin/${id}`;
    fetch(url, {
      method: "put",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.data?.modifiedCount > 0) {
          setIsDataChange(isDataChange + 1);
          console.log(data);
          swal(
            "Task Unpinned!",
            "Your task is unpinned successfully",
            "success"
          );
        } else {
          swal(
            "Task unpinned Error!",
            "An error occured during the unpin operation",
            "error"
          );
        }
      });
  };
  return (
    <div
      aria-label="group of cards"
      tabIndex="0"
      className="container mx-auto focus:outline-none py-8 w-full"
    >
      <h1
        style={{ marginBottom: -15 }}
        className="text-center text-xl lg:text-2xl text-purple-700"
      >
        <span className="bg-yellow-300 shadow rounded-2xl p-4">
          Pinned Task of page {page + 1}
        </span>
      </h1>
      <div className="bg-yellow-100 rounded-2xl pt-10 pb-4 px-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-stretch items-center mx-auto">
        {pinTaskList?.map((task) => (
          <div
            key={task._id}
            style={{ borderTopRightRadius: 24 }}
            className="bg-white max-w-xs rounded-md overflow-hidden shadow-lg my-2 mx-auto "
          >
            <div id={task._id} className={{}}>
              <div className="py-4 bg-purple-100 px-6 flex items-start justify-between w-full">
                {/* title section */}
                <div className="w-10/12 pl-2">
                  <p className="focus:outline-none font-semibold leading-normal text-xl leading-5 text-gray-800">
                    {task.title}
                  </p>
                </div>
                {/* pin button */}
                <button
                  onClick={() => {
                    handleUnPin(task._id);
                  }}
                  style={{ marginTop: -15, marginRight: -24 }}
                  className="ml-2 p-1 bg-white hover:bg-purple-300 text-gray-800 font-semibold shadow"
                >
                  <img
                    className="focus:outline-none"
                    style={{ width: 40, height: 40 }}
                    src={pin}
                    alt="pin"
                  />
                </button>
              </div>

              <div
                onClick={() => {
                  handleEdit(task._id, task.title, task.description);
                }}
                style={{ minHeight: 200 }}
                className="hover:shadow-lg hover:bg-indigo-200 px-6 py-3  outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                {/* tagline section */}
                {task.tag ? (
                  <div className="focus:outline-none flex">
                    <div className="py-2 mb-2 px-4 text-md leading-3 text-indigo-700 rounded-full bg-indigo-100">
                      {task.tag}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <p className="text-grey-darker text-base text-justify">
                  {task.description}
                </p>
              </div>
            </div>
            <hr />

            {/* bottom button section   */}
            <div className="bg-gray-100 px-6 py-1 text-right">
              <p className="focus:outline-none text-sm leading-normal pt-2 text-gray-500">
                Last updated in: {task.date} at{" "}
                <span className="text-black font-normal">{task.time}</span>
              </p>

              <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
                <button
                  className="rounded-full"
                  onClick={() => {
                    handleCompletebtn(task._id);
                  }}
                >
                  <img
                    style={{ height: "40px" }}
                    src={complete}
                    alt="Complete"
                  />
                </button>
              </span>
              <span className="rounded-full inline-block bg-grey-lighter rounded-full py-1 text-sm font-semibold text-grey-darker mr-2">
                <button
                  className="rounded-full"
                  onClick={() => {
                    handleDeletebtn(task._id);
                  }}
                >
                  <img style={{ height: "40px" }} src={trash} alt="Delete" />
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedTask;
