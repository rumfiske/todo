import React from "react";
import { useState, useEffect } from "react";

//Animation når man tilføjer en ny ToDo
import { motion } from "framer-motion";
//Ikoner

import {
  CheckCircleIcon,
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/outline";

//Ratings (Stars) / Priotet
import ReactStars from "react-rating-stars-component";

//Notifikationer
import { toast } from "react-toastify";

function ToDoItems() {
  //UseStates to bind data
  const [titel, settitel] = useState("");
  const [undertitel, setundertitel] = useState("");
  const [priotet, setpriotet] = useState(1);
  const [savedTasks, setsavedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [notater, setnotater] = useState("");
  const [indexOfTask, setindexOfTask] = useState(0);
  const [updates, setupdates] = useState(0);
  const [oldData, setoldData] = useState([]);

  //push new task to tasks array
  function CreateTask() {
    const newTask = {
      titel,
      undertitel,
      notater,
      stars: priotet,
      done: false,
      dato: new Date()
        .toLocaleDateString("da-DK")
        .split(".")

        .join("/"),
      id: tasks?.length + 1,
    };
    setTasks([...tasks, newTask]);
    setupdates(updates + 1);
  }

  //If the length of task is greater than 0, update our local storage
  useEffect(() => {
    if (tasks?.length > 0) {
      localStorage.setItem("savedTasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  //Get tasks from local storage, and makse sure current useState is updated with the tasks from the localstorage
  useEffect(() => {
    setsavedTasks(JSON.parse(localStorage.getItem("savedTasks")));
    if (localStorage.getItem("savedTasks") != null) {
      setTasks(JSON.parse(localStorage.getItem("savedTasks")));
    }
  }, [updates]);

  //Delete task from tasks array, and update local storage
  function removeTask(index) {
    savedTasks.splice(index, 1);
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    setupdates(updates + 1);

    toast.success("Todo Slettet", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  //Update task from tasks array, and update local storage
  function updateTask(index) {
    const newData = {
      titel,
      undertitel,
      notater,
      stars: priotet,
      id: tasks?.length + 1,
    };

    //Insert current data to modal
    savedTasks[index].titel = newData.titel;
    savedTasks[index].undertitel = newData.undertitel;
    savedTasks[index].notater = newData.notater;
    savedTasks[index].stars = newData.stars;

    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    //Opdater UI
    setupdates(updates + 1);

    toast.success(" Todo opdateret", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function markAsDone(index) {
    savedTasks[index].done = true;
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    setupdates(updates + 1);
    toast.success(" Todo færdig", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  function markAsNotDone(index) {
    savedTasks[index].done = false;
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    setupdates(updates + 1);
    toast.success(" Todo ikke færdig", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      {/* Header */} {/* Header */} {/* Header */}
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 max-w-5xl mx-auto">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Todo Liste
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <label
              htmlFor="my-modal-6"
              type="button"
              className="btn relative inline-flex border-0 items-center px-4 py-2  border-transparent drop-shadow shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700  modal-button "
              onClick={() => {
                settitel("");
                setundertitel("");
                setnotater("");
                setShow(!show);
              }}
            >
              <PlusCircleIcon className="w-6 h-6 mr-2" /> Ny Task
            </label>
          </div>
        </div>
      </div>
      {/* Opret ny ToDo Modal */}
      {/* Opret ny ToDo Modal */}
      <div
        className={
          show
            ? "modal modal-bottom sm:modal-middle modal-open"
            : "modal modal-bottom sm:modal-middle "
        }
      >
        <div className="modal-box">
          <h3 className="font-extrabold text-2xl mb-2">Tilføj ny ToDo</h3>
          <XCircleIcon
            className="w-6 h-6 cursor-pointer absolute top-5 right-5"
            onClick={(e) => setShow(false)}
          />
          <div className="form-control">
            <input
              type="text"
              placeholder="Titel"
              value={titel}
              onChange={(e) => settitel(e.target.value)}
              className="input input-bordered w-full  mb-2 focus:outline-0"
            />
            <input
              type="text"
              placeholder="Undertitel"
              value={undertitel}
              onChange={(e) => setundertitel(e.target.value)}
              className="input input-bordered w-full  mb-2 focus:outline-0"
            />
            <textarea
              placeholder="Notater"
              maxLength={500}
              rows={12}
              draggable="false"
              value={notater}
              onChange={(e) => setnotater(e.target.value)}
              className="input input-bordered w-full  mb-2 h-48  focus:outline-0 pt-2 resize-auto resize-none"
            />
            <p className="text-xs">Max bogstaver {500 - notater.length}</p>
            <div className="flex items-center justify-start">
              <p className="mr-2 font-bold">Priotet:</p>
              <ReactStars
                count={5}
                onChange={(e) => {
                  setpriotet(e);
                }}
                isHalf={true}
                size={34}
                activeColor="#ffd700"
              />
            </div>
          </div>
          <div className="modal-action">
            <label
              className="btn border-0 bg-green-500 hover:bg-green-700 btn-block"
              onClick={() => {
                if (titel.length <= 0) {
                  toast.error("😥 Du mangler en titel!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else if (undertitel.length <= 0) {
                  toast.error("😥 Du mangler en undertitel!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else if (notater.length < 5) {
                  toast.error(
                    "😥 Du skal skrive minimum 5 bogstaver, i notater.",
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                } else {
                  CreateTask();
                  toast.success("😃 Din ToDo er blev oprettet.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setShow(false);
                }
              }}
            >
              Opret
            </label>
          </div>
        </div>
      </div>
      {/* Liste over alle todos */}
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {savedTasks?.length > 0 ? (
          savedTasks
            .map((currentTask, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={
                  currentTask.done
                    ? "card card-compact w-full  shadow-xl bg-gray-600 text-gray-400 "
                    : "card card-compact w-full bg-base-100 shadow-xl "
                }
                key={index}
              >
                <figure className="relative">
                  <h3
                    className={
                      currentTask.done
                        ? "w-full h-full bg-gray-700 py-8 text-center text-white font-extrabold"
                        : "w-full h-full bg-blue-600 py-8 text-center text-white font-extrabold"
                    }
                  >
                    {currentTask?.titel}
                    <br />
                    <span className="text-xs">
                      {" "}
                      {currentTask?.dato?.slice(0, 10)}
                    </span>
                  </h3>

                  <span
                    className="top-2 absolute right-2 "
                    htmlFor="my-modal-7"
                    type="button"
                    onClick={() => {
                      setShow2(!show);
                      setindexOfTask(index);
                      setoldData(
                        currentTask?.titel,
                        currentTask?.undertitel,
                        currentTask?.notater,
                        currentTask?.priotet
                      );
                      settitel(currentTask?.titel);
                      setundertitel(currentTask?.undertitel);
                      setnotater(currentTask?.notater);
                    }}
                  >
                    <PencilAltIcon className="w-6 h-6 text-white cursor-pointer" />
                  </span>
                  <span
                    className="top-8 absolute right-2 "
                    htmlFor="my-modal-7"
                    type="button"
                    onClick={() => removeTask(index)}
                  >
                    <TrashIcon className="w-6 h-6 text-white cursor-pointer" />
                  </span>
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{currentTask?.undertitel}</h2>

                  <p className="text-sm italic font-light">
                    {currentTask?.notater}
                  </p>
                  <div className="flex items-center justify-start">
                    <p className="mr-2 font-bold">Priotet:</p>
                    <ReactStars
                      count={5}
                      value={currentTask?.stars}
                      isHalf={true}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div className="card-actions justify-end">
                    {currentTask?.done ? (
                      ""
                    ) : (
                      <button
                        className="btn bg-green-600 border-0 font-bold"
                        onClick={() => markAsDone(index)}
                      >
                        <CheckCircleIcon className="w-6 h-6 mr-2" /> færdig
                      </button>
                    )}

                    {currentTask?.done ? (
                      <button
                        className="btn bg-amber-600 border-0 font-bold"
                        onClick={() => markAsNotDone(index)}
                      >
                        <CheckCircleIcon className="w-6 h-6 mr-2" /> Ikke færdig
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </motion.div>
            ))
            .reverse()
        ) : (
          <h2>Du har ingen tasks</h2>
        )}
      </div>
      {/* Opdater ToDo Modal */} {/* Opret ny ToDo Modal */}
      <input type="checkbox" id="my-modal-7" className="modal-toggle " />
      <div
        className={
          show2
            ? "modal modal-bottom sm:modal-middle modal-open"
            : "modal modal-bottom sm:modal-middle "
        }
      >
        <div className="modal-box relative">
          <h3 className="font-extrabold text-2xl mb-2">Rediger ToDo</h3>

          <XCircleIcon
            className="w-6 h-6 cursor-pointer absolute top-5 right-5"
            onClick={(e) => setShow2(false)}
          />

          <div className="form-control">
            <input
              type="text"
              placeholder="Titel"
              value={titel}
              onChange={(e) => settitel(e.target.value)}
              className="input input-bordered w-full  mb-2 focus:outline-0"
            />
            <input
              type="text"
              placeholder="Undertitel"
              value={undertitel}
              onChange={(e) => setundertitel(e.target.value)}
              className="input input-bordered w-full  mb-2 focus:outline-0"
            />
            <textarea
              placeholder="Notater"
              maxLength={500}
              rows={12}
              draggable="false"
              value={notater}
              onChange={(e) => setnotater(e.target.value)}
              className="input input-bordered w-full  mb-2 h-48  focus:outline-0 pt-2 resize-auto resize-none"
            />
            <p className="text-xs">Max bogstaver {500 - notater.length}</p>
            <div className="flex items-center justify-start">
              <p className="mr-2 font-bold">Priotet:</p>
              <ReactStars
                count={5}
                onChange={(e) => {
                  setpriotet(e);
                  console.log(e);
                }}
                isHalf={true}
                size={34}
                activeColor="#ffd700"
              />
            </div>
          </div>
          <div className="modal-action">
            <label
              className="btn border-0 bg-green-500 hover:bg-green-700 btn-block"
              onClick={() => {
                if (titel.length <= 0) {
                  toast.error("😥 Du mangler en titel!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else if (undertitel.length <= 0) {
                  toast.error("😥 Du mangler en undertitel!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else if (notater.length < 5) {
                  toast.error(
                    "😥 Du skal skrive minimum 5 bogstaver, i notater.",
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                } else {
                  updateTask(indexOfTask);

                  setShow2(false);
                }
              }}
            >
              Opdater
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoItems;
