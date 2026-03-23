import { Link } from 'react-router';
import { 
  MessageCircle, Heart, Users, FileDown, CheckCircle, 
  Clock, TrendingUp, Rocket, HelpCircle, UserPlus, FileText,
  ExternalLink, Github, Code, Image as ImageIcon, AlertCircle
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

export type ActivityType = 'question' | 'progress' | 'teammate' | 'resource';
export type ActivityStatus = 'open' | 'solved' | 'recruiting' | 'closed' | 'active';

export interface CommunityActivity {
  id: string;
  type: ActivityType;
  title: string;
  content?: string;
  author: {
    name: string;
    initial: string;
  };
  project?: {
    id: string;
    name: string;
  };
  contest?: {
    id: string;
    name: string;
  };
  questNumber?: number;
  questTotal?: number;
  status: ActivityStatus;
  tags?: string[];
  
  // 통계
  answers?: number;
  comments?: number;
  likes?: number;
  views?: number;
  downloads?: number;
  applicants?: number;
  
  // 이미지 (진행공유)
  image?: string;
  
  // 팀원찾기 전용
  skills?: string[];
  deadline?: string;
  
  // 자료공유 전용
  resourceType?: string;
  resourceFormat?: string;
  
  // 시간
  createdAt: string;
  lastActivityAt?: string;
}

interface CommunityActivityCardProps {
  activity: CommunityActivity;
  onClick?: () => void;
}

export function CommunityActivityCard({ activity, onClick }: CommunityActivityCardProps) {
  const getTypeConfig = (type: ActivityType) => {
    switch (type) {
      case 'question':
        return {
          label: '질문',
          icon: HelpCircle,
          color: 'blue',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          hoverColor: 'hover:text-blue-600',
        };
      case 'progress':
        return {
          label: '진행공유',
          icon: Rocket,
          color: 'purple',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-700',
          hoverColor: 'hover:text-purple-600',
        };
      case 'teammate':
        return {
          label: '팀원찾기',
          icon: UserPlus,
          color: 'green',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          hoverColor: 'hover:text-green-600',
        };
      case 'resource':
        return {
          label: '자료공유',
          icon: FileText,
          color: 'orange',
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-700',
          hoverColor: 'hover:text-orange-600',
        };
    }
  };

  const getStatusBadge = () => {
    if (activity.type === 'question') {
      if (activity.status === 'solved') {
        return (
          <Badge className="bg-green-100 text-green-700 border-0">
            <CheckCircle className="w-3 h-3 mr-1" />
            해결됨
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="text-gray-600">
          해결중
        </Badge>
      );
    }

    if (activity.type === 'teammate') {
      if (activity.status === 'recruiting') {
        return (
          <Badge className="bg-orange-100 text-orange-700 border-0">
            {activity.deadline}
          </Badge>
        );
      }
      if (activity.status === 'closed') {
        return (
          <Badge variant="outline" className="text-gray-500">
            모집마감
          </Badge>
        );
      }
    }

    return null;
  };

  const typeConfig = getTypeConfig(activity.type);
  const TypeIcon = typeConfig.icon;

  // 질문 카드
  if (activity.type === 'question') {
    return (
      <Card 
        className="p-5 hover:shadow-lg transition-all cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className={`${typeConfig.bgColor} ${typeConfig.textColor} font-semibold`}>
              {activity.author.initial}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0`}>
                <TypeIcon className="w-3 h-3 mr-1" />
                {typeConfig.label}
              </Badge>
              {getStatusBadge()}
              {activity.project && (
                <Link 
                  to={`/project/${activity.project.id}`} 
                  className="text-xs text-blue-600 hover:underline truncate"
                  onClick={(e) => e.stopPropagation()}
                >
                  {activity.project.name}
                </Link>
              )}
              {activity.questNumber && (
                <Badge variant="outline" className="text-xs">
                  Quest {activity.questNumber}
                </Badge>
              )}
              <span className="text-xs text-gray-500">{activity.createdAt}</span>
            </div>
            <h3 className={`font-bold text-gray-900 mb-2 group-${typeConfig.hoverColor} transition-colors line-clamp-2`}>
              {activity.title}
            </h3>
            {activity.content && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {activity.content}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span className="font-medium">{activity.author.name}</span>
              {activity.answers !== undefined && (
                <span className="flex items-center gap-1 font-semibold text-blue-600">
                  <MessageCircle className="w-4 h-4" />
                  {activity.answers}
                </span>
              )}
              {activity.views !== undefined && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {activity.views}
                </span>
              )}
              {activity.likes !== undefined && activity.likes > 0 && (
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {activity.likes}
                </span>
              )}
            </div>
            {activity.tags && activity.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {activity.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {activity.contest && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="font-medium">콘테스트:</span>
                  <Link 
                    to={`/contest/${activity.contest.id}`}
                    className="text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {activity.contest.name}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // 진행공유 카드
  if (activity.type === 'progress') {
    return (
      <Card 
        className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
        onClick={onClick}
      >
        {activity.image && (
          <div className="relative h-40 overflow-hidden bg-gray-100">
            <img 
              src={activity.image} 
              alt={activity.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0`}>
                <TypeIcon className="w-3 h-3 mr-1" />
                {typeConfig.label}
              </Badge>
            </div>
            {activity.questNumber && activity.questTotal && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-purple-600 text-white border-0">
                  Quest {activity.questNumber}/{activity.questTotal}
                </Badge>
              </div>
            )}
          </div>
        )}
        <div className="p-4">
          {activity.project && (
            <Link 
              to={`/project/${activity.project.id}`} 
              className="text-xs text-blue-600 hover:underline block mb-2"
              onClick={(e) => e.stopPropagation()}
            >
              {activity.project.name}
            </Link>
          )}
          <h3 className={`font-bold text-gray-900 mb-2 group-${typeConfig.hoverColor} transition-colors line-clamp-2`}>
            {activity.title}
          </h3>
          {activity.content && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {activity.content}
            </p>
          )}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className={`${typeConfig.bgColor} ${typeConfig.textColor} text-xs font-semibold`}>
                  {activity.author.initial}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-700 font-medium">{activity.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              {activity.likes !== undefined && (
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {activity.likes}
                </span>
              )}
              {activity.comments !== undefined && (
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {activity.comments}
                </span>
              )}
            </div>
          </div>
          {activity.contest && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="font-medium">콘테스트:</span>
                <Link 
                  to={`/contest/${activity.contest.id}`}
                  className="text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {activity.contest.name}
                </Link>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // 팀원찾기 카드
  if (activity.type === 'teammate') {
    return (
      <Card 
        className="p-5 hover:shadow-lg transition-all cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <Avatar className="w-10 h-10">
              <AvatarFallback className={`${typeConfig.bgColor} ${typeConfig.textColor} font-semibold`}>
                {activity.author.initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0`}>
                  <TypeIcon className="w-3 h-3 mr-1" />
                  {typeConfig.label}
                </Badge>
                {getStatusBadge()}
                {activity.project && (
                  <Link 
                    to={`/project/${activity.project.id}`} 
                    className="text-xs text-blue-600 hover:underline truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {activity.project.name}
                  </Link>
                )}
              </div>
              <h3 className={`font-bold text-gray-900 mb-3 group-${typeConfig.hoverColor} transition-colors line-clamp-2`}>
                {activity.title}
              </h3>
              {activity.content && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {activity.content}
                </p>
              )}
              {activity.skills && activity.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {activity.skills.map((skill) => (
                    <Badge key={skill} className="bg-green-50 text-green-700 border-green-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{activity.author.name}</span>
                {activity.applicants !== undefined && (
                  <span className="flex items-center gap-1 font-semibold text-green-600">
                    <Users className="w-4 h-4" />
                    {activity.applicants}명 지원
                  </span>
                )}
                <span className="text-gray-500">{activity.createdAt}</span>
              </div>
              {activity.contest && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-medium">콘테스트:</span>
                    <Link 
                      to={`/contest/${activity.contest.id}`}
                      className="text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {activity.contest.name}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              // 지원하기 로직
            }}
          >
            지원하기
          </Button>
        </div>
      </Card>
    );
  }

  // 자료공유 카드
  if (activity.type === 'resource') {
    const getResourceIcon = () => {
      if (activity.resourceFormat === 'GitHub') return Github;
      if (activity.resourceFormat === 'Notion') return FileText;
      return Code;
    };
    
    const ResourceIcon = getResourceIcon();

    return (
      <Card 
        className="p-5 hover:shadow-lg transition-all cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={`w-12 h-12 rounded-lg ${typeConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
              <ResourceIcon className={`w-6 h-6 ${typeConfig.textColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0 text-xs`}>
                  {typeConfig.label}
                </Badge>
                {activity.resourceType && (
                  <Badge variant="outline" className="text-xs">{activity.resourceType}</Badge>
                )}
                {activity.project && (
                  <Link 
                    to={`/project/${activity.project.id}`} 
                    className="text-xs text-blue-600 hover:underline truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {activity.project.name}
                  </Link>
                )}
              </div>
              <h3 className={`font-bold text-gray-900 mb-2 group-${typeConfig.hoverColor} transition-colors line-clamp-1`}>
                {activity.title}
              </h3>
              {activity.content && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {activity.content}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{activity.author.name}</span>
                {activity.downloads !== undefined && (
                  <span className="flex items-center gap-1 font-semibold text-orange-600">
                    <FileDown className="w-4 h-4" />
                    {activity.downloads}
                  </span>
                )}
                {activity.likes !== undefined && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {activity.likes}
                  </span>
                )}
                <span className="text-gray-500">{activity.createdAt}</span>
              </div>
              {activity.contest && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-medium">콘테스트:</span>
                    <Link 
                      to={`/contest/${activity.contest.id}`}
                      className="text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {activity.contest.name}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              // 다운로드 로직
            }}
          >
            <FileDown className="w-4 h-4 mr-1" />
            다운로드
          </Button>
        </div>
      </Card>
    );
  }

  return null;
}
