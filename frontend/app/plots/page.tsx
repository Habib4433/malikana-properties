"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PlotsPage() {
  const [plots, setPlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("সব");
  const [status, setStatus] = useState("সব");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch(`${API_URL}/api/properties?sector=জমি ও প্লট`)
      .then(r => r.json())
      .then(d => { setPlots(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = plots
    .filter(p => type === "সব" || p.type === type)
    .filter(p => status === "সব" || p.status === status)
    .filter(p => p.area?.includes(search))
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0);

  if (loading) return (
    <main style={{ fontFamily: "sans-serif" }}>
      <Navbar active="জমি ও প্লট" />
      <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px", color: "#1a6b3c" }}>লোড হচ্ছে...</div>
    </main>
  );

  return (
    <main style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        a { text-decoration:none; }
        .fbtn { cursor:pointer; padding:8px 16px; border-radius:20px; font-size:13px; border:1.5px solid #ddd; background:#fff; font-family:sans-serif; }
        .fbtn.on { background:#1a6b3c; color:#fff; border-color:#1a6b3c; }
        .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .card { background:#fff; border-radius:14px; overflow:hidden; border:1px solid #e2e8f0; transition:transform .2s, box-shadow .2s; }
        .card:hover { transform:translateY(-5px); box-shadow:0 10px 28px rgba(0,0,0,0.1); }
        .fbar { display:flex; flex-wrap:wrap; gap:16px; align-items:center; justify-content:space-between; background:#fff; border-radius:12px; padding:18px 20px; margin-bottom:24px; border:1px solid #e2e8f0; }
        .pad { padding:28px 60px; }
        @media(max-width:1024px){ .grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:768px){
          .grid{ grid-template-columns:1fr; }
          .pad{ padding:16px; }
          .fbar{ flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      <Navbar active="জমি ও প্লট" />

      <section style={{ background: "linear-gradient(135deg,#0f2d1e,#1a5c34)", color: "#fff", padding: "40px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "8px" }}>
            <a href="/" style={{ color: "#6ee7a0" }}>হোম</a> › জমি ও প্লট
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: "700", marginBottom: "8px" }}>জমি ও প্লট তালিকা</h1>
          <p style={{ color: "#9ecfb2", fontSize: "15px" }}>সারা বাংলাদেশে আমাদের উপলব্ধ জমি ও প্লটসমূহ</p>
        </div>
      </section>

      <div className="pad" style={{ maxWidth: "1260px", margin: "0 auto" }}>
        <div className="fbar">
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>ধরন:</span>
            {["সব","আবাসিক","বাণিজ্যিক","কৃষি"].map(t => (
              <button key={t} className={`fbtn${type===t?" on":""}`} onClick={() => setType(t)}>{t}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>অবস্থা:</span>
            {["সব","পাওয়া যাচ্ছে","বুকড"].map(s => (
              <button key={s} className={`fbtn${status===s?" on":""}`} onClick={() => setStatus(s)}>{s}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input placeholder="🔍 এলাকা খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: "9px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "13px", width: "160px", fontFamily: "sans-serif" }} />
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: "9px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "13px", fontFamily: "sans-serif" }}>
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">মূল্য: কম → বেশি</option>
              <option value="price-desc">মূল্য: বেশি → কম</option>
            </select>
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#666", marginBottom: "18px" }}>মোট <strong style={{ color: "#1a6b3c" }}>{filtered.length}টি</strong> প্লট পাওয়া গেছে</p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#888", fontSize: "18px" }}>কোনো প্লট পাওয়া যায়নি</div>
        ) : (
          <div className="grid">
            {filtered.map((p: any) => (
              <div key={p.id} className="card">
                <div style={{ position: "relative", height: "190px" }}>
                  {p.image_url
                    ? <img src={p.image_url} alt={p.area} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a6b3c,#2d9e5f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px" }}>🏞️</div>
                  }
                  <span style={{ position: "absolute", top: "12px", right: "12px", background: p.status === "বুকড" ? "#6b7280" : "#16a34a", color: "#fff", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>{p.status}</span>
                </div>
                <div style={{ padding: "18px" }}>
                  <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "8px" }}>{p.area}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#666", fontSize: "13px" }}>📐 {p.size}</span>
                    <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "12px", padding: "3px 10px", borderRadius: "20px" }}>{p.type}</span>
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#1a6b3c", marginBottom: "8px" }}>৳ {p.price?.toLocaleString()}</div>
                  {p.description && <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.6", marginBottom: "10px" }}>{p.description}</p>}
                  <div style={{ background: "#e8f5ee", color: "#166534", fontSize: "12px", padding: "6px 12px", borderRadius: "6px", marginBottom: "14px" }}>✓ কিস্তি সুবিধা আছে</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <a href={`/property/${p.id}`} style={{ flex: 1, background: "#1a6b3c", color: "#fff", padding: "11px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", textAlign: "center", display: "block" }}>বিস্তারিত →</a>
                    <a href="/contact" style={{ background: "transparent", color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "11px 14px", borderRadius: "8px", fontWeight: "600", fontSize: "13px" }}>📞</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ background: "#0a1f13", color: "#3d6b4f", padding: "28px 20px", marginTop: "50px", textAlign: "center", fontSize: "13px" }}>
        © ২০২৫ Malikana Properties Ltd. | Developed by Md Habib
      </footer>
    </main>
  );
}
