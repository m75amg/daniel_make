import { ReactNode } from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
  hoverIconBg: string;
  hoverChevron: string;
  count: number;
  label: string;
  badge?: number;
  subLeft: ReactNode;
  onClick: () => void;
}

export function SummaryCard({
  icon: Icon,
  iconBg,
  iconColor,
  hoverBorder,
  hoverIconBg,
  hoverChevron,
  count,
  label,
  badge,
  subLeft,
  onClick,
}: SummaryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative bg-white border border-gray-200 rounded-2xl p-5 text-left ${hoverBorder} hover:shadow-lg transition-all duration-200 w-full`}
    >
      {/* 알림 뱃지 */}
      {badge != null && badge > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm leading-none">
          {badge}
        </span>
      )}

      {/* 아이콘 + 숫자 */}
      <div className="flex items-start gap-3.5">
        <div className={`w-11 h-11 rounded-xl ${iconBg} ${hoverIconBg} flex items-center justify-center flex-shrink-0 transition-colors`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[28px] font-bold text-gray-900 leading-none">{count}</span>
            <span className="text-sm text-gray-400 ml-0.5">개</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{label}</p>
        </div>
      </div>

      {/* 구분선 + 보조 정보 */}
      <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <p className="text-xs text-gray-500 truncate flex-1 leading-relaxed">
          {subLeft}
        </p>
        <ChevronRight className={`w-3.5 h-3.5 text-gray-300 ${hoverChevron} flex-shrink-0 transition-colors`} />
      </div>
    </button>
  );
}
