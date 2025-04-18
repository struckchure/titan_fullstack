export interface Job {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  input: string;
  regex: string;
  status: "Validating" | "Valid" | "Invalid";
  error: string | null;
}

export interface ListJobsDto {
  skip?: number;
  limit?: number;
}

export async function listJobs(dto: ListJobsDto): Promise<Job[]> {
  const res = await fetch(
    `/api/jobs?${new URLSearchParams(dto as Record<string, string>)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return await res.json();
}
