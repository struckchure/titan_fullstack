import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { VALIDATE_REGEX_REQUEST, VALIDATE_REGEX_RESPONSE } from "../constants";
import { Job, listJobs } from "./api";
import { socket } from "./socket";

export function useJobList() {
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs/list", pagination.skip, pagination.limit],
    queryFn: async () => await listJobs(pagination),
    placeholderData: keepPreviousData,
  });

  const nextPage = () => {
    if ((jobsQuery.data?.length || 0) < pagination.limit) {
      return;
    }

    setPagination((prev) => ({
      ...prev,
      skip: prev.skip + prev.limit,
    }));
  };

  const previousPage = () => {
    if (pagination.skip === 0) {
      return;
    }

    setPagination((prev) => ({
      ...prev,
      skip: Math.max(prev.skip - prev.limit, 0),
    }));
  };

  return { ...jobsQuery, pagination, nextPage, previousPage };
}

export function useRealtimeJobs(limit: number) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    socket.on(VALIDATE_REGEX_REQUEST, (data: Job) => {
      setJobs((prev) => [data, ...prev].slice(0, limit));
    });

    socket.on(VALIDATE_REGEX_RESPONSE, (data: Job) => {
      // find existing jobs and update the state
      setJobs((prev) => {
        const existingJobIdx = prev.findIndex((j) => j._id === data._id);
        if (existingJobIdx >= 0) {
          return prev
            .map((job) => (job._id === data._id ? data : job))
            .slice(0, limit);
        }

        return [data, ...prev].slice(0, limit);
      });
    });

    // Clean up when the component unmounts
    return () => {
      socket.off(VALIDATE_REGEX_REQUEST);
      socket.off(VALIDATE_REGEX_RESPONSE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { jobs, setJobs };
}
