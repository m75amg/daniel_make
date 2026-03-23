import { useState } from 'react';
import { Link } from 'react-router';
import { 
  ChevronRight, MessageCircle, Heart, Eye, CheckCircle, 
  Clock, Rocket, FileText, Github, ExternalLink,
  Share2, Bookmark, ThumbsUp, Image as ImageIcon, 
  Link2, Send, Calendar, Mail, Lightbulb, Target,
  Download, Star, Youtube, FileCode, FileImage,
  AlertTriangle, Sparkles, TrendingUp, Award, ChevronDown,
  FolderOpen, Code
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

interface ResourceDetailViewProps {
  activity: any;
  resourceComments: any[];
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
  isBookmarked: boolean;
  setIsBookmarked: (value: boolean) => void;
  newComment: string;
  setNewComment: (value: string) => void;
  handleSubmitComment: () => void;
}

export function ResourceDetailView({
  activity,
  resourceComments,
  isLiked,
  setIsLiked,
  isBookmarked,
  setIsBookmarked,
  newComment,
  setNewComment,
  handleSubmitComment,
}: ResourceDetailViewProps) {
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'docs':
        return <FileText className="w-5 h-5" />;
      case 'pdf':
        return <FileCode className="w-5 h-5" />;
      case 'blog':
        return <ExternalLink className="w-5 h-5" />;
      default:
        return <Link2 className="w-5 h-5" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'github':
        return 'border-gray-800 hover:bg-gray-50';
      case 'youtube':
        return 'border-red-500 hover:bg-red-50';
      case 'docs':
        return 'border-blue-500 hover:bg-blue-50';
      case 'pdf':
        return 'border-purple-500 hover:bg-purple-50';
      case 'blog':
        return 'border-green-500 hover:bg-green-50';
      default:
        return 'border-gray-300 hover:bg-gray-50';
    }
  };

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
            <span className="text-gray-900">자료공유</span>
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
                <Badge className="bg-amber-100 text-amber-700 border-0">
                  <FolderOpen className="w-3 h-3 mr-1" />
                  자료공유
                </Badge>
                {activity.status === 'recommended' && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    추천 자료
                  </Badge>
                )}
                {activity.questNumber && (
                  <Badge variant="outline">
                    Quest {activity.questNumber}
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
                    <AvatarFallback className="bg-amber-100 text-amber-700 font-semibold text-sm">
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
                  <span>2일 전 작성</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{activity.stats.views} 조회</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current text-amber-600" : "text-amber-600"}`} />
                  <span className="font-semibold text-amber-600">{activity.stats.bookmarks + (isBookmarked ? 1 : 0)} 저장</span>
                </div>
              </div>

              {/* Connected Project & Quest */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 mb-6 border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-gray-900">연결된 프로젝트</span>
                </div>
                <Link 
                  to={`/project/${activity.project.id}`}
                  className="font-bold text-amber-600 hover:underline block mb-1"
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
                  variant={isBookmarked ? "default" : "outline"}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                  {isBookmarked ? "저장됨" : "저장하기"} {activity.stats.bookmarks + (isBookmarked ? 1 : 0)}
                </Button>
                <Button 
                  variant={isLiked ? "default" : "outline"}
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  좋아요 {activity.stats.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  공유하기
                </Button>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">자료 설명</h2>
                  <p className="text-sm text-gray-600">Resource overview</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {activity.description}
                </div>
              </div>
            </Card>

            {/* Why Helpful */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">왜 도움이 되는가?</h2>
                  <p className="text-sm text-gray-600">Why it's helpful</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-green-50 p-4 rounded-lg border border-green-100">
                  {activity.whyHelpful}
                </div>
              </div>
            </Card>

            {/* Useful For */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">어떤 단계에 유용한가?</h2>
                  <p className="text-sm text-gray-600">When to use</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-purple-50 p-4 rounded-lg border border-purple-100">
                  {activity.usefulFor}
                </div>
              </div>
            </Card>

            {/* Cautions */}
            {activity.cautions && (
              <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">참고할 때 주의사항</h2>
                    <p className="text-sm text-gray-600">Important notes</p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-lg border border-orange-200">
                    {activity.cautions}
                  </div>
                </div>
              </Card>
            )}

            {/* Resources Grid */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    공유 자료 <span className="text-amber-600">{activity.resources?.length || 0}개</span>
                  </h2>
                  <p className="text-sm text-gray-600">Shared resources</p>
                </div>
              </div>

              <div className="grid gap-4">
                {activity.resources?.map((resource: any, index: number) => (
                  <div 
                    key={index}
                    className={`group border-2 rounded-lg overflow-hidden transition-all ${getResourceColor(resource.type)}`}
                  >
                    {/* Resource Header */}
                    <div className="flex items-start gap-4 p-4">
                      {resource.thumbnail && (
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={resource.thumbnail} 
                            alt={resource.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            resource.type === 'github' ? 'bg-gray-800 text-white' :
                            resource.type === 'youtube' ? 'bg-red-500 text-white' :
                            resource.type === 'docs' ? 'bg-blue-500 text-white' :
                            resource.type === 'pdf' ? 'bg-purple-500 text-white' :
                            resource.type === 'blog' ? 'bg-green-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {resource.description}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {resource.tags?.map((tag: string) => (
                                <Badge 
                                  key={tag} 
                                  variant="outline" 
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {resource.stars && (
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span>{resource.stars}</span>
                                </div>
                              )}
                              {resource.duration && (
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <Clock className="w-3 h-3" />
                                  <span>{resource.duration}</span>
                                </div>
                              )}
                              {resource.size && (
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <Download className="w-3 h-3" />
                                  <span>{resource.size}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resource Actions */}
                    <div className="px-4 pb-4 flex items-center gap-2">
                      <Button 
                        className={`flex-1 ${
                          resource.type === 'github' ? 'bg-gray-800 hover:bg-gray-900' :
                          resource.type === 'youtube' ? 'bg-red-600 hover:bg-red-700' :
                          resource.type === 'docs' ? 'bg-blue-600 hover:bg-blue-700' :
                          resource.type === 'pdf' ? 'bg-purple-600 hover:bg-purple-700' :
                          resource.type === 'blog' ? 'bg-green-600 hover:bg-green-700' :
                          'bg-gray-600 hover:bg-gray-700'
                        }`}
                        asChild
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          {resource.type === 'pdf' || resource.type === 'file' ? (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              다운로드
                            </>
                          ) : resource.type === 'youtube' ? (
                            <>
                              <Youtube className="w-4 h-4 mr-2" />
                              영상 보기
                            </>
                          ) : resource.type === 'github' ? (
                            <>
                              <Github className="w-4 h-4 mr-2" />
                              GitHub 보기
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              바로가기
                            </>
                          )}
                        </a>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reference Images */}
            {activity.images && activity.images.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-gray-700" />
                  참고 이미지 및 회로도
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.images.map((image: string, index: number) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
                      <div className="relative">
                        <img 
                          src={image} 
                          alt={`참고 이미지 ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white"
                            asChild
                          >
                            <a href={image} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              크게 보기
                            </a>
                          </Button>
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
                  댓글 <span className="text-amber-600">{resourceComments.length}</span>
                </h2>
              </div>

              {/* Comment List */}
              <div className="space-y-4 mb-8">
                {resourceComments.map((comment: any) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-amber-100 text-amber-700 font-semibold">
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
                  <MessageCircle className="w-5 h-5 text-amber-600" />
                  댓글 남기기
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  이 자료에 대한 피드백이나 추가 정보를 공유해주세요!
                </p>
                <Textarea
                  placeholder="예시:
- 이 자료 정말 유용했어요! 덕분에 Quest 2를 완료했습니다.
- 추가로 이런 자료도 도움이 될 것 같아요...
- 저도 비슷한 자료를 찾았는데 공유합니다"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[120px] mb-4"
                />
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Link2 className="w-4 h-4 mr-2" />
                      링크 추가
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="bg-amber-600 hover:bg-amber-700"
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
              {/* Quick Actions */}
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                <h3 className="font-bold text-gray-900 mb-4">빠른 액션</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Bookmark className="w-4 h-4 text-amber-600" />
                    <span className="text-gray-700">{activity.stats.bookmarks}명 저장</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-amber-600" />
                    <span className="text-gray-700">{activity.stats.likes}개 좋아요</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4 text-amber-600" />
                    <span className="text-gray-700">{activity.stats.downloads}회 다운로드</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700 mb-2"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                  {isBookmarked ? "저장됨" : "저장하기"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current text-red-600" : ""}`} />
                  {isLiked ? "좋아요 취소" : "좋아요"}
                </Button>
              </Card>

              {/* Resource Summary */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">자료 요약</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">총 자료 수</span>
                    <span className="font-semibold text-amber-600">
                      {activity.resources?.length || 0}개
                    </span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    {activity.resources?.filter((r: any) => r.type === 'github').length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          <span className="text-gray-600">GitHub</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {activity.resources?.filter((r: any) => r.type === 'github').length}
                        </span>
                      </div>
                    )}
                    {activity.resources?.filter((r: any) => r.type === 'youtube').length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Youtube className="w-4 h-4" />
                          <span className="text-gray-600">영상</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {activity.resources?.filter((r: any) => r.type === 'youtube').length}
                        </span>
                      </div>
                    )}
                    {activity.resources?.filter((r: any) => r.type === 'docs').length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-gray-600">문서</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {activity.resources?.filter((r: any) => r.type === 'docs').length}
                        </span>
                      </div>
                    )}
                    {activity.resources?.filter((r: any) => r.type === 'pdf').length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <FileCode className="w-4 h-4" />
                          <span className="text-gray-600">PDF</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {activity.resources?.filter((r: any) => r.type === 'pdf').length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Project Card */}
              <Card className="overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-amber-500 to-yellow-500 relative">
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
                    className="text-amber-600 hover:underline font-semibold block mb-2"
                  >
                    {activity.project.name}
                  </Link>
                  <div className="text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Rocket className="w-4 h-4 text-amber-600" />
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
                  <Button className="w-full bg-amber-600 hover:bg-amber-700" size="sm">
                    프로젝트 보기
                  </Button>
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
                      <Bookmark className="w-4 h-4" />
                      저장
                    </span>
                    <span className="font-semibold text-amber-600">{activity.stats.bookmarks}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      좋아요
                    </span>
                    <span className="font-semibold text-gray-900">{activity.stats.likes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      다운로드
                    </span>
                    <span className="font-semibold text-gray-900">{activity.stats.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      댓글
                    </span>
                    <span className="font-semibold text-gray-900">{activity.stats.comments}</span>
                  </div>
                </div>
              </Card>

              {/* Author Info */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">작성자 정보</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-amber-100 text-amber-700 font-semibold text-lg">
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
