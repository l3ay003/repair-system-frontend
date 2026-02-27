async function api(action, payload) {
  const res = await fetch(CONFIG.GAS_URL + "?action=" + action, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return await res.json();
}
