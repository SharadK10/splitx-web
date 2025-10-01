import { useEffect, useState } from "react";
import { getGroupLogsApi } from "./Api";
import Loader from "./Loader";

export default function GroupLogModal({ isModalOpen, group, closeModal }) {
  const [currentGroup, setCurrentGroup] = useState({});
  const [groupLogs, setGroupLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentGroup(group);
    getGroupLogs(group)
    console.log(groupLogs);
  }, [group]); // runs whenever modal opens or group changes

  function getGroupLogs(group) {
    if (group != null) {
      setIsLoading(true);
      getGroupLogsApi(group.groupCode).then((res) => {
        const logs = [
          ...group.users.map(user => ({ type: "joined", username: user.user.name, timestamp: user.joinedTimestamp })),
          ...res.data.map(log => ({ type: "renamed", username: log.renamedBy.name, oldname: log.oldName, newname: log.newName, timestamp: log.renamedOn })),
        ];
        logs.shift();
        logs.push({ type: "created", groupname: group.groupName, username: group.groupOwner.name, timestamp: group.groupCreateDate })
        logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setGroupLogs(logs);
      })
        .catch((e) => console.log("Error in fetching group logs"))
        .finally(setIsLoading(false))
    }
  }

  return (
    <>
      {isModalOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center w-full h-[calc(100%-1rem)]"
        >
          <div className="max-w-lg relative p-4 w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <div>
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                    {currentGroup?.groupCode || ""}
                  </dt>
                  <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                    {currentGroup?.groupName || ""}
                  </dd>
                </div>
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
              <div className="p-4 md:p-5 space-y-4">
                {isLoading ? <Loader /> : (
                  <ul className="max-w-md divide-y text-gray-600 dark:text-gray-600 
                 max-h-40 overflow-y-auto pr-2">
                    {groupLogs.map((log, idx) => (
                      <li key={idx} className="py-2">
                        [
                        {new Date(log.timestamp).toLocaleString()}
                        ]{" "}
                        {log.type === "created" && (
                          <>
                            <strong>{log.username}</strong> created the group
                          </>
                        )}
                        {log.type === "joined" && (
                          <>
                            <strong>{log.username}</strong> joined
                          </>
                        )}
                        {log.type === "renamed" && (
                          <>
                            <strong>{log.username}</strong> renamed group from{" "}
                            <em>{log.oldname}</em> to <em>{log.newname}</em>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
