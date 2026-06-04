"use client";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const types = ["সব", "আবাসিক", "বাণিজ্যিক", "কৃষি"];
const statuses = ["সব", "পাওয়া যাচ্ছে", "বুকড"];

export default function PlotsPage() {
  const [allPlots, setAllPlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("সব");
  const [selectedStatus, setSelectedStatus] = useState("সব");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch(`${API_URL}/api/properties?sector=জমি ও প্লট`)
      .then(res => res.json())
      .then(data => { setAllPlots(data.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = allPlots
    .filter(p => selectedType === "সব" || p.type === selectedType)
    .filter(p => selectedStatus === "সব" || p.status === selectedStatus)
    .filter(p => p.area.includes(search))
    .sort((a: any, b: any) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "18px", color: "#1a6b3c" }}>⏳ লোড হচ্ছে...</div>;

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap'); * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; } .nav-link { color:#333; font-size:14px; font-weight:500; } .nav-link:hover { color:#1a6b3c; } .plot-card { transition: transform 0.3s, box-shadow 0.3s; } .plot-card:hover { transform:translateY(-6px); box-shadow:0 12px 30px rgba(0,0,0,0.12); } .filter-btn { cursor:pointer; padding:8px 18px; border-radius:20px; font-size:14px; font-weight:500; border:1.5px solid #e0e0e0; background:#fff; } .filter-btn.active { background:#1a6b3c; color:#fff; border-color:#1a6b3c; }`}</style>

      <div style={{ background: "#0f2d1e", color: "#9ecfb2", fontSize: "13px", padding: "7px 60px", display: "flex", justifyContent: "space-between" }}>
        <span>📞 01719-880087 | 01911-118505</span>
        <span>✉ malikanapropertiesltd@gmail.com</span>
      </div>

      <nav style={{ background: "#fff", borderBottom: "2px solid #e8f0eb", padding: "0 60px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "75px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "15px", lineHeight: "1.1" }}>
            <img src="/logo.jpeg" alt="Malikana Properties" style={{ height: "60px", width: "auto", objectFit: "contain" }} />
            </div>
        </a>
        <div style={{ display: "flex", gap: "32px" }}>
          {[["হোম", "/"], ["জমি ও প্লট", "/plots"], ["ফ্ল্যাট বিক্রয়", "/flats"], ["কিস্তি সুবিধা", "/installment"], ["যোগাযোগ", "/contact"]].map(([label, href]) => (
            <a key={label} href={href} className="nav-link" style={{ color: label === "জমি ও প্লট" ? "#1a6b3c" : "#333", borderBottom: label === "জমি ও প্লট" ? "2px solid #1a6b3c" : "none", paddingBottom: "4px" }}>{label}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="/login" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px" }}>লগইন</a>
          <a href="/login" style={{ background: "#1a6b3c", color: "#fff", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px" }}>রেজিস্ট্রেশন</a>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #0f2d1e, #1a5c34)", color: "#fff", padding: "48px 60px" }}>
        <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "10px" }}><a href="/" style={{ color: "#6ee7a0" }}>হোম</a> › জমি ও প্লট</div>
        <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "10px" }}>জমি ও প্লট তালিকা</h1>
        <p style={{ color: "#9ecfb2", fontSize: "16px" }}>সারা বাংলাদেশে আমাদের উপলব্ধ জমি ও প্লটসমূহ</p>
      </section>

      <div style={{ padding: "32px 60px", maxWidth: "1300px", margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px 28px", marginBottom: "28px", border: "1px solid #e2e8f0", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>ধরন:</span>
            {types.map(t => <button key={t} className={`filter-btn${selectedType === t ? " active" : ""}`} onClick={() => setSelectedType(t)}>{t}</button>)}
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>অবস্থা:</span>
            {statuses.map(s => <button key={s} className={`filter-btn${selectedStatus === s ? " active" : ""}`} onClick={() => setSelectedStatus(s)}>{s}</button>)}
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <input type="text" placeholder="🔍 এলাকা খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: "9px 16px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", outline: "none", width: "180px", color: "#111" }} />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ padding: "9px 16px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#111" }}>
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">মূল্য: কম → বেশি</option>
              <option value="price-desc">মূল্য: বেশি → কম</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>মোট <strong style={{ color: "#1a6b3c" }}>{filtered.length}টি</strong> প্লট পাওয়া গেছে</div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#888", fontSize: "18px" }}>😔 কোনো প্লট পাওয়া যায়নি</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
            {filtered.map((p: any) => (
              <div key={p.id} className="plot-card" style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  {p.image_url ? <img src={p.image_url} alt={p.area} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> :
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "60px", color: "rgba(255,255,255,0.3)" }}>🏞️</span></div>}
                  <div style={{ position: "absolute", top: "14px", left: "14px", background: "#ff6b35", color: "#fff", fontSize: "12px", fontWeight: "700", padding: "4px 14px", borderRadius: "20px" }}>নতুন</div>
                  <div style={{ position: "absolute", top: "14px", right: "14px", background: p.status === "বুকড" ? "#6b7280" : "#16a34a", color: "#fff", fontSize: "12px", padding: "4px 12px", borderRadius: "20px" }}>{p.status}</div>
                </div>
                <div style={{ padding: "22px" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "8px" }}>{p.area}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#666", fontSize: "14px" }}>📐 {p.size}</span>
                    <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "13px", padding: "3px 10px", borderRadius: "20px" }}>{p.type}</span>
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: "#1a6b3c", marginBottom: "8px" }}>৳ {p.price.toLocaleString()}</div>
                  {p.description && <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "12px" }}>{p.description}</p>}
                  <div style={{ background: "#e8f5ee", color: "#166534", fontSize: "13px", padding: "7px 14px", borderRadius: "7px", marginBottom: "16px" }}>✓ কিস্তি সুবিধা আছে</div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{ flex: 1, background: "#1a6b3c", color: "#fff", border: "none", padding: "12px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>বিস্তারিত →</button>
                    <a href="/contact" style={{ background: "transparent", color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "12px 16px", borderRadius: "9px", fontWeight: "600", fontSize: "14px" }}>📞</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "32px 60px", marginTop: "60px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>© ২০২৫ Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
