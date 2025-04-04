import { httpClient } from "../cofig/AxiosHelper.js";

export const createRoom = async (roomDetail) => {
  const res = await httpClient.post("/api/v1/rooms", roomDetail, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  // console.log(res.data);
  return res.data;
};

export const joinChatApi = async (roomId) => {
  const res = await httpClient.get(`/api/v1/rooms/${roomId}`);
  console.log(res.data);
  return res.data;
};

export const loadMessagesApi = async (roomId) => {
  const res = await httpClient.get(`/api/v1/rooms/${roomId}/messages`);
  console.log(res.data);
  return res.data;
}