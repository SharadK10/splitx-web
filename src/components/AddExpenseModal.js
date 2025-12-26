import React, { useState } from "react";
import { addExpenseApi } from "./Api";
import { useAuth } from "./AuthContext";

export default function AddExpenseModal({
  isModalOpen,
  closeModal,
  users,
  groupCode,
}) {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [openAccordionItem, setOpenAccordionItem] = useState(null);
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [shareSaveButtonVisibility, setShareSaveButtonVisibility] =
    useState(true);
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [splitEqually, setSplitEqually] = useState(true);

  const [payerDetails, setPayerDetails] = useState(() => {
    const userDetail = users.find((u) => u.user.userId === user.userId);
    return userDetail
      ? {
          id: userDetail.user.userId,
          name: userDetail.user.name,
          profilePic: userDetail.user.photo,
          spend: 0,
          share: null,
        }
      : {};
  });

  const [usersExpense, setUsersExpense] = useState(() =>
    users.map((u) => ({
      id: u.user.userId,
      name: u.user.name,
      profilePic: u.user.photo,
      spend: null,
      share: null,
    }))
  );

  const totalSpend = usersExpense.reduce((sum, u) => sum + (u.spend || 0), 0);
  const remaining = parseFloat(amount) - totalSpend;

  const totalShare = usersExpense.reduce((sum, u) => sum + (u.share || 0), 0);
  const remainingShare = parseFloat(amount) - totalShare;

  let balanceBg =
    "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"; // default: under
  if (remaining === 0) {
    balanceBg =
      "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"; // balanced
  } else if (remaining < 0) {
    balanceBg = "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"; // over
  }

  let balanceBgShare =
    "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"; // default: under
  if (remainingShare === 0) {
    balanceBgShare =
      "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"; // balanced
  } else if (remainingShare < 0) {
    balanceBgShare =
      "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"; // over
  }

  const handleCloseModal = () => {
    setDescription("");
    setAmount(0);
    setUsersExpense(
      users.map((u) => ({
        id: u.user.userId,
        name: u.user.name,
        profilePic: u.user.photo,
        spend: null,
        share: null,
      }))
    );
    setPayerDetails({
      id: user.userId,
      name: user.name,
      spend: 0,
      share: null,
    });
    setErrorMessage("");
    setStep(1);
    closeModal();
  };

  function addExpense() {
    if (description.trim().length < 2) {
      setErrorMessage("Description must be at least 2 characters long");
      return;
    }

    if (parseFloat(amount) <= 0) {
      setErrorMessage("Amount must be greater than 0");
      return;
    }
    setSubmitting(true);
    var requestJson = {};
    requestJson["groupCode"] = groupCode;
    requestJson["description"] = description;
    requestJson["createdBy"] = user.userId;
    requestJson["amount"] = amount;
    usersExpense.map((data, index) => {
      requestJson["userId_" + index] = data.id;
      requestJson["userSpent_" + index] = data.spend == null ? 0 : data.spend;
      requestJson["userShare_" + index] = data.share == null ? 0 : data.share;
      return null;
    });
    const totalSpendSum = usersExpense.reduce(
      (sum, item) => sum + item.share,
      0
    );
    const totalShareSum = usersExpense.reduce(
      (sum, item) => sum + item.spend,
      0
    );

    setErrorMessage("");

    if (
      totalShareSum === parseFloat(amount) &&
      totalSpendSum === parseFloat(amount)
    ) {
      addExpenseApi(requestJson)
        .then((response) => {
          setStep(1);
          handleCloseModal();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setSubmitting(false));
    } else {
      if (totalShareSum !== amount)
        alert(
          "Sum of indivdual person share must be equal to amount you mentioned"
        );
      else if (totalSpendSum !== amount)
        alert(
          "Sum of indivdual person spent must be equal to amount you mentioned"
        );
    }
  }

  const switchToUnequal = () => {
    const updatedUsers = usersExpense.map((u) => ({
      ...u,
      share: 0, // reset all inputs to 0
      checked: false, // optional: deselect if needed
    }));
    setUsersExpense(updatedUsers);
    setShareSaveButtonVisibility(false);
  };

  function handleChange(e, index, type) {
    if (type === "multiple") {
      const value = parseFloat(e.target.value) || 0;

      const updatedItems = usersExpense.map((u, i) =>
        i === index ? { ...u, spend: value } : u
      );

      setUsersExpense(updatedItems);
      const payers = updatedItems.filter((u) => (u.spend || 0) > 0);
      setPayerDetails(payers);

      const totalSum = updatedItems.reduce(
        (sum, item) => sum + (item.spend || 0),
        0
      );
      setButtonVisibility(totalSum === parseFloat(amount));
    } else if (type === "single") {
      const amt = parseFloat(amount) || 0;
      const updatedItems = usersExpense.map((u, i) => {
        const updatedUser =
          i === index ? { ...u, spend: amt } : { ...u, spend: 0 };

        if (i === index) {
          setPayerDetails(updatedUser);
        }

        return updatedUser;
      });
      setUsersExpense(updatedItems);
      setButtonVisibility(true);
    }
  }

  function handleShareAmount(e, index) {
    const updatedItems = usersExpense.map((u, i) =>
      i === index ? { ...u, share: parseFloat(e.target.value) } : u
    );
    setUsersExpense(updatedItems);
    const totalSum = updatedItems.reduce((sum, item) => sum + item.share, 0);
    if (totalSum === parseFloat(amount)) {
      setShareSaveButtonVisibility(true);
    } else {
      setShareSaveButtonVisibility(false);
    }
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
                  Add New Expense
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
                <div className="flex items-center w-full mb-6">
                  {[1, 2, 3, 4].map((s, i) => (
                    <div
                      key={s}
                      className={`flex items-center ${s !== 4 ? "w-full" : ""}`}
                    >
                      {/* Circle */}
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold
                        ${
                          step === s
                            ? "bg-blue-600 text-white"
                            : step > s
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {s}
                      </div>

                      {/* Connector (skips last) */}
                      {i < 3 && (
                        <div
                          className={`flex-1 h-1 ${
                            step > s
                              ? "bg-green-500"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">
                      Step 1 — Expense Details
                    </h2>

                    {errorMessage && (
                      <p className="text-red-600 dark:text-red-400 text-sm mb-2 px-2 py-1 bg-red-50 dark:bg-red-900 rounded">
                        {errorMessage}
                      </p>
                    )}

                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Description
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                   dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="What for?"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Amount
                        </label>
                        <input
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                   dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          value={amount === 0 ? "" : amount}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="How much?"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => {
                          // basic validation before going next
                          if (description.trim().length < 2) {
                            setErrorMessage(
                              "Description must be at least 2 characters"
                            );
                            return;
                          }
                          if (parseFloat(amount) <= 0 || isNaN(amount)) {
                            setErrorMessage("Amount must be greater than 0");
                            return;
                          }

                          setErrorMessage("");
                          nextStep();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">
                      Step 2 — Who Paid?
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Select a single payer or multiple payers
                    </p>

                    {/* Accordion */}
                    <div className="border rounded-lg overflow-hidden">
                      {/* --- Single Payer --- */}
                      <button
                        className="w-full flex justify-between p-4 border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() =>
                          setOpenAccordionItem(
                            openAccordionItem === 1 ? null : 1
                          )
                        }
                      >
                        <span className="font-medium">Individual Payer</span>
                        <span>{openAccordionItem === 1 ? "▲" : "▼"}</span>
                      </button>

                      {openAccordionItem === 1 && (
                        <div className="p-4 max-h-64 overflow-y-auto">
                          {users.map((data, index) => (
                            <label
                              key={index}
                              className="flex justify-between p-4 mb-2 border rounded-lg dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <div>
                                <div className="font-semibold">
                                  {data.user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {data.user.email}
                                </div>
                              </div>

                              <input
                                type="radio"
                                name="payer"
                                onChange={(e) =>
                                  handleChange(e, index, "single")
                                }
                              />
                            </label>
                          ))}
                        </div>
                      )}

                      {/* --- Multiple Payers --- */}
                      <button
                        className="w-full flex justify-between p-4 border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() =>
                          setOpenAccordionItem(
                            openAccordionItem === 2 ? null : 2
                          )
                        }
                      >
                        <span className="font-medium">Multiple Payers</span>
                        <span>{openAccordionItem === 2 ? "▲" : "▼"}</span>
                      </button>

                      {openAccordionItem === 2 && (
                        <div className="p-4 max-h-64 overflow-y-auto">
                          {usersExpense.map((data, index) => (
                            <div
                              key={index}
                              className="border rounded-lg p-4 mb-2 dark:border-gray-600"
                            >
                              <div className="font-semibold mb-2">
                                {data.name}
                              </div>

                              <input
                                type="number"
                                value={data.spend === 0 ? "" : data.spend}
                                onWheel={(e) => e.target.blur()}
                                onInput={(e) =>
                                  handleChange(e, index, "multiple")
                                }
                                className="w-full p-2 rounded border dark:border-gray-500 dark:bg-gray-700"
                                placeholder="Enter amount"
                              />
                            </div>
                          ))}

                          {/* Balance Box */}
                          <div
                            className={`w-full text-center py-2 mt-4 rounded ${balanceBg}`}
                          >
                            <p className="text-sm font-semibold">
                              INR {totalSpend.toFixed(2)} of INR{" "}
                              {parseFloat(amount).toFixed(2)}
                            </p>
                            <p className="text-sm font-semibold">
                              {remaining >= 0
                                ? `INR ${remaining.toFixed(2)} left`
                                : `INR ${Math.abs(remaining).toFixed(2)} over`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-6">
                      <button
                        onClick={prevStep}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        Back
                      </button>

                      <button
                        onClick={() => nextStep()}
                        disabled={!buttonVisibility}
                        className={`px-4 py-2 rounded text-white ${
                          buttonVisibility
                            ? "bg-blue-600"
                            : "bg-blue-400 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">
                      Step 3 — Split Expense
                    </h2>

                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      {/* Equal vs Unequal Toggle Buttons */}
                      <div className="flex justify-between mb-4">
                        <button
                          onClick={() => {
                            setSplitEqually(true);
                            setShareSaveButtonVisibility(true);
                            const updated = usersExpense.map((u) => ({
                              ...u,
                              checked: true,
                              share: parseFloat(amount) / usersExpense.length,
                            }));
                            setUsersExpense(updated);
                          }}
                          className="px-4 py-1 bg-green-100 dark:bg-green-700 text-green-700 dark:text-white rounded-full border dark:border-gray-600 hover:bg-green-200 dark:hover:bg-green-600"
                        >
                          Equally
                        </button>

                        <button
                          onClick={() => {
                            setSplitEqually(false);
                            switchToUnequal();
                            setShareSaveButtonVisibility(false);
                          }}
                          className="px-4 py-1 bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-white rounded-full border dark:border-gray-600 hover:bg-yellow-200 dark:hover:bg-yellow-600"
                        >
                          Unequally
                        </button>
                      </div>

                      {/* ---------- EQUAL MODE ---------- */}
                      {splitEqually && (
                        <ul className="space-y-3 max-h-64 overflow-y-scroll">
                          {usersExpense.map((user, index) => (
                            <li key={user.id}>
                              <label className="flex justify-between p-3 border rounded-lg dark:border-gray-600 cursor-pointer">
                                <span className="font-medium">{user.name}</span>

                                <input
                                  type="checkbox"
                                  checked={user.checked}
                                  onChange={(e) => {
                                    const updated = [...usersExpense];
                                    updated[index].checked = e.target.checked;

                                    const checkedUsers = updated.filter(
                                      (u) => u.checked
                                    );
                                    const equalShare = checkedUsers.length
                                      ? parseFloat(amount) / checkedUsers.length
                                      : 0;

                                    updated.forEach((u) => {
                                      u.share = u.checked ? equalShare : 0;
                                    });

                                    setUsersExpense(updated);
                                  }}
                                  className="w-4 h-4"
                                />
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* ---------- UNEQUAL MODE ---------- */}
                      {!splitEqually && (
                        <>
                          <ul className="space-y-3 max-h-64 overflow-y-scroll">
                            {usersExpense.map((user, index) => (
                              <li key={user.id}>
                                <label className="block p-3 border rounded-lg dark:border-gray-600">
                                  <span className="font-medium">
                                    {user.name}
                                  </span>

                                  <input
                                    type="number"
                                    value={user.share === 0 ? "" : user.share}
                                    onWheel={(e) => e.target.blur()}
                                    onChange={(e) =>
                                      handleShareAmount(e, index)
                                    }
                                    placeholder="Enter amount"
                                    className="mt-2 w-full p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600"
                                  />
                                </label>
                              </li>
                            ))}
                          </ul>

                          {/* balance indicator */}
                          <div
                            className={`mt-4 text-center py-2 rounded ${balanceBgShare}`}
                          >
                            <p className="text-sm font-semibold">
                              INR {totalShare.toFixed(2)} of INR{" "}
                              {parseFloat(amount).toFixed(2)}
                            </p>
                            <p className="text-sm font-semibold">
                              {remainingShare >= 0
                                ? `INR ${remainingShare.toFixed(2)} left`
                                : `INR ${Math.abs(remainingShare).toFixed(
                                    2
                                  )} over`}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-6">
                      <button
                        onClick={prevStep}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        Back
                      </button>

                      <button
                        onClick={() => nextStep()}
                        disabled={!shareSaveButtonVisibility}
                        className={`px-4 py-2 rounded text-white ${
                          shareSaveButtonVisibility
                            ? "bg-blue-600"
                            : "bg-blue-400 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Step 4 — Review & Confirm
                    </h2>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Description
                        </p>
                        <p className="text-lg font-semibold">{description}</p>
                      </div>

                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Amount
                        </p>
                        <p className="text-lg font-semibold">₹ {amount}</p>
                      </div>

                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Paid By
                        </p>

                        {/* Single payer */}
                        {Array.isArray(payerDetails) &&
                        payerDetails.length > 0 ? (
                          <div>
                            {payerDetails.length === 1 ? (
                              <p className="font-semibold">
                                {payerDetails[0].id === user.userId
                                  ? "You"
                                  : payerDetails[0].name}
                              </p>
                            ) : (
                              <ul className="list-disc ml-4">
                                {payerDetails.map((p, i) => (
                                  <li key={i} className="font-semibold">
                                    {p.id === user.userId ? "You" : p.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <p className="font-semibold">
                            {payerDetails?.id === user.userId
                              ? "You"
                              : payerDetails?.name || "Not selected"}
                          </p>
                        )}
                      </div>

                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                          Split Between
                        </p>

                        <ul className="space-y-2">
                          {usersExpense.map((u) => (
                            <li
                              key={u.id}
                              className="flex justify-between border-b pb-1 dark:border-gray-700"
                            >
                              <span>{u.name}</span>
                              <span className="font-semibold">
                                ₹ {u.share ? u.share.toFixed(2) : 0}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                      <button
                        onClick={prevStep}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        Back
                      </button>

                      <button
                        onClick={addExpense}
                        disabled={submitting}
                        className={`px-4 py-2 rounded text-white ${
                          submitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {submitting ? (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            Submitting...
                          </div>
                        ) : (
                          "Submit Expense"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
