import React, { useState } from 'react';
import { addExpenseApi } from './Api';
import { useAuth } from './AuthContext';

export default function AddExpenseModal({ isModalOpen, closeModal, users, groupCode }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [payerModal, setPayerModal] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [openAccordionItem, setOpenAccordionItem] = useState(null);
    const [buttonVisibility, setButtonVisibility] = useState(false)
    const [shareSaveButtonVisibility,setShareSaveButtonVisibility] = useState(true);
    const {user} = useAuth();

    const [payerDetails, setPayerDetails] = useState(() => {
        const userDetail = users.find(u => u.user.userId === user.userId);
        return userDetail ? {
            id: userDetail.user.userId,
            name: userDetail.user.name,
            spend: 0,
            share: null
        } : {};
    });
    
    
    const [usersExpense, setUsersExpense] = useState(() => users.map(u => ({
        id: u.user.userId,
        name: u.user.name,
        spend: null,
        share: null
    })));


    function addExpense() {     
        var requestJson = {};
        requestJson["groupCode"] = groupCode;
        requestJson["description"] = description;
        usersExpense.map((data,index) => {
            requestJson["userId_"+index] = data.id;
            requestJson["userSpent_"+index] = (data.spend == null)?0:data.spend;
            requestJson["userShare_"+index] = (data.share == null)?0:data.share;
            return null;
        });
        const totalSpendSum = usersExpense.reduce((sum, item) => sum + item.share, 0);
        const totalShareSum = usersExpense.reduce((sum, item) => sum + item.spend, 0);
        
        
        
        
        if(totalShareSum === parseFloat(amount) && totalSpendSum === parseFloat(amount)) {
            addExpenseApi(requestJson).then((response) => {
                closeModal();
                
            }).catch((error) => {
                console.error(error);
            })
        } else {
            if(totalShareSum !== amount) 
                alert("Sum of indivdual person share must be equal to amount you mentioned");
            else if(totalSpendSum !== amount)
                alert("Sum of indivdual person spent must be equal to amount you mentioned");

        }
      
    }

    function togglePayerModal() {
        setPayerModal(!payerModal);
    }

    function toggleShareModal() {
        setShareModal(!shareModal);
    }
     
    function toggleAccordionItem(id) {     
            setOpenAccordionItem(openAccordionItem === id ? null : id);
    }
    
    function handleChange(e, index, type) {
        if(type === 'multiple'){
            const payerDetailsArray = [];
            const updatedItems = usersExpense.map((u, i) => {
                const updatedUser = (i === index) ? { ...u, spend: parseFloat(e.target.value) } : { ...u };
                  payerDetailsArray.push(updatedUser);
                return updatedUser;
              });
            setPayerDetails(payerDetailsArray);
            setUsersExpense(updatedItems);
            const totalSum = updatedItems.reduce((sum, item) => sum + item.spend, 0);
            if (totalSum === parseFloat(amount)) {
                setButtonVisibility(true);
            } else {
                setButtonVisibility(false);
            }
        } else if(type === 'single'){
            const updatedItems = usersExpense.map((u, i) => {
                const updatedUser = i === index ? { ...u, spend: parseFloat(e.target.value) } : { ...u, spend: 0 };
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
                                    onClick={closeModal}
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
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="What for?"
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            name="amount"
                                            id="amount"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="How much?"
                                            onWheel={(e) => e.target.blur()}                                            
                                            onChange={(e) => {
                                                
                                                
                                            const updatedData = usersExpense.map(obj => {
                 
                                                    if(obj.id === payerDetails.id) {
                                                        obj['spend'] = parseFloat(e.target.value);
                                                    }
                                                    obj['share'] = parseFloat(e.target.value/users.length);
                                                    return obj;
                                                  });                                             
                                                setUsersExpense(updatedData);
                                                setAmount(e.target.value)
                                            }}
                                            required
                                        />
                                    </div>

                                </div>
                                <div className='w-[60%] my-4 mx-0 flex w-full justify-between'>Paid by<a className="text-blue-700" onClick={togglePayerModal}>{(payerDetails.length > 1) ? "multiple" : (user.userId === payerDetails.id) ? "you"  : payerDetails.name.split(" ")[0]}</a> split <a className="text-blue-700" onClick={toggleShareModal}>between</a></div>

                                {payerModal && (
                                    <div id="select-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full">
                                        <div className="relative p-4 w-full max-w-md max-h-full">
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Select Payers
                                                    </h3>
                                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal" onClick={togglePayerModal}>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>

                                                <div id="accordion-color" data-accordion="collapse" data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
                                                    <h2 id="accordion-color-heading-1">
                                                        <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1" onClick={() => toggleAccordionItem(1)}>
                                                            <span>Individual Payer</span>
                                                            <svg data-accordion-icon className={`w-3 h-3 ${openAccordionItem === 1 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                                            </svg>
                                                        </button>
                                                    </h2>
                                                    <div id="accordion-color-body-1" className={`${openAccordionItem === 1 ? '' : 'hidden'}`} aria-labelledby="accordion-color-heading-1">
                                                        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                                            <ul className="space-y-4 mb-4 h-64 overflow-scroll">
                                                                {users.map((data, index) => (
                                                                    <li key={index}>
                                                                        <input
                                                                            type="radio"
                                                                            id={`user-${index}`}
                                                                            name="payer"
                                                                            value={amount}
                                                                            className="hidden peer"
                                                                            onChange={(e) => {handleChange(e, index, 'single')}}
                                                                            required
                                                                        />
                                                                        <label
                                                                            htmlFor={`user-${index}`}
                                                                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                                                                        >
                                                                            <div className="block">
                                                                                <div className="w-full text-lg font-semibold">{data.user.name}</div>
                                                                                <div className="w-full text-gray-500 dark:text-gray-400">{data.user.email}</div>
                                                                            </div>
                                                                        </label>
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                        </div>
                                                    </div>
                                                    <h2 id="accordion-color-heading-2">
                                                        <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-2" aria-expanded="false" aria-controls="accordion-color-body-2" onClick={() => toggleAccordionItem(2)}>
                                                            <span>Multiple Payers</span>
                                                            <svg data-accordion-icon className={`w-3 h-3 ${openAccordionItem === 2 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                                            </svg>
                                                        </button>
                                                    </h2>
                                                    <div id="accordion-color-body-2" className={`${openAccordionItem === 2 ? '' : 'hidden'}`} aria-labelledby="accordion-color-heading-2">
                                                        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                                                            <ul className="space-y-4 mb-4 h-64 overflow-scroll">
                                                                {usersExpense.map((data, index) =>  { return(
                                                                   
                                                                    
                                                                    <li key={`share-${index}`}>

                                                                        <label
                                                                            htmlFor={`user-xyz-${index}`}
                                                                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                                                                        >
                                                                            <div className="block">
                                                                                <div className="mb-2 text-lg font-semibold">{data.name}</div>
                                                                                <input value={data.spend} 
                                                                                onWheel={(e) => e.target.blur()} onInput={(e) => { handleChange(e, index, 'multiple'); }} type="number" id={data.userId} className="w-full block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg rounded-e-lg border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Enter amount" required />
                                                                            </div>
                                                                            
                                                                        </label>
                                                                    </li>
                                                                )})}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {buttonVisibility ?
                                                        <button
                                                            className="m-2 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        onClick={togglePayerModal}>
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
                                                            Save
                                                        </button> : <button
                                                            className="m-2 inline-flex items-center text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled
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
                                                            Save
                                                        </button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {shareModal && (
                                    <div id="select-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full">
                                        <div className="relative p-4 w-full max-w-md max-h-full">
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Split Accordingly
                                                    </h3>
                                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal" onClick={toggleShareModal}>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>

                                                <div>
                                                        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                                                            <ul className="space-y-4 mb-4 h-64 overflow-scroll">
                                                                {usersExpense.map((data, index) =>  { return(
                                                                   
                                                                    
                                                                    <li key={index}>
                                                                        <label
                                                                            htmlFor={`user-xyz-${index}`}
                                                                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                                                                        >
                                                                            <div className="block">
                                                                                <div className="mb-2 text-lg font-semibold">{data.name}</div>
                                                                                <input value={data.share} 
                                                                                onWheel={(e) => e.target.blur()} onInput={(e) => { handleShareAmount(e, index); }} type="number" id={data.userId} className="w-full block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg rounded-e-lg border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Enter amount" required />
                                                                            </div>
                                                                        </label>
                                                                    </li>
                                                                )})}
                                                            </ul>
                                                        </div>
                                                    </div>
                               
                                                   
                                                    {shareSaveButtonVisibility ?
                                                        <button
                                                            className="m-2 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        onClick={toggleShareModal}>
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
                                                            Save
                                                        </button> : <button
                                                            className="m-2 inline-flex items-center text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled
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
                                                            Save
                                                        </button>}
                                                </div>
                                            </div>
                                        </div>
                                   
                                )}
                                <button
                                    onClick={addExpense}
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
                                    Add
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
