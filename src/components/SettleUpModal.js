import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { addExpenseApi } from "./Api";

export default function SettleUpModal({ isModalOpen, closeModal, members, groupCode, isSettleAPICall, setIsSettleAPICall }) {
  const [selectedPayer, setSelectedPayer] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [error, setError] = useState(null);
  const [settlementAmount, setSettlementAmount] = useState(0);

  function handlePayerChange(member) {
    if (selectedReceiver && member.userId === selectedReceiver.userId) {
      setError("Payer and Receiver cannot be the same");
      setSelectedPayer(null);
    } else {
      setError(null);
      setSelectedPayer(member);
    }
  }

  function handleReceiverChange(member) {
    if (selectedPayer && member.userId === selectedPayer.userId) {
      setError("Payer and Receiver cannot be the same");
      setSelectedReceiver(null);
    } else {
      setError(null);
      setSelectedReceiver(member);
    }
  }

  function handleSettleAmount(e) {
    setSettlementAmount(e.target.value);
  }

  function handleSettlement() {
    const requestJson = {
      groupCode,
      description: "Settlement",
      settlementType: "settlement",
      userId_0: selectedPayer.userId,
      userSpent_0: settlementAmount,
      userShare_0: 0,
      userId_1: selectedReceiver.userId,
      userSpent_1: 0,
      userShare_1: settlementAmount,
    };

    addExpenseApi(requestJson)
      .then((response) => {
        setIsSettleAPICall((isSettleAPICall) => !isSettleAPICall);
        closeModal();

      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          className="flex max-w-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Settle Up Expense
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
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

              {/* Modal Body */}
              <div className="p-4 md:p-5">
                {error && <div className="text-red-600">{error}</div>}
                <div>
                  {/* Payer Dropdown */}
                  <div className="w-full flex flex-row justify-between items-center">
                    <Dropdown
                      label={
                        <img
                          className="w-12 h-12 rounded-full"
                          src={
                            selectedPayer?.photo || "../user.png"
                          }
                          alt="Payer Profile"
                        />
                      }
                      dismissOnClick={false}
                      className="mr-2"
                    >
                      {members.map((member) => (
                        <Dropdown.Item
                          key={member.id}
                          onClick={() => handlePayerChange(member)}
                          className="flex items-center"
                        >
                          <img
                            className="w-6 h-6 me-2 rounded-full"
                            src={member.photo}
                            alt={`${member.name}'s image`}
                          />
                          {member.name.split(" ")[0]}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                    <div>
                      <img
                        src="../money.png"
                        alt="Send money direction"
                        className="h-12 w-12"
                      />
                    </div>


                    {/* Receiver Dropdown */}
                    <Dropdown
                      label={
                        <img
                          className="w-12 h-12 rounded-full"
                          src={
                            selectedReceiver?.photo || "../user.png"
                          }
                          alt="Receiver Profile"
                        />
                      }
                      dismissOnClick={false}
                      className="ml-2"
                    >
                      {members.map((member) => (
                        <Dropdown.Item
                          key={member.id}
                          onClick={() => handleReceiverChange(member)}
                          className="flex items-center"
                        >
                          <img
                            className="w-6 h-6 me-2 rounded-full"
                            src={member.photo}
                            alt={`${member.name}'s image`}
                          />
                          {member.name.split(" ")[0]}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </div>

                  {/* Selected Names */}
                  <div className="w-full flex flex-row justify-between">
                    <div>{selectedPayer ? selectedPayer.name.split(" ")[0] : "Select Payer"}</div>
                    <div>{selectedReceiver ? selectedReceiver.name.split(" ")[0] : "Select Receiver"}</div>
                  </div>

                  {/* Settlement Amount */}
                  <div>
                    <label
                      htmlFor="settle"
                      className="w-full block m-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    </label>
                    <input
                      type="number"
                      name="settle"
                      id="settle"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Settlement Amount"
                      onWheel={(e) => e.target.blur()}
                      onChange={handleSettleAmount}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-4 md:p-5 border-t rounded-b dark:border-gray-600">
                {selectedPayer && selectedReceiver && settlementAmount > 0 ? (
                  <button
                    type="button"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSettlement}
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
                    Add Settlement
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-white inline-flex items-center bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled
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
                    Add Settlement
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
