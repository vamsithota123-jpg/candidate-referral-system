import { useState } from 'react';
import { updateStatus, deleteCandidate } from '../services/api';


export default function CandidateCard({ candidate, onUpdated, onDeleted }) {
const [status, setStatus] = useState(candidate.status);


const changeStatus = async (value) => {
const res = await updateStatus(candidate._id, value);
setStatus(res.data.status);
onUpdated(res.data);
};

const remove = async () => {
if (confirm('Delete this candidate?')) {
await deleteCandidate(candidate._id);
onDeleted(candidate._id);
}
};

return (
<div style={{ background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #ddd' }}>
<h4>{candidate.name}</h4>
<p>{candidate.jobTitle}</p>
<p>Status: <b>{status}</b></p>


{candidate.resumeUrl && (
<a href={`http://localhost:5000${candidate.resumeUrl}`} target="_blank">View Resume</a>
)}


<select value={status} onChange={(e) => changeStatus(e.target.value)}>
<option>Pending</option>
<option>Reviewed</option>
<option>Hired</option>
</select>


<button style={{ marginTop: 8 }} onClick={remove}>Delete</button>
</div>
);
}