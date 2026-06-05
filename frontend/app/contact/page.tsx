"use client";
import { useState } from "react";

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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap'); * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; } .nav-link { color:#333; font-size:14px; font-weight:500; } .nav-link:hover { color:#1a6b3c; } input, textarea, select { font-family:inherit; color:#111; } input::placeholder, textarea::placeholder { color:#aaa; } input:focus, textarea:focus, select:focus { outline:none; border-color:#1a6b3c !important; }`}</style>

      <div style={{ background: "#0f2d1e", color: "#9ecfb2", fontSize: "13px", padding: "7px 60px", display: "flex", justifyContent: "space-between" }}>
        <span>📞 01719-880087 | 01911-118505</span>
        <span>✉ malikanapropertiesltd@gmail.com | 🕐 শনি–বৃহঃ: সকাল ৯টা – সন্ধ্যা ৬টা</span>
      </div>

      <nav style={{ background: "#fff", borderBottom: "2px solid #e8f0eb", padding: "0 60px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "75px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "15px", lineHeight: "1.1" }}>
            <img src="/logo.jpeg" alt="Malikana Properties" style={{ height: "60px", width: "auto", objectFit: "contain" }} /></div>
        </a>
        <div style={{ display: "flex", gap: "32px" }}>
          {[["হোম", "/"], ["জমি ও প্লট", "/plots"], ["ফ্ল্যাট বিক্রয়", "/flats"], ["কিস্তি সুবিধা", "/installment"], ["যোগাযোগ", "/contact"]].map(([label, href]) => (
            <a key={label} href={href} className="nav-link" style={{ color: label === "যোগাযোগ" ? "#1a6b3c" : "#333", borderBottom: label === "যোগাযোগ" ? "2px solid #1a6b3c" : "none", paddingBottom: "4px" }}>{label}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="/login" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px" }}>লগইন</a>
          <a href="/login" style={{ background: "#1a6b3c", color: "#fff", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px" }}>রেজিস্ট্রেশন</a>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #0f2d1e, #1a5c34)", color: "#fff", padding: "48px 60px" }}>
        <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "10px" }}><a href="/" style={{ color: "#6ee7a0" }}>হোম</a> › যোগাযোগ</div>
        <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "10px" }}>যোগাযোগ করুন</h1>
        <p style={{ color: "#9ecfb2", fontSize: "16px" }}>আমাদের বিশেষজ্ঞ টিম আপনাকে সাহায্য করতে সদা প্রস্তুত</p>
      </section>

      <section style={{ padding: "48px 60px 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {[
            { icon: "📞", title: "ফোন", lines: ["01719-880087", "01911-118505"], color: "#e8f5ee", border: "#c3e6d0" },
            { icon: "✉️", title: "ইমেইল", lines: ["malikanapropertiesltd", "@gmail.com"], color: "#eef2ff", border: "#c7d2fe" },
            { icon: "📍", title: "ঠিকানা", lines: ["Kazi Garden, 7th Floor", "Tejgaon, Dhaka-1215"], color: "#fffbeb", border: "#fde68a" },
            { icon: "🕐", title: "অফিস সময়", lines: ["শনি–বৃহস্পতি", "সকাল ৯টা – সন্ধ্যা ৬টা"], color: "#fef2f2", border: "#fecaca" },
          ].map(c => (
            <div key={c.title} style={{ background: c.color, borderRadius: "14px", padding: "24px", border: `1px solid ${c.border}`, textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{c.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e", marginBottom: "10px" }}>{c.title}</h3>
              {c.lines.map((l, i) => <div key={i} style={{ fontSize: "14px", color: "#555", lineHeight: "1.8" }}>{l}</div>)}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 60px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "36px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "60px", marginBottom: "16px" }}>✅</div>
                <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#1a6b3c", marginBottom: "10px" }}>বার্তা পাঠানো হয়েছে!</h3>
                <p style={{ color: "#666", fontSize: "15px" }}>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
                <button onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", subject: "", message: "" }); }}
                  style={{ marginTop: "20px", background: "#1a6b3c", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "9px", fontWeight: "600", fontSize: "15px", cursor: "pointer" }}>
                  আবার পাঠান
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px" }}>📩 বার্তা পাঠান</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>নাম *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="আপনার নাম"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>ফোন *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>ইমেইল</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>বিষয়</label>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", cursor: "pointer" }}>
                    <option value="">বিষয় নির্বাচন করুন</option>
                    <option>জমি কিনতে চাই</option>
                    <option>প্লট কিনতে চাই</option>
                    <option>ফ্ল্যাট কিনতে চাই</option>
                    <option>কিস্তি সম্পর্কে জানতে চাই</option>
                    <option>অন্যান্য</option>
                  </select>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>বার্তা *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="আপনার বার্তা লিখুন..." rows={5}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", resize: "vertical" }} />
                </div>
                <button onClick={handleSubmit}
                  style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: "pointer" }}>
                  বার্তা পাঠান →
                </button>
              </>
            )}
          </div>

          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", marginBottom: "24px", height: "300px" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4!3d23.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVGVqZ2Fvbg!5e0!3m2!1sen!2sbd!4v1"
                width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "20px" }}>🏢 আমাদের অফিস</h3>
              {[
                { icon: "📍", label: "ঠিকানা", value: "Kazi Garden, 7th Floor, Tejgaon, Dhaka-1215" },
                { icon: "📞", label: "ফোন", value: "01719-880087, 01911-118505" },
                { icon: "✉️", label: "ইমেইল", value: "malikanapropertiesltd@gmail.com" },
                { icon: "🕐", label: "অফিস সময়", value: "শনিবার – বৃহস্পতিবার, সকাল ৯টা – সন্ধ্যা ৬টা" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ fontSize: "20px", marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#888", marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontSize: "14px", color: "#333", lineHeight: "1.6" }}>{item.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
                <a href="tel:01719880087" style={{ flex: 1, background: "#1a6b3c", color: "#fff", padding: "12px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", textAlign: "center", display: "block" }}>📞 কল করুন</a>
                <a href="https://wa.me/8801719880087" target="_blank" style={{ flex: 1, background: "#25d366", color: "#fff", padding: "12px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", textAlign: "center", display: "block" }}>💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "32px 60px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>© ২০২৫ Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
