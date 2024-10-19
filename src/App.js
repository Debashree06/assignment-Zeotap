import React, { useState } from "react";
import axios from "axios";

function App() {
  const [rule, setRule] = useState("");
  const [userData, setUserData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [result, setResult] = useState(null);

  const createRule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rules/create",
        { ruleString: rule }
      );
      alert("Rule created successfully!");
      console.log("AST:", response.data.ast);
    } catch (error) {
      alert("Error creating rule");
    }
  };

  const evaluateRule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rules/evaluate/67123cbe261a792409fca48c",
        userData
      );
      setResult(response.data.result);
    } catch (error) {
      alert("Error evaluating rule");
    }
  };

  return (
    <div className="App">
      <h1>Rule Engine</h1>

      <textarea
        cols={"50"}
        type="text"
        placeholder="Enter rule string"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
      />
      <button onClick={createRule}>Create Rule</button>

      <h2>User Data</h2>
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setUserData({ ...userData, age: e.target.value })}
      />
      <input
        type="text"
        placeholder="Department"
        onChange={(e) =>
          setUserData({ ...userData, department: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Salary"
        onChange={(e) => setUserData({ ...userData, salary: e.target.value })}
      />
      <input
        type="number"
        placeholder="Experience"
        onChange={(e) =>
          setUserData({ ...userData, experience: e.target.value })
        }
      />
      <button onClick={evaluateRule}>Evaluate Rule</button>

      {result !== null && (
        <h3>Result: {result ? "Eligible" : "Not Eligible"}</h3>
      )}
    </div>
  );
}

export default App;
