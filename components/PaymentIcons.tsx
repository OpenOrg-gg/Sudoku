
import React from 'react';

export const VisaIcon: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8 7.2l-1.4 8.4h2.3l1.4-8.4h-2.3zM22.5 7.2l-2.1 6.3-.2-.9c-.4-1.3-1.4-3.1-2.7-4l2.1 7h2.4l3.5-8.4h-3zM9.4 7.2c-1.3 0-2.4.7-2.9 1.8l-4.2 10.6h2.4l.5-1.3h2.9l.3 1.3h2.1L9.4 7.2zm-1.8 9.3l1.2-3.1 1.2 3.1H7.6zM3.8 7.2l-2.3 8.4h2.4l1.4-8.4H3.8z" fill="#1A1F71" />
    </svg>
);

export const MastercardIcon: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="12" r="7" fill="#EB001B" fillOpacity="0.8" />
        <circle cx="15" cy="12" r="7" fill="#FF5F00" fillOpacity="0.8" />
        <path d="M12 12a6.95 6.95 0 0 1 2.5-5.38 6.95 6.95 0 0 0-5 0A6.95 6.95 0 0 0 7 12a6.95 6.95 0 0 0 2.5 5.38 6.95 6.95 0 0 1 5 0A6.95 6.95 0 0 1 12 12z" fill="#F79E1B" />
    </svg>
);

export const MBWayIcon: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#EC008C" />
        <path d="M5 16V8h2.5l2 4 2-4H14v8h-2v-5l-2 4-2-4v5H5zm10.5 0V8H18c1.5 0 2.5 1 2.5 2.5v3c0 1.5-1 2.5-2.5 2.5h-2.5zm2-2h.5c.5 0 .5-.5.5-.5V11s0-.5-.5-.5h-.5v3z" fill="white" />
    </svg>
);

export const PayPalIcon: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7.5a4 4 0 0 0-4-4H8a1 1 0 0 0-1 1l-2 15a1 1 0 0 0 1 1.2h4l.5-4h3c4 0 7-2 7.5-6.2a3 3 0 0 0 0-3z" fill="#003087" />
        <path d="M17.5 9.5c-.3 2.5-1.5 4-4.5 4H10l-.5 4h-3L8.5 4h5.5c2 0 3.5.5 3.5 2.5 0 1-.3 2-1 3z" fill="#009CDE" />
    </svg>
);

export const MultibancoIcon: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#005A9C" />
        <path d="M6 8h12v1.5H6V8zm0 3h12v1.5H6V11zm0 3h12v1.5H6V14z" fill="white" />
        <path d="M8 7v10M16 7v10" stroke="white" strokeWidth="1.5" />
    </svg>
);
