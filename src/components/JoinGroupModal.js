import { useState } from "react";
import { getDummyUsers, joinGroupApi } from "./Api";
import DummyDropdown from "./DummyDropdown";

export default function JoinGroupModal({ isModalOpen, closeModal }) {
  const [groupCode, setGroupCode] = useState("");
  const [error, setError] = useState(null);
  const [checkingGroup, setCheckingGroup] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [dummyUsers, setDummyUsers] = useState([]);
  const [selected, setSelected] = useState(-1);

  function checkGroup() {
    setCheckingGroup(true);
    if (groupCode !== "") {
      getDummyUsers(groupCode)
        .then((res) => {
          setCheckingGroup(false);
          setDummyUsers(res.data);
          setShowJoin(true);
        })
        .catch((e) => {
          setCheckingGroup(false);
          setError(e.response.data);
        });
    } else {
      setError("Group code cannot be empty");
    }
  }

  function joinGroup() {
    if (groupCode !== "") {
      joinGroupApi(groupCode, selected ? selected.userId : null).then(() => {
        closeModal();
        setShowJoin(false);
        setSelected(-1);
      });
    } else {
      setError("Group code cannot be empty");
    }
  }

  return (
    <div className="">
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Join Group
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    closeModal();
                    setShowJoin(false);
                    setSelected(-1);
                    if (error != null) setError(null);
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {error != null && (
                <div style={{ color: "red" }} className="">
                  {error}
                </div>
              )}
              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  {!showJoin && (
                    <div className="col-span-2">
                      <label
                        htmlFor="groupCode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Group Code
                      </label>
                      <input
                        type="text"
                        name="groupCode"
                        id="groupCode"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Group Code"
                        onChange={(e) => {
                          setGroupCode(e.target.value);
                          if (error != null) setError(null);
                        }}
                        required
                      />
                    </div>
                  )}
                  {showJoin && (
                    <div className="col-span-2">
                      <label
                        htmlFor="groupCode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Who are you in Group{" "}
                        <span style={{ fontWeight: "bold" }}>{groupCode}</span>?
                      </label>
                      <DummyDropdown
                        dummyUsers={dummyUsers}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </div>
                  )}
                </div>
                {!showJoin && (
                  <button
                    disabled={checkingGroup}
                    onClick={checkGroup}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Check
                  </button>
                )}
                {showJoin && (
                  <button
                    onClick={joinGroup}
                    disabled={selected === -1}
                    className="text-white inline-flex items-center bg-blue-600 hover:bg-blue-800 disabled:hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Join
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
