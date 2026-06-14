"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.message) return;
    setSent(true);
  };

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; }
        input, textarea, select { font-family:inherit; color:#111; }
        input::placeholder, textarea::placeholder { color:#aaa; }
        input:focus, textarea:focus, select:focus { outline:none; border-color:#1a6b3c !important; }
        .contact-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .contact-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
        .form-name-phone { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .page-pad { padding:48px 60px; }
        @media(max-width:1024px) { .contact-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:768px) {
          .page-pad { padding:24px 16px; }
          .contact-grid { grid-template-columns:1fr 1fr; gap:12px; }
          .contact-form-grid { grid-template-columns:1fr; gap:24px; }
          .form-name-phone { grid-template-columns:1fr; }
        }
        @media(max-width:480px) { .contact-grid { grid-template-columns:1fr; } }
      `}</style>

      <Navbar active="\u09af\u09cb\u0997\u09be\u09af\u09cb\u0997" />

      <section style={{ background: "linear-gradient(135deg, #0f2d1e, #1a5c34)", color: "#fff", padding: "48px 60px" }}>
        <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "10px" }}><a href="/" style={{ color: "#6ee7a0" }}>\u09b9\u09cb\u09ae</a> \u203a \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997</div>
        <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: "700", marginBottom: "10px" }}>\u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8</h1>
        <p style={{ color: "#9ecfb2", fontSize: "16px" }}>\u0986\u09ae\u09be\u09a6\u09c7\u09b0 \u09ac\u09bf\u09b6\u09c7\u09b7\u099c\u09cd\u099e \u099f\u09bf\u09ae \u0986\u09aa\u09a8\u09be\u0995\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09a4\u09c7 \u09b8\u09a6\u09be \u09aa\u09cd\u09b0\u09b8\u09cd\u09a4\u09c1\u09a4</p>
      </section>

      <section className="page-pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="contact-grid" style={{ marginBottom: "40px" }}>
          {[
            { icon: "📞", title: "\u09ab\u09cb\u09a8", lines: ["01719-880087", "01911-118505"], color: "#e8f5ee", border: "#c3e6d0" },
            { icon: "\u2709\uFE0F", title: "\u0987\u09ae\u09c7\u0987\u09b2", lines: ["malikanapropertiesltd", "@gmail.com"], color: "#eef2ff", border: "#c7d2fe" },
            { icon: "📍", title: "\u09a0\u09bf\u0995\u09be\u09a8\u09be", lines: ["Kazi Garden, 7th Floor", "Tejgaon, Dhaka-1215"], color: "#fffbeb", border: "#fde68a" },
            { icon: "🕐", title: "\u0985\u09ab\u09bf\u09b8 \u09b8\u09ae\u09af\u09bc", lines: ["\u09b6\u09a8\u09bf\u2013\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf", "\u09b8\u0995\u09be\u09b2 \u09ef\u099f\u09be \u2013 \u09b8\u09a8\u09cd\u09a7\u09cd\u09af\u09be \u09ec\u099f\u09be"], color: "#fef2f2", border: "#fecaca" },
          ].map(c => (
            <div key={c.title} style={{ background: c.color, borderRadius: "14px", padding: "20px", border: `1px solid ${c.border}`, textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>{c.icon}</div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f2d1e", marginBottom: "8px" }}>{c.title}</h3>
              {c.lines.map((l, i) => <div key={i} style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>{l}</div>)}
            </div>
          ))}
        </div>

        <div className="contact-form-grid">
          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "60px", marginBottom: "16px" }}>\u2705</div>
                <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#1a6b3c", marginBottom: "10px" }}>\u09ac\u09be\u09b0\u09cd\u09a4\u09be \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09af\u09bc\u09c7\u099b\u09c7!</h3>
                <p style={{ color: "#666", fontSize: "15px" }}>\u0986\u09ae\u09b0\u09be \u09b6\u09c0\u0998\u09cd\u09b0\u0987 \u0986\u09aa\u09a8\u09be\u09b0 \u09b8\u09be\u09a5\u09c7 \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09ac\u09cb\u0964</p>
                <button onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", subject: "", message: "" }); }}
                  style={{ marginTop: "20px", background: "#1a6b3c", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "9px", fontWeight: "600", fontSize: "15px", cursor: "pointer", fontFamily: "inherit" }}>
                  \u0986\u09ac\u09be\u09b0 \u09aa\u09be\u09a0\u09be\u09a8
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px" }}>📩 \u09ac\u09be\u09b0\u09cd\u09a4\u09be \u09aa\u09be\u09a0\u09be\u09a8</h2>
                <div className="form-name-phone" style={{ marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>\u09a8\u09be\u09ae *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="\u0986\u09aa\u09a8\u09be\u09b0 \u09a8\u09be\u09ae"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>\u09ab\u09cb\u09a8 *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>\u0987\u09ae\u09c7\u0987\u09b2</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>\u09ac\u09bf\u09b7\u09af\u09bc</label>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", cursor: "pointer" }}>
                    <option value="">\u09ac\u09bf\u09b7\u09af\u09bc \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09c1\u09a8</option>
                    <option>\u099c\u09ae\u09bf \u0995\u09bf\u09a8\u09a4\u09c7 \u099a\u09be\u0987</option>
                    <option>\u09aa\u09cd\u09b2\u099f \u0995\u09bf\u09a8\u09a4\u09c7 \u099a\u09be\u0987</option>
                    <option>\u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f \u0995\u09bf\u09a8\u09a4\u09c7 \u099a\u09be\u0987</option>
                    <option>\u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7 \u099c\u09be\u09a8\u09a4\u09c7 \u099a\u09be\u0987</option>
                    <option>\u0985\u09a8\u09cd\u09af\u09be\u09a8\u09cd\u09af</option>
                  </select>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>\u09ac\u09be\u09b0\u09cd\u09a4\u09be *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="\u0986\u09aa\u09a8\u09be\u09b0 \u09ac\u09be\u09b0\u09cd\u09a4\u09be \u09b2\u09bf\u0996\u09c1\u09a8..." rows={5}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", resize: "vertical" }} />
                </div>
                <button onClick={handleSubmit}
                  style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: "pointer", fontFamily: "inherit" }}>
                  \u09ac\u09be\u09b0\u09cd\u09a4\u09be \u09aa\u09be\u09a0\u09be\u09a8 \u2192
                </button>
              </>
            )}
          </div>

          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", marginBottom: "24px", height: "280px" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4!3d23.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVGVqZ2Fvbg!5e0!3m2!1sen!2sbd!4v1"
                width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "18px" }}>🏢 \u0986\u09ae\u09be\u09a6\u09c7\u09b0 \u0985\u09ab\u09bf\u09b8</h3>
              {[
                { icon: "📍", label: "\u09a0\u09bf\u0995\u09be\u09a8\u09be", value: "Kazi Garden, 7th Floor, Tejgaon, Dhaka-1215" },
                { icon: "📞", label: "\u09ab\u09cb\u09a8", value: "01719-880087, 01911-118505" },
                { icon: "\u2709\uFE0F", label: "\u0987\u09ae\u09c7\u0987\u09b2", value: "malikanapropertiesltd@gmail.com" },
                { icon: "🕐", label: "\u0985\u09ab\u09bf\u09b8 \u09b8\u09ae\u09af\u09bc", value: "\u09b6\u09a8\u09bf\u09ac\u09be\u09b0 \u2013 \u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf\u09ac\u09be\u09b0, \u09b8\u0995\u09be\u09b2 \u09ef\u099f\u09be \u2013 \u09b8\u09a8\u09cd\u09a7\u09cd\u09af\u09be \u09ec\u099f\u09be" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "14px" }}>
                  <span style={{ fontSize: "18px", marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#888", marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontSize: "13px", color: "#333", lineHeight: "1.6" }}>{item.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
                <a href="tel:01719880087" style={{ flex: 1, background: "#1a6b3c", color: "#fff", padding: "12px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", textAlign: "center", display: "block" }}>📞 \u0995\u09b2 \u0995\u09b0\u09c1\u09a8</a>
                <a href="https://wa.me/8801719880087" target="_blank" style={{ flex: 1, background: "#25d366", color: "#fff", padding: "12px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", textAlign: "center", display: "block" }}>💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>\u00a9 \u09e8\u09e6\u09e8\u09eb Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
