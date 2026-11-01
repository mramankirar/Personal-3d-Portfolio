/* ============================================================
   EMAIL SETUP (feedback form + contact form)
   ------------------------------------------------------------
   1. Go to https://web3forms.com  ->  enter mramankirar@gmail.com
      (free, no signup) -> they email you an "Access Key".
   2. Paste that key below between the quotes.
   Done. Every form submit will now arrive in your inbox.
   If the key is empty, the forms fall back to opening the
   visitor's email app (nothing is sent automatically).
   ============================================================ */
window.MAIL = {
  key: "be8fad2c-f50f-4cc9-8b56-8dfdfa851de7",                              // <-- paste your Web3Forms Access Key here
  email: "mramankirar@gmail.com",       // fallback address (mailto) + where you expect mail

  // Sends a form to your inbox. Resolves true on success, false on any failure.
  async send(fields) {
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({ access_key: this.key }, fields))
      });
      const j = await r.json().catch(() => ({}));
      return !!(r.ok && j.success);
    } catch (e) { return false; }
  }
};
