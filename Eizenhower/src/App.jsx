import { useState } from 'react';
import { Todo } from './to-do';

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen p-3 2xl:p-7">
        <div className="flex flex-row flex-1 space-x-4 2xl:space-x-8">
          <div className="flex-1 border border-gray-300 bg-gray-100 flex flex-col text-center max-h-[19rem]">
            <h3 className="text-lg 2xl:text-3xl font-semibold bg-purple-300 w-full p-2 pb-3">
              Urgent & Important
            </h3>
            <Todo urgency="Urgent" importance="Important" />
          </div>

          <div className="flex-1 border border-gray-300 bg-gray-100 flex flex-col text-center max-h-[19rem]">
            <h3 className="text-lg 2xl:text-3xl font-semibold bg-purple-300 w-full p-2 pb-3">
              Not Urgent but Important
            </h3>
            <Todo urgency="Not Urgent" importance="Important" />
          </div>
        </div>

        <div className="flex flex-row flex-1 mt-4 space-x-4 2xl:space-x-8">

          <div className="flex-1 border border-gray-300 bg-gray-100 flex flex-col text-center max-h-[19rem]">
            <h3 className="text-lg 2xl:text-3xl font-semibold bg-purple-300 w-full p-2 pb-3">
              Urgent but Not Important
            </h3>
            <Todo urgency="Urgent" importance="Not Important" />
          </div>

          <div className="flex-1 border border-gray-300 bg-gray-100 flex flex-col text-center max-h-[19rem]">
            <h3 className="text-lg 2xl:text-3xl font-semibold bg-purple-300 w-full p-2 pb-3">
              Not Urgent & Not Important
            </h3>
            <Todo urgency="Not Urgent" importance="Not Important" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
