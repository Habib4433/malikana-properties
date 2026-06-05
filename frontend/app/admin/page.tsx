"use client";
import { useState } from "react";

const buyers = [
  { id: 1, name: "মোঃ আব্দুর রহিম", phone: "01711-123456", property: "পূর্বাচল, ঢাকা", paid: 4, total: 6, status: "সক্রিয়" },
  { id: 2, name: "মোছাঃ সালমা বেগম", phone: "01812-234567", property: "গাজীপুর, ঢাকা", paid: 2, total: 12, status: "সক্রিয়" },
  { id: 3, name: "মোঃ করিম", phone: "01913-345678", property: "নারায়ণগঞ্জ", paid: 6, total: 6, status: "সম্পন্ন" },
  { id: 4, name: "মোঃ জামাল", phone: "01614-456789", property: "সাভার, ঢাকা", paid: 0, total: 24, status: "বকেয়া" },
];

const properties = [
  { id: 1, area: "পূর্বাচল, ঢাকা", size: "৩ কাঠা", price: "১৮,০০,০০০", type: "আবাসিক", sector: "জমি ও প্লট", status: "বুকড" },
  { id: 2, area: "গাজীপুর, ঢাকা", size: "৫ কাঠা", price: "২৪,০০,০০০", type: "আবাসিক", sector: "জমি ও প্লট", status: "পাওয়া যাচ্ছে" },
  { id: 3, area: "নারায়ণগঞ্জ", size: "৪ কাঠা", price: "২০,০০,০০০", type: "বাণিজ্যিক", sector: "জমি ও প্লট", status: "পাওয়া যাচ্ছে" },
  { id: 4, area: "মিরপুর, ঢাকা", size: "১২০০ বর্গফুট", price: "৬৫,০০,০০০", type: "আবাসিক", sector: "ফ্ল্যাট বিক্রয়", status: "পাওয়া যাচ্ছে" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [newProperty, setNewProperty] = useState({ area: "", size: "", price: "", type: "আবাসিক", sector: "জমি ও প্লট" });

  return (
    <main style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: "100vh", background: "#f4f7f5", display: "flex" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap'); * { margin:0; padding:0; box-sizing:border-box; } a { text-decoration:none; } input, select { font-family:inherit; color:#111; } input::placeholder { color:#aaa; }`}</style>

      <div style={{ width: "260px", background: "#0f2d1e", minHeight: "100vh", padding: "24px 0", position: "fixed", left: 0, top: 0 }}>
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "42px", height: "42px", background: "linear-gradient(135deg, #1a6b3c, #2d9e5f)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "14px" }}>MP</div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "15px", color: "#fff" }}>Malikana Admin</div>
              <div style={{ fontSize: "11px", color: "#6ee7a0" }}>অ্যাডমিন প্যানেল</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 12px" }}>
          {[
            { id: "dashboard", icon: "📊", label: "ড্যাশবোর্ড" },
            { id: "buyers", icon: "👥", label: "ক্রেতা তালিকা" },
            { id: "properties", icon: "🏡", label: "সম্পত্তি তালিকা" },
            { id: "installments", icon: "💳", label: "কিস্তি ব্যবস্থাপনা" },
            { id: "documents", icon: "📄", label: "দলিল আপলোড" },
            { id: "reports", icon: "📈", label: "রিপোর্ট" },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "500", marginBottom: "4px", background: activeTab === item.id ? "rgba(255,255,255,0.15)" : "transparent", color: activeTab === item.id ? "#fff" : "#9ecfb2", textAlign: "left" }}>
              <span>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "24px", left: "12px", right: "12px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "10px", color: "#f87171", fontSize: "14px", fontWeight: "500" }}>🚪 লগআউট</a>
        </div>
      </div>

      <div style={{ marginLeft: "260px", flex: 1, padding: "32px 40px" }}>

        {activeTab === "dashboard" && (
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f2d1e", marginBottom: "8px" }}>অ্যাডমিন ড্যাশবোর্ড</h1>
            <p style={{ color: "#666", marginBottom: "28px" }}>Malikana Properties Ltd. এর সামগ্রিক পরিসংখ্যান</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
              {[
                { icon: "👥", label: "মোট ক্রেতা", value: "১২৫ জন", color: "#e8f5ee", border: "#c3e6d0", text: "#1a6b3c" },
                { icon: "🏡", label: "মোট সম্পত্তি", value: "৮৫টি", color: "#eef2ff", border: "#c7d2fe", text: "#3b82f6" },
                { icon: "💰", label: "মাসিক আয়", value: "৳ ১৮,৭৫,০০০", color: "#fffbeb", border: "#fde68a", text: "#d97706" },
                { icon: "⚠️", label: "বকেয়া কিস্তি", value: "১৫টি", color: "#fef2f2", border: "#fecaca", text: "#e53e3e" },
              ].map(card => (
                <div key={card.label} style={{ background: card.color, borderRadius: "14px", padding: "22px", border: `1px solid ${card.border}` }}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
                  <div style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>{card.label}</div>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: card.text }}>{card.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "16px" }}>⚠️ বকেয়া কিস্তির তালিকা</h2>
              {buyers.filter(b => b.status === "বকেয়া" || b.paid < b.total).map(b => (
                <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: "#0f2d1e" }}>{b.name}</div>
                    <div style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>{b.phone} • {b.property}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", color: "#666" }}>পরিশোধিত: {b.paid}/{b.total}</div>
                    <span style={{ background: b.status === "বকেয়া" ? "#fef2f2" : "#fffbeb", color: b.status === "বকেয়া" ? "#e53e3e" : "#d97706", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "buyers" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f2d1e" }}>ক্রেতা তালিকা</h1>
              <button style={{ background: "#1a6b3c", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>+ নতুন ক্রেতা যোগ</button>
            </div>
            <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f4f7f5" }}>
                    {["#", "নাম", "ফোন", "সম্পত্তি", "কিস্তি অগ্রগতি", "অবস্থা", "অ্যাকশন"].map(h => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#555", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyers.map(b => (
                    <tr key={b.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#666" }}>{b.id}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "600", color: "#0f2d1e" }}>{b.name}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#666" }}>{b.phone}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#666" }}>{b.property}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ flex: 1, background: "#e0e0e0", borderRadius: "20px", height: "8px", overflow: "hidden" }}>
                            <div style={{ background: "#1a6b3c", height: "100%", width: `${(b.paid / b.total) * 100}%`, borderRadius: "20px" }} />
                          </div>
                          <span style={{ fontSize: "12px", color: "#666" }}>{b.paid}/{b.total}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ background: b.status === "সক্রিয়" ? "#e8f5ee" : b.status === "সম্পন্ন" ? "#eef2ff" : "#fef2f2", color: b.status === "সক্রিয়" ? "#1a6b3c" : b.status === "সম্পন্ন" ? "#3b82f6" : "#e53e3e", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>{b.status}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button style={{ background: "#eef2ff", color: "#3b82f6", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>দেখুন</button>
                          <button style={{ background: "#fef2f2", color: "#e53e3e", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>SMS</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "properties" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f2d1e" }}>সম্পত্তি তালিকা</h1>
              <button onClick={() => setShowAddProperty(true)} style={{ background: "#1a6b3c", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>+ নতুন সম্পত্তি যোগ</button>
            </div>
            {showAddProperty && (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "20px" }}>নতুন সম্পত্তি যোগ করুন</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[{ label: "এলাকা", key: "area", placeholder: "যেমন: পূর্বাচল, ঢাকা" }, { label: "আয়তন", key: "size", placeholder: "যেমন: ৩ কাঠা" }, { label: "মূল্য (টাকা)", key: "price", placeholder: "যেমন: 1800000" }].map(field => (
                    <div key={field.key}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>{field.label}</label>
                      <input placeholder={field.placeholder} value={newProperty[field.key as keyof typeof newProperty]}
                        onChange={e => setNewProperty({ ...newProperty, [field.key]: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>সেক্টর</label>
                    <select value={newProperty.sector} onChange={e => setNewProperty({ ...newProperty, sector: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", cursor: "pointer" }}>
                      <option value="জমি ও প্লট">জমি ও প্লট</option>
                      <option value="ফ্ল্যাট বিক্রয়">ফ্ল্যাট বিক্রয়</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>ধরন</label>
                    <select value={newProperty.type} onChange={e => setNewProperty({ ...newProperty, type: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", cursor: "pointer" }}>
                      <option>আবাসিক</option>
                      <option>বাণিজ্যিক</option>
                      <option>কৃষি</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                  <button style={{ background: "#1a6b3c", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>সংরক্ষণ করুন</button>
                  <button onClick={() => setShowAddProperty(false)} style={{ background: "transparent", color: "#666", border: "1.5px solid #e0e0e0", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>বাতিল</button>
                </div>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
              {properties.map(p => (
                <div key={p.id} style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e" }}>{p.area}</h3>
                    <span style={{ background: p.status === "পাওয়া যাচ্ছে" ? "#e8f5ee" : "#fef2f2", color: p.status === "পাওয়া যাচ্ছে" ? "#1a6b3c" : "#e53e3e", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>{p.status}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                    {[{ label: "আয়তন", value: p.size }, { label: "মূল্য", value: `৳ ${p.price}` }, { label: "ধরন", value: p.type }, { label: "সেক্টর", value: p.sector }].map(item => (
                      <div key={item.label} style={{ background: "#f4f7f5", borderRadius: "8px", padding: "10px" }}>
                        <div style={{ fontSize: "11px", color: "#888" }}>{item.label}</div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f2d1e", marginTop: "2px" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{ flex: 1, background: "#eef2ff", color: "#3b82f6", border: "none", padding: "9px", borderRadius: "7px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>সম্পাদনা</button>
                    <button style={{ flex: 1, background: "#fef2f2", color: "#e53e3e", border: "none", padding: "9px", borderRadius: "7px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>মুছুন</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px" }}>দলিল আপলোড</h1>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "20px" }}>📄 নতুন দলিল আপলোড</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>ক্রেতা নির্বাচন করুন</label>
                  <select style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", cursor: "pointer" }}>
                    {buyers.map(b => <option key={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "6px" }}>দলিলের ধরন</label>
                  <select style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "14px", cursor: "pointer" }}>
                    <option>চুক্তিপত্র</option>
                    <option>রেজিস্ট্রি দলিল</option>
                    <option>পর্চা</option>
                    <option>নামজারি</option>
                  </select>
                </div>
              </div>
              <div style={{ border: "2px dashed #c3e6d0", borderRadius: "12px", padding: "40px", textAlign: "center", background: "#f4faf6", cursor: "pointer" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>📁</div>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#0f2d1e", marginBottom: "6px" }}>PDF ফাইল আপলোড করুন</div>
                <div style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>এখানে ফাইল টেনে আনুন অথবা ক্লিক করুন</div>
                <input type="file" accept=".pdf" style={{ display: "none" }} id="fileUpload" />
                <label htmlFor="fileUpload" style={{ background: "#1a6b3c", color: "#fff", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>ফাইল বেছে নিন</label>
              </div>
              <button style={{ marginTop: "16px", background: "#1a6b3c", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>আপলোড করুন →</button>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px" }}>মাসিক রিপোর্ট</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                { month: "মে ২০২৫", collected: "১৫,০০,০০০", due: "৩,০০,০০০", buyers: "১০০" },
                { month: "এপ্রিল ২০২৫", collected: "১৮,৭৫,০০০", due: "১,৫০,০০০", buyers: "১২৫" },
                { month: "মার্চ ২০২৫", collected: "১৬,৫০,০০০", due: "২,২৫,০০০", buyers: "১১০" },
              ].map(r => (
                <div key={r.month} style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f2d1e", marginBottom: "16px" }}>{r.month}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: "#666" }}>সংগৃহীত কিস্তি</span>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a6b3c" }}>৳ {r.collected}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: "#666" }}>বকেয়া</span>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "#e53e3e" }}>৳ {r.due}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: "#666" }}>সক্রিয় ক্রেতা</span>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f2d1e" }}>{r.buyers} জন</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "installments" && (
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px" }}>কিস্তি ব্যবস্থাপনা</h1>
            <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f4f7f5" }}>
                    {["ক্রেতা", "ফোন", "সম্পত্তি", "মাসিক কিস্তি", "অগ্রগতি", "অবস্থা", "অ্যাকশন"].map(h => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#555", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyers.map(b => (
                    <tr key={b.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "600", color: "#0f2d1e" }}>{b.name}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#666" }}>{b.phone}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#666" }}>{b.property}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "700", color: "#1a6b3c" }}>৳ ১৫,০০০</td>
                      <td style={{ padding: "14px 16px", fontSize: "13px", color: "#666" }}>{b.paid}/{b.total} কিস্তি</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ background: b.status === "সক্রিয়" ? "#e8f5ee" : b.status === "সম্পন্ন" ? "#eef2ff" : "#fef2f2", color: b.status === "সক্রিয়" ? "#1a6b3c" : b.status === "সম্পন্ন" ? "#3b82f6" : "#e53e3e", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>{b.status}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button style={{ background: "#e8f5ee", color: "#1a6b3c", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>কিস্তি যোগ</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
