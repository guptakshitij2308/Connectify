"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  createRoom as createRoomApi,
  joinChatApi,
} from "./../services/RoomService";
import useChatContext from "../context/ChatContext.js";
import { useRouter } from "next/navigation";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    userName: "",
    roomId: "",
  });
  const {
    roomId,
    currentUser,
    setCurrentUser,
    setRoomId,
    connected,
    setConnected,
  } = useChatContext(useChatContext);

  const router = useRouter();

  function handleFormInputChange(e) {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  }

  async function joinChat() {
    if (validateForm()) {
      // Join chat
      console.log("Joining chat with details: ", detail);
      try {
        const res = await joinChatApi(detail.roomId);
        console.log("Room joined: ", res);
        toast.success("Joined room successfully!");
        setRoomId(detail.roomId);
        setCurrentUser(detail.userName);
        setConnected(true);
        // Redirect to chat page
        router.push("/chat");
      } catch (error) {
        toast.dismiss();
        console.error(error);
        if (error.code == "ERR_BAD_REQUEST")
          toast.error("Room does not exist!");
        else toast.error("Error joining chat!");
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      // Create room
      try {
        const res = await createRoomApi(detail.roomId);
        console.log("Room created: ", res);
        toast.success("Room created successfully!");
        setRoomId(detail.roomId);
        setCurrentUser(detail.userName);
        setConnected(true);
        // Redirect to chat page
        router.push("/chat");
      } catch (error) {
        toast.dismiss();
        console.error(error);
        if (error.code == "ERR_BAD_REQUEST")
          toast.error("Room already exists!");
        else toast.error("Error joining chat!");
      }
    }
  }

  function validateForm() {
    if (detail.userName?.trim() !== "" && detail.roomId?.trim() !== "") {
      return true;
    } else {
      toast.dismiss();
      toast.error("Please fill all the fields!");
      return false;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-10 dark:border-gray-700 border w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
        <div>
          <img src="/chat.png" className="w-24 mx-auto" />
        </div>

        <h1 className="text-2xl font-semibold text-center ">
          Join Room / Create Room ..
        </h1>
        {/* name div */}
        <div className="">
          <label htmlFor="userName" className="block font-medium mb-2">
            Your name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter the name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* room id div */}
        <div className="">
          <label htmlFor="roomId" className="block font-medium mb-2">
            Room ID / New Room ID
          </label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            type="text"
            id="roomId"
            placeholder="Enter the room id"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* button  */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={joinChat}
            className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full"
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
