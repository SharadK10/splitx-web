import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { joinGroupApi } from './Api';
export default function JoinGroup() {
  const { groupCode } = useParams(); // Get the group code from the URL
  const [isOpen, setIsOpen] = useState(true); // Modal is open by default
  const [error, setError] = useState(null);


  const navigate = useNavigate();
  const handleJoinGroup = () => {
    if (groupCode !== '') {
      joinGroupApi(groupCode)
        .then((response) => {

          setIsOpen(false);
          navigate('/groups', { replace: true });
        })
        .catch((error) => setError(error.response.data.message.split(": ")[1]))
    } else {
      setError('Group code cannot be empty')
    }
    // After joining, you might want to close the modal or navigate to another route
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="relative w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {error != null && <div style={{ color: "red" }} className=''>{error}</div>}

              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Join Group: {groupCode}
                </h3>
                <button
                  onClick={handleJoinGroup}
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                >
                  Join Group
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/groups', { replace: false })
                  }
                  }
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
