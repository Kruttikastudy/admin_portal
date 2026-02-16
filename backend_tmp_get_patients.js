(async () => {
  try {
    const res = await fetch('http://localhost:5001/api/patients');
    const data = await res.json();
    console.log('status', res.status);
    console.log('count', Array.isArray(data) ? data.length : (data ? 1 : 0));
    console.log(JSON.stringify(data.slice ? data.slice(0,5) : data, null, 2));
  } catch (err) {
    console.error('error', err.message);
  }
})();
