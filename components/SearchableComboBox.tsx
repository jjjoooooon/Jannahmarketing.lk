import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check, X } from 'lucide-react';

interface SearchableComboBoxProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    required?: boolean;
}

const SearchableComboBox: React.FC<SearchableComboBoxProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    error,
    required = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    const clearSelection = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
        setSearchTerm('');
    };

    return (
        <div className={`relative space-y-2 ${isOpen ? 'z-[100]' : 'z-auto'}`} ref={containerRef}>
            {label && (
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider block">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-[#050505] border ${isOpen ? 'border-[#CCFF00]' : 'border-white/10'} rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-colors group`}
            >
                <div className="flex-grow flex items-center overflow-hidden">
                    {value ? (
                        <span className="text-white truncate">{value}</span>
                    ) : (
                        <span className="text-gray-500 truncate">{placeholder}</span>
                    )}
                </div>

                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    {value && (
                        <X
                            size={16}
                            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                            onClick={clearSelection}
                        />
                    )}
                    <ChevronDown
                        size={18}
                        className={`text-gray-500 group-hover:text-[#CCFF00] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-72 flex flex-col"
                    >
                        <div className="p-3 border-b border-white/5 sticky top-0 bg-[#111] z-10">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#CCFF00] transition-colors"
                                    placeholder="Search location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-grow custom-scrollbar">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className="px-4 py-3 hover:bg-[#CCFF00]/10 cursor-pointer flex items-center justify-between group transition-colors"
                                    >
                                        <span className={`text-sm ${value === option ? 'text-[#CCFF00] font-bold' : 'text-gray-300 group-hover:text-white'}`}>
                                            {option}
                                        </span>
                                        {value === option && (
                                            <Check size={16} className="text-[#CCFF00]" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    <p className="text-sm">No results found</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default SearchableComboBox;
