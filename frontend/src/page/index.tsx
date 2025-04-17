import { useEffect } from "react";

import { JobList } from "../components/job-list";
import { RealTimeRegexValidator } from "../components/realtime-regex-validator";
import { useJobList, useRealtimeJobs } from "../services/hooks";

export default function Page() {
  const {
    data: jobsHistory,
    pagination,
    nextPage,
    previousPage,
  } = useJobList();

  const { jobs, setJobs } = useRealtimeJobs(pagination.limit);

  useEffect(() => {
    if (jobsHistory) setJobs(jobsHistory);
  }, [jobsHistory, setJobs]);

  return (
    <section className="p-6 flex flex-col justify-center max-w-4xl mx-auto gap-4">
      <RealTimeRegexValidator />

      <div className="space-y-2">
        <JobList items={jobs} />

        <div className="flex items-center gap-2 justify-between">
          <button onClick={previousPage} disabled={pagination.skip === 0}>
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={(jobsHistory?.length || 0) < pagination.limit}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
