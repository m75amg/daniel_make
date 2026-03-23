import { useState } from 'react';
import { Link } from 'react-router';
import { 
  ChevronRight, MessageCircle, Heart, Eye, CheckCircle, 
  Clock, Rocket, FileText, Github, ExternalLink,
  Share2, Bookmark, ThumbsUp, Image as ImageIcon, 
  Link2, Send, Calendar, Mail, Lightbulb, Target,
  ListChecks, Zap, Play, Code, AlertCircle, TrendingUp
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

interface ProgressDetailViewProps {
  activity: any;
  progressComments: any[];
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
  isBookmarked: boolean;
  setIsBookmarked: (value: boolean) => void;
  newComment: string;
  setNewComment: (value: string) => void;
  handleSubmitComment: () => void;
}

export function ProgressDetailView({
  activity,
  progressComments,
  isLiked,
  setIsLiked,
  isBookmarked,
  setIsBookmarked,
  newComment,
  setNewComment,
  handleSubmitComment,
}: ProgressDetailViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/community" className="hover:text-blue-600 transition-colors">커뮤니티</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">진행공유</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="p-6">
              {/* Type & Status Badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge className="bg-purple-100 text-purple-700 border-0">
                  <Rocket className="w-3 h-3 mr-1" />
                  진행공유
                </Badge>
                {activity.status === 'completed' ? (
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    완료
                  </Badge>
                ) : (
                  <Badge className="bg-blue-100 text-blue-700 border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    진행중
                  </Badge>
                )}
                {activity.questNumber && (
                  <Badge variant="outline">
                    Quest {activity.questNumber}/{activity.questTotal}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {activity.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 flex-wrap">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold text-sm">
                      {activity.author.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{activity.author.name}</div>
                    <div className="text-xs text-gray-500">
                      프로젝트 {activity.author.projects} · 기여 {activity.author.contributions}
                    </div>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>1일 전 작성</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{activity.stats.views} 조회</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current text-red-600" : "text-purple-600"}`} />
                  <span className="font-semibold text-purple-600">{activity.stats.likes + (isLiked ? 1 : 0)} 좋아요</span>
                </div>
              </div>

              {/* Connected Project & Quest */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6 border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-900">진행 중인 프로젝트</span>
                </div>
                <Link 
                  to={`/project/${activity.project.id}`}
                  className="font-bold text-purple-600 hover:underline block mb-1"
                >
                  {activity.project.name}
                </Link>
                {activity.questTitle && (
                  <div className="text-sm text-gray-700 mb-2">
                    {activity.questTitle}
                  </div>
                )}
                {activity.contest && (
                  <Badge variant="outline" className="text-xs">
                    {activity.contest.name}
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-200 flex-wrap">
                <Button 
                  variant={isLiked ? "default" : "outline"}
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  좋아요 {activity.stats.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                  {isBookmarked ? "저장됨" : "저장하기"}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  공유하기
                </Button>
              </div>
            </Card>

            {/* What I Did Section */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">이번 단계에서 한 일</h2>
                  <p className="text-sm text-gray-600">What I did</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-blue-50 p-4 rounded-lg border border-blue-100">
                  {activity.whatIDid}
                </div>
              </div>
            </Card>

            {/* Completed Items */}
            {activity.completed && activity.completed.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">현재까지 완료한 내용</h2>
                    <p className="text-sm text-gray-600">Completed tasks</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {activity.completed.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Challenges Section */}
            {activity.challenges && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">막힌 점 또는 고민</h2>
                    <p className="text-sm text-gray-600">Challenges & thoughts</p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-orange-50 p-4 rounded-lg border border-orange-100">
                    {activity.challenges}
                  </div>
                </div>
              </Card>
            )}

            {/* Next Steps */}
            {activity.nextSteps && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">다음에 할 일</h2>
                    <p className="text-sm text-gray-600">Next steps</p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-purple-50 p-4 rounded-lg border border-purple-100">
                    {activity.nextSteps}
                  </div>
                </div>
              </Card>
            )}

            {/* Progress Images */}
            {activity.images && activity.images.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-gray-700" />
                  진행 사진
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.images.map((image: string, index: number) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                      <img 
                        src={image} 
                        alt={`진행 사진 ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Links & Resources */}
            {activity.links && activity.links.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-gray-700" />
                  참고 링크
                </h3>
                <div className="space-y-3">
                  {activity.links.map((link: any, index: number) => (
                    <div 
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        {link.type === 'github' ? (
                          <Github className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                        ) : (
                          <ExternalLink className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">{link.title}</div>
                          <div className="text-sm text-gray-600 mb-2">{link.description}</div>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            바로가기
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Comments Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  댓글 및 응원 <span className="text-purple-600">{progressComments.length}</span>
                </h2>
              </div>

              {/* Comment List */}
              <div className="space-y-4 mb-8">
                {progressComments.map((comment: any) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                          {comment.author.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{comment.author.name}</span>
                          <span className="text-sm text-gray-500">{comment.createdAt}</span>
                        </div>
                        <p className="text-gray-800 mb-3 leading-relaxed">{comment.content}</p>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            답글
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  댓글 남기기
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  응원의 한마디나 유용한 팁을 남겨주세요!
                </p>
                <Textarea
                  placeholder="예시:
- 수고하셨어요! 다음 단계도 화이팅!
- 비슷한 문제를 겪었는데 이렇게 해결했어요...
- 참고하면 좋을 자료 공유드립니다"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[150px] mb-4"
                />
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      이미지
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link2 className="w-4 h-4 mr-2" />
                      링크
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    댓글 등록
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Reactions */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <h3 className="font-bold text-gray-900 mb-4">빠른 반응</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">{activity.stats.likes}개 좋아요</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">{activity.stats.comments}개 댓글</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">{activity.stats.views} 조회</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 mb-2"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "좋아요 취소" : "좋아요"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                  {isBookmarked ? "저장됨" : "저장하기"}
                </Button>
              </Card>

              {/* Project Card */}
              <Card className="overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative">
                  <img 
                    src={activity.project.image} 
                    alt={activity.project.name}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-2">
                      {activity.project.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">연결된 프로젝트</h3>
                  <Link 
                    to={`/project/${activity.project.id}`}
                    className="text-purple-600 hover:underline font-semibold block mb-2"
                  >
                    {activity.project.name}
                  </Link>
                  <div className="text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Rocket className="w-4 h-4 text-purple-600" />
                      <span>{activity.project.status}</span>
                    </div>
                  </div>
                  {activity.contest && (
                    <div className="mb-3 pb-3 border-b border-gray-100">
                      <div className="text-xs text-gray-600 mb-1">참여 콘테스트</div>
                      <Link 
                        to={`/contest/${activity.contest.id}`}
                        className="text-sm text-blue-600 hover:underline font-medium"
                      >
                        {activity.contest.name}
                      </Link>
                    </div>
                  )}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                    프로젝트 보기
                  </Button>
                </div>
              </Card>

              {/* Progress Stats */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">진행 상황</h3>
                <div className="space-y-3">
                  {activity.questNumber && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Quest 진행도</span>
                      <span className="font-semibold text-purple-600">
                        {activity.questNumber}/{activity.questTotal}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">상태</span>
                    {activity.status === 'completed' ? (
                      <Badge className="bg-green-100 text-green-700 border-0">완료</Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-700 border-0">진행중</Badge>
                    )}
                  </div>
                  {activity.completed && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">완료 항목</span>
                      <span className="font-semibold text-green-600">
                        {activity.completed.length}개
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Stats */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">통계</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      조회수
                    </span>
                    <span className="font-semibold text-gray-900">{activity.stats.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      좋아요
                    </span>
                    <span className="font-semibold text-purple-600">{activity.stats.likes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      댓글
                    </span>
                    <span className="font-semibold text-gray-900">{activity.stats.comments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Bookmark className="w-4 h-4" />
                      저장
                    </span>
                    <span className="font-semibold text-gray-900">{activity.stats.bookmarks}</span>
                  </div>
                </div>
              </Card>

              {/* Author Info */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">작성자 정보</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold text-lg">
                      {activity.author.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-gray-900">{activity.author.name}</div>
                    <div className="text-sm text-gray-600">
                      프로젝트 {activity.author.projects}개
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  메시지 보내기
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
