"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<"properties" | "users">("properties");
  const [properties, setProperties] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ area: "", size: "", price: "", type: "আবাসিক", status: "পাওয়া যাচ্ছে", sector: "জমি ও প্লট", description: "", image_url: "" });
  const [msg, setMsg] = useState("");
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("admin_token");
    const user = window.localStorage.getItem("admin_user");
    if (token && user) {
      const u = JSON.parse(user);
      if (u.role === "admin") {
        setIsLoggedIn(true);
        setAdminName(u.name);
        loadData(token);
      }
    }
  }, []);

  const handleAdminLogin = async () => {
    setLoginError("");
    if (!loginForm.phone || !loginForm.password) { setLoginError("ফোন ও পাসওয়ার্ড দিন"); return; }
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (!res.ok) { setLoginError(data.message || "লগইন ব্যর্থ"); setLoginLoading(false); return; }
      if (data.user.role !== "admin") { setLoginError("আপনি Admin নন!"); setLoginLoading(false); return; }
      window.localStorage.setItem("admin_token", data.token);
      window.localStorage.setItem("admin_user", JSON.stringify(data.user));
      setAdminName(data.user.name);
      setIsLoggedIn(true);
      loadData(data.token);
    } catch {
      setLoginError("সার্ভারের সাথে সংযোগ হচ্ছে না");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = () => {
    window.localStorage.removeItem("admin_token");
    window.localStorage.removeItem("admin_user");
    setIsLoggedIn(false);
    setLoginForm({ phone: "", password: "" });
  };

  const loadData = async (token: string) => {
    setLoading(true);
    try {
      const [pRes, uRes] = await Promise.all([
        fetch(`${API_URL}/api/properties`),
        fetch(`${API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const pData = await pRes.json();
      const uData = await uRes.json();
      setProperties(pData.data || []);
      setUsers(uData.users || []);
    } catch {}
    setLoading(false);
  };

  const getToken = () => typeof window !== "undefined" ? window.localStorage.getItem("admin_token") || "" : "";

  const handleSave = async () => {
    setMsg("");
    const url = editItem ? `${API_URL}/api/admin/properties/${editItem.id}` : `${API_URL}/api/admin/properties`;
    const method = editItem ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ ...form, price: parseInt(form.price) })
      });
      const data = await res.json();
      setMsg(data.message);
      if (res.ok) { setShowForm(false); setEditItem(null); loadData(getToken()); }
    } catch { setMsg("সার্ভার এরর"); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("মুছে ফেলবেন?")) return;
    await fetch(`${API_URL}/api/admin/properties/${id}`, {
      method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` }
    });
    loadData(getToken());
  };

  const handleRoleChange = async (id: string, role: string) => {
    await fetch(`${API_URL}/api/admin/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ role })
    });
    loadData(getToken());
  };

  const openEdit = (p: any) => {
    setForm({ area: p.area, size: p.size, price: String(p.price), type: p.type, status: p.status, sector: p.sector, description: p.description || "", image_url: p.image_url || "" });
    setEditItem(p);
    setShowForm(true);
  };

  // Admin Login Page
  if (!isLoggedIn) {
    return (
      <main style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#0f2d1e", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <style>{`* { margin:0; padding:0; box-sizing:border-box; } input { font-family:sans-serif; color:#111; } input::placeholder { color:#aaa; } input:focus { outline:none; border-color:#1a6b3c !important; }`}</style>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <img src="/logo.jpeg" alt="Malikana Properties" style={{ height: "60px", width: "auto", objectFit: "contain", marginBottom: "16px" }} />
            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#fff", marginBottom: "6px" }}>Admin Panel</h1>
            <p style={{ color: "#9ecfb2", fontSize: "14px" }}>শুধুমাত্র অনুমোদিত Admin প্রবেশ করতে পারবেন</p>
          </div>

          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f2d1e", marginBottom: "24px", textAlign: "center" }}>🔐 Admin লগইন</h2>

            {loginError && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
                ❌ {loginError}
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "7px" }}>ফোন নম্বর</label>
              <input type="tel" placeholder="01XXXXXXXXX" value={loginForm.phone} onChange={e => setLoginForm({ ...loginForm, phone: e.target.value })}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "7px" }}>পাসওয়ার্ড</label>
              <input type="password" placeholder="পাসওয়ার্ড দিন" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" }} />
            </div>

            <button onClick={handleAdminLogin} disabled={loginLoading}
              style={{ width: "100%", background: loginLoading ? "#6b9e82" : "#1a6b3c", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: loginLoading ? "not-allowed" : "pointer", fontFamily: "sans-serif" }}>
              {loginLoading ? "লগইন হচ্ছে..." : "Admin লগইন →"}
            </button>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <a href="/" style={{ color: "#1a6b3c", fontSize: "13px", fontWeight: "500" }}>← হোমপেজে ফিরুন</a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <main style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f4f7f5" }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        a { text-decoration:none; }
        input, select, textarea { font-family:sans-serif; color:#111; }
        input::placeholder, textarea::placeholder { color:#aaa; }
        input:focus, select:focus, textarea:focus { outline:none; border-color:#1a6b3c !important; }
        .table { width:100%; border-collapse:collapse; }
        .table th { background:#f4f7f5; padding:12px 16px; text-align:left; font-size:13px; color:#555; font-weight:600; border-bottom:2px solid #e2e8f0; }
        .table td { padding:12px 16px; font-size:13px; color:#333; border-bottom:1px solid #f0f0f0; }
        .table tr:hover td { background:#fafafa; }
        .pad { padding:28px 60px; }
        @media(max-width:768px){ .pad{ padding:16px; } .table th, .table td { padding:8px 10px; font-size:12px; } }
      `}</style>

      <section style={{ background: "linear-gradient(135deg,#0f2d1e,#1a5c34)", color: "#fff", padding: "20px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img src="/logo.jpeg" alt="logo" style={{ height: "44px", width: "auto", objectFit: "contain" }} />
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: "700" }}>⚙️ Admin Panel</h1>
              <p style={{ color: "#9ecfb2", fontSize: "13px" }}>স্বাগতম, {adminName}!</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href="/" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "8px 16px", borderRadius: "7px", fontWeight: "600", fontSize: "13px" }}>🏠 হোম</a>
            <button onClick={handleAdminLogout} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "7px", fontWeight: "600", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}>লগআউট</button>
          </div>
        </div>
      </section>

      <div className="pad" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "16px", marginBottom: "24px" }}>
          {[
            { icon: "🏡", label: "মোট Property", value: properties.length },
            { icon: "👥", label: "মোট User", value: users.length },
            { icon: "✅", label: "পাওয়া যাচ্ছে", value: properties.filter(p => p.status === "পাওয়া যাচ্ছে").length },
            { icon: "🔒", label: "বুকড", value: properties.filter(p => p.status === "বুকড").length },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid #e2e8f0", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#1a6b3c" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0", marginBottom: "20px", background: "#fff", borderRadius: "10px", padding: "4px", border: "1px solid #e2e8f0", width: "fit-content" }}>
          {[["properties", "🏡 Property"], ["users", "👥 User"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t as any)}
              style={{ padding: "9px 22px", borderRadius: "8px", border: "none", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600", cursor: "pointer", background: tab === t ? "#1a6b3c" : "transparent", color: tab === t ? "#fff" : "#666" }}>
              {l}
            </button>
          ))}
        </div>

        {msg && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>✅ {msg}</div>}

        {tab === "properties" && (
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e" }}>সব Property ({properties.length}টি)</h3>
              <button onClick={() => { setShowForm(true); setEditItem(null); setForm({ area: "", size: "", price: "", type: "আবাসিক", status: "পাওয়া যাচ্ছে", sector: "জমি ও প্লট", description: "", image_url: "" }); }}
                style={{ background: "#1a6b3c", color: "#fff", border: "none", padding: "9px 18px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}>
                + নতুন Property
              </button>
            </div>

            {showForm && (
              <div style={{ padding: "20px", background: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#0f2d1e", marginBottom: "16px" }}>
                  {editItem ? "Property সম্পাদনা" : "নতুন Property যোগ করুন"}
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "12px", marginBottom: "12px" }}>
                  {[
                    { label: "এলাকা *", key: "area", placeholder: "যেমন: পূর্বাচল, ঢাকা" },
                    { label: "আকার *", key: "size", placeholder: "যেমন: ৩ কাঠা" },
                    { label: "মূল্য (টাকা) *", key: "price", placeholder: "যেমন: 1800000" },
                    { label: "ছবির URL", key: "image_url", placeholder: "https://..." },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#444", marginBottom: "5px" }}>{f.label}</label>
                      <input value={form[f.key as keyof typeof form]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "7px", border: "1.5px solid #ddd", fontSize: "13px" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#444", marginBottom: "5px" }}>বিভাগ</label>
                    <select value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "7px", border: "1.5px solid #ddd", fontSize: "13px", cursor: "pointer" }}>
                      <option>জমি ও প্লট</option>
                      <option>ফ্ল্যাট বিক্রয়</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#444", marginBottom: "5px" }}>ধরন</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "7px", border: "1.5px solid #ddd", fontSize: "13px", cursor: "pointer" }}>
                      <option>আবাসিক</option>
                      <option>বাণিজ্যিক</option>
                      <option>কৃষি</option>
                      <option>লাক্সারি</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#444", marginBottom: "5px" }}>অবস্থা</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "7px", border: "1.5px solid #ddd", fontSize: "13px", cursor: "pointer" }}>
                      <option>পাওয়া যাচ্ছে</option>
                      <option>বুকড</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#444", marginBottom: "5px" }}>বিবরণ</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="সংক্ষিপ্ত বিবরণ..." rows={3}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "7px", border: "1.5px solid #ddd", fontSize: "13px", resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={handleSave} style={{ background: "#1a6b3c", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", fontFamily: "sans-serif" }}>
                    {editItem ? "আপডেট করুন" : "যোগ করুন"}
                  </button>
                  <button onClick={() => { setShowForm(false); setEditItem(null); }}
                    style={{ background: "#f4f4f4", color: "#333", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", fontFamily: "sans-serif" }}>
                    বাতিল
                  </button>
                </div>
              </div>
            )}

            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>এলাকা</th>
                    <th>বিভাগ</th>
                    <th>আকার</th>
                    <th>মূল্য</th>
                    <th>অবস্থা</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#888" }}>লোড হচ্ছে...</td></tr>
                  ) : properties.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#888" }}>কোনো property নেই — উপরে যোগ করুন</td></tr>
                  ) : properties.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: "600" }}>{p.area}</td>
                      <td>{p.sector}</td>
                      <td>{p.size}</td>
                      <td style={{ color: "#1a6b3c", fontWeight: "600" }}>৳ {p.price?.toLocaleString()}</td>
                      <td>
                        <span style={{ background: p.status === "বুকড" ? "#fef2f2" : "#f0fdf4", color: p.status === "বুকড" ? "#dc2626" : "#16a34a", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => openEdit(p)} style={{ background: "#eef2ff", color: "#3730a3", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", fontWeight: "600" }}>সম্পাদনা</button>
                          <button onClick={() => handleDelete(p.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", fontWeight: "600" }}>মুছুন</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f2d1e" }}>সব User ({users.length}জন)</h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>নাম</th>
                    <th>ফোন</th>
                    <th>ইমেইল</th>
                    <th>Role</th>
                    <th>যোগদান</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#888" }}>লোড হচ্ছে...</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#888" }}>কোনো user নেই</td></tr>
                  ) : users.map(u => (
                    <tr key={u.id}>
                      <td style={{ fontWeight: "600" }}>{u.name}</td>
                      <td>{u.phone}</td>
                      <td>{u.email || "-"}</td>
                      <td>
                        <span style={{ background: u.role === "admin" ? "#fef3c7" : "#f0fdf4", color: u.role === "admin" ? "#92400e" : "#166534", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                          {u.role === "admin" ? "অ্যাডমিন" : "ক্রেতা"}
                        </span>
                      </td>
                      <td>{new Date(u.created_at).toLocaleDateString("bn-BD")}</td>
                      <td>
                        <button onClick={() => handleRoleChange(u.id, u.role === "admin" ? "buyer" : "admin")}
                          style={{ background: u.role === "admin" ? "#fef2f2" : "#f0fdf4", color: u.role === "admin" ? "#dc2626" : "#16a34a", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", fontWeight: "600" }}>
                          {u.role === "admin" ? "Buyer করুন" : "Admin করুন"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer style={{ background: "#0a1f13", color: "#3d6b4f", padding: "24px 20px", textAlign: "center", fontSize: "13px", marginTop: "40px" }}>
        © ২০২৫ Malikana Properties Ltd. | Admin Panel
      </footer>
    </main>
  );
}
