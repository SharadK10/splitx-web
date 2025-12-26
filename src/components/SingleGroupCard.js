import { useState } from "react";

export function SingleGroupCard({ group, openEditModal, openGroupLogModal }) {
  const groupUrl = "/groups/" + group.groupCode;
  const [isActive, setIsActive] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const btnId = `dropdownButton-${group.groupCode}`;
  const menuId = `dropdownMenu-${group.groupCode}`;

  const toggleDropdown = () => setIsActive(!isActive);

  return (
    <li>
      <div className="relative inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80 px-4 h-fit w-full py-3 rounded-lg border bg-card shadow-sm text-base">
        {/* Main content */}
        <div className="w-full flex flex-col gap-1">
          <div className="w-80 text-base flex items-center justify-between gap-2">
            <a className="flex-1 break-words whitespace-normal" href={groupUrl}>
              {group.groupName}
            </a>
          </div>

          <div className="text-muted-foreground font-normal text-xs">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 inline mx-1"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <span>
                  {
                    new Date(group.groupCreateDate)
                      .toLocaleDateString()
                      .split(", ")[0]
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top-right controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {/* Profile pictures */}
          {/* <div className="flex -space-x-3">
            {group.users.slice(0, 3).map((member, index) => (
              <img
                key={index}
                src={member.user.photo || '/default-avatar.png'}
                alt={member.user.name || 'User'}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700"
              />
            ))}
            {group.users.length > 3 && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 
                              text-gray-800 text-xs font-semibold border-2 border-white dark:border-gray-700">
                +{group.users.length - 3}
              </div>
            )}
          </div> */}

          {/* Gray info icon */}
          <button
            onClick={() => openGroupLogModal(group)}
            className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 h-5 w-5 hover:bg-gray-300"
            type="button"
          >
            <span className="italic font-serif text-sm">i</span>
          </button>

          {/* Vertical ellipsis button */}
          <div className="relative">
            <button
              id={btnId}
              className={`flex items-center justify-center rounded-md text-sm font-medium 
                          h-8 w-8 ${isActive ? "border border-gray-200" : ""} 
                          hover:bg-accent hover:text-accent-foreground`}
              type="button"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 4 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <circle cx="2" cy="2" r="2"></circle>
                <circle cx="2" cy="8" r="2"></circle>
                <circle cx="2" cy="14" r="2"></circle>
              </svg>
            </button>

            {/* Dropdown menu */}
            {isActive && (
              <div
                id={menuId}
                className="absolute right-0 mt-2 z-20 w-44 bg-white dark:bg-gray-700 
                           rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <ul className="py-2 text-sm divide-y divide-gray-100 dark:divide-gray-600">
                  <li>
                    <button
                      onClick={() => {
                        toggleDropdown();
                        openEditModal(group);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Rename
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toggleDropdown();
                        setShowConfirmDelete(true);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm">
            <div className="px-4 py-3 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Delete Group?
              </h3>
            </div>

            <div className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
              This cannot be undone. Are you sure you want to delete this group?
            </div>

            <div className="px-4 py-3 flex justify-end gap-3 border-t dark:border-gray-700">
              <button
                className="px-4 py-2 rounded-lg border text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  setShowConfirmDelete(false);
                  //sharad
                  console.log("Delete Clicked — TODO integrate API");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
