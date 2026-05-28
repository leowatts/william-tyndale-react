import {
  ConversationProvider,
  useConversationControls,
  useConversationMode,
  useConversationStatus,
  type ConversationStatus,
} from "@elevenlabs/react";
import { useEffect, useRef } from "react";
import video from "./assets/Tyndale Speaking Video.mp4"
import "./App.css"

function App() {
  return (
    <ConversationProvider>
      <Agent />
    </ConversationProvider>
  );
}

function getText(status: ConversationStatus): string {
  if (status === "disconnected") {
    return "Press the button to speak with William Tyndale";
  }
  if (status === "connecting") {
    return "Calling William Tyndale. Please wait...";
  }
  if (status === "error") {
    return "An error has occured. Reloading the page with F5 may fix this.";
  }
  if (status === "connected") {
    return "You can press the button to end the conversation at any time.";
  }
  return "";
}

function Agent() {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const { mode } = useConversationMode();
  const agentId = "agent_3601knwjgzqfe8ks8zk72nzx490w";
  useEffect(() => {
    const listener = () => {
      if (status === "disconnected") { startSession({ agentId }) }
      if (status === "connected") { endSession() }
    }
    document.addEventListener("click", listener)
    return () => { document.removeEventListener("click", listener) }
  }, [status, startSession, endSession])
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      if (status === "connected" && mode === "speaking") {
        videoRef.current?.play();
      } else {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    }
  }, [videoRef, mode, status])

  const screenText = getText(status);

  return <>
    <h1>{screenText}</h1>
    <video src={video} ref={videoRef} style={{ width: "100%" }}></video>
  </>


}

export default App;