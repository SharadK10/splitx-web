import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDummyUsers, joinGroupApi } from "./Api";
import DummyDropdown from "./DummyDropdown";
export default function JoinGroup() {
  const { groupCode } = useParams(); // Get the group code from the URL
  const [isOpen, setIsOpen] = useState(true); // Modal is open by default
  const [dummyUsers, setDummyUsers] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDummyUsers(groupCode)
      .then((res) => {
        setDummyUsers(res.data);
      })
      .catch((e) => setError(e.response.data.message.split(": ")[1]));
  }, [groupCode]);

  const handleJoinGroup = () => {
    if (groupCode !== "") {
      joinGroupApi(groupCode, selected ? selected.userId : null).then(() => {
        setIsOpen(false);
        navigate("/groups", { replace: true });
      });
    } else {
      setError("Group code cannot be empty");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="flex items-start justify-center overflow-y-auto w-full h-[100vh]">
          <div className="w-full max-w-md h-[100vh] md:h-auto">
            <div className="flex items-start justify-center bg-white rounded-lg shadow-2xl p-4 dark:bg-gray-700">
              {error != null && (
                <div style={{ color: "red" }} className="">
                  {error}
                </div>
              )}

              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Join Group: {groupCode}
                </h3>
                <div className="p-4">
                  <label
                    htmlFor="groupCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Who are you in Group?
                  </label>
                  <DummyDropdown
                    dummyUsers={dummyUsers}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
                <button
                  onClick={handleJoinGroup}
                  disabled={selected === -1}
                  className="text-white bg-blue-600 hover:bg-blue-800 disabled:hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                >
                  Join Group
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/groups", { replace: false });
                  }}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
