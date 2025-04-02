"use client";
import toast from "react-hot-toast";

export default function Chat() {
  return (
    <div>
      <p>About page.</p>
      <button onClick={() => toast.success("Success")}>Click</button>
    </div>
  );
}
