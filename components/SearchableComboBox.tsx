import React, { useState, useRef, useEffect, memo } from 'react';
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

const SearchableComboBox: React.FC<SearchableComboBoxProps> = memo(({
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

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

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
        <div className={`relative space-y-2 ${isOpen ? 'z-50' : 'z-auto'}`} ref={containerRef}>
            {label && (
                <label className="text-sm font-bold text-gray-400 uppercase tracking-tight block">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-brand-black border ${isOpen ? 'border-brand-lime' : 'border-white/10'} rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all group active:scale-[0.99]`}
            >
                <div className="grow flex items-center overflow-hidden">
                    {value ? (
                        <span className="text-white truncate font-medium">{value}</span>
                    ) : (
                        <span className="text-gray-500 truncate font-sans">{placeholder}</span>
                    )}
                </div>

                <div className="flex items-center gap-2 ml-2 shrink-0">
                    {value && (
                        <X
                            size={16}
                            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                            onClick={clearSelection}
                        />
                    )}
                    <ChevronDown
                        size={18}
                        className={`text-gray-500 group-hover:text-brand-lime transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {isOpen && (
                <div
                    className="absolute z-50 w-full mt-2 bg-brand-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-72 flex flex-col animate-fade-in-up"
                    style={{ animationDuration: '200ms' }}
                >
                    <div className="p-3 border-b border-white/5 sticky top-0 bg-brand-black z-10">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                autoFocus
                                type="text"
                                className="w-full bg-brand-black border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-lime transition-colors text-white font-sans"
                                placeholder="Search location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto grow custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    className="px-4 py-3 hover:bg-brand-lime/10 cursor-pointer flex items-center justify-between group transition-colors"
                                >
                                    <span className={`text-sm ${value === option ? 'text-brand-lime font-bold' : 'text-gray-300 group-hover:text-white font-sans'}`}>
                                        {option}
                                    </span>
                                    {value === option && (
                                        <Check size={16} className="text-brand-lime" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center text-gray-500 font-sans">
                                <p className="text-sm">No results found</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {error && <p className="text-xs text-red-500 mt-1 font-sans">{error}</p>}
        </div>
    );
});

export default SearchableComboBox;
