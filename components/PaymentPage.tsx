
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
    ChevronRight
} from 'lucide-react';

interface PaymentPageProps {
    pack: CreditPack;
    onComplete: (paymentMethod: string) => void;
    onBack: () => void;
}

const PAYMENT_METHODS = [
    { id: 'card', name: 'Credit Card', icon: <CreditCard className="text-indigo-600" />, desc: 'Visa, Mastercard, Amex' },
    { id: 'mbway', name: 'MB Way', icon: <Smartphone className="text-pink-600" />, desc: 'Fast mobile payment' },
    { id: 'paypal', name: 'PayPal', icon: <Wallet className="text-blue-600" />, desc: 'Instant & Secure' },
    { id: 'multibanco', name: 'Multibanco', icon: <Building2 className="text-slate-600" />, desc: 'Reference payment' },
];

const PaymentPage: React.FC<PaymentPageProps> = ({ pack, onComplete, onBack }) => {
    const [selectedMethod, setSelectedMethod] = useState<string>('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        // Mock processing delay
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
                    <h1 className="font-black uppercase tracking-tight text-lg">Payment Checkout</h1>
                </div>
            </header>

            <main className="max-w-xl mx-auto mt-8 px-4 space-y-8">
                {/* Order Summary */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Order Summary</h2>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-black text-xl text-slate-800">{pack.pack}</div>
                            <div className="text-slate-500 font-bold">{pack.qty} Credits</div>
                        </div>
                        <div className="text-2xl font-black text-indigo-600">{pack.amount}</div>
                    </div>
                    <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-emerald-600">
                        <CheckCircle size={16} />
                        <span className="text-xs font-bold uppercase tracking-wide">{pack.bonus} Included</span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Select Payment Method</h2>
                    <div className="grid gap-3">
                        {PAYMENT_METHODS.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setSelectedMethod(method.id)}
                                className={`flex items-center justify-between p-5 rounded-3xl border transition-all duration-200 ${selectedMethod === method.id
                                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600'
                                        : 'border-slate-100 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl bg-white shadow-sm border border-slate-50`}>
                                        {method.icon}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-black text-slate-800">{method.name}</div>
                                        <div className="text-xs text-slate-500 font-medium">{method.desc}</div>
                                    </div>
                                </div>
                                {selectedMethod === method.id && <CheckCircle className="text-indigo-600" size={24} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Security Info */}
                <div className="flex items-center justify-center gap-8 py-4 opacity-50">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                        <ShieldCheck size={16} /> 100% Safe
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                        <Lock size={16} /> SSL Encrypted
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={handlePay}
                    disabled={isProcessing}
                    className={`w-full py-5 rounded-3xl font-black text-xl text-white transition-all shadow-xl flex items-center justify-center gap-3 ${isProcessing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
                        }`}
                >
                    {isProcessing ? (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>PROCESSING...</span>
                        </div>
                    ) : (
                        <>
                            PAY {pack.amount}
                            <ChevronRight size={24} />
                        </>
                    )}
                </button>
            </main>
        </div>
    );
};

export default PaymentPage;
