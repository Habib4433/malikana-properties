"use client";
import { useState } from "react";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "", nominee: "", nid: "" });
  const [showPass, setShowPass] = useState(false);

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap'); * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; } input { font-family:inherit; color:#111; } input::placeholder { color:#aaa; } input:focus { outline:none; border-color:#1a6b3c !important; }`}</style>

      <div style={{ background: "#0f2d1e", color: "#9ecfb2", fontSize: "13px", padding: "7px 60px", display: "flex", justifyContent: "space-between" }}>
        <span>📞 01719-880087 | 01911-118505</span>
        <span>✉ malikanapropertiesltd@gmail.com</span>
      </div>

      <nav style={{ background: "#fff", borderBottom: "2px solid #e8f0eb", padding: "0 60px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "75px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "15px", lineHeight: "1.1" }}>
            <img src="/logo.jpeg" alt="Malikana Properties" style={{ height: "60px", width: "auto", objectFit: "contain" }} /></div>
        </a>
        <a href="/" style={{ color: "#1a6b3c", fontSize: "14px", fontWeight: "500" }}>← হোমে ফিরে যান</a>
      </nav>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 20px", minHeight: "calc(100vh - 110px)" }}>
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <div style={{ display: "flex", background: "#fff", borderRadius: "14px", padding: "6px", marginBottom: "24px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <button onClick={() => setTab("login")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer", background: tab === "login" ? "#1a6b3c" : "transparent", color: tab === "login" ? "#fff" : "#666" }}>লগইন</button>
            <button onClick={() => setTab("register")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer", background: tab === "register" ? "#1a6b3c" : "transparent", color: tab === "register" ? "#fff" : "#666" }}>রেজিস্ট্রেশন</button>
          </div>

          <div style={{ background: "#fff", borderRadius: "16px", padding: "36px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            {tab === "login" && (
              <>
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>👤</div>
                  <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f2d1e" }}>আপনার অ্যাকাউন্টে লগইন করুন</h2>
                  <p style={{ color: "#888", fontSize: "14px", marginTop: "6px" }}>আপনার কিস্তি ও সম্পত্তির তথ্য দেখুন</p>
                </div>
                <div style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>ফোন নম্বর</label>
                  <input type="tel" placeholder="01XXXXXXXXX" value={loginForm.phone} onChange={e => setLoginForm({ ...loginForm, phone: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>পাসওয়ার্ড</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPass ? "text" : "password"} placeholder="পাসওয়ার্ড দিন" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                      style={{ width: "100%", padding: "12px 46px 12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
                    <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right", marginBottom: "24px" }}>
                  <a href="#" style={{ color: "#1a6b3c", fontSize: "13px", fontWeight: "500" }}>পাসওয়ার্ড ভুলে গেছেন?</a>
                </div>
                <a href="/dashboard" style={{ display: "block", textAlign: "center", background: "#1a6b3c", color: "#fff", padding: "14px", borderRadius: "10px", fontWeight: "700", fontSize: "16px" }}>লগইন করুন →</a>
                <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
                  অ্যাকাউন্ট নেই?{" "}
                  <button onClick={() => setTab("register")} style={{ background: "none", border: "none", color: "#1a6b3c", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>রেজিস্ট্রেশন করুন</button>
                </div>
              </>
            )}

            {tab === "register" && (
              <>
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>📝</div>
                  <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f2d1e" }}>নতুন অ্যাকাউন্ট তৈরি করুন</h2>
                </div>
                {[
                  { label: "পূর্ণ নাম *", key: "name", placeholder: "আপনার পূর্ণ নাম", type: "text" },
                  { label: "ফোন নম্বর *", key: "phone", placeholder: "01XXXXXXXXX", type: "tel" },
                  { label: "ইমেইল", key: "email", placeholder: "your@email.com", type: "email" },
                  { label: "জাতীয় পরিচয়পত্র (NID)", key: "nid", placeholder: "NID নম্বর দিন", type: "text" },
                  { label: "নমিনির নাম", key: "nominee", placeholder: "নমিনির পূর্ণ নাম", type: "text" },
                  { label: "পাসওয়ার্ড *", key: "password", placeholder: "পাসওয়ার্ড দিন", type: "password" },
                  { label: "পাসওয়ার্ড নিশ্চিত করুন *", key: "confirmPassword", placeholder: "আবার পাসওয়ার্ড দিন", type: "password" },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} value={regForm[field.key as keyof typeof regForm]}
                      onChange={e => setRegForm({ ...regForm, [field.key]: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
                  </div>
                ))}
                <button style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: "pointer", marginTop: "8px" }}>
                  রেজিস্ট্রেশন করুন →
                </button>
                <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
                  ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                  <button onClick={() => setTab("login")} style={{ background: "none", border: "none", color: "#1a6b3c", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>লগইন করুন</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "24px 60px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>© ২০২৫ Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
