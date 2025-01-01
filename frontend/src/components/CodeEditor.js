import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import io from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:5000");

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  // Find out any code changes from other users 
  useEffect(() => {
    socket.on("code-change", (newCode) => {
      setCode(newCode);
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle code changes and broadcast them to other users
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("code-change", newCode);
  };

  return (
    <div>
      {/* Select Language */}
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      {/* Code editor */}
      <MonacoEditor
        width="800"
        height="600"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodeEditor;