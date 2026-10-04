const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby339jyqZrKJIsqCt9HCx2VdIAnTowiTLQSLeG2XO0LLQi5K50Tmt8UAKgAGMC8Ql3z/exec";

export type Lead = { name: string; email: string; phone: string; message: string; source: string };

export async function submitLead(lead: Lead) {
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      // no-cors: Apps Script redirects strip CORS headers; the row still lands in the sheet
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch {
    // no-cors fetch always resolves; this is a safety net only
  }
}
