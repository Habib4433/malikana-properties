"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "", nominee: "", nid: "" });
  const [showPass, setShowPass] = useState(false);

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; }
        input { font-family:inherit; color:#111; }
        input::placeholder { color:#aaa; }
        input:focus { outline:none; border-color:#1a6b3c !important; }
      `}</style>

      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 16px 60px", minHeight: "calc(100vh - 110px)" }}>
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <div style={{ display: "flex", background: "#fff", borderRadius: "14px", padding: "6px", marginBottom: "24px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <button onClick={() => setTab("login")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer", background: tab === "login" ? "#1a6b3c" : "transparent", color: tab === "login" ? "#fff" : "#666" }}>\u09b2\u0997\u0987\u09a8</button>
            <button onClick={() => setTab("register")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer", background: tab === "register" ? "#1a6b3c" : "transparent", color: tab === "register" ? "#fff" : "#666" }}>\u09b0\u09c7\u099c\u09bf\u09b8\u09cd\u099f\u09cd\u09b0\u09c7\u09b6\u09a8</button>
          </div>

          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            {tab === "login" && (
              <>
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>👤</div>
                  <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f2d1e" }}>\u0986\u09aa\u09a8\u09be\u09b0 \u0985\u09cd\u09af\u09be\u0995\u09be\u0989\u09a8\u09cd\u099f\u09c7 \u09b2\u0997\u0987\u09a8 \u0995\u09b0\u09c1\u09a8</h2>
                  <p style={{ color: "#888", fontSize: "14px", marginTop: "6px" }}>\u0986\u09aa\u09a8\u09be\u09b0 \u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09a4 \u09b8\u09ae\u09cd\u09aa\u09a4\u09cd\u09a4\u09bf\u09b0 \u09a4\u09a5\u09cd\u09af \u09a6\u09c7\u0996\u09c1\u09a8</p>
                </div>
                <div style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>\u09ab\u09cb\u09a8 \u09a8\u09ae\u09cd\u09ac\u09b0</label>
                  <input type="tel" placeholder="01XXXXXXXXX" value={loginForm.phone} onChange={e => setLoginForm({ ...loginForm, phone: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPass ? "text" : "password"} placeholder="\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09a6\u09bf\u09a8" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                      style={{ width: "100%", padding: "12px 46px 12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
                    <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right", marginBottom: "24px" }}>
                  <a href="#" style={{ color: "#1a6b3c", fontSize: "13px", fontWeight: "500" }}>\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09ad\u09c1\u09b2\u09c7 \u0997\u09c7\u099b\u09c7\u09a8?</a>
                </div>
                <a href="/dashboard" style={{ display: "block", textAlign: "center", background: "#1a6b3c", color: "#fff", padding: "14px", borderRadius: "10px", fontWeight: "700", fontSize: "16px" }}>\u09b2\u0997\u0987\u09a8 \u0995\u09b0\u09c1\u09a8 \u2192</a>
                <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
                  \u0985\u09cd\u09af\u09be\u0995\u09be\u0989\u09a8\u09cd\u099f \u09a8\u09c7\u0987?{" "}
                  <button onClick={() => setTab("register")} style={{ background: "none", border: "none", color: "#1a6b3c", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>\u09b0\u09c7\u099c\u09bf\u09b8\u09cd\u099f\u09cd\u09b0\u09c7\u09b6\u09a8 \u0995\u09b0\u09c1\u09a8</button>
                </div>
              </>
            )}

            {tab === "register" && (
              <>
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>📝</div>
                  <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f2d1e" }}>\u09a8\u09a4\u09c1\u09a8 \u0985\u09cd\u09af\u09be\u0995\u09be\u0989\u09a8\u09cd\u099f \u09a4\u09c8\u09b0\u09bf \u0995\u09b0\u09c1\u09a8</h2>
                </div>
                {[
                  { label: "\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09be\u09ae *", key: "name", placeholder: "\u0986\u09aa\u09a8\u09be\u09b0 \u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09be\u09ae", type: "text" },
                  { label: "\u09ab\u09cb\u09a8 \u09a8\u09ae\u09cd\u09ac\u09b0 *", key: "phone", placeholder: "01XXXXXXXXX", type: "tel" },
                  { label: "\u0987\u09ae\u09c7\u0987\u09b2", key: "email", placeholder: "your@email.com", type: "email" },
                  { label: "\u099c\u09be\u09a4\u09c0\u09af\u09bc \u09aa\u09b0\u09bf\u099a\u09af\u09bc\u09aa\u09a4\u09cd\u09b0 (NID)", key: "nid", placeholder: "NID \u09a8\u09ae\u09cd\u09ac\u09b0 \u09a6\u09bf\u09a8", type: "text" },
                  { label: "\u09a8\u09ae\u09bf\u09a8\u09bf\u09b0 \u09a8\u09be\u09ae", key: "nominee", placeholder: "\u09a8\u09ae\u09bf\u09a8\u09bf\u09b0 \u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09be\u09ae", type: "text" },
                  { label: "\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 *", key: "password", placeholder: "\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09a6\u09bf\u09a8", type: "password" },
                  { label: "\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09c1\u09a8 *", key: "confirmPassword", placeholder: "\u0986\u09ac\u09be\u09b0 \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09a6\u09bf\u09a8", type: "password" },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} value={regForm[field.key as keyof typeof regForm]}
                      onChange={e => setRegForm({ ...regForm, [field.key]: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
                  </div>
                ))}
                <button style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: "pointer", marginTop: "8px", fontFamily: "inherit" }}>
                  \u09b0\u09c7\u099c\u09bf\u09b8\u09cd\u099f\u09cd\u09b0\u09c7\u09b6\u09a8 \u0995\u09b0\u09c1\u09a8 \u2192
                </button>
                <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
                  \u0987\u09a4\u09bf\u09ae\u09a7\u09cd\u09af\u09c7 \u0985\u09cd\u09af\u09be\u0995\u09be\u0989\u09a8\u09cd\u099f \u0986\u099b\u09c7?{" "}
                  <button onClick={() => setTab("login")} style={{ background: "none", border: "none", color: "#1a6b3c", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>\u09b2\u0997\u0987\u09a8 \u0995\u09b0\u09c1\u09a8</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "24px 20px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>\u00a9 \u09e8\u09e6\u09e8\u09eb Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
