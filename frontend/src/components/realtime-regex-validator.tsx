import _ from "lodash";
import { useEffect, useState } from "react";

import { VALIDATE_REGEX_REQUEST } from "../constants";
import { socket } from "../services/socket";

interface RegexSubmissionPayload {
  input: string;
  regex: string;
}

export function RealTimeRegexValidator() {
  const [debounceDuration, setDebounceDuration] = useState<number>(500);
  const [payload, setPayload] = useState<RegexSubmissionPayload>({
    input: "",
    regex: "",
  });

  const sendRequest = () => {
    if (payload.input.length > 0) {
      socket.emit(VALIDATE_REGEX_REQUEST, payload);
    }
  };

  const debouncedSendRequest = _.debounce(sendRequest, debounceDuration);

  useEffect(() => {
    debouncedSendRequest();

    return debouncedSendRequest.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <div className="w-full flex items-center gap-2">
      <input
        placeholder="Input"
        value={payload.input}
        onChange={(e) => setPayload({ ...payload, input: e.target.value })}
      />
      <input
        placeholder="Regex Pattern"
        value={payload.regex}
        onChange={(e) => setPayload({ ...payload, regex: e.target.value })}
      />
      <input
        className="!w-26"
        type="number"
        value={debounceDuration}
        onChange={(e) => setDebounceDuration(Number(e.target.value))}
      />
    </div>
  );
}
