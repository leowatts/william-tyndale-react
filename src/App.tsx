import {
  ConversationProvider,
  useConversationControls,
  useConversationMode,
  useConversationStatus,
} from "@elevenlabs/react";
import { useEffect } from "react";

function App() {
  return (
    <ConversationProvider>
      <Agent />
    </ConversationProvider>
  );
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

  if (status === "disconnected") {
    return <h1>Press the button to speak with William Tyndale</h1>;
  }
  if (status === "connecting") {
    return <h1>Loading...</h1>;
  }
  if (status === "error") {
    return <h1>An error has occured. Reloading the page with F5 may fix this.</h1>;
  }
  if (status === "connected") {
    if (mode === "speaking") {
      return <h1>Speaking. You can press the button to end the conversation at any time.</h1>
    } else {
      return <h1>Listening. You can press the button to end the conversation at any time.</h1>
    }

  }
}

export default App;