import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

/* ============================================
   Contact — EmailJS + WhatsApp + social links
   
   SETUP EMAILJS:
   1. Go to https://emailjs.com and create a free account
   2. Create a Service (Gmail, Outlook, etc.)
   3. Create an Email Template — use these variables in your template:
      {{from_name}}  {{from_email}}  {{message}}
   4. Copy your IDs below:
   ============================================ */

const EMAILJS_SERVICE_ID = "service_e4sbdtn"; // ← paste here
const EMAILJS_TEMPLATE_ID = "template_45a9wjk"; // ← paste here
const EMAILJS_PUBLIC_KEY = "WKsLQSJQ6j9OaJo4q"; // ← paste here

// Your contact details — fill these in
const EMAIL = "ayoolaibrahimhamed@gmail.com"; // ← your gmail/email
const WHATSAPP = "+2348134666128"; // already set ✓

// Add your own handles here
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/YOUR_HANDLE",
    handle: "@ambassador079",
  },
  // {
  //   label: "Twitter",
  //   href: "https://twitter.com/YOUR_HANDLE",
  //   handle: "@yourtwitter",
  // },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayoola-ibrahim-bb03532a8/?skipRedirect=true",
    handle: "Ayoola Ibrahim Ambassador",
  },
  // {
  //   label: "Instagram",
  //   href: "https://instagram.com/YOUR_HANDLE",
  //   handle: "@yourinstagram",
  // },
];

export default function Contact() {
  const ref = useRef(null);
  const formEl = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formEl.current,
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      setError("Something went wrong. Try WhatsApp or email directly.");
    } finally {
      setSending(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=Hi%20Ambassador%2C%20I%20saw%20your%20portfolio!`;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
        style={{
          width: "80vw",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(0,245,255,0.035) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inV ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <span className="line-accent" />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--theme-accent)" }}
          >
            04 — Contact
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
          {/* LEFT — info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title mb-6"
              style={{
                color: "var(--theme-text-primary)",
                fontSize: "clamp(2.4rem, 5vw, 5.5rem)",
              }}
            >
              Let's Build{" "}
              <span className="text-gradient-accent">Something</span>{" "}
              Unforgettable
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Whether it's a startup product, a creative redesign, or an
              immersive experience — I'm ready. Let's make something the web
              hasn't seen before.
            </motion.p>

            {/* Copy email */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="mb-4"
            >
              <p
                className="font-mono text-xs tracking-widest mb-2"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                EMAIL
              </p>
              <button
                onClick={copyEmail}
                data-cursor-hover
                className="group flex items-center gap-4 glass px-5 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1px solid var(--theme-glass-border)",
                  maxWidth: "380px",
                  width: "100%",
                }}
              >
                <span
                  className="font-mono text-sm truncate"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {EMAIL}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={copied ? "ok" : "cp"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-auto font-mono text-xs flex-shrink-0"
                    style={{
                      color: copied ? "#00ff88" : "var(--theme-text-secondary)",
                    }}
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42 }}
              className="mb-10"
            >
              <p
                className="font-mono text-xs tracking-widest mb-2"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                WHATSAPP
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group flex items-center gap-4 glass px-5 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1px solid rgba(37,211,102,0.2)",
                  maxWidth: "380px",
                  display: "flex",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>💬</span>
                <span
                  className="font-mono text-sm"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {WHATSAPP}
                </span>
                <span
                  className="ml-auto font-mono text-xs"
                  style={{ color: "#25d366" }}
                >
                  Message →
                </span>
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p
                className="font-mono text-xs tracking-widest mb-3"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                FIND ME
              </p>
              <div className="flex flex-col gap-1">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    animate={inV ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.07 }}
                    className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--theme-glass)]"
                    data-cursor-hover
                  >
                    <span
                      className="font-syne font-bold text-sm transition-colors duration-200 group-hover:text-[var(--theme-accent)]"
                      style={{
                        color: "var(--theme-text-primary)",
                        minWidth: "80px",
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      {s.handle}
                    </span>
                    <span
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                      style={{ color: "var(--theme-accent)" }}
                    >
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inV ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              className="glass rounded-2xl p-6 md:p-8"
              style={{ border: "1px solid var(--theme-glass-border)" }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-4"
                  >
                    <span className="text-6xl">✓</span>
                    <h3
                      className="font-display text-3xl"
                      style={{ color: "var(--theme-accent)" }}
                    >
                      Message Sent!
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formEl}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <h3
                      className="font-syne font-bold text-lg mb-1"
                      style={{ color: "var(--theme-text-primary)" }}
                    >
                      Send a Message
                    </h3>

                    <div>
                      <label
                        className="block font-mono text-xs tracking-widest mb-2"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        NAME
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Your name"
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        className="block font-mono text-xs tracking-widest mb-2"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        EMAIL
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="your@email.com"
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        className="block font-mono text-xs tracking-widest mb-2"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        MESSAGE
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Tell me about your project..."
                        required
                        rows={5}
                        className="input-field resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-xs" style={{ color: "#ff4d88" }}>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full justify-center magnetic-wrap"
                      style={{ opacity: sending ? 0.7 : 1 }}
                    >
                      {sending ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="inline-block"
                          >
                            ◌
                          </motion.span>{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <span>→</span>
                        </>
                      )}
                    </button>

                    <p
                      className="text-xs text-center"
                      style={{
                        color: "var(--theme-text-secondary)",
                        opacity: 0.45,
                      }}
                    >
                      Powered by EmailJS · Messages go straight to your inbox
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
