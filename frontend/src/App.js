import React from "react";
import CodeEditor from "./components/CodeEditor";
import Chat from "./components/Chat";

const App = () => {
  return (
    <div>
      <h1>Co-Op Code Editor</h1>
      <CodeEditor />
      <Chat />
    </div>
  );
};

export default App;