import { Job } from "../services/api";

export function JobList(props: { items: Job[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 border border-white bg-gray-800 text-left">
              Input
            </th>
            <th className="p-4 border border-white bg-gray-800 text-left">
              Regex Pattern
            </th>
            <th className="p-4 border border-white bg-gray-800 text-left">
              Status
            </th>
            <th className="p-4 border border-white bg-gray-800 text-left">
              Error
            </th>
          </tr>
        </thead>
        <tbody>
          {props.items.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="p-4 border border-white text-gray-400 text-center"
              >
                No jobs yet
              </td>
            </tr>
          ) : (
            props.items.map((job) => (
              <tr
                key={job._id}
                className="bg-gray-700 aria-[invalid]:bg-red-900 aria-[valid]:bg-green-900"
                aria-invalid={job.status === "Invalid" ? true : undefined}
                aria-valid={job.status === "Valid" ? true : undefined}
              >
                <td className="p-4 border border-white break-all">
                  {job.input}
                </td>
                <td className="p-4 border border-white break-all">
                  {job.regex}
                </td>
                <td className="p-4 border border-white">
                  <div className="flex items-center gap-2">
                    {job.status === "Validating" && (
                      <span
                        className="inline-block w-3 h-3 rounded-full bg-yellow-400 animate-pulse"
                        aria-hidden="true"
                      ></span>
                    )}
                    {job.status === "Valid" && (
                      <span
                        className="inline-block w-3 h-3 rounded-full bg-green-400"
                        aria-hidden="true"
                      ></span>
                    )}
                    {job.status === "Invalid" && (
                      <span
                        className="inline-block w-3 h-3 rounded-full bg-red-400"
                        aria-hidden="true"
                      ></span>
                    )}
                    <span>{job.status}</span>
                  </div>
                </td>
                <td className="p-4 border border-white max-w-2xs">
                  <span className="text-red-300 text-sm ml-2">{job.error}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
