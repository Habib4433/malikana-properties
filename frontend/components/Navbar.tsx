"use client";
import { useState, useEffect } from "react";

export default function Navbar({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/";
  };

  const links = [
    { label: "হোম", href: "/" },
    { label: "জমি ও প্লট", href: "/plots" },
    { label: "ফ্ল্যাট বিক্রয়", href: "/flats" },
    { label: "কিস্তি সুবিধা", href: "/installment" },
    { label: "যোগাযোগ", href: "/contact" },
  ];

  return (
    <>
      <style>{`
        .mp-topbar { background:#0f2d1e; color:#9ecfb2; font-size:12px; padding:7px 40px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px; }
        .mp-nav { background:#fff; border-bottom:2px solid #e8f0eb; padding:0 40px; display:flex; justify-content:space-between; align-items:center; height:70px; position:sticky; top:0; z-index:200; box-shadow:0 2px 12px rgba(0,0,0,0.07); }
        .mp-nav-links { display:flex; gap:28px; }
        .mp-nav-link { color:#333; font-size:14px; font-weight:500; text-decoration:none; }
        .mp-nav-link:hover, .mp-nav-link.active { color:#1a6b3c; }
        .mp-nav-link.active { border-bottom:2px solid #1a6b3c; padding-bottom:4px; }
        .mp-nav-actions { display:flex; gap:10px; align-items:center; }
        .mp-hamburger { display:none; background:none; border:none; cursor:pointer; font-size:28px; color:#1a6b3c; padding:4px; }
        .mp-user-name { color:#1a6b3c; font-weight:600; font-size:14px; }
        .mp-logout { color:#dc2626; border:2px solid #dc2626; padding:8px 16px; borderRadius:7px; font-weight:600; font-size:13px; background:none; cursor:pointer; font-family:sans-serif; border-radius:7px; }
        .mp-logout:hover { background:#fef2f2; }
        @media(max-width:768px) {
          .mp-nav-links, .mp-nav-actions { display:none; }
          .mp-hamburger { display:block; }
        }
        .mp-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:300; }
        .mp-drawer { position:absolute; top:0; right:0; width:72%; max-width:280px; height:100%; background:#fff; padding:20px; display:flex; flex-direction:column; overflow-y:auto; }
        .mp-close { align-self:flex-end; background:none; border:none; font-size:26px; cursor:pointer; color:#333; margin-bottom:16px; }
        .mp-mobile-link { display:block; padding:13px 0; font-size:15px; font-weight:500; color:#333; text-decoration:none; border-bottom:1px solid #f0f0f0; }
        .mp-mobile-link.active { color:#1a6b3c; font-weight:700; }
        .mp-mobile-btns { display:flex; flex-direction:column; gap:10px; margin-top:20px; }
        .mp-btn { text-align:center; padding:12px; border-radius:8px; font-size:15px; font-weight:600; text-decoration:none; display:block; }
        .mp-mobile-user { background:#f0fdf4; border-radius:10px; padding:14px; margin-top:16px; border:1px solid #c3e6d0; }
      `}</style>

      <div className="mp-topbar">
        <span>📞 01719-880087 | 01911-118505</span>
        <span>✉ malikanapropertiesltd@gmail.com | শনি–বৃহঃ সকাল ৯টা–সন্ধ্যা ৬টা</span>
      </div>

      <nav className="mp-nav">
        <a href="/">
          <img src="/logo.jpeg" alt="Malikana Properties" style={{ height: "52px", width: "auto", objectFit: "contain" }} />
        </a>

        <div className="mp-nav-links">
          {links.map(l => (
            <a key={l.label} href={l.href} className={`mp-nav-link${active === l.label ? " active" : ""}`}>{l.label}</a>
          ))}
        </div>

        <div className="mp-nav-actions">
          {user ? (
            <>
              <span className="mp-user-name">👤 {user.name}</span>
              <button className="mp-logout" onClick={handleLogout}>লগআউট</button>
            </>
          ) : (
            <>
              <a href="/login" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "9px 18px", borderRadius: "7px", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>লগইন</a>
              <a href="/login" style={{ background: "#1a6b3c", color: "#fff", padding: "9px 18px", borderRadius: "7px", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>রেজিস্ট্রেশন</a>
            </>
          )}
        </div>

        <button className="mp-hamburger" onClick={() => setOpen(true)}>☰</button>
      </nav>

      {open && (
        <div className="mp-overlay" onClick={() => setOpen(false)}>
          <div className="mp-drawer" onClick={e => e.stopPropagation()}>
            <button className="mp-close" onClick={() => setOpen(false)}>✕</button>
            {links.map(l => (
              <a key={l.label} href={l.href} className={`mp-mobile-link${active === l.label ? " active" : ""}`}>{l.label}</a>
            ))}
            {user ? (
              <div className="mp-mobile-user">
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1a6b3c", marginBottom: "10px" }}>👤 {user.name}</div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>📞 {user.phone}</div>
                <button onClick={handleLogout} style={{ width: "100%", background: "#dc2626", color: "#fff", border: "none", padding: "11px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", fontFamily: "sans-serif" }}>লগআউট</button>
              </div>
            ) : (
              <div className="mp-mobile-btns">
                <a href="/login" className="mp-btn" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c" }}>লগইন</a>
                <a href="/login" className="mp-btn" style={{ background: "#1a6b3c", color: "#fff" }}>রেজিস্ট্রেশন</a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
