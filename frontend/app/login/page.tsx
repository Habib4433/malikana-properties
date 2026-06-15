"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "", nominee: "", nid: "" });
  const [showPass, setShowPass] = useState(false);

  return (
    <main style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        a { text-decoration:none; }
        input { font-family:sans-serif; color:#111; }
        input::placeholder { color:#aaa; }
        input:focus { outline:none; border-color:#1a6b3c !important; }
      `}</style>

      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", padding: "36px 16px 60px" }}>
        <div style={{ width: "100%", maxWidth: "460px" }}>
          <div style={{ display: "flex", background: "#fff", borderRadius: "12px", padding: "5px", marginBottom: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <button onClick={() => setTab("login")} style={{ flex: 1, padding: "11px", borderRadius: "9px", border: "none", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600", cursor: "pointer", background: tab === "login" ? "#1a6b3c" : "transparent", color: tab === "login" ? "#fff" : "#666" }}>লগইন</button>
            <button onClick={() => setTab("register")} style={{ flex: 1, padding: "11px", borderRadius: "9px", border: "none", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600", cursor: "pointer", background: tab === "register" ? "#1a6b3c" : "transparent", color: tab === "register" ? "#fff" : "#666" }}>রেজিস্ট্রেশন</button>
          </div>

          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
            {tab === "login" ? (
              <>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>👤</div>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e" }}>আপনার অ্যাকাউন্টে লগইন করুন</h2>
                  <p style={{ color: "#888", fontSize: "13px", marginTop: "5px" }}>আপনার কিস্তি ও সম্পত্তির তথ্য দেখুন</p>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "7px" }}>ফোন নম্বর</label>
                  <input type="tel" placeholder="01XXXXXXXXX" value={loginForm.phone} onChange={e => setLoginForm({...loginForm, phone: e.target.value})}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "7px" }}>পাসওয়ার্ড</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPass ? "text" : "password"} placeholder="পাসওয়ার্ড দিন" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                      style={{ width: "100%", padding: "11px 44px 11px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
                    <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right", marginBottom: "22px" }}>
                  <a href="#" style={{ color: "#1a6b3c", fontSize: "12px", fontWeight: "500" }}>পাসওয়ার্ড ভুলে গেছেন?</a>
                </div>
                <a href="/dashboard" style={{ display: "block", textAlign: "center", background: "#1a6b3c", color: "#fff", padding: "13px", borderRadius: "9px", fontWeight: "700", fontSize: "15px" }}>লগইন করুন →</a>
                <div style={{ textAlign: "center", marginTop: "18px", fontSize: "13px", color: "#666" }}>
                  অ্যাকাউন্ট নেই?{" "}
                  <button onClick={() => setTab("register")} style={{ background: "none", border: "none", color: "#1a6b3c", fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px" }}>রেজিস্ট্রেশন করুন</button>
                </div>
              </>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>📝</div>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e" }}>নতুন অ্যাকাউন্ট তৈরি করুন</h2>
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
                  <div key={field.key} style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "6px" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} value={regForm[field.key as keyof typeof regForm]}
                      onChange={e => setRegForm({...regForm, [field.key]: e.target.value})}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
                  </div>
                ))}
                <button style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "13px", borderRadius: "9px", fontWeight: "700", fontSize: "15px", cursor: "pointer", marginTop: "8px", fontFamily: "sans-serif" }}>
                  রেজিস্ট্রেশন করুন →
                </button>
                <div style={{ textAlign: "center", marginTop: "18px", fontSize: "13px", color: "#666" }}>
                  ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                  <button onClick={() => setTab("login")} style={{ background: "none", border: "none", color: "#1a6b3c", fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px" }}>লগইন করুন</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#3d6b4f", padding: "24px 20px", textAlign: "center", fontSize: "13px" }}>
        © ২০২৫ Malikana Properties Ltd. | Developed by Md Habib
      </footer>
    </main>
  );
}
