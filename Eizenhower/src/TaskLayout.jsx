import { Todo } from './to-do';

function TaskLayout() {
  return (
    <div className="flex flex-col h-screen w-screen p-3 2xl:p-7">
      {/* First row of quadrants */}
      <div className="flex flex-row flex-1 space-x-4 2xl:space-x-8">
        <div className="flex-1 border border-gray-300 bg-gray-100 flex flex-col text-center max-h-[19rem]">
          <h3 className="text-lg 2xl:text-3xl font-semibold bg-blue-300 w-full p-2 pb-3">
            Urgent & Important
          </h3>
          <Todo urgency={true} importance={true} />
        </div>

        <div className="flex-1 border border-gray-300 bg-gray-100 flex flex-col text-center max-h-[19rem]">
          <h3 className="text-lg 2xl:text-3xl font-semibold bg-blue-300 w-full p-2 pb-3">
            Not Urgent but Important
          </h3>
          <Todo urgency={false} importance={true} />
        </div>
      </div>

      {/* Second row of quadrants */}
      <div className="flex flex-row flex-1 mt-4 space-x-4 2xl:space-x-8">
        <div className="flex-1 border border-gray-300 bg-gray-100 flex flex-col text-center max-h-[19rem]">
          <h3 className="text-lg 2xl:text-3xl font-semibold bg-blue-300 w-full p-2 pb-3">
            Urgent but Not Important
          </h3>
          <Todo urgency={true} importance={false} />
        </div>

        <div className="flex-1 border border-gray-300 bg-gray-100 flex flex-col text-center max-h-[19rem]">
          <h3 className="text-lg 2xl:text-3xl font-semibold bg-blue-300 w-full p-2 pb-3">
            Not Urgent & Not Important
          </h3>
          <Todo urgency={false} importance={false} />
        </div>
      </div>
    </div>
  );
}

export default TaskLayout;
