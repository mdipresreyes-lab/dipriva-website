const payload = {
  firstName: "ManusTest3",
  lastName: "Backend",
  email: "manustest3@dipriva.com",
  phone: "+1 (555) 333-3333",
  primaryChallenge: "Testing backend submission with new logging",
  preferredLanguage: "en",
};

console.log('[Backend Test] Sending tRPC request...');

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

  console.log('[Backend Test] Response status:', response.status);
  
  const result = await response.json();
  
  if (result[0]?.result?.data?.json?.ghlContactId) {
    console.log('[Backend Test] ✅ SUCCESS! GHL Contact ID:', result[0].result.data.json.ghlContactId);
  } else {
    console.log('[Backend Test] Response:', JSON.stringify(result, null, 2));
  }
} catch (error) {
  console.error('[Backend Test] ❌ Exception:', error.message);
}
