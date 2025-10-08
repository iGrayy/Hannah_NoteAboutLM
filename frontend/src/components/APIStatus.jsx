import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const APIStatus = () => {
    const [status, setStatus] = useState('checking');
    const [message, setMessage] = useState('Đang kiểm tra kết nối API...');

    useEffect(() => {
        const checkAPI = async () => {
            try {
                const response = await fetch('/api/health');
                if (response.ok) {
                    const data = await response.json();
                    setStatus('connected');
                    setMessage(`API sẵn sàng (${data.model})`);
                } else {
                    setStatus('error');
                    setMessage('API không phản hồi');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Không thể kết nối đến API');
            }
        };

        checkAPI();
        const interval = setInterval(checkAPI, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const getIcon = () => {
        switch (status) {
            case 'checking':
                return <Loader className="w-4 h-4 animate-spin text-yellow-400" />;
            case 'connected':
                return <CheckCircle className="w-4 h-4 text-green-400" />;
            case 'error':
                return <XCircle className="w-4 h-4 text-red-400" />;
            default:
                return <Loader className="w-4 h-4 animate-spin text-yellow-400" />;
        }
    };

    const getColor = () => {
        switch (status) {
            case 'connected':
                return 'text-green-400';
            case 'error':
                return 'text-red-400';
            default:
                return 'text-yellow-400';
        }
    };

    return (
        <div className="flex items-center gap-2 text-xs">
            {getIcon()}
            <span className={getColor()}>{message}</span>
        </div>
    );
};

export default APIStatus;
