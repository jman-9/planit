import { CheckCircle, Hourglass, ClipboardList } from "lucide-react";

export default function Settings() {
  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">Settings</h1>
      </div>
      <br/>
      <div className="flex gap-4 items-center">
        <span className="flex items-center gap-1 text-2xl">
          <CheckCircle className="text-green-500 w-5 h-5" />
          Done
        </span>
        <span className="flex items-center gap-1 text-2xl">
          <Hourglass className="text-yellow-500 w-6 h-6" />
          In Progress
        </span>
        <span className="flex items-center gap-1 text-2xl">
          <ClipboardList className="text-blue-500 w-7 h-7" />
          To Do
        </span>
      </div>
    </div>
  );
}
