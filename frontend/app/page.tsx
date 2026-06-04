"use client";

import { useState, useEffect } from "react";

const slides = [
  { url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80", title: "আপনার স্বপ্নের জমি খুঁজুন", sub: "সারা বাংলাদেশে জমি ও আবাসিক প্লট — সহজ মাসিক কিস্তিতে" },
  { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80", title: "সেরা অবস্থানে আবাসিক প্লট", sub: "ঢাকা, গাজীপুর, নারায়ণগঞ্জসহ সারাদেশে প্লট পাওয়া যাচ্ছে" },
  { url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=1600&q=80", title: "সহজ কিস্তিতে জমির মালিক হোন", sub: "আপনার বাজেট অনুযায়ী কিস্তির সুবিধায় সম্পত্তি ক্রয় করুন" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [featuredPlots, setFeaturedPlots] = useState<any[]>([]);
  const [featuredFlats, setFeaturedFlats] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/properties?sector=জমি ও প্লট`)
      .then(res => res.json())
      .then(data => setFeaturedPlots(data.data?.slice(0, 3) || []))
      .catch(() => {});
    fetch(`${API_URL}/api/properties?sector=ফ্ল্যাট বিক্রয়`)
      .then(res => res.json())
      .then(data => setFeaturedFlats(data.data?.slice(0, 3) || []))
      .catch(() => {});
  }, []);

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f8f9fa" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        a { text-decoration: none; }
        .nav-link { color: #333; padding-bottom: 4px; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #1a6b3c; }
        .plot-card { transition: transform 0.3s, box-shadow 0.3s; }
        .plot-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: background 0.3s; border: none; }
        .dot.active { background: #fff; transform: scale(1.3); }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); transition: all 0.3s; }
      `}</style>

      <div style={{ background: "#0f2d1e", color: "#9ecfb2", fontSize: "13px", padding: "7px 60px", display: "flex", justifyContent: "space-between" }}>
        <span>📞 01719-880087 &nbsp;|&nbsp; 01911-118505</span>
        <span>✉ malikanapropertiesltd@gmail.com &nbsp;|&nbsp; 🕐 শনি–বৃহঃ: সকাল ৯টা – সন্ধ্যা ৬টা</span>
      </div>

      <nav style={{ background: "#fff", borderBottom: "2px solid #e8f0eb", padding: "0 60px 0 100px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "75px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "15px", lineHeight: "1.1", boxShadow: "0 3px 8px rgba(26,107,60,0.35)" }}>
            <img src="/logo.jpeg" alt="Malikana Properties" style={{ height: "60px", width: "auto", objectFit: "contain" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "32px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
  {[["হোম", "/"], ["জমি ও প্লট", "/plots"], ["ফ্ল্যাট বিক্রয়", "/flats"], ["কিস্তি সুবিধা", "/installment"], ["যোগাযোগ", "/contact"]].map(([label, href]) => (
    <a key={label} href={href} className="nav-link">{label}</a>
  ))}
</div>
        <div style={{ display: "flex", gap: "32px" }}>
          <a href="/login" style={{ background: "transparent", color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px" }}>লগইন</a>
          <a href="/login" style={{ background: "#1a6b3c", color: "#fff", padding: "9px 20px", borderRadius: "7px", fontWeight: "600", fontSize: "14px" }}>রেজিস্ট্রেশন</a>
        </div>
      </nav>

      <section style={{ position: "relative", height: "580px", overflow: "hidden" }}>
        {slides.map((slide, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === current ? 1 : 0, transition: "opacity 1s ease-in-out" }}>
            <img src={slide.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,40,20,0.82) 0%, rgba(10,40,20,0.5) 60%, rgba(10,40,20,0.1) 100%)" }} />
          </div>
        ))}
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 60px", maxWidth: "640px" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", display: "inline-block", padding: "6px 18px", borderRadius: "20px", fontSize: "13px", color: "#d4f0e0", marginBottom: "20px", width: "fit-content" }}>
            🏡 বাংলাদেশের বিশ্বস্ত রিয়েল এস্টেট প্রতিষ্ঠান
          </div>
          <h1 style={{ fontSize: "44px", fontWeight: "700", color: "#fff", lineHeight: "1.25", marginBottom: "16px" }}>{slides[current].title}</h1>
          <p style={{ fontSize: "17px", color: "#b8e0c8", marginBottom: "32px", lineHeight: "1.7" }}>{slides[current].sub}</p>
          <div style={{ display: "flex", gap: "14px" }}>
            <a href="/plots" style={{ background: "#fff", color: "#1a6b3c", padding: "14px 30px", borderRadius: "8px", fontWeight: "700", fontSize: "15px" }}>জমি ও প্লট দেখুন →</a>
            <a href="/installment" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.6)", padding: "14px 30px", borderRadius: "8px", fontWeight: "600", fontSize: "15px" }}>কিস্তি হিসাব করুন</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "28px", left: "60px", zIndex: 3, display: "flex", gap: "10px" }}>
          {slides.map((_, i) => (
            <button key={i} className={`dot${i === current ? " active" : ""}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "0", right: "0", zIndex: 3, display: "flex", background: "rgba(10,40,20,0.85)", backdropFilter: "blur(8px)" }}>
          {[{ num: "৫০০+", label: "প্লট বিক্রয়" }, { num: "১০+", label: "বছরের অভিজ্ঞতা" }, { num: "৬৪", label: "জেলায় জমি" }, { num: "১০০%", label: "আইনি নিরাপদ" }].map((s, i) => (
            <div key={i} style={{ padding: "18px 28px", textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#fff" }}>{s.num}</div>
              <div style={{ fontSize: "12px", color: "#9ecfb2", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "70px 60px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ color: "#1a6b3c", fontWeight: "600", fontSize: "14px", letterSpacing: "1px", marginBottom: "8px" }}>আমাদের সেবা</div>
          <h2 style={{ fontSize: "34px", fontWeight: "700", color: "#0f2d1e" }}>আপনার পাশে সর্বদা</h2>
          <p style={{ color: "#666", marginTop: "10px", fontSize: "16px" }}>সম্পত্তি ক্রয়ের প্রতিটি ধাপে আমরা আপনার পাশে আছি</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { icon: "🏡", title: "জমি ও প্লট বিক্রয়", desc: "সারা বাংলাদেশে আবাসিক ও বাণিজ্যিক জমি এবং পরিকল্পিত প্লট বিক্রয়", color: "#e8f5ee", border: "#c3e6d0" },
            { icon: "🏢", title: "ফ্ল্যাট বিক্রয়", desc: "ঢাকাসহ সারাদেশে আধুনিক আবাসিক ফ্ল্যাট বিক্রয় করা হয়", color: "#eef2ff", border: "#c7d2fe" },
            { icon: "💳", title: "কিস্তি সুবিধা", desc: "সহজ মাসিক কিস্তিতে পেমেন্টের মাধ্যমে সম্পত্তি ক্রয়", color: "#fffbeb", border: "#fde68a" },
            { icon: "⚖️", title: "আইনি সহায়তা", desc: "জমি কেনার সকল আইনি দলিল লেখার সম্পূর্ণ সহায়তা", color: "#fef2f2", border: "#fecaca" },
          ].map((s) => (
            <div key={s.title} className="service-card" style={{ background: s.color, borderRadius: "16px", padding: "30px 24px", border: `1px solid ${s.border}` }}>
              <div style={{ fontSize: "38px", marginBottom: "16px" }}>{s.icon}</div>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "10px" }}>{s.title}</h3>
              <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.75" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "70px 60px", background: "#f4f7f5" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ color: "#1a6b3c", fontWeight: "600", fontSize: "14px", letterSpacing: "1px", marginBottom: "8px" }}>জমি ও প্লট</div>
          <h2 style={{ fontSize: "34px", fontWeight: "700", color: "#0f2d1e" }}>ফিচার্ড জমি ও প্লটসমূহ</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px", maxWidth: "1100px", margin: "0 auto" }}>
          {(featuredPlots.length > 0 ? featuredPlots : [
            { image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80", area: "পূর্বাচল, ঢাকা", size: "৩ কাঠা", price: 1800000, description: "পূর্বাচল নতুন শহরে অবস্থিত। স্কুল, হাসপাতাল কাছে।" },
            { image_url: "https://images.unsplash.com/photo-1559087867-ce4c91325525?w=600&q=80", area: "গাজীপুর, ঢাকা", size: "৫ কাঠা", price: 2400000, description: "গাজীপুরের প্রাণকেন্দ্রে। বিনিয়োগের জন্য আদর্শ।" },
            { image_url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&q=80", area: "নারায়ণগঞ্জ", size: "৪ কাঠা", price: 2000000, description: "নারায়ণগঞ্জে বাণিজ্যিক প্লট। ব্যবসার জন্য আদর্শ।" },
          ]).map((p: any, i: number) => (
            <div key={i} className="plot-card" style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img src={p.image_url} alt={p.area} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "14px", left: "14px", background: "#ef4444", color: "#fff", fontSize: "12px", fontWeight: "700", padding: "4px 14px", borderRadius: "20px" }}>নতুন</div>
              </div>
              <div style={{ padding: "22px" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "8px" }}>{p.area}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "#666", fontSize: "14px" }}>📐 {p.size}</span>
                  <span style={{ color: "#1a6b3c", fontWeight: "700", fontSize: "18px" }}>৳ {typeof p.price === "number" ? p.price.toLocaleString() : p.price}</span>
                </div>
                {p.description && <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "12px" }}>{p.description}</p>}
                <div style={{ background: "#e8f5ee", color: "#166534", fontSize: "13px", padding: "7px 14px", borderRadius: "7px", marginBottom: "16px" }}>✓ কিস্তি সুবিধা আছে</div>
                <a href="/plots" style={{ display: "block", textAlign: "center", background: "#1a6b3c", color: "#fff", padding: "13px", borderRadius: "9px", fontWeight: "600", fontSize: "14px" }}>বিস্তারিত দেখুন →</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a href="/plots" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "13px 36px", borderRadius: "9px", fontWeight: "600", fontSize: "15px" }}>সকল জমি ও প্লট দেখুন →</a>
        </div>
      </section>

      <section style={{ padding: "70px 60px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ color: "#1a6b3c", fontWeight: "600", fontSize: "14px", letterSpacing: "1px", marginBottom: "8px" }}>ফ্ল্যাট বিক্রয়</div>
          <h2 style={{ fontSize: "34px", fontWeight: "700", color: "#0f2d1e" }}>ফিচার্ড ফ্ল্যাটসমূহ</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px", maxWidth: "1100px", margin: "0 auto" }}>
          {(featuredFlats.length > 0 ? featuredFlats : [
            { image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", area: "মিরপুর, ঢাকা", size: "১২০০ বর্গফুট", price: 6500000, description: "মিরপুরে আধুনিক ফ্ল্যাট। ৩ বেডরুম, ২ বাথরুম সহ।" },
            { image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80", area: "উত্তরা, ঢাকা", size: "১৫০০ বর্গফুট", price: 9000000, description: "উত্তরায় লাক্সারি ফ্ল্যাট। সুইমিং পুল ও জিম সহ।" },
          ]).map((f: any, i: number) => (
            <div key={i} className="plot-card" style={{ background: "#f8f9ff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img src={f.image_url} alt={f.area} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "14px", left: "14px", background: "#3b82f6", color: "#fff", fontSize: "12px", fontWeight: "700", padding: "4px 14px", borderRadius: "20px" }}>নতুন</div>
              </div>
              <div style={{ padding: "22px" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "8px" }}>{f.area}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "#666", fontSize: "14px" }}>📐 {f.size}</span>
                  <span style={{ color: "#1a6b3c", fontWeight: "700", fontSize: "18px" }}>৳ {typeof f.price === "number" ? f.price.toLocaleString() : f.price}</span>
                </div>
                {f.description && <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "12px" }}>{f.description}</p>}
                <div style={{ background: "#e8f5ee", color: "#166534", fontSize: "13px", padding: "7px 14px", borderRadius: "7px", marginBottom: "16px" }}>✓ কিস্তি সুবিধা আছে</div>
                <a href="/flats" style={{ display: "block", textAlign: "center", background: "#1a6b3c", color: "#fff", padding: "13px", borderRadius: "9px", fontWeight: "600", fontSize: "14px" }}>বিস্তারিত দেখুন →</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a href="/flats" style={{ color: "#1a6b3c", border: "2px solid #1a6b3c", padding: "13px 36px", borderRadius: "9px", fontWeight: "600", fontSize: "15px" }}>সকল ফ্ল্যাট দেখুন →</a>
        </div>
      </section>

      <section style={{ padding: "70px 60px", background: "linear-gradient(135deg, #0f2d1e, #1a5c34)", color: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "34px", fontWeight: "700" }}>কেন Malikana Properties?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "960px", margin: "0 auto" }}>
          {[
            { icon: "✅", title: "১০০% আইনি নিরাপদ", desc: "সকল জমি ও প্লটের আইনি কাগজপত্র সম্পূর্ণ যাচাইকৃত" },
            { icon: "💰", title: "সহজ কিস্তি সুবিধা", desc: "মাসিক কিস্তিতে জমির মালিক হওয়ার সুযোগ" },
            { icon: "🤝", title: "বিশ্বস্ত প্রতিষ্ঠান", desc: "১০ বছর ধরে হাজারো গ্রাহকের আস্থার প্রতিষ্ঠান" },
          ].map((w) => (
            <div key={w.title} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "16px", padding: "32px 28px", textAlign: "center", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{w.icon}</div>
              <h3 style={{ fontSize: "19px", fontWeight: "700", marginBottom: "12px" }}>{w.title}</h3>
              <p style={{ fontSize: "14px", color: "#9ecfb2", lineHeight: "1.8" }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "56px 60px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1.5fr", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ fontWeight: "700", fontSize: "17px", marginBottom: "12px" }}>Malikana Properties Ltd.</div>
            <p style={{ color: "#6b9e80", fontSize: "14px", lineHeight: "1.85" }}>বাংলাদেশের বিশ্বস্ত রিয়েল এস্টেট প্রতিষ্ঠান।<br />Kazi Garden, 7th Floor, Tejgaon, Dhaka-1215</p>
          </div>
          <div>
            <div style={{ fontWeight: "600", marginBottom: "16px" }}>দ্রুত লিংক</div>
            {[["হোম", "/"], ["জমি ও প্লট", "/plots"], ["ফ্ল্যাট বিক্রয়", "/flats"], ["কিস্তি সুবিধা", "/installment"], ["যোগাযোগ", "/contact"]].map(([l, h]) => (
              <div key={l} style={{ marginBottom: "10px" }}><a href={h} style={{ color: "#6b9e80", fontSize: "14px" }}>{l}</a></div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: "600", marginBottom: "16px" }}>এলাকাসমূহ</div>
            {["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ", "পূর্বাচল", "সাভার"].map(l => (
              <div key={l} style={{ marginBottom: "10px" }}><a href="/plots" style={{ color: "#6b9e80", fontSize: "14px" }}>{l}</a></div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: "600", marginBottom: "16px" }}>যোগাযোগ</div>
            <div style={{ color: "#6b9e80", fontSize: "14px", lineHeight: "2.2" }}>
              <div>📞 01719-880087</div>
              <div>📞 01911-118505</div>
              <div>✉ malikanapropertiesltd@gmail.com</div>
              <div>📍 Tejgaon, Dhaka-1215</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1a3526", paddingTop: "24px", display: "flex", justifyContent: "space-between", color: "#3d6b4f", fontSize: "13px" }}>
          <span>© ২০২৫ Malikana Properties Ltd. সর্বস্বত্ব সংরক্ষিত</span>
          <span>Developed by Md Habib | 01830504433</span>
        </div>
      </footer>
    </main>
  );
}
