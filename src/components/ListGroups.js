import { useEffect, useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import JoinGroupModal from "./JoinGroupModal";
import { retriveAllGroupsApi } from "./Api";
import { SingleGroupCard } from "./SingleGroupCard";

export default function ListGroups() {
  const [groups, setGroups] = useState([]);
  const [createModalState, setCreateModalState] = useState(false);
  const [joinModalState, setJoinModalState] = useState(false);

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

  useEffect(() => getGroups(), []);

  function getGroups() {
    retriveAllGroupsApi().then((response) => setGroups(response.data));
  }

  return (
    <div>
      <menu>
        <CreateGroupModal
          isModalOpen={createModalState}
          closeModal={closeCreateModal}
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
            Create group
          </button>
          <button
            onClick={openJoinModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
            type="button"
          >
            Join group
          </button>
        </div>

        <div class="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            My Groups
          </h5>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Recent group
          </p>
          <ul class="my-4 space-y-3 h-96 overflow-y-scroll">
          {groups.map((group) => (
              // <div>
              //   {group.id},{group.groupName}
              // </div><
              <SingleGroupCard group={group}/>
            //   <li>
            //   <a
            //     href="#"
            //     class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            //   >
            //     <span class="flex-1 ms-3 whitespace-nowrap">{group.groupName}</span>
            //     {/* <span class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
            //       Popular
            //     </span> */}
            //   </a>
            // </li>
            ))}
            
          </ul>
          {/* <div>
            <a
              href="#"
              class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
            >
              <svg
                class="w-3 h-3 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Why?
            </a>
          </div> */}
        </div>

      </menu>
    </div>
  );
}
