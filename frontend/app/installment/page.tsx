"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function InstallmentPage() {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [months, setMonths] = useState("12");
  const [result, setResult] = useState<null | { monthly: number; total: number; remaining: number }>(null);

  const calculate = () => {
    const totalPrice = parseFloat(price);
    const down = parseFloat(downPayment);
    const m = parseInt(months);
    if (!totalPrice || !down || !m) return;
    const remaining = totalPrice - down;
    const monthly = remaining / m;
    setResult({ monthly: Math.round(monthly), total: totalPrice, remaining: Math.round(remaining) });
  };

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; }
        input, select { font-family:inherit; color:#111; }
        input::placeholder { color:#aaa; }
        input:focus, select:focus { outline:none; border-color:#1a6b3c !important; }
        .inst-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start; }
        .result-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .page-pad { padding:48px 60px; }
        .hero-pad { padding:48px 60px; }
        @media(max-width:900px) { .inst-grid { grid-template-columns:1fr; gap:24px; } }
        @media(max-width:768px) {
          .page-pad { padding:20px 16px; }
          .hero-pad { padding:32px 16px; }
        }
      `}</style>

      <Navbar active="\u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09b8\u09c1\u09ac\u09bf\u09a7\u09be" />

      <section style={{ background: "linear-gradient(135deg, #0f2d1e, #1a5c34)", color: "#fff" }} className="hero-pad">
        <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "10px" }}><a href="/" style={{ color: "#6ee7a0" }}>\u09b9\u09cb\u09ae</a> \u203a \u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09b8\u09c1\u09ac\u09bf\u09a7\u09be</div>
        <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: "700", marginBottom: "10px" }}>\u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u0995\u09cd\u09af\u09be\u09b2\u0995\u09c1\u09b2\u09c7\u099f\u09b0</h1>
        <p style={{ color: "#9ecfb2", fontSize: "16px" }}>\u0986\u09aa\u09a8\u09be\u09b0 \u09ac\u09be\u099c\u09c7\u099f \u0985\u09a8\u09c1\u09af\u09be\u09af\u09bc\u09c0 \u09ae\u09be\u09b8\u09bf\u0995 \u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09b9\u09bf\u09b8\u09be\u09ac \u0995\u09b0\u09c1\u09a8</p>
      </section>

      <div className="page-pad" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="inst-grid">
          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e", marginBottom: "28px" }}>💰 \u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09b9\u09bf\u09b8\u09be\u09ac \u0995\u09b0\u09c1\u09a8</h2>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>\u09ae\u09cb\u099f \u09b8\u09ae\u09cd\u09aa\u09a4\u09cd\u09a4\u09bf\u09b0 \u09ae\u09c2\u09b2\u09cd\u09af (\u099f\u09be\u0995\u09be)</label>
              <input type="number" placeholder="\u09af\u09c7\u09ae\u09a8: 1800000" value={price} onChange={e => setPrice(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>\u09a1\u09be\u0989\u09a8 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f (\u099f\u09be\u0995\u09be)</label>
              <input type="number" placeholder="\u09af\u09c7\u09ae\u09a8: 500000" value={downPayment} onChange={e => setDownPayment(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
            </div>
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>\u0995\u09bf\u09b8\u09cd\u09a4\u09bf\u09b0 \u09ae\u09c7\u09af\u09bc\u09be\u09a6</label>
              <select value={months} onChange={e => setMonths(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px", cursor: "pointer" }}>
                <option value="6">\u09ec \u09ae\u09be\u09b8</option>
                <option value="12">\u09e7\u09e8 \u09ae\u09be\u09b8 (\u09e7 \u09ac\u099b\u09b0)</option>
                <option value="24">\u09e8\u09ea \u09ae\u09be\u09b8 (\u09e8 \u09ac\u099b\u09b0)</option>
                <option value="36">\u09e9\u09ec \u09ae\u09be\u09b8 (\u09e9 \u09ac\u099b\u09b0)</option>
                <option value="48">\u09ea\u09ee \u09ae\u09be\u09b8 (\u09ea \u09ac\u099b\u09b0)</option>
                <option value="60">\u09ec\u09e6 \u09ae\u09be\u09b8 (\u09eb \u09ac\u099b\u09b0)</option>
                <option value="120">\u09e7\u09e8\u09e6 \u09ae\u09be\u09b8 (\u09e7\u09e6 \u09ac\u099b\u09b0)</option>
              </select>
            </div>
            <button onClick={calculate} style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "15px", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: "pointer", fontFamily: "inherit" }}>
              \u09b9\u09bf\u09b8\u09be\u09ac \u0995\u09b0\u09c1\u09a8 \u2192
            </button>
          </div>

          <div>
            {result ? (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px" }}>📊 \u09b9\u09bf\u09b8\u09be\u09ac\u09c7\u09b0 \u09ab\u09b2\u09be\u09ab\u09b2</h2>
                <div style={{ background: "#e8f5ee", borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "20px", border: "2px solid #c3e6d0" }}>
                  <div style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>\u09ae\u09be\u09b8\u09bf\u0995 \u0995\u09bf\u09b8\u09cd\u09a4\u09bf</div>
                  <div style={{ fontSize: "38px", fontWeight: "700", color: "#1a6b3c" }}>\u09f3 {result.monthly.toLocaleString()}</div>
                  <div style={{ fontSize: "13px", color: "#666", marginTop: "6px" }}>{months} \u09ae\u09be\u09b8 \u09aa\u09b0 \u09aa\u09b0\u09bf\u09b6\u09cb\u09a7 \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8</div>
                </div>
                <div className="result-grid" style={{ marginBottom: "20px" }}>
                  <div style={{ background: "#f4f7f5", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}>\u09ae\u09cb\u099f \u09ae\u09c2\u09b2\u09cd\u09af</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e" }}>\u09f3 {result.total.toLocaleString()}</div>
                  </div>
                  <div style={{ background: "#f4f7f5", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}>\u09ac\u09be\u0995\u09bf \u09aa\u09b0\u09bf\u09ae\u09be\u09a3</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e" }}>\u09f3 {result.remaining.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ background: "#fffbeb", borderRadius: "10px", padding: "14px", border: "1px solid #fde68a", fontSize: "13px", color: "#92400e", lineHeight: "1.7" }}>
                  \u26a0\uFE0F \u098f\u099f\u09bf \u098f\u0995\u099f\u09bf \u0986\u09a8\u09c1\u09ae\u09be\u09a8\u09bf\u0995 \u09b9\u09bf\u09b8\u09be\u09ac\u0964 \u09b8\u09a0\u09bf\u0995 \u09a4\u09a5\u09cd\u09af\u09c7\u09b0 \u099c\u09a8\u09cd\u09af \u0986\u09ae\u09be\u09a6\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964
                </div>
                <a href="/contact" style={{ display: "block", textAlign: "center", marginTop: "16px", color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "13px", borderRadius: "10px", fontWeight: "600", fontSize: "15px" }}>
                  📞 \u098f\u0996\u09a8\u0987 \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8
                </a>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "36px", border: "1px solid #e2e8f0", textAlign: "center", marginBottom: "24px" }}>
                <div style={{ fontSize: "60px", marginBottom: "16px" }}>🧮</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "10px" }}>\u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09b9\u09bf\u09b8\u09be\u09ac \u0995\u09b0\u09c1\u09a8</h3>
                <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>\u09ac\u09be\u09ae \u09aa\u09be\u09b6\u09c7\u09b0 \u09ab\u09b0\u09cd\u09ae\u09c7 \u09a4\u09a5\u09cd\u09af \u09a6\u09bf\u09a8 \u098f\u09ac\u0982<br />\u201c\u09b9\u09bf\u09b8\u09be\u09ac \u0995\u09b0\u09c1\u09a8\u201d \u09ac\u09be\u099f\u09a8\u09c7 \u0995\u09cd\u09b2\u09bf\u0995 \u0995\u09b0\u09c1\u09a8</p>
              </div>
            )}

            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e", marginBottom: "16px" }}>📦 \u099c\u09a8\u09aa\u09cd\u09b0\u09bf\u09af\u09bc \u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09aa\u09cd\u09af\u09be\u0995\u09c7\u099c</h3>
              {[
                { label: "\u09b8\u09cd\u09ac\u09b2\u09cd\u09aa\u09ae\u09c7\u09af\u09bc\u09be\u09a6\u09c0", months: "\u09e7\u09e8 \u09ae\u09be\u09b8", down: "\u09eb\u09e6%", color: "#e8f5ee", border: "#c3e6d0" },
                { label: "\u09ae\u09a7\u09cd\u09af\u09ae\u09c7\u09af\u09bc\u09be\u09a6\u09c0", months: "\u09e9\u09ec \u09ae\u09be\u09b8", down: "\u09e9\u09e6%", color: "#eef2ff", border: "#c7d2fe" },
                { label: "\u09a6\u09c0\u09b0\u09cd\u0998\u09ae\u09c7\u09af\u09bc\u09be\u09a6\u09c0", months: "\u09ec\u09e6 \u09ae\u09be\u09b8", down: "\u09e8\u09e6%", color: "#fffbeb", border: "#fde68a" },
              ].map(pkg => (
                <div key={pkg.label} style={{ background: pkg.color, borderRadius: "10px", padding: "14px 18px", marginBottom: "12px", border: `1px solid ${pkg.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "15px", color: "#0f2d1e" }}>{pkg.label}</div>
                    <div style={{ fontSize: "13px", color: "#666", marginTop: "3px" }}>\u09ae\u09c7\u09af\u09bc\u09be\u09a6: {pkg.months}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", color: "#666" }}>\u09a1\u09be\u0989\u09a8 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f</div>
                    <div style={{ fontWeight: "700", color: "#1a6b3c", fontSize: "16px" }}>{pkg.down}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "32px 20px", marginTop: "40px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>\u00a9 \u09e8\u09e6\u09e8\u09eb Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
