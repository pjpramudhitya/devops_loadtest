import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,           // 1 virtual user
  iterations: 5,    // hanya 5 request untuk smoke test
};

export default function () {
  // base url diambil dari env, misalnya BASE_URL=http://localhost:3000
  const BASE_URL = 'http://localhost:3000';

  // 1️⃣ Test GET notes
  let res = http.get(`${BASE_URL}/api/notes`);
  check(res, {
    'GET /api/notes status is 200': (r) => r.status === 200,
  });

  // 2️⃣ Test POST note baru
  const payload = JSON.stringify({ title: 'Test Note', content: 'Hello from k6 smoke test' });
  const headers = { 'Content-Type': 'application/json' };
  let postRes = http.post(`${BASE_URL}/api/notes`, payload, { headers });
  check(postRes, {
    'POST /api/notes status is 201 or 200': (r) => r.status === 201 || r.status === 200,
  });

  sleep(1);
}
