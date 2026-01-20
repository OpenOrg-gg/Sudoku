
import React, { useState } from 'react';
import { CreditPack } from '../types.ts';
import {
    CreditCard,
    Smartphone,
    Wallet,
    Building2,
    CheckCircle,
    ShieldCheck,
    Lock,
    ArrowLeft,
    ChevronRight,
    Calendar,
    Key
} from 'lucide-react';
import { VisaIcon, MastercardIcon, PayPalIcon, MBWayIcon, MultibancoIcon } from './PaymentIcons';

interface PaymentPageProps {
    pack: CreditPack;
    onComplete: (paymentMethod: string) => void;
    onBack: () => void;
}

const PAYMENT_METHODS = [
    { id: 'card', name: 'Card', icon: <div className="flex gap-1"><VisaIcon size={24} /><MastercardIcon size={24} /></div>, desc: 'Visa, Mastercard' },
    { id: 'mbway', name: 'MB Way', icon: <MBWayIcon size={28} />, desc: 'Instant mobile' },
    { id: 'paypal', name: 'PayPal', icon: <PayPalIcon size={28} />, desc: 'Secure checkout' },
    { id: 'multibanco', name: 'Entity', icon: <MultibancoIcon size={28} />, desc: 'Reference' },
];

const PaymentPage: React.FC<PaymentPageProps> = ({ pack, onComplete, onBack }) => {
    const [selectedMethod, setSelectedMethod] = useState<string>('card');
    const [isProcessing, setIsProcessing] = useState(false);

    // Form States
    const [form, setForm] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const isFormValid = () => {
        if (selectedMethod === 'card') {
            return form.cardNumber.length >= 16 && form.expiry.length >= 5 && form.cvc.length >= 3;
        }
        if (selectedMethod === 'mbway') {
            return form.phone.length >= 9;
        }
        if (selectedMethod === 'paypal') {
            return form.email.includes('@');
        }
        return true; // Multibanco is always "valid" as it shows references
    };

    const handlePay = () => {
        if (!isFormValid()) return;
        setIsProcessing(true);
        setTimeout(() => {
            onComplete(selectedMethod);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20 animate-in fade-in duration-500">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
                <div className="max-w-xl mx-auto flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="font-black uppercase tracking-tight text-lg">Checkout</h1>
                </div>
            </header>

            <main className="max-w-xl mx-auto mt-8 px-4 space-y-6">
                {/* Order Summary */}
                <div className="bg-indigo-600 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                    <h2 className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-4">You are buying</h2>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-3xl font-black leading-tight">{pack.pack}</div>
                            <div className="text-indigo-200 font-bold">{pack.qty} Credits</div>
                        </div>
                        <div className="text-4xl font-black">{pack.amount}</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {PAYMENT_METHODS.map((method) => (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`flex flex-col items-center justify-center p-4 rounded-3xl border transition-all duration-300 ${selectedMethod === method.id
                                ? 'border-indigo-600 bg-white shadow-lg ring-1 ring-indigo-600 scale-[1.05] z-10'
                                : 'border-slate-100 bg-white/50 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                                }`}
                        >
                            <div className="mb-2">{method.icon}</div>
                            <span className="text-[8px] font-black uppercase tracking-tighter">{method.name}</span>
                        </button>
                    ))}
                </div>

                {/* Dynamic Form Section */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                            {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.icon}
                        </div>
                        <h3 className="font-black text-slate-800 uppercase tracking-tight">
                            {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name} Details
                        </h3>
                    </div>

                    {selectedMethod === 'card' && (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold transition-all"
                                        value={form.cardNumber}
                                        onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Expiry Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold transition-all"
                                            value={form.expiry}
                                            onChange={(e) => handleInputChange('expiry', e.target.value.slice(0, 5))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">CVC</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold transition-all"
                                            value={form.cvc}
                                            onChange={(e) => handleInputChange('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedMethod === 'mbway' && (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        type="tel"
                                        placeholder="912 345 678"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold transition-all"
                                        value={form.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 9))}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium pl-1">You will receive a notification in your app to authorize the payment.</p>
                            </div>
                        </div>
                    )}

                    {selectedMethod === 'paypal' && (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">PayPal Email</label>
                                <div className="relative">
                                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        type="email"
                                        placeholder="user@example.com"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold transition-all"
                                        value={form.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedMethod === 'multibanco' && (
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 font-mono">
                            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400">ENTITY</span>
                                <span className="font-black text-slate-800">12345</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400">REFERENCE</span>
                                <span className="font-black text-slate-800">987 654 321</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400">VALUE</span>
                                <span className="font-black text-indigo-600">{pack.amount}</span>
                            </div>
                            <p className="text-[9px] text-slate-400 font-bold text-center uppercase tracking-widest pt-2">VALID FOR 24 HOURS</p>
                        </div>
                    )}
                </div>

                {/* Security Info */}
                <div className="flex items-center justify-center gap-8 py-2 opacity-50">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <ShieldCheck size={14} className="text-emerald-500" /> Secure
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Lock size={14} /> Encrypted
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={handlePay}
                    disabled={isProcessing || !isFormValid()}
                    className={`w-full py-5 rounded-[2rem] font-black text-xl text-white transition-all shadow-xl flex items-center justify-center gap-3 ${isProcessing || !isFormValid() ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
                        }`}
                >
                    {isProcessing ? (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>AUTHORIZING...</span>
                        </div>
                    ) : (
                        <>
                            CONFIRM PAYMENT
                            <ChevronRight size={24} />
                        </>
                    )}
                </button>
            </main>
        </div>
    );
};

export default PaymentPage;
