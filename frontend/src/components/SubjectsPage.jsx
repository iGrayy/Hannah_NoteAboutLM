import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Folder, Link, Download } from 'lucide-react';

const SubjectsPage = ({ onBack, onNavigateToMain }) => {
    // Sample data for subjects
    const subjectsData = [
        {
            id: 'summary',
            title: 'Tổng hợp - Chưa rõ kỳ',
            icon: '?',
            iconColor: 'bg-blue-500',
            topics: 106,
            posts: 160,
            latestActivity: {
                title: 'Đề Thi FE PRN222 - SU25 - Block5 - 1',
                date: '30/8/25',
                author: 'Misa'
            },
            items: [
                { type: 'link', name: 'Quy Định' },
                { type: 'link', name: 'Hướng Dẫn Đăng Tài Liệu' },
                { type: 'folder', name: 'DRS301' },
                { type: 'folder', name: 'DWB301' },
                { type: 'folder', name: 'ENM402' },
                { type: 'folder', name: 'ENW493c' },
                { type: 'folder', name: 'EPE301' },
                { type: 'folder', name: 'EPT24' },
                { type: 'folder', name: 'FRS401' },
                { type: 'folder', name: 'IAR401' },
                { type: 'folder', name: 'ITB302c' },
                { type: 'folder', name: 'PLT' },
                { type: 'folder', name: 'PRE301' },
                { type: 'folder', name: 'PRN222' },
                { type: 'folder', name: 'PRX301' },
                { type: 'folder', name: 'SDN302' }
            ]
        },
        {
            id: 'term0',
            title: 'Kỳ 0',
            icon: '0',
            iconColor: 'bg-yellow-500',
            topics: 388,
            posts: 430,
            latestActivity: {
                title: 'Đề Thi FE ENT203 - SU25 - H2 - W -...',
                date: '3/9/25',
                author: 'Misa'
            },
            items: [
                { type: 'folder', name: 'COV111' },
                { type: 'folder', name: 'COV121' },
                { type: 'folder', name: 'COV131' },
                { type: 'folder', name: 'ENT103' },
                { type: 'folder', name: 'ENT104' },
                { type: 'folder', name: 'ENT203' },
                { type: 'folder', name: 'ENT303' },
                { type: 'folder', name: 'ENT304' },
                { type: 'folder', name: 'ENT403' },
                { type: 'folder', name: 'ENT404' },
                { type: 'folder', name: 'ENT503' },
                { type: 'folder', name: 'EPT202' },
                { type: 'folder', name: 'TRANS 4' },
                { type: 'folder', name: 'TRANS 5' },
                { type: 'folder', name: 'TRANS 6' }
            ]
        },
        {
            id: 'term1',
            title: 'Kỳ 1',
            icon: '1',
            iconColor: 'bg-blue-500',
            topics: 389,
            posts: 712,
            latestActivity: {
                title: 'Đề Thi FE MAE101 - SU25 - B5 - RE',
                date: '3/9/25',
                author: 'Misa'
            },
            items: [
                { type: 'folder', name: 'ASI101' },
                { type: 'folder', name: 'CEA201' },
                { type: 'folder', name: 'CSI104' },
                { type: 'folder', name: 'CSI105' },
                { type: 'folder', name: 'CSI106' },
                { type: 'folder', name: 'DRS102' },
                { type: 'folder', name: 'DTG111' },
                { type: 'folder', name: 'EAW211' },
                { type: 'folder', name: 'ECN101' },
                { type: 'folder', name: 'ECO102' },
                { type: 'folder', name: 'ECO111' },
                { type: 'folder', name: 'ECR201' },
                { type: 'folder', name: 'ECR202' },
                { type: 'folder', name: 'ENG302c' },
                { type: 'folder', name: 'ENH301' },
                { type: 'folder', name: 'ENM112c' },
                { type: 'folder', name: 'ENM301' },
                { type: 'folder', name: 'ENM302' },
                { type: 'folder', name: 'ENP102' },
                { type: 'folder', name: 'FMM101' },
                { type: 'folder', name: 'HMO102' },
                { type: 'folder', name: 'JPD116' },
                { type: 'folder', name: 'JPD126' },
                { type: 'folder', name: 'KRL112' },
                { type: 'folder', name: 'LAE101' },
                { type: 'folder', name: 'MAC102' },
                { type: 'folder', name: 'MAE101' },
                { type: 'folder', name: 'MED201' },
                { type: 'folder', name: 'MGT103' },
                { type: 'folder', name: 'MKT101' },
                { type: 'folder', name: 'PFP191' },
                { type: 'folder', name: 'PRF192' },
                { type: 'folder', name: 'SDI101m' },
                { type: 'folder', name: 'SSC102' },
                { type: 'folder', name: 'SSL101c' }
            ]
        },
        {
            id: 'term2',
            title: 'Kỳ 2',
            icon: '2',
            iconColor: 'bg-red-500',
            topics: 453,
            posts: 737,
            latestActivity: {
                title: 'Đề Thi FE MAD101 - SU25 - B5 - RE',
                date: '4/9/25',
                author: 'Misa'
            },
            items: [
                { type: 'folder', name: 'ACC101' },
                { type: 'folder', name: 'AET101' },
                { type: 'folder', name: 'AET102' },
                { type: 'folder', name: 'AIG201c' },
                { type: 'folder', name: 'AIG202c' },
                { type: 'folder', name: 'CMC201' },
                { type: 'folder', name: 'CPP201b' },
                { type: 'folder', name: 'CSD203' },
                { type: 'folder', name: 'DRP101' },
                { type: 'folder', name: 'DTG201' },
                { type: 'folder', name: 'EAL201' },
                { type: 'folder', name: 'EAW221' },
                { type: 'folder', name: 'ECB101' },
                { type: 'folder', name: 'ECN211' },
                { type: 'folder', name: 'ECO121' },
                { type: 'folder', name: 'ELC201' },
                { type: 'folder', name: 'ENH401' },
                { type: 'folder', name: 'ENM211c' },
                { type: 'folder', name: 'ENM401' },
                { type: 'folder', name: 'EVN202' },
                { type: 'folder', name: 'FOM200' },
                { type: 'folder', name: 'HOM202' },
                { type: 'folder', name: 'HOM301c' },
                { type: 'folder', name: 'IAO201c' },
                { type: 'folder', name: 'IAO202' },
                { type: 'folder', name: 'JPD216' },
                { type: 'folder', name: 'JPD226' },
                { type: 'folder', name: 'KRL122' },
                { type: 'folder', name: 'LAB221c' },
                { type: 'folder', name: 'LTG202' },
                { type: 'folder', name: 'MAD101' },
                { type: 'folder', name: 'MMK101' },
                { type: 'folder', name: 'MMP201' },
                { type: 'folder', name: 'NWC203c' },
                { type: 'folder', name: 'NWC204' },
                { type: 'folder', name: 'OBE102c' },
                { type: 'folder', name: 'OSG202' },
                { type: 'folder', name: 'PRN212' },
                { type: 'folder', name: 'PRO191' }
            ]
        }
    ];

    return (
        <div className="h-full flex flex-col bg-gray-900">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-semibold text-white">TÀI LIỆU CÁC MÔN HỌC</h2>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                        <Download className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-sm text-gray-400">Danh sách tất cả các môn học tại FPT</p>
            </div>

            {/* Subjects List */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-6xl mx-auto space-y-6">
                    {subjectsData.map((subject, index) => (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => onNavigateToMain()}
                        >
                            {/* Subject Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-10 h-10 ${subject.iconColor} rounded-lg flex items-center justify-center`}>
                                    <span className="text-white font-bold text-lg">{subject.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold text-lg">{subject.title}</h3>
                                </div>
                                <div className="text-right">
                                    <div className="text-green-400 text-sm font-medium">
                                        CHỦ ĐỀ: {subject.topics}
                                    </div>
                                    <div className="text-green-400 text-sm font-medium">
                                        BÀI VIẾT: {subject.posts}
                                    </div>
                                </div>
                            </div>

                            {/* Items Grid */}
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-4">
                                {subject.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={itemIndex}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (index * 0.1) + (itemIndex * 0.02) }}
                                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                                    >
                                        {item.type === 'link' ? (
                                            <Link className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                                        ) : (
                                            <Folder className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                                        )}
                                        <span className="text-xs text-gray-300 group-hover:text-white text-center leading-tight">
                                            {item.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Latest Activity */}
                            <div className="flex items-center gap-3 pt-3 border-t border-gray-700">
                                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                                    <span className="text-xs text-white font-medium">M</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            Đề Thi FE
                                        </span>
                                        <span className="text-sm text-gray-300">{subject.latestActivity.title}</span>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {subject.latestActivity.date} · {subject.latestActivity.author}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubjectsPage;
