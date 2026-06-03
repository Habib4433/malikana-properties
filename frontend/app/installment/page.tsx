"use client";
import { useState } from "react";

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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap'); * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; } .nav-link { color:#333; font-size:14px; font-weight:500; } .nav-link:hover { color:#1a6b3c; } input, select { font-family:inherit; color:#111; } input::placeholder { color:#aaa; }`}</style>

      <div style={{ background: "#0f2d1e", color: "#9ecfb2", fontSize: "13px", padding: "7px 60px", display: "flex", justifyContent: "space-between" }}>
        <span>📞 01719-880087 | 01911-118505</span>
        <span>✉ malikanapropertiesltd@gmail.com</span>
      </div>

      <nav style={{ background: "#fff", borderBottom: "2px solid #e8f0eb", padding: "0 60px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "75px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "15px", lineHeight: "1.1" }}>
            <span>MP</span><span style={{ fontSize: "7px", fontWeight: "400" }}>Ltd.</span>
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "17px", color: "#0f2d1e" }}>Malikana Properties</div>
            <div style={{ fontSize: "11px", color: "#888" }}>আপনার বিশ্বস্ত রিয়েল এস্টেট পার্টনার</div>
          </div>
        </a>
        <div style={{ display: "flex", gap: "32px" }}>
          {[["হোম", "/"], ["জমি ও প্লট", "/plots"], ["ফ্ল্যাট বিক্রয়", "/flats"], ["কিস্তি সুবিধা", "/installment"], ["যোগাযোগ", "/contact"]].map(([label, href]) => (
            <a key={label} href={href} className="nav-link" style={{ color: label === "কিস্তি সুবিধা" ? "#1a6b3c" : "#333", borderBottom: label === "কিস্তি সুবিধা" ? "2px solid #1a6b3c" : "none", paddingBottom: "4px" }}>{label}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="/login" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px" }}>লগইন</a>
          <a href="/login" style={{ background: "#1a6b3c", color: "#fff", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px" }}>রেজিস্ট্রেশন</a>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #0f2d1e, #1a5c34)", color: "#fff", padding: "48px 60px" }}>
        <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "10px" }}><a href="/" style={{ color: "#6ee7a0" }}>হোম</a> › কিস্তি সুবিধা</div>
        <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "10px" }}>কিস্তি ক্যালকুলেটর</h1>
        <p style={{ color: "#9ecfb2", fontSize: "16px" }}>আপনার বাজেট অনুযায়ী মাসিক কিস্তি হিসাব করুন</p>
      </section>

      <div style={{ padding: "48px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "36px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f2d1e", marginBottom: "28px" }}>💰 কিস্তি হিসাব করুন</h2>

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

            <button onClick={calculate} style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "15px", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: "pointer" }}>
              হিসাব করুন →
            </button>
          </div>

          <div>
            {result ? (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "36px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f2d1e", marginBottom: "28px" }}>📊 হিসাবের ফলাফল</h2>
                <div style={{ background: "#e8f5ee", borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "24px", border: "2px solid #c3e6d0" }}>
                  <div style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>মাসিক কিস্তি</div>
                  <div style={{ fontSize: "38px", fontWeight: "700", color: "#1a6b3c" }}>৳ {result.monthly.toLocaleString()}</div>
                  <div style={{ fontSize: "13px", color: "#666", marginTop: "6px" }}>{months} মাস পর পরিশোধ সম্পন্ন</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ background: "#f4f7f5", borderRadius: "10px", padding: "18px", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}>মোট মূল্য</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e" }}>৳ {result.total.toLocaleString()}</div>
                  </div>
                  <div style={{ background: "#f4f7f5", borderRadius: "10px", padding: "18px", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}>বাকি পরিমাণ</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e" }}>৳ {result.remaining.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ background: "#fffbeb", borderRadius: "10px", padding: "16px", border: "1px solid #fde68a", fontSize: "14px", color: "#92400e", lineHeight: "1.7" }}>
                  ⚠️ এটি একটি আনুমানিক হিসাব। সঠিক তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।
                </div>
                <a href="/contact" style={{ display: "block", textAlign: "center", marginTop: "20px", color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "13px", borderRadius: "10px", fontWeight: "600", fontSize: "15px" }}>
                  📞 এখনই যোগাযোগ করুন
                </a>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "16px", padding: "36px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <div style={{ fontSize: "60px", marginBottom: "16px" }}>🧮</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "10px" }}>কিস্তি হিসাব করুন</h3>
                <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>বাম পাশের ফর্মে তথ্য দিন এবং<br />"হিসাব করুন" বাটনে ক্লিক করুন</p>
              </div>
            )}

            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e2e8f0", marginTop: "24px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "18px" }}>📦 জনপ্রিয় কিস্তি প্যাকেজ</h3>
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

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "32px 60px", marginTop: "40px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>© ২০২৫ Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
