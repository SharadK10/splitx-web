import { useEffect, useRef, useState } from "react";
import { Dropdown } from "flowbite";
import { addExpenseApi } from "./Api";

export default function SettleUpModal({ isModalOpen, closeModal, members, groupCode }) {
  const dropdownMenuRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const dropdownMenuRef2 = useRef(null);
  const dropdownButtonRef2 = useRef(null);
  const [selectedPayer, setSelectedPayer] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [error, setError] = useState(null);
  const [settlementAmount, setSettlementAmount] = useState(0);

  function handlePayerChange(member) {
    if (selectedReceiver != null && member.userId === selectedReceiver.userId) {
      setError("Payer and Receiver can not be same");
      setSelectedPayer(null);
    } else {
      setError(null);
      setSelectedPayer(member);
    }
  }

  function handleReceiverChange(member) {
    if (selectedPayer != null && member.userId === selectedPayer.userId) {
      setError("Payer and Receiver can not be same");
      setSelectedReceiver(null);
    } else {
      setError(null);
      setSelectedReceiver(member);
    }
  }

  function handleSettleAmount(e) {
    setSettlementAmount(e.target.value);
  }

  useEffect(() => {
    if (dropdownMenuRef.current && dropdownButtonRef.current) {
      const dropdown = new Dropdown(
        dropdownMenuRef.current,
        dropdownButtonRef.current,
        {
          placement: "bottom",
          triggerType: "click",
          offsetSkidding: 0,
          offsetDistance: 10,
          delay: 300,
          ignoreClickOutsideClass: false,
          onHide: () => {
            console.log("Dropdown has been hidden");
          },
          onShow: () => {
            console.log("Dropdown has been shown");
          },
          onToggle: () => {
            console.log("Dropdown has been toggled");
          },
        },
        {
          id: "dropdownMenu",
          override: true,
        }
      );

      // Clean up the dropdown instance on component unmount
      return () => {
        dropdown.hide();
      };
    }
  }, [dropdownMenuRef.current, dropdownButtonRef.current]);

  useEffect(() => {
    if (dropdownMenuRef2.current && dropdownButtonRef2.current) {
      const dropdown2 = new Dropdown(
        dropdownMenuRef2.current,
        dropdownButtonRef2.current,
        {
          placement: "bottom",
          triggerType: "click",
          offsetSkidding: 0,
          offsetDistance: 10,
          delay: 300,
          ignoreClickOutsideClass: false,
          onHide: () => {
            console.log("Dropdown has been hidden");
          },
          onShow: () => {
            console.log("Dropdown has been shown");
          },
          onToggle: () => {
            console.log("Dropdown has been toggled");
          },
        },
        {
          id: "dropdownMenu2",
          override: true,
        }
      );

      // Clean up the dropdown instance on component unmount
      return () => {
        dropdown2.hide();
      };
    }
  }, [dropdownMenuRef2.current, dropdownButtonRef2.current]);

  function handleSettlement() {
    var requestJson = {};
        requestJson["groupCode"] = groupCode;
        requestJson["description"] = "Settlement";
        requestJson["settlementType"] = "settlement"
        requestJson["userId_0"] = selectedPayer.userId;
        requestJson["userSpent_0"] = settlementAmount;
        requestJson["userShare_0"] = 0;
        requestJson["userId_1"] = selectedReceiver.userId;
        requestJson["userSpent_1"] = 0;
        requestJson["userShare_1"] = settlementAmount;

        addExpenseApi(requestJson).then((response) => {
          closeModal();
          console.log(response);
        }).catch((error) => {
          console.error(error);
        })
  }

  console.log("payer", selectedPayer);
  console.log("receiver", selectedReceiver);
  console.log("amount", settlementAmount);

  return (
    <>
      {isModalOpen && (
        <div
          id="crud-modal"
          tabindex="-1"
          //   aria-hidden="true"
          class="flex max-w-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Settle Up Expense
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                  onClick={closeModal}
                >
                  <svg
                    class="w-3 h-3"
                    // aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5">
                {error != null && <div className="text-red-600">{error}</div>}
                <div class="grid-cols-2">
                  <div className="w-96 flex flex-row justify-between items-center m-auto">
                    <div className="flex">
                      <button
                        id="dropdownButton"
                        ref={dropdownButtonRef}
                        className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                      >
                        <a href="#">
                          <img
                            className="w-16 h-16 rounded-full"
                            src={
                              selectedPayer == null ||
                              selectedPayer.photo == null
                                ? "../user-logo.svg"
                                : selectedPayer.photo
                            }
                            alt="User Profile"
                          />
                        </a>
                      </button>

                      <div
                        id="dropdownMenu"
                        ref={dropdownMenuRef}
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul>
                          {members.map((member) => (
                            <li key={member.id}>
                              <label
                                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                onClick={() => handlePayerChange(member)}
                              >
                                <input
                                  type="radio"
                                  name="selectedPayer"
                                  value={member.id}
                                  className="hidden"
                                />
                                <img
                                  className="w-6 h-6 me-2 rounded-full"
                                  src={member.photo}
                                  alt="User's image"
                                />
                                {member.name.split(" ")[0]}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex">
                      <img
                        src="../arrow.svg"
                        alt="Right Arrow"
                        className="h-8 w-8"
                      />
                    </div>

                    <div className="flex">
                      <button
                        id="dropdownButton2"
                        ref={dropdownButtonRef2}
                        className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                      >
                        <a href="#">
                          <img
                            className="w-16 h-16 rounded-full"
                            src={
                              selectedReceiver == null ||
                              selectedReceiver.photo == null
                                ? "../user-logo.svg"
                                : selectedReceiver.photo
                            }
                            alt="User Profile"
                          />
                        </a>
                      </button>

                      <div
                        id="dropdownMenu2"
                        ref={dropdownMenuRef2}
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul
                          class="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownButton"
                        >
                          {members.map((member) => {
                            return (
                              <li key={member.id}>
                                <label
                                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                  onClick={() => handleReceiverChange(member)}
                                >
                                  <input
                                    type="radio"
                                    name="selectedPayer"
                                    value={member.id}
                                    className="hidden"
                                  />
                                  <img
                                    className="w-6 h-6 me-2 rounded-full"
                                    src={member.photo}
                                    alt="User's image"
                                  />
                                  {member.name.split(" ")[0]}
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className=" w-96 flex flex-row justify-between">
                    {selectedPayer == null ? (
                      <div>Select Payer</div>
                    ) : (
                      <div>{selectedPayer.name.split(" ")[0]}</div>
                    )}
                    <div>
                      {selectedReceiver == null
                        ? "Select Receiver"
                        : selectedReceiver.name.split(" ")[0]}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="settle"
                      className="w-full block m-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount:
                    </label>
                    <input
                      type="number"
                      name="settle"
                      id="settle"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Settlement Amount"
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => {handleSettleAmount(e)}}
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between p-4 md:p-5 border-t rounded-b dark:border-gray-600">
                {selectedPayer != null && selectedReceiver != null && settlementAmount !== 0 ?
                  <button
                  type="submit"
                  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                 onClick={handleSettlement}>
                  <svg
                    class="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Add Settlement
                </button> :
                <button
                  type="submit"
                  class="text-white inline-flex items-center bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled>
                  <svg
                    class="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Add Settlement
                </button>
  }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
