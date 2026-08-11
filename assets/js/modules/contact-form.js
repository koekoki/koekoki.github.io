/**
 * Contact form submission via Web3Forms (https://web3forms.com).
 *
 * Why Web3Forms: the previous integration (staticforms.xyz) moved to a new
 * domain (staticforms.dev) and the access key stopped delivering mail — see
 * git history for the removed code. Web3Forms is free, actively maintained,
 * purpose-built for static sites, and its docs explicitly state the Access
 * Key is safe to ship in client-side code (it is not a secret, unlike an
 * SMTP password or API secret — nothing sensitive is ever stored here).
 *
 * Setup required (cannot be done by an AI agent — needs the site owner):
 *   1. Create a free Access Key at https://web3forms.com/ (just an email address).
 *   2. Paste it into the hidden "access_key" input in index.html, replacing
 *      "TODO_WEB3FORMS_ACCESS_KEY".
 *   3. Optional but recommended: in the Web3Forms dashboard, enable
 *      "Trusted Domains" / restrict the key to koekoki.github.io to stop
 *      the key being reused from other sites.
 *   4. Optional spam hardening: the honeypot field below already covers the
 *      common bot case for free; Web3Forms also runs its own server-side
 *      spam filter automatically on every submission.
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const MESSAGES = {
  sending: "Enviando...",
  success: "Mensagem enviada com sucesso. Obrigado pelo contato!",
  error: "Não foi possível enviar a mensagem. Tente novamente ou entre em contato pelo e-mail.",
  notConfigured:
    "Formulário ainda não configurado. Entre em contato diretamente pelo e-mail kaiky.matsumoto@gmail.com.",
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("contact-submit");
  const submitLabel = submitBtn?.querySelector(".btn__label");
  const statusEl = document.getElementById("form-status");
  const honeypot = form.querySelector('[name="botcheck"]');
  const accessKeyField = form.querySelector('[name="access_key"]');

  function setStatus(state, message) {
    if (!statusEl) return;
    statusEl.dataset.state = state;
    statusEl.textContent = message || "";
  }

  function setSending(isSending) {
    if (submitBtn) submitBtn.disabled = isSending;
    if (submitLabel) submitLabel.textContent = isSending ? MESSAGES.sending : "Enviar mensagem";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Bots tend to fill every field, including hidden ones — humans never do.
    if (honeypot instanceof HTMLInputElement && honeypot.checked) {
      form.reset();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const emailField = form.querySelector('[name="email"]');
    if (emailField instanceof HTMLInputElement && !isValidEmail(emailField.value)) {
      emailField.focus();
      setStatus("error", "Informe um e-mail válido.");
      return;
    }

    const accessKey = accessKeyField instanceof HTMLInputElement ? accessKeyField.value.trim() : "";
    if (!accessKey || accessKey.startsWith("TODO")) {
      setStatus("error", MESSAGES.notConfigured);
      return;
    }

    setSending(true);
    setStatus("sending", MESSAGES.sending);

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success", MESSAGES.success);
        form.reset();
      } else {
        setStatus("error", MESSAGES.error);
      }
    } catch (error) {
      setStatus("error", MESSAGES.error);
    } finally {
      setSending(false);
    }
  });
}
