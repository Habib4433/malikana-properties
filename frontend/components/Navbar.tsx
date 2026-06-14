"use client";
import { useState } from "react";

const navLinks = [
  ["\u09b9\u09cb\u09ae", "/"],
  ["\u099c\u09ae\u09bf \u09a4 \u09aa\u09cd\u09b2\u099f", "/plots"],
  ["\u09ab\u09cd\u09b2\u09cd\u09af\u09be\u099f \u09ac\u09bf\u0995\u09cd\u09b0\u09af\u09bc", "/flats"],
  ["\u0995\u09bf\u09b8\u09cd\u09a4\u09bf \u09b8\u09c1\u09ac\u09bf\u09a7\u09be", "/installment"],
  ["\u09af\u09cb\u0997\u09be\u09af\u09cb\u0997", "/contact"],
];

export default function Navbar({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .mp-topbar { background:#0f2d1e; color:#9ecfb2; font-size:13px; padding:7px 60px; display:flex; justify-content:space-between; }
        .mp-nav { background:#fff; border-bottom:2px solid #e8f0eb; padding:0 60px; display:flex; justify-content:space-between; align-items:center; height:75px; position:sticky; top:0; z-index:200; box-shadow:0 2px 12px rgba(0,0,0,0.07); }
        .mp-nav-links { display:flex; gap:32px; }
        .mp-nav-link { color:#333; font-size:14px; font-weight:500; text-decoration:none; }
        .mp-nav-link:hover { color:#1a6b3c; }
        .mp-nav-link.active { color:#1a6b3c; border-bottom:2px solid #1a6b3c; padding-bottom:4px; }
        .mp-nav-actions { display:flex; gap:10px; }
        .mp-hamburger { display:none; background:none; border:none; cursor:pointer; font-size:26px; color:#1a6b3c; }
        .mp-mobile-menu { display:none; }

        @media (max-width: 768px) {
          .mp-topbar { padding:7px 16px; font-size:11px; flex-direction:column; gap:3px; }
          .mp-nav { padding:0 16px; }
          .mp-nav-links { display:none; }
          .mp-nav-actions { display:none; }
          .mp-hamburger { display:block; }
          .mp-mobile-menu { display:block; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:300; }
          .mp-mobile-drawer { position:absolute; top:0; right:0; width:75%; max-width:300px; height:100%; background:#fff; padding:24px 20px; box-shadow:-4px 0 20px rgba(0,0,0,0.15); display:flex; flex-direction:column; gap:0; }
          .mp-mobile-close { align-self:flex-end; background:none; border:none; font-size:28px; cursor:pointer; color:#333; margin-bottom:20px; }
          .mp-mobile-link { display:block; padding:14px 0; font-size:16px; font-weight:500; color:#333; text-decoration:none; border-bottom:1px solid #f0f0f0; }
          .mp-mobile-link.active { color:#1a6b3c; font-weight:700; }
          .mp-mobile-btn-wrap { display:flex; flex-direction:column; gap:10px; margin-top:20px; }
          .mp-mobile-btn { text-align:center; padding:12px; border-radius:8px; font-size:15px; font-weight:600; text-decoration:none; }
        }
      `}</style>

      <div className="mp-topbar">
        <span>&#128222; 01719-880087 | 01911-118505</span>
        <span>&#9993; malikanapropertiesltd@gmail.com | &#128336; &#2577;&#2472;&#2495;&#8211;&#2476;&#9583;&#2489;&#2435;: &#2488;&#2453;&#2494;&#2482; &#2791;&#2463;&#2494; &#8211; &#2488;&#2472;&#9583;&#2471;&#9583;&#2479;&#2494; &#2788;&#2463;&#2494;</span>
      </div>

      <nav className="mp-nav">
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.jpeg" alt="Malikana Properties" style={{ height: "54px", width: "auto", objectFit: "contain" }} />
        </a>

        <div className="mp-nav-links">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className={`mp-nav-link${active === label ? " active" : ""}`}>{label}</a>
          ))}
        </div>

        <div className="mp-nav-actions">
          <a href="/login" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>&#2482;&#2455;&#2439;&#2472;</a>
          <a href="/login" style={{ background: "#1a6b3c", color: "#fff", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>&#2480;&#2503;&#2460;&#2495;&#2488;&#9583;&#2463;&#9583;&#2480;&#9583;&#2486;&#2472;</a>
        </div>

        <button className="mp-hamburger" onClick={() => setOpen(true)}>&#9776;</button>
      </nav>

      {open && (
        <div className="mp-mobile-menu" onClick={() => setOpen(false)}>
          <div className="mp-mobile-drawer" onClick={e => e.stopPropagation()}>
            <button className="mp-mobile-close" onClick={() => setOpen(false)}>&#10005;</button>
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} className={`mp-mobile-link${active === label ? " active" : ""}`}>{label}</a>
            ))}
            <div className="mp-mobile-btn-wrap">
              <a href="/login" className="mp-mobile-btn" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c" }}>&#2482;&#2455;&#2439;&#2472;</a>
              <a href="/login" className="mp-mobile-btn" style={{ background: "#1a6b3c", color: "#fff" }}>&#2480;&#2503;&#2460;&#2495;&#2488;&#9583;&#2463;&#9583;&#2480;&#9583;&#2486;&#2472;</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
