import { useEffect, useState } from 'react';
import { fetchCandidates, fetchMetrics } from '../services/api';
import CandidateCard from './CandidateCard';
import ReferForm from './ReferForm';


export default function Dashboard() {
const [candidates, setCandidates] = useState([]);
const [search, setSearch] = useState('');
const [metrics, setMetrics] = useState(null);


const load = async () => {
const res = await fetchCandidates();
setCandidates(res.data);
};

const loadMetrics = async () => {
const res = await fetchMetrics();
setMetrics(res.data);
};


useEffect(() => {
load();
loadMetrics();
}, []);

const filtered = candidates.filter(c =>
c.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
c.status.toLowerCase().includes(search.toLowerCase())
);


return (
<div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>


<div>
<input
placeholder="Search by job title or status"
value={search}
onChange={(e) => setSearch(e.target.value)}
/>


<div style={{ display: 'grid', gap: 10 }}>
{filtered.map(c => (
<CandidateCard
key={c._id}
candidate={c}
onUpdated={(u) => setCandidates(prev => prev.map(p => p._id === u._id ? u : p))}
onDeleted={(id) => setCandidates(prev => prev.filter(p => p._id !== id))}
/>
))}
</div>
</div>


<div>
<ReferForm onAdded={(c) => setCandidates(prev => [c, ...prev])} />


<div style={{ background: '#fff', padding: 10, marginTop: 20, borderRadius: 8 }}>
<h3>Metrics</h3>
{metrics ? (
<ul>
<li>Total: {metrics.total}</li>
<li>Pending: {metrics.pending}</li>
<li>Reviewed: {metrics.reviewed}</li>
<li>Hired: {metrics.hired}</li>
</ul>
) : 'Loading...'}
</div>
</div>


</div>
);
}