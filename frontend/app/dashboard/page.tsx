"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("user");
    const token = window.localStorage.getItem("token");
    if (!stored || !token) {
      window.location.href = "/login";
      return;
    }
    setUser(JSON.parse(stored));

    // Backend থেকে fresh data আনি
    fetch(`${API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => {
        if (d.user) {
          setUser(d.user);
          window.localStorage.setItem("user", JSON.stringify(d.user));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (loading) return (
    <main style={{ fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px", color: "#1a6b3c" }}>লোড হচ্ছে...</div>
    </main>
  );

  if (!user) return null;

  return (
    <main style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        a { text-decoration:none; }
        .dash-grid { display:grid; grid-template-columns:280px 1fr; gap:28px; }
        .stat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px; }
        .pad { padding:36px 60px; }
        @media(max-width:900px){
          .dash-grid { grid-template-columns:1fr; }
          .stat-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:768px){
          .pad { padding:20px 16px; }
          .stat-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:480px){
          .stat-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <Navbar />

      <section style={{ background: "linear-gradient(135deg,#0f2d1e,#1a5c34)", color: "#fff", padding: "32px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: "700", marginBottom: "6px" }}>স্বাগতম, {user.name}! 👋</h1>
            <p style={{ color: "#9ecfb2", fontSize: "14px" }}>আপনার অ্যাকাউন্ট ড্যাশবোর্ড</p>
          </div>
          <button onClick={handleLogout} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "10px 22px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", fontFamily: "sans-serif" }}>
            লগআউট
          </button>
        </div>
      </section>

      <div className="pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Stats */}
        <div className="stat-grid">
          {[
            { icon: "🏡", label: "বুক করা সম্পত্তি", value: "০টি", color: "#e8f5ee", border: "#c3e6d0" },
            { icon: "💰", label: "মোট কিস্তি", value: "০টি", color: "#eef2ff", border: "#c7d2fe" },
            { icon: "✅", label: "পরিশোধিত কিস্তি", value: "০টি", color: "#fffbeb", border: "#fde68a" },
          ].map(s => (
            <div key={s.label} style={{ background: s.color, borderRadius: "12px", padding: "20px", border: `1px solid ${s.border}`, textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#0f2d1e", marginBottom: "4px" }}>{s.value}</div>
              <div style={{ fontSize: "13px", color: "#666" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          {/* Left — Profile */}
          <div>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg,#1a6b3c,#2d9e5f)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "32px" }}>
                  👤
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e" }}>{user.name}</h3>
                <span style={{ background: "#e8f5ee", color: "#166534", fontSize: "12px", padding: "3px 12px", borderRadius: "20px", fontWeight: "600" }}>
                  {user.role === "admin" ? "অ্যাডমিন" : "ক্রেতা"}
                </span>
              </div>

              {[
                { icon: "📞", label: "ফোন", value: user.phone },
                { icon: "✉️", label: "ইমেইল", value: user.email || "দেওয়া হয়নি" },
                { icon: "🪪", label: "NID", value: user.nid || "দেওয়া হয়নি" },
                { icon: "👥", label: "নমিনি", value: user.nominee || "দেওয়া হয়নি" },
                { icon: "📅", label: "যোগদান", value: user.created_at ? new Date(user.created_at).toLocaleDateString("bn-BD") : "" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ fontSize: "16px", marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "#888", fontWeight: "600" }}>{item.label}</div>
                    <div style={{ fontSize: "14px", color: "#333" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="/contact" style={{ display: "block", textAlign: "center", background: "#1a6b3c", color: "#fff", padding: "13px", borderRadius: "10px", fontWeight: "600", fontSize: "14px" }}>
              📞 আমাদের সাথে যোগাযোগ করুন
            </a>
          </div>

          {/* Right — Content */}
          <div>
            {/* Booked Properties */}
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "18px" }}>🏡 বুক করা সম্পত্তি</h3>
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
                <p style={{ fontSize: "15px", marginBottom: "16px" }}>এখনো কোনো সম্পত্তি বুক করা হয়নি</p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="/plots" style={{ background: "#1a6b3c", color: "#fff", padding: "11px 22px", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>জমি ও প্লট দেখুন</a>
                  <a href="/flats" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "11px 22px", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>ফ্ল্যাট দেখুন</a>
                </div>
              </div>
            </div>

            {/* Installments */}
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "18px" }}>💳 কিস্তির তথ্য</h3>
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📋</div>
                <p style={{ fontSize: "15px", marginBottom: "16px" }}>এখনো কোনো কিস্তি নেই</p>
                <a href="/installment" style={{ background: "#1a6b3c", color: "#fff", padding: "11px 22px", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>কিস্তি হিসাব করুন</a>
              </div>
            </div>

            {/* Quick Links */}
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "18px" }}>⚡ দ্রুত লিংক</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { icon: "🏡", label: "জমি ও প্লট", href: "/plots", color: "#e8f5ee", border: "#c3e6d0" },
                  { icon: "🏢", label: "ফ্ল্যাট বিক্রয়", href: "/flats", color: "#eef2ff", border: "#c7d2fe" },
                  { icon: "💰", label: "কিস্তি হিসাব", href: "/installment", color: "#fffbeb", border: "#fde68a" },
                  { icon: "📞", label: "যোগাযোগ", href: "/contact", color: "#fef2f2", border: "#fecaca" },
                ].map(l => (
                  <a key={l.label} href={l.href} style={{ background: l.color, border: `1px solid ${l.border}`, borderRadius: "10px", padding: "16px", textAlign: "center", display: "block" }}>
                    <div style={{ fontSize: "24px", marginBottom: "6px" }}>{l.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f2d1e" }}>{l.label}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#3d6b4f", padding: "24px 20px", textAlign: "center", fontSize: "13px", marginTop: "40px" }}>
        © ২০২৫ Malikana Properties Ltd. | Developed by Md Habib
      </footer>
    </main>
  );
}
