import { useState } from 'react';
import { addCandidate } from '../services/api';


export default function ReferForm({ onAdded }) {
const [form, setForm] = useState({ name: '', email: '', phone: '', jobTitle: '' });
const [resume, setResume] = useState(null);
const [error, setError] = useState(null);


const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const onFile = (e) => {
const file = e.target.files[0];
if (file && file.name.endsWith('.pdf')) setResume(file);
else setError('Only PDF files allowed');
};


const submit = async (e) => {
e.preventDefault();
setError(null);
const data = new FormData();
for (let key in form) data.append(key, form[key]);
if (resume) data.append('resume', resume);


try {
const res = await addCandidate(data);
onAdded(res.data);
setForm({ name: '', email: '', phone: '', jobTitle: '' });
setResume(null);
} catch (err) {
setError(err.response?.data?.error || 'Failed');
}
};


return (
<form onSubmit={submit} style={{ background: '#fff', padding: 15, borderRadius: 8 }}>
<h3>Refer Candidate</h3>
{error && <p style={{ color: 'red' }}>{error}</p>}


<input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
<input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
<input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
<input name="jobTitle" placeholder="Job Title" value={form.jobTitle} onChange={onChange} required />
<input type="file" accept=".pdf" onChange={onFile} />


<button type="submit">Submit</button>
</form>
);
}