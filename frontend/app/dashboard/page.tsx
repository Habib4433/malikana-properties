"use client";
import { useState } from "react";

const installments = [
  { id: 1, month: "জানুয়ারি ২০২৫", amount: 15000, status: "পরিশোধিত", date: "০৫ জানুয়ারি ২০২৫" },
  { id: 2, month: "ফেব্রুয়ারি ২০২৫", amount: 15000, status: "পরিশোধিত", date: "০৩ ফেব্রুয়ারি ২০২৫" },
  { id: 3, month: "মার্চ ২০২৫", amount: 15000, status: "পরিশোধিত", date: "০৭ মার্চ ২০২৫" },
  { id: 4, month: "এপ্রিল ২০২৫", amount: 15000, status: "পরিশোধিত", date: "০৪ এপ্রিল ২০২৫" },
  { id: 5, month: "মে ২০২৫", amount: 15000, status: "বকেয়া", date: "—" },
  { id: 6, month: "জুন ২০২৫", amount: 15000, status: "বকেয়া", date: "—" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const paid = installments.filter(i => i.status === "পরিশোধিত");
  const due = installments.filter(i => i.status === "বকেয়া");

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap'); * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; } .tab-btn { cursor:pointer; padding:10px 20px; border-radius:8px; border:none; font-family:inherit; font-size:14px; font-weight:500; } .tab-btn.active { background:#1a6b3c; color:#fff; } .tab-btn:not(.active) { background:transparent; color:#666; }`}</style>

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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "38px", height: "38px", background: "#1a6b3c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "16px" }}>ম</div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f2d1e" }}>মোঃ রহিম</div>
              <div style={{ fontSize: "11px", color: "#888" }}>ক্রেতা</div>
            </div>
          </div>
          <a href="/login" style={{ color: "#e53e3e", border: "1.5px solid #e53e3e", padding: "8px 16px", borderRadius: "7px", fontWeight: "600", fontSize: "13px" }}>লগআউট</a>
        </div>
      </nav>

      <div style={{ padding: "32px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#0f2d1e" }}>স্বাগতম, মোঃ রহিম! 👋</h1>
          <p style={{ color: "#666", marginTop: "4px" }}>আপনার সম্পত্তি ও কিস্তির সকল তথ্য এখানে দেখুন</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
          {[
            { icon: "🏡", label: "আমার সম্পত্তি", value: "১টি প্লট", color: "#e8f5ee", border: "#c3e6d0", text: "#1a6b3c" },
            { icon: "✅", label: "পরিশোধিত কিস্তি", value: `${paid.length}টি`, color: "#eef2ff", border: "#c7d2fe", text: "#3b82f6" },
            { icon: "⏳", label: "বকেয়া কিস্তি", value: `${due.length}টি`, color: "#fef2f2", border: "#fecaca", text: "#e53e3e" },
            { icon: "💰", label: "মোট পরিশোধ", value: `৳ ${(paid.length * 15000).toLocaleString()}`, color: "#fffbeb", border: "#fde68a", text: "#d97706" },
          ].map(card => (
            <div key={card.label} style={{ background: card.color, borderRadius: "14px", padding: "22px", border: `1px solid ${card.border}` }}>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>{card.label}</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: card.text }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "4px", padding: "12px", borderBottom: "1px solid #e2e8f0", background: "#f8f9fa" }}>
            {[
              { id: "overview", label: "📊 সংক্ষিপ্ত" },
              { id: "installments", label: "💳 কিস্তি তালিকা" },
              { id: "property", label: "🏡 আমার সম্পত্তি" },
              { id: "profile", label: "👤 প্রোফাইল" },
            ].map(t => (
              <button key={t.id} className={`tab-btn${activeTab === t.id ? " active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
            ))}
          </div>

          <div style={{ padding: "28px" }}>
            {activeTab === "overview" && (
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "20px" }}>কিস্তির অগ্রগতি</h2>
                <div style={{ background: "#f4f7f5", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ fontSize: "14px", color: "#555" }}>পরিশোধিত: {paid.length} কিস্তি</span>
                    <span style={{ fontSize: "14px", color: "#555" }}>মোট: {installments.length} কিস্তি</span>
                  </div>
                  <div style={{ background: "#e0e0e0", borderRadius: "20px", height: "12px", overflow: "hidden" }}>
                    <div style={{ background: "#1a6b3c", height: "100%", width: `${(paid.length / installments.length) * 100}%`, borderRadius: "20px" }} />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "8px", fontSize: "13px", color: "#1a6b3c", fontWeight: "600" }}>
                    {Math.round((paid.length / installments.length) * 100)}% সম্পন্ন
                  </div>
                </div>
                <div style={{ background: "#fef2f2", borderRadius: "12px", padding: "20px", border: "1px solid #fecaca" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#e53e3e", marginBottom: "12px" }}>⚠️ বকেয়া কিস্তি</h3>
                  {due.map(i => (
                    <div key={i.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #fecaca" }}>
                      <span style={{ fontSize: "14px", color: "#333" }}>{i.month}</span>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "#e53e3e" }}>৳ {i.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "installments" && (
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "20px" }}>সকল কিস্তির তালিকা</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f4f7f5" }}>
                      {["#", "মাস", "পরিমাণ", "তারিখ", "অবস্থা"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#555", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {installments.map(i => (
                      <tr key={i.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "14px 16px", fontSize: "14px", color: "#666" }}>{i.id}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "500", color: "#333" }}>{i.month}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "700", color: "#0f2d1e" }}>৳ {i.amount.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", color: "#666" }}>{i.date}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ background: i.status === "পরিশোধিত" ? "#e8f5ee" : "#fef2f2", color: i.status === "পরিশোধিত" ? "#1a6b3c" : "#e53e3e", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            {i.status === "পরিশোধিত" ? "✓ " : "⚠ "}{i.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "property" && (
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "20px" }}>আমার সম্পত্তি</h2>
                <div style={{ background: "#f4f7f5", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
                    <div style={{ width: "80px", height: "80px", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>🏡</div>
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e" }}>পূর্বাচল, ঢাকা</h3>
                      <p style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>আবাসিক প্লট • ৩ কাঠা</p>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                    {[
                      { label: "মোট মূল্য", value: "৳ ১৮,০০,০০০" },
                      { label: "ডাউন পেমেন্ট", value: "৳ ৬,০০,০০০" },
                      { label: "বাকি পরিমাণ", value: "৳ ১২,০০,০০০" },
                      { label: "মাসিক কিস্তি", value: "৳ ১৫,০০০" },
                      { label: "কিস্তির মেয়াদ", value: "৬০ মাস" },
                      { label: "দলিল নম্বর", value: "MP-2024-001" },
                    ].map(item => (
                      <div key={item.label} style={{ background: "#fff", borderRadius: "10px", padding: "14px", border: "1px solid #e2e8f0" }}>
                        <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>{item.label}</div>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e", marginBottom: "16px" }}>📄 চুক্তিপত্র</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", background: "#f4f7f5", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "28px" }}>📋</span>
                        <div>
                          <div style={{ fontSize: "15px", fontWeight: "600", color: "#0f2d1e" }}>চুক্তিপত্র - পূর্বাচল প্লট</div>
                          <div style={{ fontSize: "12px", color: "#888", marginTop: "3px" }}>আপলোড: ১৫ জানুয়ারি ২০২৫ • PDF</div>
                        </div>
                      </div>
                      <a href="#" style={{ background: "#1a6b3c", color: "#fff", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "600" }}>⬇ ডাউনলোড</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "20px" }}>আমার প্রোফাইল</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", background: "#f4f7f5", borderRadius: "14px", padding: "20px", marginBottom: "20px", border: "1px solid #e2e8f0" }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: "90px", height: "110px", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", border: "3px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>👤</div>
                    <label style={{ position: "absolute", bottom: "-8px", right: "-8px", background: "#1a6b3c", color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", cursor: "pointer", border: "2px solid #fff" }}>
                      📷<input type="file" accept="image/*" style={{ display: "none" }} />
                    </label>
                  </div>
                  <div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#0f2d1e" }}>মোঃ আব্দুর রহিম</div>
                    <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>ক্রেতা ID: MP-2024-001</div>
                    <div style={{ fontSize: "13px", color: "#1a6b3c", marginTop: "4px", fontWeight: "500" }}>✓ যাচাইকৃত অ্যাকাউন্ট</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { label: "পূর্ণ নাম", value: "মোঃ আব্দুর রহিম" },
                    { label: "ফোন নম্বর", value: "01711-123456" },
                    { label: "ইমেইল", value: "rahim@gmail.com" },
                    { label: "ঠিকানা", value: "মিরপুর-১০, ঢাকা" },
                    { label: "জাতীয় পরিচয়পত্র (NID)", value: "১৯৮৫৩৬৭৮৯০১২৩" },
                    { label: "নমিনির নাম", value: "মোছাঃ ফাতেমা বেগম" },
                  ].map(item => (
                    <div key={item.label} style={{ background: "#f4f7f5", borderRadius: "10px", padding: "16px", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>{item.label}</div>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: "#0f2d1e" }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: "20px", background: "#1a6b3c", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "9px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
                  প্রোফাইল সম্পাদনা করুন
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1f13", color: "#fff", padding: "24px 60px", marginTop: "40px", textAlign: "center" }}>
        <div style={{ color: "#3d6b4f", fontSize: "13px" }}>© ২০২৫ Malikana Properties Ltd. | Developed by Md Habib</div>
      </footer>
    </main>
  );
}
