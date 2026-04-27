import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Eye, X, Trash2, Package, MessageSquare, Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);

  // 1. Unified Fetch Logic
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch Orders
      const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const orderSnap = await getDocs(qOrders);
      setOrders(orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch Messages (Contacts)
      const qMsgs = query(collection(db, "contacts"), orderBy("timestamp", "desc"));
      const msgSnap = await getDocs(qMsgs);
      setMessages(msgSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // 2. Flexible Delete Function (Works for both collections)
  const handleDelete = async (collectionName, id) => {
    const type = collectionName === "orders" ? "order" : "message";
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        // Simple way to refresh: filter the local state immediately
        if (collectionName === "orders") {
          setOrders(prev => prev.filter(item => item.id !== id));
        } else {
          setMessages(prev => prev.filter(item => item.id !== id));
        }
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#3e2723' }}>
      <Loader2 className="animate-spin" size={48} />
    </div>
  );

  return (
    <div style={{ padding: "140px 5% 60px", backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      <h1 style={{ color: "#3e2723", fontSize: "2.5rem", marginBottom: "30px" }}>Store Manager Dashboard</h1>

      {/* --- TAB NAVIGATION --- */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
        <button 
          onClick={() => setActiveTab("orders")}
          style={{ 
            padding: "12px 24px", borderRadius: "50px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
            backgroundColor: activeTab === "orders" ? "#3e2723" : "#fff", 
            color: activeTab === "orders" ? "#fff" : "#3e2723",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)", fontWeight: "600"
          }}
        >
          <Package size={20} /> Orders ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab("messages")}
          style={{ 
            padding: "12px 24px", borderRadius: "50px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
            backgroundColor: activeTab === "messages" ? "#3e2723" : "#fff", 
            color: activeTab === "messages" ? "#fff" : "#3e2723",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)", fontWeight: "600"
          }}
        >
          <MessageSquare size={20} /> Messages ({messages.length})
        </button>
      </div>

      {/* --- TABLE: ORDERS --- */}
      {activeTab === "orders" && (
        <div style={{ backgroundColor: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#3e2723", color: "white", textAlign: "left" }}>
                <th style={{ padding: "20px" }}>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "20px", fontFamily: "monospace", color: "#666" }}>#{order.id.substring(0, 8)}</td>
                  <td>{order.customerName || "Guest User"}</td>
                  <td style={{ fontWeight: "bold" }}>฿{order.totalPrice?.toLocaleString()}</td>
                  <td><span style={{ backgroundColor: "#fff3e0", color: "#ff6d00", padding: "5px 12px", borderRadius: "50px", fontSize: "0.8rem", fontWeight: "bold" }}>New Order</span></td>
                  <td style={{ display: "flex", gap: "15px", alignItems: "center", padding: "20px" }}>
                    <button onClick={() => setSelectedOrder(order)} style={{ background: "none", border: "none", color: "#3e2723", cursor: "pointer" }}><Eye size={20} /></button>
                    <button onClick={() => handleDelete("orders", order.id)} style={{ background: "none", border: "none", color: "#f5222d", cursor: "pointer" }}><Trash2 size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- LIST: MESSAGES --- */}
      {activeTab === "messages" && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', position: 'relative' }}>
              <button 
                onClick={() => handleDelete("contacts", msg.id)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#f5222d', cursor: 'pointer' }}
              >
                <Trash2 size={18} />
              </button>
              <h3 style={{ color: '#3e2723', margin: '0 0 10px 0' }}>{msg.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '15px' }}>{msg.email}</p>
              <div style={{ backgroundColor: '#FAF9F6', padding: '15px', borderRadius: '12px', fontSize: '0.9rem', color: '#555' }}>
                "{msg.message}"
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL (Remains the same but ensures it's clean) --- */}
      {selectedOrder && (
        <div onClick={() => setSelectedOrder(null)} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "white", padding: "40px", borderRadius: "25px", width: "500px", position: "relative" }}>
            <button onClick={() => setSelectedOrder(null)} style={{ position: "absolute", top: "20px", right: "20px", border: "none", background: "none", cursor: "pointer" }}><X /></button>
            <h2 style={{ color: "#3e2723", marginBottom: "20px" }}>Order Details</h2>
            {selectedOrder.items?.map((item, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", backgroundColor: "#f9f9f9", padding: "12px", borderRadius: "12px" }}>
                <span>{item.name} (x{item.quantity})</span>
                <strong>฿{(selectedOrder.totalPrice || selectedOrder.total || 0).toLocaleString()}</strong>
              </div>
            ))}
            <div style={{ marginTop: "20px", textAlign: "right", borderTop: "2px solid #3e2723", paddingTop: "15px" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Total: ฿{selectedOrder.totalPrice?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;