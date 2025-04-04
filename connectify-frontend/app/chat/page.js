/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext.js";
import { useRouter } from "next/navigation";
import SockJS from "sockjs-client";
import { baseURL } from "../cofig/AxiosHelper.js";
import { Stomp } from "@stomp/stompjs";
import { loadMessagesApi } from "../services/RoomService.js";
import toast from "react-hot-toast";
import { timeAgo } from "../utils/helper.js";
export default function Chat() {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  function handleLogout() {
    // disconnect from the websocket server
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    router.push("/");
  }

  const router = useRouter();

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await loadMessagesApi(roomId);
        setMessages(messages);
        console.log("Messages loaded:", messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
    loadMessages();
  }, [roomId]);

  useEffect(() => {
    if (!connected) router.push("/");
  }, [roomId, currentUser, connected, router]);

  useEffect(() => {
    const connectWebSocket = () => {
      // SockJs fallback
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to chat server");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log("message", message);
          const newMsg = JSON.parse(message.body);
          console.log("newMsg", newMsg);
          setMessages((prev) => [...prev, newMsg]);
          setInput("");
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }

    // Stomp client
  }, [connected, roomId]);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        content: input,
        sender: currentUser,
        roomId,
      };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="">
      {/* this is a header */}
      <header className="dark:border-gray-700  fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
        {/* room name container */}
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>{roomId}</span>
          </h1>
        </div>
        {/* username container */}

        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        {/* button: leave room */}
        <div>
          <button
            onClick={handleLogout}
            className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full"
          >
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="py-20 px-10   w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto "
      >
        {messages?.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            } `}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
              } p-2 max-w-xs rounded`}
            >
              <div className="flex flex-row gap-2">
                <img
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/43"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(message?.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* input message container */}
      <div className=" fixed bottom-4 w-full h-16 ">
        <div className="h-full  pr-10 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here..."
            className=" w-full  dark:border-gray-600 b dark:bg-gray-800  px-5 py-2 rounded-full h-full focus:outline-none  "
          />

          <div className="flex gap-1">
            <button className="dark:bg-purple-600 h-10 w-10  flex   justify-center items-center rounded-full cursor-pointer">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="dark:bg-green-600 h-10 w-10  flex   justify-center items-center rounded-full cursor-pointer"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
