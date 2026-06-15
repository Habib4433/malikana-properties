"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function InstallmentPage() {
  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [months, setMonths] = useState("12");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const total = parseFloat(price);
    const d = parseFloat(down);
    const m = parseInt(months);
    if (!total || !d || !m) return;
    const remaining = total - d;
    setResult({ monthly: Math.round(remaining / m), total, remaining: Math.round(remaining) });
  };

  return (
    <main style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        a { text-decoration:none; }
        input, select { font-family:sans-serif; color:#111; }
        input::placeholder { color:#aaa; }
        input:focus, select:focus { outline:none; border-color:#1a6b3c !important; }
        .igrid { display:grid; grid-template-columns:1fr 1fr; gap:36px; align-items:start; }
        .rgrid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .pad { padding:40px 60px; }
        @media(max-width:900px){ .igrid{ grid-template-columns:1fr; gap:20px; } }
        @media(max-width:768px){ .pad{ padding:20px 16px; } }
      `}</style>

      <Navbar active="কিস্তি সুবিধা" />

      <section style={{ background: "linear-gradient(135deg,#0f2d1e,#1a5c34)", color: "#fff", padding: "40px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "8px" }}>
            <a href="/" style={{ color: "#6ee7a0" }}>হোম</a> › কিস্তি সুবিধা
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: "700", marginBottom: "8px" }}>কিস্তি ক্যালকুলেটর</h1>
          <p style={{ color: "#9ecfb2", fontSize: "15px" }}>আপনার বাজেট অনুযায়ী মাসিক কিস্তি হিসাব করুন</p>
        </div>
      </section>

      <div className="pad" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div className="igrid">
          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px" }}>💰 কিস্তি হিসাব করুন</h2>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "7px" }}>মোট সম্পত্তির মূল্য (টাকা)</label>
              <input type="number" placeholder="যেমন: 1800000" value={price} onChange={e => setPrice(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "7px" }}>ডাউন পেমেন্ট (টাকা)</label>
              <input type="number" placeholder="যেমন: 500000" value={down} onChange={e => setDown(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "7px" }}>কিস্তির মেয়াদ</label>
              <select value={months} onChange={e => setMonths(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", cursor: "pointer" }}>
                <option value="6">৬ মাস</option>
                <option value="12">১২ মাস (১ বছর)</option>
                <option value="24">২৪ মাস (২ বছর)</option>
                <option value="36">৩৬ মাস (৩ বছর)</option>
                <option value="48">৪৮ মাস (৪ বছর)</option>
                <option value="60">৬০ মাস (৫ বছর)</option>
                <option value="120">১২০ মাস (১০ বছর)</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "14px", borderRadius: "9px", fontWeight: "700", fontSize: "15px", cursor: "pointer", fontFamily: "sans-serif" }}>
              হিসাব করুন →
            </button>
          </div>

          <div>
            {result ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.06)", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "20px" }}>📊 হিসাবের ফলাফল</h2>
                <div style={{ background: "#e8f5ee", borderRadius: "10px", padding: "20px", textAlign: "center", marginBottom: "16px", border: "2px solid #c3e6d0" }}>
                  <div style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>মাসিক কিস্তি</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#1a6b3c" }}>৳ {result.monthly.toLocaleString()}</div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{months} মাস পর পরিশোধ সম্পন্ন</div>
                </div>
                <div className="rgrid" style={{ marginBottom: "16px" }}>
                  <div style={{ background: "#f4f7f5", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>মোট মূল্য</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e" }}>৳ {result.total.toLocaleString()}</div>
                  </div>
                  <div style={{ background: "#f4f7f5", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>বাকি পরিমাণ</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e" }}>৳ {result.remaining.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ background: "#fffbeb", borderRadius: "8px", padding: "12px", border: "1px solid #fde68a", fontSize: "12px", color: "#92400e", lineHeight: "1.7", marginBottom: "14px" }}>
                  ⚠️ এটি একটি আনুমানিক হিসাব। সঠিক তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।
                </div>
                <a href="/contact" style={{ display: "block", textAlign: "center", color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "12px", borderRadius: "9px", fontWeight: "600", fontSize: "14px" }}>
                  📞 এখনই যোগাযোগ করুন
                </a>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "32px", border: "1px solid #e2e8f0", textAlign: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "54px", marginBottom: "14px" }}>🧮</div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "8px" }}>কিস্তি হিসাব করুন</h3>
                <p style={{ color: "#888", fontSize: "13px", lineHeight: "1.7" }}>বাম পাশের ফর্মে তথ্য দিন এবং<br />"হিসাব করুন" বাটনে ক্লিক করুন</p>
              </div>
            )}

            <div style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f2d1e", marginBottom: "14px" }}>📦 জনপ্রিয় কিস্তি প্যাকেজ</h3>
              {[
                { label: "স্বল্পমেয়াদী", months: "১২ মাস", down: "৫০%", bg: "#e8f5ee", border: "#c3e6d0" },
                { label: "মধ্যমেয়াদী", months: "৩৬ মাস", down: "৩০%", bg: "#eef2ff", border: "#c7d2fe" },
                { label: "দীর্ঘমেয়াদী", months: "৬০ মাস", down: "২০%", bg: "#fffbeb", border: "#fde68a" },
              ].map(pkg => (
                <div key={pkg.label} style={{ background: pkg.bg, borderRadius: "9px", padding: "12px 16px", marginBottom: "10px", border: `1px solid ${pkg.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "14px", color: "#0f2d1e" }}>{pkg.label}</div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>মেয়াদ: {pkg.months}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", color: "#666" }}>ডাউন পেমেন্ট</div>
                    <div style={{ fontWeight: "700", color: "#1a6b3c", fontSize: "15px" }}>{pkg.down}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#3d6b4f", padding: "28px 20px", marginTop: "40px", textAlign: "center", fontSize: "13px" }}>
        © ২০২৫ Malikana Properties Ltd. | Developed by Md Habib
      </footer>
    </main>
  );
}
