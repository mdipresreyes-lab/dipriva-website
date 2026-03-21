const GHL_PIT_TOKEN = process.env.GHL_PIT_TOKEN;
const GHL_LOCATION_ID = "sAdThi71k3Nkr8LGM8P9";

console.log('[Test] GHL Token exists:', !!GHL_PIT_TOKEN);
console.log('[Test] Token length:', GHL_PIT_TOKEN?.length);

if (!GHL_PIT_TOKEN) {
  console.error('[Test] ERROR: GHL_PIT_TOKEN not set!');
  process.exit(1);
}

const payload = {
  locationId: GHL_LOCATION_ID,
  firstName: "TokenTest",
  lastName: "Validation",
  email: "tokentest@dipriva.com",
  phone: "+1 (555) 000-0000",
  source: "Dipriva Token Test",
  tags: ["TokenTest"],
};

console.log('[Test] Sending test request to GHL API...');

try {
  const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GHL_PIT_TOKEN}`,
      'Version': '2021-07-28',
    },
    body: JSON.stringify(payload),
  });

  console.log('[Test] Response status:', response.status);
  
  const result = await response.json();
  
  if (response.ok) {
    console.log('[Test] ✅ SUCCESS! Token is valid');
    console.log('[Test] Contact ID:', result.contact?.id);
    process.exit(0);
  } else {
    console.error('[Test] ❌ FAILED! Error:', result);
    process.exit(1);
  }
} catch (error) {
  console.error('[Test] ❌ Exception:', error.message);
  process.exit(1);
}
