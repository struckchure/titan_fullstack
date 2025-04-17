import { io } from "socket.io-client";

import { BASE_API_URL } from "../env";

export const socket = io(BASE_API_URL, { transports: ["websocket"] });
