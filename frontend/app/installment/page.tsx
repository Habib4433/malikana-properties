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
        @media(max-width:900px) { .inst-grid { grid-template-columns:1fr; gap:24px; } }
        @media(max-width:768px) { .page-pad { padding:20px 16px; } }
      `}</style>

      <Navbar active="কিস্তি সুবিধা" />

      <section style={{ background: "linear-gradient(135deg, #0f2d1e, #1a5c34)", color: "#fff", padding: "48px 60px" }}>
        <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "10px" }}>
          <a href="/" style={{ color: "#6ee7a0" }}>হোম</a> › কিস্তি সুবিধা
        </div>
        <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: "700", marginBottom: "10px" }}>কিস্তি ক্যালকুলেটর</h1>
        <p style={{ color: "#9ecfb2", fontSize: "16px" }}>আপনার বাজেট অনুযায়ী মাসিক কিস্তি হিসাব করুন</p>
      </section>

      <div className="page-pad" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="inst-grid">
          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e", marginBottom: "28px" }}>💰 কিস্তি হিসাব করুন</h2>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>মোট সম্পত্তির মূল্য (টাকা)</label>
              <input type="number" placeholder="যেমন: 1800000" value={price} onChange={e => setPrice(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>ডাউন পেমেন্ট (টাকা)</label>
              <input type="number" placeholder="যেমন: 500000" value={downPayment} onChange={e => setDownPayment(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px" }} />
            </div>
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>কিস্তির মেয়াদ</label>
              <select value={months} onChange={e => setMonths(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1.5px solid #e0e0e0", fontSize: "15px", cursor: "pointer" }}>
                <option value="6">৬ মাস</option>
                <option value="12">১২ মাস (১ বছর)</option>
                <option value="24">২৪ মাস (২ বছর)</option>
                <option value="36">৩৬ মাস (৩ বছর)</option>
                <option value="48">৪৮ মাস (৪ বছর)</option>
                <option value="60">৬০ মাস (৫ বছর)</option>
                <option value="120">১২০ মাস (১০ বছর)</option>
              </select>
            </div>
            <button onClick={calculate} style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "15px", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: "pointer", fontFamily: "inherit" }}>
              হিসাব করুন →
            </button>
          </div>

          <div>
            {result ? (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px" }}>📊 হিসাবের ফলাফল</h2>
                <div style={{ background: "#e8f5ee", borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "20px", border: "2px solid #c3e6d0" }}>
                  <div style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>মাসিক কিস্তি</div>
                  <div style={{ fontSize: "38px", fontWeight: "700", color: "#1a6b3c" }}>৳ {result.monthly.toLocaleString()}</div>
                  <div style={{ fontSize: "13px", color: "#666", marginTop: "6px" }}>{months} মাস পর পরিশোধ সম্পন্ন</div>
                </div>
                <div className="result-grid" style={{ marginBottom: "20px" }}>
                  <div style={{ background: "#f4f7f5", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}>মোট মূল্য</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e" }}>৳ {result.total.toLocaleString()}</div>
                  </div>
                  <div style={{ background: "#f4f7f5", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}>বাকি পরিমাণ</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e" }}>৳ {result.remaining.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ background: "#fffbeb", borderRadius: "10px", padding: "14px", border: "1px solid #fde68a", fontSize: "13px", color: "#92400e", lineHeight: "1.7" }}>
                  ⚠️ এটি একটি আনুমানিক হিসাব। সঠিক তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।
                </div>
                <a href="/contact" style={{ display: "block", textAlign: "center", marginTop: "16px", color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "13px", borderRadius: "10px", fontWeight: "600", fontSize: "15px" }}>
                  📞 এখনই যোগাযোগ করুন
                </a>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "36px", border: "1px solid #e2e8f0", textAlign: "center", marginBottom: "24px" }}>
                <div style={{ fontSize: "60px", marginBottom: "16px" }}>🧮</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "10px" }}>কিস্তি হিসাব করুন</h3>
                <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>বাম পাশের ফর্মে তথ্য দিন এবং<br />"হিসাব করুন" বাটনে ক্লিক করুন</p>
              </div>
            )}

            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e", marginBottom: "16px" }}>📦 জনপ্রিয় কিস্তি প্যাকেজ</h3>
              {[
                { label: "স্বল্পমেয়াদী", months: "১২ মাস", down: "৫০%", color: "#e8f5ee", border: "#c3e6d0" },
                { label: "মধ্যমেয়াদী", months: "৩৬ মাস", down: "৩০%", color: "#eef2ff", border: "#c7d2fe" },
                { label: "দীর্ঘমেয়াদী", months: "৬০ মাস", down: "২০%", color: "#fffbeb", border: "#fde68a" },
              ].map(pkg => (
                <div key={pkg.label} style={{ background: pkg.color, borderRadius: "10px", padding: "14px 18px", marginBottom: "12px", border: `1px solid ${pkg.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "15px", color: "#0f2d1e" }}>{pkg.label}</div>
                    <div style={{ fontSize: "13px", color: "#666", marginTop: "3px" }}>মেয়াদ: {pkg.months}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", color: "#666" }}>ডাউন পেমেন্ট</div>
                    <div style={{ fontWeight: "700", color: "#1a6b3c", fontSize: "16px" }}>{pkg.down}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "32px 20px", marginTop: "40px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>© ২০২৫ Malikana Properties Ltd.</div>
      </footer>
    </main>
  );
}
