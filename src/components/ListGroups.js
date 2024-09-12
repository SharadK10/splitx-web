import { useEffect, useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import JoinGroupModal from "./JoinGroupModal";
import { retriveAllGroupsApi } from "./Api";
import { SingleGroupCard } from "./SingleGroupCard";
import Footer from "./Footer";

export default function ListGroups() {
  const [groups, setGroups] = useState([]);
  const [createModalState, setCreateModalState] = useState(false);
  const [joinModalState, setJoinModalState] = useState(false);
  const [isGroupCreated,SetIsGroupCreated] = useState(null);
  // Function to open the modal
  const openCreateModal = () => setCreateModalState(true);
  // Function to close the modal
  const closeCreateModal = () => setCreateModalState(false);

  // Function to open the modal
  const openJoinModal = () => setJoinModalState(true);
  // Function to close the modal
  const closeJoinModal = () => {
    setJoinModalState(false);
  };

  useEffect(() => getGroups(), [isGroupCreated, joinModalState]);

  function getGroups() {
    
    retriveAllGroupsApi().then((response) => {
      const groupList = response.data;

      function sortByDate(groupList, getDate) {
        return groupList.sort((a, b) => {
          const date1 = getDate(a);
          const date2 = getDate(b);
          return date2 - date1;
        });
      }

      const sortedGroupList = sortByDate(groupList, (group) => {
        if (group.transaction.length === 0) {
            return new Date(group.groupCreateDate);
        }
        let maxDate = -Infinity;
        for (const txn of group.transaction) {
            var createdDate;
            if(txn.createdDate === null) {
              createdDate = -Infinity;
            } else {
              createdDate = new Date(txn.createdDate);
            }
            const updatedDate = txn.updatedDate ? new Date(txn.updatedDate) : new Date(txn.createdDate);
            
            maxDate = Math.max(maxDate, createdDate, updatedDate);
        }
        return maxDate;
    });
      setGroups(sortedGroupList)
  });
  }

  return (
    <>
        <CreateGroupModal
          isModalOpen={createModalState}
          closeModal={closeCreateModal}
          SetIsGroupCreated = {SetIsGroupCreated}
        />
        <JoinGroupModal
          isModalOpen={joinModalState}
          closeModal={closeJoinModal}
        />
        <div className="flex flex-row justify-end m-4">
          <button
            onClick={openCreateModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Create Group
          </button>
          <button
            onClick={openJoinModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
            type="button"
          >
            Join Group
          </button>
        </div>

        <div class="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            My Groups
          </h5>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Recent groups
          </p>
          <ul class="my-4 space-y-3 h-96 overflow-y-scroll">
          {groups.length > 0 ?
          groups.map((group) => (
              <SingleGroupCard group={group}/>
            )):
            <div className="flex flex-col justify-center items-center text-gray-500 dark:text-gray-400 font-medium">
              <img src="../create-group.svg" alt="Add expense img" className="h-24 w-24" />
              <div>No groups found!</div>
              <div>Create a group to get started.</div>
            </div> }
            
          </ul>
        </div>
        <Footer/>
    </>
  );
}
