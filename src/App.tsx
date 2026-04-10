import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [applied, setApplied] = useState(false);

  const [jobs, setJobs] = useState<any[]>(() => {
  const savedJobs = localStorage.getItem("jobs");
  return savedJobs ? JSON.parse(savedJobs) : [];
});

  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = () => {
    if (!title || !company) return;

    if (editIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[editIndex] = { title, company, applied };
      setJobs(updatedJobs);
      setEditIndex(null);
    } else {
      const newJob = { title, company, applied };
      setJobs([...jobs, newJob]);
    }

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

      <button onClick={handleAddJob}>
        {editIndex !== null ? "Update Job" : "Add Job"}
      </button>

      <h2>Jobs List</h2>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job.title} - {job.company} (
            {job.applied ? "Applied" : "Not Applied"})

            <button
              onClick={() => {
                setTitle(job.title);
                setCompany(job.company);
                setApplied(job.applied);
                setEditIndex(index);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                const updatedJobs = jobs.filter((_, i) => i !== index);
                setJobs(updatedJobs);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;