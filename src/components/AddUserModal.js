import { useState } from "react";

export default function AddExpenseModal({ isModalOpen, closeModal }) {
  const [tempUsers, setTempUsers] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    closeModal();
  };

  function addUsers() {
    const hasEmpty = tempUsers.some((u) => u.trim() === "");

    if (hasEmpty) {
      setErrorMessage("Fill all names or delete empty ones before submitting");
      return;
    }
    setErrorMessage("");
    //api to save temp users
    setTempUsers([""]);
    handleCloseModal();
    return;
  }

  function handleUsersChange(e, i) {
    setTempUsers((prev) =>
      prev.map((v, idx) => (idx === i ? e.target.value : v))
    );
  }

  return (
    <>
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center ml-3 mr-3 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full rounded-lg bg-white shadow-lg shadow-red-950/10">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Members
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    handleCloseModal();
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
              <div className="p-4 md:p-5">
                {errorMessage && (
                  <p className="w-[95%] text-red-600 dark:text-red-400 text-sm mb-2 px-2 py-1 bg-red-50 dark:bg-red-900 rounded">
                    {errorMessage}
                  </p>
                )}
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Names
                    </label>
                    {tempUsers.map((t, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          name="users"
                          className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Name of Member"
                          value={t}
                          onChange={(e) => handleUsersChange(e, i)}
                        />
                        {tempUsers.length !== 1 && (
                          <button
                            onClick={() =>
                              setTempUsers((prev) =>
                                prev.filter((_, idx) => idx !== i)
                              )
                            }
                            className="text-red-500 hover:text-red-700 font-bold text-lg"
                          >
                            ✖
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full flex my-4">
                  <div className="w-[90%] flex justify-between items-start gap-8">
                    <div className="flex gap-3 items-center mt-3">
                      <button
                        onClick={() => setTempUsers((prev) => [...prev, ""])}
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                        Add Users
                      </button>
                      <button
                        onClick={addUsers}
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
