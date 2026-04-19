'use client';
import { useState, useEffect } from 'react';

interface Appointment {
  _id: string;
  service: string;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setAppointments(appointments.map(a => a._id === id ? { ...a, status: newStatus as any } : a));
      }
    } catch (error) {
      alert('Update failed');
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm('ยืนยันการลบรายการนี้?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAppointments(appointments.filter(a => a._id !== id));
      }
    } catch (error) {
      alert('Delete failed');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div className="p-8 font-thai">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-zinc-950">รายการนัดหมาย</h1>
          <p className="text-zinc-500 font-bold mt-1 uppercase text-xs tracking-widest">Customer Appointment Management</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-5 text-[11px] font-black uppercase text-zinc-400">วันที่ / เวลา</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase text-zinc-400">ชื่อลูกค้า / เบอร์โทร</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase text-zinc-400">บริการ</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase text-zinc-400">สถานะ</th>
                <th className="px-6 py-5 text-[11px] font-black uppercase text-zinc-400 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center animate-pulse font-bold text-zinc-400">กําลังโหลดข้อมูล...</td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center font-bold text-zinc-400">ยังไม่มีรายการนัดหมายในขณะนี้</td></tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-6">
                      <p className="font-black text-zinc-950 text-sm">{new Date(a.date).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      <p className="text-xs text-zinc-500 font-bold mt-0.5">{a.timeSlot}</p>
                    </td>
                    <td className="px-6 py-6">
                      <p className="font-black text-[#FFB800] text-sm">{a.fullName}</p>
                      <p className="text-xs text-zinc-500 font-bold mt-0.5">{a.phone}</p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-[12px] font-bold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full">{a.service}</span>
                    </td>
                    <td className="px-6 py-6">
                      <select 
                        value={a.status}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                        className={`text-[11px] font-black uppercase px-3 py-1.5 rounded-lg outline-none border-none cursor-pointer ${getStatusColor(a.status)}`}
                      >
                         <option value="pending">🟡 Pending</option>
                         <option value="confirmed">🔵 Confirmed</option>
                         <option value="completed">🟢 Completed</option>
                         <option value="cancelled">🔴 Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-6 text-right">
                       <button 
                         onClick={() => deleteAppointment(a._id)}
                         className="text-zinc-300 hover:text-red-500 transition-colors"
                       >
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
