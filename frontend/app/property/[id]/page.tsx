"use client";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [down, setDown] = useState("");
  const [months, setMonths] = useState("24");
  const [result, setResult] = useState<any>(null);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const resolvedId = params?.id;
    if (!resolvedId) return;
    setId(resolvedId);
    fetch(`${API_URL}/api/properties/${resolvedId}`)
      .then(r => r.json())
      .then(d => { setProperty(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const calculate = () => {
    if (!property) return;
    const total = property.price;
    const d = parseFloat(down) || Math.round(total * 0.3);
    const m = parseInt(months);
    const remaining = total - d;
    setResult({ monthly: Math.round(remaining / m), total, remaining: Math.round(remaining), down: Math.round(d) });
  };

  if (loading) return (
    <main style={{ fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "100px", fontSize: "18px", color: "#1a6b3c" }}>লোড হচ্ছে...</div>
    </main>
  );

  if (!property) return (
    <main style={{ fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "100px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>😔</div>
        <h2 style={{ fontSize: "22px", color: "#333", marginBottom: "12px" }}>Property পাওয়া যায়নি</h2>
        <a href="/plots" style={{ color: "#1a6b3c", fontWeight: "600" }}>← ফিরে যান</a>
      </div>
    </main>
  );

  return (
    <main style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        a { text-decoration:none; }
        input, select { font-family:sans-serif; color:#111; }
        input::placeholder { color:#aaa; }
        input:focus, select:focus { outline:none; border-color:#1a6b3c !important; }
        .detail-grid { display:grid; grid-template-columns:1.6fr 1fr; gap:28px; align-items:start; }
        .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
        .pad { padding:32px 60px; }
        @media(max-width:900px){ .detail-grid{ grid-template-columns:1fr; } }
        @media(max-width:768px){ .pad{ padding:16px; } .info-grid{ grid-template-columns:1fr; } }
      `}</style>

      <Navbar />

      <div style={{ background: "#0f2d1e", padding: "14px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", fontSize: "13px", color: "#9ecfb2" }}>
          <a href="/" style={{ color: "#9ecfb2" }}>হোম</a> ›{" "}
          <a href={property.sector === "ফ্ল্যাট বিক্রয়" ? "/flats" : "/plots"} style={{ color: "#9ecfb2" }}>{property.sector}</a> ›{" "}
          <span style={{ color: "#fff" }}>{property.area}</span>
        </div>
      </div>

      <div className="pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="detail-grid">
          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "20px", height: "380px" }}>
              {property.image_url ? (
                <img src={property.image_url} alt={property.area} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a6b3c,#2d9e5f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px" }}>
                  {property.sector === "ফ্ল্যাট বিক্রয়" ? "🏢" : "🏞️"}
                </div>
              )}
            </div>

            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                <h1 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: "700", color: "#0f2d1e" }}>{property.area}</h1>
                <span style={{ background: property.status === "বুকড" ? "#fef2f2" : "#f0fdf4", color: property.status === "বুকড" ? "#dc2626" : "#16a34a", padding: "5px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>{property.status}</span>
              </div>
              <div style={{ fontSize: "30px", fontWeight: "700", color: "#1a6b3c", marginBottom: "20px" }}>৳ {property.price?.toLocaleString()}</div>

              <div className="info-grid">
                {[
                  { icon: "📐", label: "আকার", value: property.size },
                  { icon: "🏷️", label: "ধরন", value: property.type },
                  { icon: "📁", label: "বিভাগ", value: property.sector },
                  { icon: "📅", label: "যোগ করা হয়েছে", value: new Date(property.created_at).toLocaleDateString("bn-BD") },
                ].map(item => (
                  <div key={item.label} style={{ background: "#f4f7f5", borderRadius: "10px", padding: "14px" }}>
                    <div style={{ fontSize: "11px", color: "#888", fontWeight: "600", marginBottom: "4px" }}>{item.icon} {item.label}</div>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: "#0f2d1e" }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {property.description && (
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e", marginBottom: "10px" }}>বিবরণ</h3>
                  <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.8" }}>{property.description}</p>
                </div>
              )}
            </div>

            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e", marginBottom: "16px" }}>📞 যোগাযোগ করুন</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="tel:01719880087" style={{ flex: 1, minWidth: "140px", background: "#1a6b3c", color: "#fff", padding: "13px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", textAlign: "center", display: "block" }}>📞 কল করুন</a>
                <a href="https://wa.me/8801719880087" target="_blank" style={{ flex: 1, minWidth: "140px", background: "#25d366", color: "#fff", padding: "13px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", textAlign: "center", display: "block" }}>💬 WhatsApp</a>
                <a href="/contact" style={{ flex: 1, minWidth: "140px", color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "13px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", textAlign: "center", display: "block" }}>✉️ বার্তা পাঠান</a>
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "20px", position: "sticky", top: "90px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e", marginBottom: "18px" }}>💰 কিস্তি হিসাব করুন</h3>

              <div style={{ background: "#e8f5ee", borderRadius: "10px", padding: "14px", marginBottom: "18px", textAlign: "center" }}>
                <div style={{ fontSize: "12px", color: "#555", marginBottom: "4px" }}>সম্পত্তির মূল্য</div>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#1a6b3c" }}>৳ {property.price?.toLocaleString()}</div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "6px" }}>ডাউন পেমেন্ট (টাকা)</label>
                <input type="number" placeholder={`যেমন: ${Math.round(property.price * 0.3).toLocaleString()}`} value={down} onChange={e => setDown(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "6px" }}>কিস্তির মেয়াদ</label>
                <select value={months} onChange={e => setMonths(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", cursor: "pointer" }}>
                  <option value="6">৬ মাস</option>
                  <option value="12">১২ মাস</option>
                  <option value="24">২৪ মাস</option>
                  <option value="36">৩৬ মাস</option>
                  <option value="48">৪৮ মাস</option>
                  <option value="60">৬০ মাস</option>
                </select>
              </div>

              <button onClick={calculate} style={{ width: "100%", background: "#1a6b3c", color: "#fff", border: "none", padding: "13px", borderRadius: "9px", fontWeight: "700", fontSize: "15px", cursor: "pointer", fontFamily: "sans-serif", marginBottom: "14px" }}>
                হিসাব করুন →
              </button>

              {result && (
                <div style={{ background: "#f0fdf4", borderRadius: "10px", padding: "16px", border: "1px solid #bbf7d0" }}>
                  <div style={{ textAlign: "center", marginBottom: "12px" }}>
                    <div style={{ fontSize: "12px", color: "#555" }}>মাসিক কিস্তি</div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#1a6b3c" }}>৳ {result.monthly.toLocaleString()}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div style={{ background: "#fff", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#888" }}>ডাউন পেমেন্ট</div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f2d1e" }}>৳ {result.down.toLocaleString()}</div>
                    </div>
                    <div style={{ background: "#fff", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#888" }}>বাকি পরিমাণ</div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f2d1e" }}>৳ {result.remaining.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: "#0f2d1e", borderRadius: "14px", padding: "24px", color: "#fff" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "14px" }}>✅ কেন আমাদের বেছে নেবেন?</h3>
              {["১০০% আইনি নিরাপদ দলিল", "সহজ মাসিক কিস্তি সুবিধা", "অভিজ্ঞ বিক্রয় টিম", "দ্রুত নামজারি সহায়তা"].map(item => (
                <div key={item} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ color: "#4ade80", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "13px", color: "#9ecfb2" }}>{item}</span>
                </div>
              ))}
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
