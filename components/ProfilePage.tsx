
import React, { useState } from 'react';
import { User, Camera, Save, ArrowLeft, Check, Upload } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfilePageProps {
    userProfile: UserProfile;
    onSave: (updatedProfile: UserProfile) => void;
    onBack: () => void;
}

const AVATAR_PRESETS = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
    '🦁', 'mw🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦅',
    '👨‍🚀', '🦸‍♂️', '🦹‍♀️', '🧙‍♂️', '🧝‍♀️', '🧛‍♂️', '🧟‍♀️', '🧞‍♂️', '🧜‍♀️', '🧚‍♂️',
    '⚽', '🏀', '🏈', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🥊'
];

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile, onSave, onBack }) => {
    const [name, setName] = useState(userProfile.name);
    const [avatar, setAvatar] = useState(userProfile.avatar || '👤');
    const [isUploadMode, setIsUploadMode] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave({ ...userProfile, name, avatar });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
                <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors">
                        <ArrowLeft size={20} /> Back
                    </button>
                    <span className="font-black text-xl tracking-tight text-slate-800 uppercase">Edit Profile</span>
                    <div className="w-16"></div> {/* Spacer for centering */}
                </div>
            </nav>

            <main className="flex-1 max-w-2xl mx-auto w-full p-6">
                <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-indigo-50">

                    {/* Avatar Section */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="relative group cursor-pointer mb-6">
                            <div className="w-32 h-32 rounded-full bg-indigo-50 border-4 border-white shadow-2xl flex items-center justify-center text-6xl overflow-hidden relative">
                                {avatar.startsWith('http') ? (
                                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{avatar}</span>
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg border-4 border-white">
                                <Camera size={20} />
                            </div>
                        </div>

                        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                            <button
                                onClick={() => setIsUploadMode(false)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!isUploadMode ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Emoji Presets
                            </button>
                            <button
                                onClick={() => setIsUploadMode(true)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isUploadMode ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Upload Photo
                            </button>
                        </div>

                        <div className="w-full">
                            {!isUploadMode ? (
                                <div className="grid grid-cols-5 sm:grid-cols-8 gap-4 p-4 bg-slate-50 rounded-2xl max-h-60 overflow-y-auto border border-slate-100">
                                    {AVATAR_PRESETS.map((emoji) => (
                                        <button
                                            key={emoji}
                                            onClick={() => setAvatar(emoji)}
                                            className={`aspect-square flex items-center justify-center text-2xl rounded-xl transition-all hover:scale-110 active:scale-95 ${avatar === emoji ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-white border border-slate-200 hover:border-indigo-200'}`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4 p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors group">
                                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Upload size={24} />
                                    </div>
                                    <h3 className="font-black text-slate-700">Choose from Device</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">JPG, PNG, GIF up to 5MB</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-indigo-50 file:text-indigo-700
                                            hover:file:bg-indigo-100
                                            cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name Section */}
                    <div className="space-y-4 mb-10">
                        <label className="block text-sm font-black text-slate-400 uppercase tracking-widest pl-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={20}
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-lg text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                placeholder="Enter your name"
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                    >
                        <Save size={24} className="group-hover:animate-bounce" /> Save Profile
                    </button>

                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
