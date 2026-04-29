"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Inbox, 
  Search, 
  Trash2, 
  Eye,
  ArrowLeft,
  Clock,
  MoreHorizontal,
  Mail,
  User,
  MessageCircle,
  Calendar
} from 'lucide-react';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

const InboxPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'unread') {
      return matchesSearch && inquiry.status === 'unread';
    }
    return matchesSearch;
  });

  if (selectedInquiry) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedInquiry(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Inbox
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-[32px] overflow-hidden shadow-2xl"
        >
          <div className="p-8 border-b border-border bg-muted/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl shadow-lg">
                {selectedInquiry.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">{selectedInquiry.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                  <Mail size={14} /> {selectedInquiry.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#0d6533] bg-[#0d6533]/10 px-4 py-2 rounded-full">
              <Clock size={14} /> {new Date(selectedInquiry.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[3px] text-muted-foreground px-4 py-1.5 bg-muted rounded-full inline-block">Subject</span>
              <h3 className="text-2xl font-bold text-foreground">
                {selectedInquiry.subject}
              </h3>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[3px] text-muted-foreground px-4 py-1.5 bg-muted rounded-full inline-block">Message Message</span>
              <div className="text-lg text-foreground/90 font-medium leading-relaxed whitespace-pre-wrap bg-muted/20 p-8 rounded-[24px] border border-border/50 shadow-inner">
                {selectedInquiry.message}
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-border bg-muted/10">
             <button className="w-full md:w-auto bg-primary text-white px-10 h-12 rounded-full font-semibold uppercase tracking-wider text-[14px] hover:bg-primary/90 transition-all flex items-center justify-center gap-3">
              <Mail size={18} />
              Reply via Email
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">Inbox</h1>
          <p className="text-muted-foreground font-semibold">Track and manage customer inquiries</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email..."
              className="pl-12 pr-4 h-12 bg-card border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none w-64 md:w-80 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="h-12 bg-card border border-border rounded-2xl px-6 font-bold text-sm outline-none cursor-pointer hover:bg-muted/50 transition-colors"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-6 px-8 text-[11px] font-black uppercase tracking-widest text-muted-foreground">User</th>
                <th className="text-left py-6 px-8 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Inquiry Subject</th>
                <th className="text-left py-6 px-8 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Preview Message</th>
                <th className="text-left py-6 px-8 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Date Received</th>
                <th className="text-right py-6 px-8 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-4">
                      <Inbox size={48} className="opacity-20" />
                      <p className="font-black uppercase tracking-widest text-xs">No inquiries found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr 
                    key={inquiry._id} 
                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${inquiry.status === 'unread' ? 'bg-secondary' : 'bg-transparent'}`} />
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground text-sm">{inquiry.name}</span>
                          <span className="text-xs text-muted-foreground font-medium">{inquiry.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <span className="text-xs font-black uppercase tracking-wider text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                        {inquiry.subject}
                      </span>
                    </td>
                    <td className="py-6 px-8 max-w-xs">
                      <p className="text-sm text-muted-foreground truncate font-medium">
                        {inquiry.message}
                      </p>
                    </td>
                    <td className="py-6 px-8">
                       <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold whitespace-nowrap">
                        <Calendar size={14} />
                        {new Date(inquiry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" title="View Detail">
                          <Eye size={18} />
                        </button>
                        <button className="p-2.5 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
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
};

export default InboxPage;
