import { useState } from 'react';
import {
  X, Eye, Heart, MessageCircle, Bookmark, Share2,
  User, Calendar, Tag, Cpu, Code, Link as LinkIcon,
  Github, ExternalLink, Users, Clock, FileText,
  Sparkles, CheckCircle, AlertCircle, ChevronDown, ChevronUp,
  ImageIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ProjectFormData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  difficulty: string;
  goal: string;
  hardware: string[];
  software: string[];
  tags: string[];
  coverImage: string;
  links: { type: string; url: string }[];
  teamProject: boolean;
  teamName: string;
  expectedDuration: string;
}

interface ProjectPreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ProjectFormData;
}

export function ProjectPreviewPanel({ isOpen, onClose, formData }: ProjectPreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'detail'>('overview');
  const [descExpanded, setDescExpanded] = useState(false);

  const difficultyLabel: Record<string, string> = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
  };

  const difficultyColor: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  const isEmpty = !formData.title && !formData.subtitle && !formData.description;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">

        {/* Panel Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">미리보기</h2>
                <p className="text-xs text-gray-500">작성 중인 프로젝트가 어떻게 보일지 확인하세요</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Tab switcher */}
              <div className="flex bg-gray-100 rounded-lg p-1 text-sm">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    activeTab === 'overview'
                      ? 'bg-white text-gray-900 shadow-sm font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  카드뷰
                </button>
                <button
                  onClick={() => setActiveTab('detail')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    activeTab === 'detail'
                      ? 'bg-white text-gray-900 shadow-sm font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  상세뷰
                </button>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Draft Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center gap-2 flex-shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            <span className="font-semibold">초안 미리보기</span> — 실제 게시 전 화면입니다. 작성한 내용이 실시간으로 반영됩니다.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Empty State */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center h-full py-20 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-semibold mb-2">아직 작성된 내용이 없습니다</p>
              <p className="text-sm text-gray-400">왼쪽 폼에 프로젝트 정보를 입력하면<br />여기서 실시간으로 미리볼 수 있습니다</p>
            </div>
          )}

          {/* Card View */}
          {!isEmpty && activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              {/* Project Card Preview */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">프로젝트 목록에서 보이는 카드</p>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Cover Image */}
                  <div className="h-44 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative flex items-center justify-center">
                    {formData.coverImage ? (
                      <img src={formData.coverImage} alt="cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-400">대표 이미지 없음</p>
                      </div>
                    )}
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-blue-600 text-white border-0 text-xs">
                        개인 프로젝트
                      </Badge>
                      <Badge className="bg-amber-500 text-white border-0 text-xs">
                        초안
                      </Badge>
                    </div>
                    {formData.difficulty && (
                      <div className="absolute top-3 right-3">
                        <Badge className={`border-0 text-xs ${difficultyColor[formData.difficulty] || 'bg-gray-100 text-gray-700'}`}>
                          {difficultyLabel[formData.difficulty] || formData.difficulty}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    {formData.category && (
                      <p className="text-xs text-blue-600 font-semibold mb-1.5">{formData.category}</p>
                    )}
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                      {formData.title || <span className="text-gray-400">프로젝트 제목을 입력하세요</span>}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {formData.subtitle || <span className="text-gray-400 italic">한줄 소개를 입력하세요</span>}
                    </p>

                    {/* Tags */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {formData.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                        {formData.tags.length > 4 && (
                          <span className="text-xs text-gray-400">+{formData.tags.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">나</span>
                        </div>
                        <span className="text-xs text-gray-600">
                          {formData.teamProject && formData.teamName ? formData.teamName : '나'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> 0</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 0</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 0</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Info Summary Cards */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">입력 정보 요약</p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Category */}
                  <div className={`p-3 rounded-lg border ${formData.category ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-xs text-gray-500 mb-1">카테고리</p>
                    <p className={`text-sm font-semibold ${formData.category ? 'text-blue-700' : 'text-gray-400'}`}>
                      {formData.category || '미입력'}
                    </p>
                  </div>
                  {/* Difficulty */}
                  <div className={`p-3 rounded-lg border ${formData.difficulty ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-xs text-gray-500 mb-1">난이도</p>
                    <p className={`text-sm font-semibold ${formData.difficulty ? 'text-green-700' : 'text-gray-400'}`}>
                      {difficultyLabel[formData.difficulty] || '미입력'}
                    </p>
                  </div>
                  {/* Duration */}
                  <div className={`p-3 rounded-lg border ${formData.expectedDuration ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-xs text-gray-500 mb-1">예상 기간</p>
                    <p className={`text-sm font-semibold ${formData.expectedDuration ? 'text-purple-700' : 'text-gray-400'}`}>
                      {formData.expectedDuration || '미입력'}
                    </p>
                  </div>
                  {/* Team */}
                  <div className={`p-3 rounded-lg border ${formData.teamProject ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-xs text-gray-500 mb-1">팀 구성</p>
                    <p className={`text-sm font-semibold ${formData.teamProject ? 'text-indigo-700' : 'text-gray-600'}`}>
                      {formData.teamProject ? (formData.teamName || '팀 프로젝트') : '개인'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hardware & Software */}
              {(formData.hardware.length > 0 || formData.software.length > 0) && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">기술 스택</p>
                  <div className="space-y-2">
                    {formData.hardware.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1 mr-1">
                          <Cpu className="w-3 h-3" /> HW:
                        </span>
                        {formData.hardware.map((item) => (
                          <Badge key={item} className="bg-purple-100 text-purple-700 border-0 text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {formData.software.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1 mr-1">
                          <Code className="w-3 h-3" /> SW:
                        </span>
                        {formData.software.map((item) => (
                          <Badge key={item} className="bg-blue-100 text-blue-700 border-0 text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Completion Checklist */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">완성도 체크</p>
                <div className="space-y-2">
                  {[
                    { label: '프로젝트 제목', done: !!formData.title },
                    { label: '한줄 소개', done: !!formData.subtitle },
                    { label: '카테고리', done: !!formData.category },
                    { label: '프로젝트 설명 (100자 이상)', done: formData.description.length >= 100 },
                    { label: '난이도', done: !!formData.difficulty },
                    { label: '기술 스택 (하드웨어)', done: formData.hardware.length > 0 },
                    { label: '기술 스택 (소프트웨어)', done: formData.software.length > 0 },
                    { label: '태그', done: formData.tags.length > 0 },
                    { label: '관련 링크', done: formData.links.length > 0 },
                  ].map(({ label, done }) => (
                    <div key={label} className={`flex items-center gap-2 text-sm ${done ? 'text-green-700' : 'text-gray-500'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-green-500' : 'bg-gray-200'}`}>
                        {done && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span>{label}</span>
                      {!done && <span className="text-xs text-gray-400 ml-auto">미입력</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detail View */}
          {!isEmpty && activeTab === 'detail' && (
            <div>
              {/* Hero */}
              <div className="bg-white border-b border-gray-200">
                {/* Cover Image Area */}
                <div className="h-52 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative flex items-center justify-center">
                  {formData.coverImage ? (
                    <img src={formData.coverImage} alt="cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">대표 이미지 없음</p>
                    </div>
                  )}
                  {/* Draft overlay badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-blue-600 text-white border-0">개인 프로젝트</Badge>
                    <Badge className="bg-amber-500 text-white border-0">초안</Badge>
                  </div>
                </div>

                <div className="p-6">
                  {/* Category & Difficulty */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {formData.category && (
                      <span className="text-sm text-blue-600 font-semibold">{formData.category}</span>
                    )}
                    {formData.difficulty && (
                      <Badge className={`border-0 text-xs ${difficultyColor[formData.difficulty] || ''}`}>
                        {difficultyLabel[formData.difficulty]}
                      </Badge>
                    )}
                    {formData.expectedDuration && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formData.expectedDuration}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">
                    {formData.title || <span className="text-gray-300">프로젝트 제목</span>}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {formData.subtitle || <span className="text-gray-300 italic">한줄 소개</span>}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">나</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formData.teamProject && formData.teamName ? formData.teamName : '나 (작성자)'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>2026년 3월 19일 (오늘)</span>
                        {formData.teamProject && (
                          <>
                            <span>·</span>
                            <Users className="w-3 h-3" />
                            <span>팀 프로젝트</span>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Action Buttons (mock) */}
                    <div className="ml-auto flex gap-2">
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                        <Heart className="w-3 h-3" /> 0
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                        <Bookmark className="w-3 h-3" />
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="p-6 bg-white border-b border-gray-200">
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  프로젝트 소개
                </h2>
                {formData.description ? (
                  <div className="relative">
                    <p className={`text-sm text-gray-700 leading-relaxed whitespace-pre-wrap ${!descExpanded && formData.description.length > 300 ? 'line-clamp-6' : ''}`}>
                      {formData.description}
                    </p>
                    {formData.description.length > 300 && (
                      <button
                        onClick={() => setDescExpanded(!descExpanded)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold mt-2"
                      >
                        {descExpanded ? (
                          <><ChevronUp className="w-3 h-3" /> 접기</>
                        ) : (
                          <><ChevronDown className="w-3 h-3" /> 더보기</>
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">프로젝트 설명이 입력되면 여기에 표시됩니다</p>
                )}

                {/* Goal */}
                {formData.goal && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-xs font-semibold text-blue-700 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> 프로젝트 목표
                    </p>
                    <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-wrap">{formData.goal}</p>
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              {(formData.hardware.length > 0 || formData.software.length > 0) && (
                <div className="p-6 bg-white border-b border-gray-200">
                  <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    기술 스택
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {formData.hardware.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                          <Cpu className="w-3 h-3" /> 하드웨어
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.hardware.map((item) => (
                            <Badge key={item} className="bg-purple-100 text-purple-700 border-0 text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {formData.software.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                          <Code className="w-3 h-3" /> 소프트웨어
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.software.map((item) => (
                            <Badge key={item} className="bg-blue-100 text-blue-700 border-0 text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Links */}
              {formData.links.length > 0 && (
                <div className="p-6 bg-white border-b border-gray-200">
                  <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-orange-600" />
                    관련 링크
                  </h2>
                  <div className="space-y-2">
                    {formData.links.map((link, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        {link.type === 'GitHub' ? (
                          <Github className="w-4 h-4 text-gray-700 flex-shrink-0" />
                        ) : (
                          <ExternalLink className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-700">{link.type}</p>
                          <p className="text-xs text-blue-600 truncate">{link.url}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quest Preview (Placeholder) */}
              <div className="p-6 bg-white border-b border-gray-200">
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  Quest 진행 현황
                </h2>
                <div className="space-y-3">
                  {[
                    { num: 1, label: 'Quest 1: 프로젝트 기획 및 설계', status: 'pending' },
                    { num: 2, label: 'Quest 2: 프로토타입 제작', status: 'pending' },
                    { num: 3, label: 'Quest 3: 최종 완성', status: 'pending' },
                  ].map((quest) => (
                    <div key={quest.num} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-gray-500">{quest.num}</span>
                      </div>
                      <p className="text-sm text-gray-600">{quest.label}</p>
                      <Badge className="ml-auto bg-gray-100 text-gray-500 border-0 text-xs flex-shrink-0">
                        시작 전
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">프로젝트 생성 후 Quest가 자동으로 시작됩니다</p>
              </div>

              {/* Stats (Mock) */}
              <div className="p-6 bg-white">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                      <Eye className="w-4 h-4" />
                    </div>
                    <p className="font-bold text-gray-900">0</p>
                    <p className="text-xs text-gray-500">조회수</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                      <Heart className="w-4 h-4" />
                    </div>
                    <p className="font-bold text-gray-900">0</p>
                    <p className="text-xs text-gray-500">좋아요</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <p className="font-bold text-gray-900">0</p>
                    <p className="text-xs text-gray-500">댓글</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {[
                formData.title && '제목',
                formData.category && '카테고리',
                formData.description.length >= 100 && '설명',
                formData.hardware.length > 0 && '하드웨어',
                formData.software.length > 0 && '소프트웨어',
                formData.tags.length > 0 && '태그',
              ].filter(Boolean).length} / 6개 항목 입력됨
            </p>
            <Button size="sm" variant="outline" onClick={onClose}>
              계속 작성하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
