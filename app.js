const SUPABASE_URL = "https://zrricxylqjvqmmmektsa.supabase.co";

// Yahan apna sb_publishable_ key paste karna hai.
// IMPORTANT: sb_secret_ key kabhi mat paste karna.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_xcoiBFF5MDBfgCzp8SC-5g_ORoQab85"

const statusEl = document.getElementById("status");
const testBtn = document.getElementById("testBtn");

function configured() {
  return (
    SUPABASE_PUBLISHABLE_KEY &&
    SUPABASE_PUBLISHABLE_KEY.startsWith("sb_publishable_")
  );
}

async function testConnection() {
  if (!configured()) {
    statusEl.textContent =
      "Paste your sb_publishable_ key into app.js first.";
    return;
  }

  try {
    const client = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );

    const { error } = await client
      .from("videos")
      .select("id")
      .limit(1);

    if (error) throw error;

    statusEl.textContent =
      "✅ REACTO backend connected successfully.";
  } catch (err) {
    statusEl.textContent =
      "❌ Connection test failed: " + (err.message || err);
  }
}

testBtn.addEventListener("click", testConnection);
