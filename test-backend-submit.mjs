const GHL_PIT_TOKEN = process.env.GHL_PIT_TOKEN;
const GHL_LOCATION_ID = "sAdThi71k3Nkr8LGM8P9";

const payload = {
  firstName: "ManusTest1",
  lastName: "Backend",
  email: "manustest1@dipriva.com",
  phone: "+1 (555) 111-1111",
  primaryChallenge: "Testing backend submission",
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
  console.log('[Backend Test] Response:', JSON.stringify(result, null, 2));
  
  if (result[0]?.result?.data?.json?.ghlContactId) {
    console.log('[Backend Test] ✅ SUCCESS! GHL Contact ID:', result[0].result.data.json.ghlContactId);
  } else {
    console.log('[Backend Test] ❌ FAILED! Response:', result);
  }
} catch (error) {
  console.error('[Backend Test] ❌ Exception:', error.message);
}
