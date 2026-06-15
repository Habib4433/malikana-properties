"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <main style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        a { text-decoration:none; }
        input, textarea, select { font-family:sans-serif; color:#111; }
        input::placeholder, textarea::placeholder { color:#aaa; }
        input:focus, textarea:focus, select:focus { outline:none; border-color:#1a6b3c !important; }
        .cgrid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:36px; }
        .fgrid { display:grid; grid-template-columns:1fr 1fr; gap:36px; }
        .ngrid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
        .pad { padding:40px 60px; }
        @media(max-width:1024px){ .cgrid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:900px){ .fgrid{ grid-template-columns:1fr; gap:20px; } }
        @media(max-width:768px){
          .pad{ padding:20px 16px; }
          .cgrid{ grid-template-columns:1fr 1fr; }
          .ngrid{ grid-template-columns:1fr; }
        }
        @media(max-width:480px){ .cgrid{ grid-template-columns:1fr; } }
      `}</style>

      <Navbar active="যোগাযোগ" />

      <section style={{ background: "linear-gradient(135deg,#0f2d1e,#1a5c34)", color: "#fff", padding: "40px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "8px" }}>
            <a href="/" style={{ color: "#6ee7a0" }}>হোম</a> › যোগাযোগ
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: "700", marginBottom: "8px" }}>যোগাযোগ করুন</h1>
          <p style={{ color: "#9ecfb2", fontSize: "15px" }}>আমাদের বিশেষজ্ঞ টিম আপনাকে সাহায্য করতে সদা প্রস্তুত</p>
        </div>
      </section>

      <div className="pad" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="cgrid">
          {[
            { icon: "📞", title: "ফোন", lines: ["01719-880087", "01911-118505"], bg: "#e8f5ee", border: "#c3e6d0" },
            { icon: "✉️", title: "ইমেইল", lines: ["malikanapropertiesltd", "@gmail.com"], bg: "#eef2ff", border: "#c7d2fe" },
            { icon: "📍", title: "ঠিকানা", lines: ["Kazi Garden, 7th Floor", "Tejgaon, Dhaka-1215"], bg: "#fffbeb", border: "#fde68a" },
            { icon: "🕐", title: "অফিস সময়", lines: ["শনি–বৃহস্পতি", "সকাল ৯টা – সন্ধ্যা ৬টা"], bg: "#fef2f2", border: "#fecaca" },
          ].map(c => (
            <div key={c.title} style={{ background: c.bg, borderRadius: "12px", padding: "18px", border: `1px solid ${c.border}`, textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{c.icon}</div>
              <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0f2d1e", marginBottom: "6px" }}>{c.title}</h3>
              {c.lines.map((l, i) => <div key={i} style={{ fontSize: "12px", color: "#555", lineHeight: "1.8" }}>{l}</div>)}
            </div>
          ))}
        </div>

        <div className="fgrid">
          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "54px", marginBottom: "14px" }}>✅</div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1a6b3c", marginBottom: "8px" }}>বার্তা পাঠানো হয়েছে!</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                <button onClick={() => { setSent(false); setForm({ name:"",phone:"",email:"",subject:"",message:"" }); }}
                  style={{ marginTop: "16px", background: "#1a6b3c", color: "#fff", border: "none", padding: "11px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif" }}>
                  আবার পাঠান
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "22px" }}>📩 বার্তা পাঠান</h2>
                <div className="ngrid">
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>নাম *</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="আপনার নাম"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>ফোন *</label>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="01XXXXXXXXX"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
                  </div>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>ইমেইল</label>
                  <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>বিষয়</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", cursor: "pointer" }}>
                    <option value="">বিষয় নির্বাচন করুন</option>
                    <option>জমি কিনতে চাই</option>
                    <option>প্লট কিনতে চাই</option>
                    <option>ফ্ল্যাট কিনতে চাই</option>
                    <option>কিস্তি সম্পর্কে জানতে চাই</option>
                    <option>অন্যান্য</option>
                  </select>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>বার্তা *</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="আপনার বার্তা লিখুন..." rows={5}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", resize: "vertical" }} />
                </div>
                <button onClick={() => { if(form.name && form.phone && form.message) setSent(true); }}
                  style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "13px", borderRadius: "9px", fontWeight: "700", fontSize: "15px", cursor: "pointer", fontFamily: "sans-serif" }}>
                  বার্তা পাঠান →
                </button>
              </>
            )}
          </div>

          <div>
            <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", marginBottom: "20px", height: "260px" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4!3d23.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVGVqZ2Fvbg!5e0!3m2!1sen!2sbd!4v1"
                width="100%" height="260" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e", marginBottom: "16px" }}>🏢 আমাদের অফিস</h3>
              {[
                { icon: "📍", label: "ঠিকানা", value: "Kazi Garden, 7th Floor, Tejgaon, Dhaka-1215" },
                { icon: "📞", label: "ফোন", value: "01719-880087, 01911-118505" },
                { icon: "✉️", label: "ইমেইল", value: "malikanapropertiesltd@gmail.com" },
                { icon: "🕐", label: "অফিস সময়", value: "শনিবার – বৃহস্পতিবার, সকাল ৯টা – সন্ধ্যা ৬টা" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "#888" }}>{item.label}</div>
                    <div style={{ fontSize: "13px", color: "#333", lineHeight: "1.6" }}>{item.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                <a href="tel:01719880087" style={{ flex: 1, background: "#1a6b3c", color: "#fff", padding: "11px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", textAlign: "center", display: "block" }}>📞 কল করুন</a>
                <a href="https://wa.me/8801719880087" target="_blank" style={{ flex: 1, background: "#25d366", color: "#fff", padding: "11px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", textAlign: "center", display: "block" }}>💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#3d6b4f", padding: "28px 20px", textAlign: "center", fontSize: "13px" }}>
        © ২০২৫ Malikana Properties Ltd. | Developed by Md Habib
      </footer>
    </main>
  );
}
