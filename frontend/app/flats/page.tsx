"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const types = ["\u09b8\u09ac", "\u0986\u09ac\u09be\u09b8\u09bf\u0995", "\u09b2\u09be\u0995\u09cd\u09b8\u09be\u09b0\u09bf"];
const statuses = ["\u09b8\u09ac", "\u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u099a\u09cd\u099b\u09c7", "\u09ac\u09c1\u0995\u09a1"];

export default function FlatsPage() {
  const [allFlats, setAllFlats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("\u09b8\u09ac");
  const [selectedStatus, setSelectedStatus] = useState("\u09b8\u09ac");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch(`${API_URL}/api/properties?sector=\u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f \u09ac\u09bf\u0995\u09cd\u09b0\u09af\u09bc`)
      .then(res => res.json())
      .then(data => { setAllFlats(data.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = allFlats
    .filter(f => selectedType === "\u09b8\u09ac" || f.type === selectedType)
    .filter(f => selectedStatus === "\u09b8\u09ac" || f.status === selectedStatus)
    .filter(f => f.area.includes(search))
    .sort((a: any, b: any) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "18px", color: "#1a6b3c" }}>\u23f3 \u09b2\u09cb\u09a1 \u09b9\u099a\u09cd\u099b\u09c7...</div>;

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; }
        .flat-card { transition:transform 0.3s, box-shadow 0.3s; }
        .flat-card:hover { transform:translateY(-6px); box-shadow:0 12px 30px rgba(0,0,0,0.12); }
        .filter-btn { cursor:pointer; padding:8px 18px; border-radius:20px; font-size:14px; font-weight:500; border:1.5px solid #e0e0e0; background:#fff; font-family:inherit; }
        .filter-btn.active { background:#1a6b3c; color:#fff; border-color:#1a6b3c; }
        .flats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
        .filter-bar { display:flex; flex-wrap:wrap; gap:20px; align-items:center; justify-content:space-between; }
        .page-pad { padding:32px 60px; }
        .hero-pad { padding:48px 60px; }
        @media(max-width:1024px) { .flats-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:768px) {
          .flats-grid { grid-template-columns:1fr; }
          .page-pad { padding:20px 16px; }
          .hero-pad { padding:32px 16px; }
          .filter-bar { flex-direction:column; align-items:flex-start; gap:12px; }
        }
      `}</style>

      <Navbar active="\u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f \u09ac\u09bf\u0995\u09cd\u09b0\u09af\u09bc" />

      <section style={{ background: "linear-gradient(135deg, #0f2d1e, #1a5c34)", color: "#fff" }} className="hero-pad">
        <div style={{ fontSize: "13px", color: "#6ee7a0", marginBottom: "10px" }}><a href="/" style={{ color: "#6ee7a0" }}>\u09b9\u09cb\u09ae</a> \u203a \u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f \u09ac\u09bf\u0995\u09cd\u09b0\u09af\u09bc</div>
        <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: "700", marginBottom: "10px" }}>\u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f \u09a4\u09be\u09b2\u09bf\u0995\u09be</h1>
        <p style={{ color: "#9ecfb2", fontSize: "16px" }}>\u09a2\u09be\u0995\u09be\u09b8\u09b9 \u09b8\u09be\u09b0\u09be\u09a6\u09c7\u09b6\u09c7 \u0986\u09a7\u09c1\u09a8\u09bf\u0995 \u0986\u09ac\u09be\u09b8\u09bf\u0995 \u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f\u09b8\u09ae\u09c2\u09b9</p>
      </section>

      <div className="page-pad" style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: "14px", padding: "20px 24px", marginBottom: "28px", border: "1px solid #e2e8f0" }} className="filter-bar">
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>\u09a7\u09b0\u09a8:</span>
            {types.map(t => <button key={t} className={`filter-btn${selectedType === t ? " active" : ""}`} onClick={() => setSelectedType(t)}>{t}</button>)}
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#444" }}>\u0985\u09ac\u09b8\u09cd\u09a5\u09be:</span>
            {statuses.map(s => <button key={s} className={`filter-btn${selectedStatus === s ? " active" : ""}`} onClick={() => setSelectedStatus(s)}>{s}</button>)}
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <input type="text" placeholder="🔍 \u098f\u09b2\u09be\u0995\u09be \u0996\u09c1\u099c\u09c1\u09a8..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: "9px 16px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", width: "180px", color: "#111", fontFamily: "inherit" }} />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ padding: "9px 16px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#111", fontFamily: "inherit" }}>
              <option value="default">\u09a1\u09bf\u09ab\u09b2\u09cd\u099f</option>
              <option value="price-asc">\u09ae\u09c2\u09b2\u09cd\u09af: \u0995\u09ae \u2192 \u09ac\u09c7\u09b6\u09bf</option>
              <option value="price-desc">\u09ae\u09c2\u09b2\u09cd\u09af: \u09ac\u09c7\u09b6\u09bf \u2192 \u0995\u09ae</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>\u09ae\u09cb\u099f <strong style={{ color: "#1a6b3c" }}>{filtered.length}\u099f\u09bf</strong> \u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u0997\u09c7\u099b\u09c7</div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#888", fontSize: "18px" }}>😔 \u0995\u09cb\u09a8\u09cb \u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf</div>
        ) : (
          <div className="flats-grid">
            {filtered.map((f: any) => (
              <div key={f.id} className="flat-card" style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  {f.image_url ? <img src={f.image_url} alt={f.area} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> :
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "60px", color: "rgba(255,255,255,0.3)" }}>🏢</span></div>}
                  <div style={{ position: "absolute", top: "14px", left: "14px", background: "#3b82f6", color: "#fff", fontSize: "12px", fontWeight: "700", padding: "4px 14px", borderRadius: "20px" }}>\u09a8\u09a4\u09c1\u09a8</div>
                  <div style={{ position: "absolute", top: "14px", right: "14px", background: f.status === "\u09ac\u09c1\u0995\u09a1" ? "#6b7280" : "#16a34a", color: "#fff", fontSize: "12px", padding: "4px 12px", borderRadius: "20px" }}>{f.status}</div>
                </div>
                <div style={{ padding: "22px" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "8px" }}>{f.area}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#666", fontSize: "14px" }}>📐 {f.size}</span>
                    <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "13px", padding: "3px 10px", borderRadius: "20px" }}>{f.type}</span>
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: "#1a6b3c", marginBottom: "8px" }}>\u09f3 {f.price.toLocaleString()}</div>
                  {f.description && <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "12px" }}>{f.description}</p>}
                  <div style={{ background: "#e8f5ee", color: "#166534", fontSize: "13px", padding: "7px 14px", borderRadius: "7px", marginBottom: "16px" }}>\u2713 \u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09b8\u09c1\u09ac\u09bf\u09a7\u09be \u0986\u099b\u09c7</div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{ flex: 1, background: "#1a6b3c", color: "#fff", border: "none", padding: "12px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}>\u09ac\u09bf\u09b8\u09cd\u09a4\u09be\u09b0\u09bf\u09a4 \u2192</button>
                    <a href="/contact" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "12px 16px", borderRadius: "9px", fontWeight: "600", fontSize: "14px" }}>📞</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "32px 20px", marginTop: "60px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>\u00a9 \u09e8\u09e6\u09e8\u09eb Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
