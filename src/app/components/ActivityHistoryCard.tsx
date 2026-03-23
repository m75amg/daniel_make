import { Link } from 'react-router';
import { Heart, Bookmark, Trophy, HelpCircle, Rocket, UserPlus, FolderOpen, X } from 'lucide-react';
import { ActivityItem, ActivityItemType } from '../context/ActivityContext';

interface ActivityHistoryCardProps {
  item: ActivityItem;
  mode: 'liked' | 'saved';
  isActive: boolean;
  onToggle: () => void;
}

const typeConfig: Record<ActivityItemType, {
  label: string;
  icon: typeof HelpCircle;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  linkPrefix: string;
}> = {
  project: {
    label: '프로젝트',
    icon: Rocket,
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    borderColor: 'border-blue-200',
    linkPrefix: '/project',
  },
  question: {
    label: '질문',
    icon: HelpCircle,
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    borderColor: 'border-purple-200',
    linkPrefix: '/community',
  },
  progress: {
    label: '진행공유',
    icon: Rocket,
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    linkPrefix: '/community',
  },
  teammate: {
    label: '팀원찾기',
    icon: UserPlus,
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    borderColor: 'border-green-200',
    linkPrefix: '/community',
  },
  resource: {
    label: '자료공유',
    icon: FolderOpen,
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
    borderColor: 'border-orange-200',
    linkPrefix: '/community',
  },
};

export function ActivityHistoryCard({ item, mode, isActive, onToggle }: ActivityHistoryCardProps) {
  const config = typeConfig[item.type];
  const TypeIcon = config.icon;
  const timeLabel = mode === 'liked' ? item.likedAt : item.savedAt;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
      {/* 타입 뱃지 + 토글 버튼 */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.badgeBg} ${config.badgeText}`}>
          <TypeIcon className="w-3 h-3" />
          {config.label}
        </span>
        <button
          onClick={onToggle}
          title={mode === 'liked' ? '좋아요 취소' : '저장 취소'}
          className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center"
        >
          <X className="w-3.5 h-3.5 text-gray-500 hover:text-red-500" />
        </button>
      </div>

      {/* 제목 */}
      <Link
        to={`${config.linkPrefix}/${item.id}`}
        className="block mb-2 group/link"
      >
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover/link:text-blue-600 transition-colors leading-relaxed">
          {item.title}
        </h4>
      </Link>

      {/* 프로젝트 / 콘테스트 연결 */}
      {(item.projectName || item.contestName) && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.projectName && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100">
              {item.projectName}
            </span>
          )}
          {item.contestName && (
            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full border border-purple-100 flex items-center gap-1">
              <Trophy className="w-2.5 h-2.5" />
              {item.contestName}
            </span>
          )}
        </div>
      )}

      {/* 썸네일 (프로젝트만) */}
      {item.thumbnail && item.type === 'project' && (
        <div className="mb-3 rounded-lg overflow-hidden aspect-video bg-gray-100">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 하단: 작성자 + 날짜 + 아이콘 */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
            {item.authorInitial}
          </div>
          <span className="text-xs text-gray-500">{item.authorName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-400">{timeLabel}</span>
          {mode === 'liked' ? (
            <Heart className={`w-3.5 h-3.5 ${isActive ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} />
          ) : (
            <Bookmark className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-500 fill-yellow-400' : 'text-gray-300'}`} />
          )}
        </div>
      </div>
    </div>
  );
}
