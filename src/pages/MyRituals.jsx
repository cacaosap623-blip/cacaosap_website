import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import "../App.css";

const MyRituals = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching rituals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) return <div className="loading">Seeking your ritual history...</div>;

  return (
    <div style={{ padding: "60px 10%", backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      <h1 style={{ color: "#3e2723", marginBottom: "30px" }}>My Ritual Journey</h1>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '15px' }}>
          <p>You haven't embarked on a ritual yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => (
            <div key={order.id} style={{ 
              backgroundColor: "white", 
              padding: "25px", 
              borderRadius: "15px", 
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              borderLeft: "5px solid #ff6d00" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#888" }}>ORDER ID: {order.id.substring(0, 8).toUpperCase()}</span>
                  <h3 style={{ margin: "5px 0", color: "#3e2723" }}>{order.status || "Processing"}</h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: "bold", fontSize: "1.2rem" }}>฿{order.total?.toLocaleString()}</p>
                  <span style={{ fontSize: "0.85rem", color: "#aaa" }}>
                    {order.createdAt?.toDate().toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}>
                <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "10px" }}>Items included:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {order.items?.map((item, idx) => (
                    <span key={idx} style={{ 
                      backgroundColor: "#f0f0f0", 
                      padding: "5px 12px", 
                      borderRadius: "50px", 
                      fontSize: "0.8rem",
                      color: "#3e2723" 
                    }}>
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRituals;