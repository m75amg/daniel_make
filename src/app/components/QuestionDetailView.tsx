import { useState } from 'react';
import { Link } from 'react-router';
import { 
  ChevronRight, MessageCircle, Heart, Eye, CheckCircle, 
  Clock, TrendingUp, Rocket, HelpCircle, FileText,
  Code, Share2, Bookmark, ThumbsUp, Image as ImageIcon, 
  Paperclip, Link2, Send, Award, Mail, Lightbulb, Target, FileDown,
  AlertCircle, Wrench, CheckSquare, Info
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

interface QuestionDetailViewProps {
  activity: any;
  questionAnswers: any[];
  isBookmarked: boolean;
  setIsBookmarked: (value: boolean) => void;
  newComment: string;
  setNewComment: (value: string) => void;
  handleSubmitComment: () => void;
}

// 질문 유형별 설정
const getQuestionTypeConfig = (type: string) => {
  switch (type) {
    case 'technical':
      return { label: '기술 문제', icon: Code, color: 'blue' };
    case 'implementation':
      return { label: '구현 방법', icon: Target, color: 'purple' };
    case 'design':
      return { label: '설계 고민', icon: Lightbulb, color: 'pink' };
    case 'submission':
      return { label: '제출 관련', icon: FileText, color: 'green' };
    case 'feedback':
      return { label: '피드백 요청', icon: HelpCircle, color: 'orange' };
    default:
      return { label: '일반 질문', icon: HelpCircle, color: 'gray' };
  }
};

export function QuestionDetailView({
  activity,
  questionAnswers,
  isBookmarked,
  setIsBookmarked,
  newComment,
  setNewComment,
  handleSubmitComment,
}: QuestionDetailViewProps) {
  const questionTypeConfig = getQuestionTypeConfig(activity.questionType);
  const TypeIcon = questionTypeConfig.icon;

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
            <span className="text-gray-900">질문하기</span>
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
                <Badge className="bg-blue-100 text-blue-700 border-0">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  질문하기
                </Badge>
                {activity.questionType && (
                  <Badge className={`bg-${questionTypeConfig.color}-100 text-${questionTypeConfig.color}-700 border-0`}>
                    <TypeIcon className="w-3 h-3 mr-1" />
                    {questionTypeConfig.label}
                  </Badge>
                )}
                {activity.status === 'open' ? (
                  <Badge className="bg-orange-100 text-orange-700 border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    해결중
                  </Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    해결됨
                  </Badge>
                )}
                {activity.questNumber && (
                  <Badge variant="outline">Quest {activity.questNumber}</Badge>
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
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-sm">
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
                  <Clock className="w-4 h-4" />
                  <span>3일 전 작성</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{activity.stats.views} 조회</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-600">{activity.stats.answers}개 답변</span>
                </div>
              </div>

              {/* Connected Project & Quest */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">진행 중인 Quest</span>
                </div>
                <Link 
                  to={`/project/${activity.project.id}`}
                  className="font-bold text-blue-600 hover:underline block mb-1"
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

              {/* Tags */}
              {activity.tags && (
                <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-200">
                  {activity.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>

            {/* 1. Current Work - 어떤 작업을 하고 있는지 */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">어떤 작업을 하고 있나요?</h2>
                  <p className="text-sm text-gray-600">Current work context</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {activity.currentWork}
                </p>
              </div>
            </Card>

            {/* 2. Problem - 어떤 문제가 있나요 */}
            <Card className="p-6 border-2 border-red-200 bg-red-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">어떤 문제가 있나요?</h2>
                  <p className="text-sm text-gray-600">Problem description</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-lg border border-red-200">
                  {activity.problem}
                </div>
              </div>
            </Card>

            {/* 3. Attempts - 무엇을 시도했나요 */}
            {activity.attempts && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <CheckSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">무엇을 시도했나요?</h2>
                    <p className="text-sm text-gray-600">What I've tried</p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-purple-50 p-4 rounded-lg border border-purple-100">
                    {activity.attempts}
                  </div>
                </div>
              </Card>
            )}

            {/* 4. Help Needed - 어떤 도움을 원하나요 */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">어떤 도움을 받고 싶나요?</h2>
                  <p className="text-sm text-gray-600">What help is needed</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-green-50 p-4 rounded-lg border border-green-100">
                  {activity.helpNeeded}
                </div>
              </div>
            </Card>

            {/* Additional Content - 기존 content 필드 (추가 설명이 있는 경우) */}
            {activity.content && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">추가 정보 및 코드</h2>
                    <p className="text-sm text-gray-600">Additional details</p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {activity.content}
                  </div>
                </div>
              </Card>
            )}

            {/* Attachments */}
            {((activity.images && activity.images.length > 0) || (activity.attachments && activity.attachments.length > 0)) && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Paperclip className="w-5 h-5 text-gray-700" />
                  첨부 파일
                </h3>
                
                {activity.images && activity.images.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">이미지</p>
                    <div className="grid grid-cols-2 gap-3">
                      {activity.images.map((image: string, index: number) => (
                        <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                          <img src={image} alt={`첨부 이미지 ${index + 1}`} className="w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activity.attachments && activity.attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 mb-2">파일</p>
                    {activity.attachments.map((file: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Code className="w-5 h-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileDown className="w-4 h-4 mr-1" />
                          다운로드
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Answers Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  답변 <span className="text-blue-600">{questionAnswers.length}</span>
                </h2>
                {activity.status === 'solved' && (
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    해결됨
                  </Badge>
                )}
              </div>

              {/* Answer List */}
              <div className="space-y-4 mb-8">
                {questionAnswers.map((answer: any) => (
                  <div 
                    key={answer.id} 
                    className={`p-5 rounded-lg border-2 ${
                      answer.isHelpful 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                          {answer.author.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-gray-900">{answer.author.name}</span>
                          {answer.author.isExpert && (
                            <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              전문가
                            </Badge>
                          )}
                          {answer.isHelpful && (
                            <Badge className="bg-green-600 text-white border-0 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              채택된 답변
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500 ml-auto">2일 전</span>
                        </div>
                        <div className="prose max-w-none mb-4">
                          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {answer.content}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            도움됨 {answer.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            댓글 {answer.replies}
                          </Button>
                          {!answer.isHelpful && activity.status === 'open' && (
                            <Button variant="outline" size="sm" className="ml-auto">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              답변 채택
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Answer */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  답변 작성하기
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  구체적이고 실행 가능한 답변을 남겨주세요. 코드 예제나 참고 자료를 함께 제공하면 더욱 좋습니다.
                </p>
                <Textarea
                  placeholder="예시:
WiFi.setSleep(false) 설정을 추가해보세요. ESP32는 기본적으로 전력 절약 모드가 활성화되어 있어서...

```cpp
void setup() {
  WiFi.setSleep(false);
  // 나머지 코드
}
```"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[180px] mb-4 font-mono text-sm"
                />
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Code className="w-4 h-4 mr-2" />
                      코드 추가
                    </Button>
                    <Button variant="outline" size="sm">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      이미지 추가
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link2 className="w-4 h-4 mr-2" />
                      링크 추가
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    답변 작성하기
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Actions */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4">빠른 액션</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    {activity.status === 'open' ? (
                      <>
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-700">해결중</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">해결됨</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">{activity.stats.answers}개 답변</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ThumbsUp className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">{activity.stats.likes}명 도움됨</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 mb-2"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                  {isBookmarked ? "저장됨" : "저장하기"}
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  공유하기
                </Button>
              </Card>

              {/* Question Type Info */}
              {activity.questionType && (
                <Card className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">질문 유형</h3>
                  <div className={`p-4 rounded-lg bg-${questionTypeConfig.color}-50 border border-${questionTypeConfig.color}-100`}>
                    <div className="flex items-center gap-3">
                      <TypeIcon className={`w-6 h-6 text-${questionTypeConfig.color}-600`} />
                      <div>
                        <p className="font-semibold text-gray-900">{questionTypeConfig.label}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {activity.questionType === 'technical' && '기술적인 문제 해결이 필요한 질문'}
                          {activity.questionType === 'implementation' && '구현 방법을 알고 싶은 질문'}
                          {activity.questionType === 'design' && '설계 방향에 대한 고민'}
                          {activity.questionType === 'submission' && '프로젝트 제출과 관련된 질문'}
                          {activity.questionType === 'feedback' && '작업물에 대한 피드백 요청'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Project Card */}
              <Card className="overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500 relative">
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
                    className="text-blue-600 hover:underline font-semibold block mb-2"
                  >
                    {activity.project.name}
                  </Link>
                  {activity.questNumber && (
                    <div className="text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Rocket className="w-4 h-4 text-blue-600" />
                        <span>Quest {activity.questNumber} 진행중</span>
                      </div>
                      {activity.questTitle && (
                        <p className="text-xs text-gray-600 ml-6">{activity.questTitle}</p>
                      )}
                    </div>
                  )}
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
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
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
                      <MessageCircle className="w-4 h-4" />
                      답변
                    </span>
                    <span className="font-semibold text-blue-600">{activity.stats.answers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      도움됨
                    </span>
                    <span className="font-semibold text-gray-900">{activity.stats.likes}</span>
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
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-lg">
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
