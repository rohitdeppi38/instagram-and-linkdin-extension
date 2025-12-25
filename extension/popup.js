const status = document.getElementById("status");
const sendBtn = document.getElementById("send");

sendBtn.onclick = async () => {
  try {
    //Get active tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];

    if (!tab || !tab.url) {
      status.innerText = "Cannot read current tab";
      return;
    }

    const url = tab.url;

    //  Allow only supported platforms
    if (
      !url.includes("linkedin.com/in") &&
      !url.includes("instagram.com")
    ) {
      status.innerText = "Unsupported page";
      return;
    }

    status.innerText = "Waiting for page load...";

    // Wait  dynamic content
    setTimeout(() => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => document.documentElement.outerHTML
        },
        async (res) => {
          // 🔴 Permission / execution failure check
          if (chrome.runtime.lastError) {
            console.error("Script execution failed:", chrome.runtime.lastError);
            status.innerText = "Permission denied or script failed";
            return;
          }

          if (!res || !res[0] || !res[0].result) {
            status.innerText = "Failed to capture HTML";
            console.error("Invalid script result:", res);
            return;
          }

          const html = res[0].result;

          // 4️⃣ Debug proof
          console.log("Sending URL:", url);
          console.log("HTML length:", html.length);
          console.log("HTML preview:", html.substring(0, 300));

          // 5️⃣ Send to backend
          const response = await fetch("http://localhost:3000/scrape-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, html })
          });

          if (!response.ok) {
            status.innerText = "Backend error";
            console.error("Backend error:", response.status);
            return;
          }

          const data = await response.json();
          console.log("Backend response:", data);

          status.innerText = "Done! Check console";
        }
      );
    }, 3000);
  } catch (err) {
    console.error("Unexpected error:", err);
    status.innerText = "Unexpected error";
  }
};
