const payload = {
  firstName: "OverhaulTest1",
  lastName: "Backend",
  email: "overhaultest1@dipriva.com",
  phone: "+1 (555) 111-2222",
  primaryChallenge: "Testing complete overhaul",
  preferredLanguage: "en",
};

console.log('[Test] Sending tRPC request...');

try {
  const response = await fetch('http://localhost:3000/api/trpc/leads.submitForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      json: payload,
    }),
  });

  console.log('[Test] Response status:', response.status);
  
  const result = await response.json();
  
  if (result[0]?.result?.data?.json?.ghlContactId) {
    console.log('[Test] ✅ SUCCESS! GHL Contact ID:', result[0].result.data.json.ghlContactId);
  } else {
    console.log('[Test] Response:', JSON.stringify(result, null, 2));
  }
} catch (error) {
  console.error('[Test] ❌ Exception:', error.message);
}
