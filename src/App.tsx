import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [applied, setApplied] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);

  const handleAddJob = () => {
    if (!title || !company) return;

    const newJob = { title, company, applied };
    setJobs([...jobs, newJob]);

    // Clear inputs
    setTitle("");
    setCompany("");
    setApplied(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Application Tracker</h1>

      <input
        placeholder="Job title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={applied}
          onChange={(e) => setApplied(e.target.checked)}
        />
        Applied
      </label>

      <br /><br />

      <button onClick={handleAddJob}>Add Job</button>

      <h2>Jobs List</h2>

      <ul>
  {jobs.map((job, index) => (
    <li key={index}>
      {job.title} - {job.company} ({job.applied ? "Applied" : "Not Applied"})
      
      <button onClick={() => {
        const updatedJobs = jobs.filter((_, i) => i !== index);
        setJobs(updatedJobs);
      }}>
        Delete
      </button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;