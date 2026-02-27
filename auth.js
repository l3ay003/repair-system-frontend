let currentUser = null;

async function initLIFF() {
  await liff.init({ liffId: CONFIG.LIFF_ID });

  if (!liff.isLoggedIn()) {
    liff.login();
  }

  const profile = await liff.getProfile();

  currentUser = {
    userId: profile.userId,
    displayName: profile.displayName,
    pictureUrl: profile.pictureUrl
  };

  checkUserRole();
}

async function checkUserRole() {
  const res = await fetch(CONFIG.GAS_URL + "?action=getDashboard", {
    method: "POST",
    body: JSON.stringify({ userId: currentUser.userId })
  });

  const data = await res.json();

  if (!data.success) {
    alert("ไม่ได้รับอนุญาต");
    return;
  }

  loadDashboard(data.summary);
}
