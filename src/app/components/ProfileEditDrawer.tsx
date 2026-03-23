import { useState } from 'react';
import {
  X, Camera, Github, Linkedin, Globe, Twitter,
  MapPin, Tag, Plus, Save, Check, User,
  Mail, Briefcase, Code2, Link2, Instagram,
  Youtube, ChevronDown, Trash2, AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from './ui/drawer';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ProfileEditDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SKILL_SUGGESTIONS = [
  'Arduino', 'Raspberry Pi', 'ESP32', 'Python', 'C/C++',
  'JavaScript', 'React', 'ROS', '3D 프린팅', 'CAD',
  'Machine Learning', 'OpenCV', 'MQTT', 'PCB 설계', 'Linux',
  'Node.js', 'TensorFlow', 'Fusion 360', 'FPGA', 'Bluetooth/WiFi',
];

const INTEREST_SUGGESTIONS = [
  '로봇공학', 'AI/ML', 'IoT', '드론', '스마트홈',
  '웨어러블', '자율주행', '신재생에너지', '바이오/의료', '게임/엔터테인먼트',
  '농업 기술', '교육 기술', '환경', '우주/항공', '보안',
];

const SECTION_TABS = [
  { id: 'basic', label: '기본 정보', icon: User },
  { id: 'skills', label: '기술 & 관심사', icon: Code2 },
  { id: 'links', label: '링크 & SNS', icon: Link2 },
  { id: 'settings', label: '공개 설정', icon: AlertCircle },
];

export function ProfileEditDrawer({ open, onOpenChange }: ProfileEditDrawerProps) {
  const [activeSection, setActiveSection] = useState('basic');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: '김메이커',
    username: 'kimmaker92',
    tagline: '로봇공학과 AI를 좋아하는 메이커입니다',
    bio: 'ESP32, Arduino, Raspberry Pi를 활용한 IoT 프로젝트와 로봇 제작을 즐깁니다. 오픈소스 커뮤니티에 기여하고 지식을 나누는 것을 좋아합니다.',
    location: '서울, 대한민국',
    email: 'kimmaker@example.com',
    role: '임베디드 엔지니어',
    experience: '중급 (3~5년)',   // 수정: '3-5년' → select 옵션과 일치하는 값
  });

  const [skills, setSkills] = useState<string[]>(['Arduino', 'ESP32', 'Python', 'ROS', '3D 프린팅']);
  const [interests, setInterests] = useState<string[]>(['로봇공학', 'AI/ML', 'IoT', '자율주행']);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  const [links, setLinks] = useState({
    github: 'https://github.com/kimmaker92',
    linkedin: 'https://linkedin.com/in/kimmaker92',  // 수정: PublicMakerProfilePage와 일치
    website: 'https://kimmaker.dev',                  // 수정: PublicMakerProfilePage와 일치
    twitter: '',
    instagram: '',
    youtube: '',
  });

  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showLocation: true,
    showProjects: true,
    showActivity: true,
    showSkills: true,
    profilePublic: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onOpenChange(false);
    }, 1200);
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => setSkills(skills.filter(s => s !== skill));

  const addInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
    }
    setInterestInput('');
  };

  const removeInterest = (interest: string) => setInterests(interests.filter(i => i !== interest));

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="!w-[480px] !max-w-[95vw] flex flex-col h-full overflow-hidden">
        {/* 헤더 */}
        <DrawerHeader className="border-b border-gray-100 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold text-gray-900">프로필 편집</DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-0.5">
                공개 프로필 정보를 수정합니다
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </DrawerClose>
          </div>

          {/* 섹션 탭 */}
          <div className="flex gap-1 mt-4 bg-gray-100 rounded-lg p-1">
            {SECTION_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
                    activeSection === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </DrawerHeader>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">

          {/* ── 기본 정보 ── */}
          {activeSection === 'basic' && (
            <div className="p-6 space-y-6">
              {/* 프로필 이미지 */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-gray-100 shadow-lg">
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      김
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-md transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">프로필 사진 변경</p>
                  <p className="text-xs text-gray-400 mt-0.5">JPG, PNG · 최대 5MB</p>
                </div>
              </div>

              {/* 이름 & 사용자명 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    사용자명 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">@</span>
                    <input
                      type="text"
                      value={profile.username}
                      onChange={e => setProfile({ ...profile, username: e.target.value })}
                      className="w-full pl-7 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              {/* 한 줄 소개 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  한 줄 소개
                </label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={e => setProfile({ ...profile, tagline: e.target.value })}
                  maxLength={80}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="나를 한 문장으로 소개해보세요"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{profile.tagline.length}/80</p>
              </div>

              {/* 상세 소개 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">상세 소개</label>
                <textarea
                  value={profile.bio}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  maxLength={500}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="사용하는 기술, 관심 분야, 목표 등을 자유롭게 작성해보세요"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{profile.bio.length}/500</p>
              </div>

              {/* 역할 & 경력 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 inline mr-1" />
                    역할/직군
                  </label>
                  <select
                    value={profile.role}
                    onChange={e => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  >
                    {['임베디드 엔지니어', '소프트웨어 개발자', '하드웨어 엔지니어', '로보틱스 엔지니어', 'AI/ML 엔지니어', '학생/대학원생', '메이커/취미', '기타'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">경력</label>
                  <select
                    value={profile.experience}
                    onChange={e => setProfile({ ...profile, experience: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  >
                    {['입문 (~1년)', '초급 (1~3년)', '중급 (3~5년)', '고급 (5~10년)', '전문가 (10년+)'].map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 위치 & 이메일 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 inline mr-1" />
                    위치
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={e => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="서울, 대한민국"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <Mail className="w-3.5 h-3.5 inline mr-1" />
                    이메일
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="me@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── 기술 & 관심사 ── */}
          {activeSection === 'skills' && (
            <div className="p-6 space-y-8">
              {/* 기술 스택 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <Code2 className="w-3.5 h-3.5 inline mr-1" />
                  기술 스택
                </label>
                <p className="text-xs text-gray-400 mb-3">사용할 수 있는 기술, 도구, 언어를 추가하세요</p>

                {/* 현재 스킬 태그 */}
                <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {skills.length === 0 && (
                    <span className="text-sm text-gray-400 italic">아직 추가된 기술이 없습니다</span>
                  )}
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-blue-900 transition-colors ml-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* 스킬 입력 */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSkill(skillInput)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="기술 입력 후 Enter 또는 추가 클릭"
                  />
                  <Button size="sm" onClick={() => addSkill(skillInput)} className="bg-blue-600 hover:bg-blue-700 px-3">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* 추천 스킬 */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">추천 기술</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 12).map(s => (
                      <button
                        key={s}
                        onClick={() => addSkill(s)}
                        className="px-2.5 py-1 text-xs border border-dashed border-gray-300 text-gray-600 rounded-full hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 관심 분야 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <Tag className="w-3.5 h-3.5 inline mr-1" />
                  관심 분야
                </label>
                <p className="text-xs text-gray-400 mb-3">콘테스트 & 프로젝트 추천에 활용됩니다</p>

                <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {interests.length === 0 && (
                    <span className="text-sm text-gray-400 italic">아직 추가된 관심사가 없습니다</span>
                  )}
                  {interests.map(interest => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {interest}
                      <button onClick={() => removeInterest(interest)} className="hover:text-purple-900 transition-colors ml-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={interestInput}
                    onChange={e => setInterestInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addInterest(interestInput)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="관심 분야 입력 후 Enter"
                  />
                  <Button size="sm" onClick={() => addInterest(interestInput)} className="bg-purple-600 hover:bg-purple-700 px-3">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">추천 관심사</p>
                  <div className="flex flex-wrap gap-1.5">
                    {INTEREST_SUGGESTIONS.filter(i => !interests.includes(i)).map(i => (
                      <button
                        key={i}
                        onClick={() => addInterest(i)}
                        className="px-2.5 py-1 text-xs border border-dashed border-gray-300 text-gray-600 rounded-full hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
                      >
                        + {i}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 링크 & SNS ── */}
          {activeSection === 'links' && (
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500 mb-2">외부 프로필과 포트폴리오 링크를 연결하세요</p>

              {[
                { key: 'github', icon: Github, label: 'GitHub', placeholder: 'https://github.com/username', color: 'text-gray-800' },
                { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username', color: 'text-blue-700' },
                { key: 'website', icon: Globe, label: '개인 웹사이트 / 포트폴리오', placeholder: 'https://myportfolio.com', color: 'text-green-600' },
                { key: 'twitter', icon: Twitter, label: 'Twitter / X', placeholder: 'https://twitter.com/username', color: 'text-sky-500' },
                { key: 'instagram', icon: Instagram, label: 'Instagram', placeholder: 'https://instagram.com/username', color: 'text-pink-500' },
                { key: 'youtube', icon: Youtube, label: 'YouTube', placeholder: 'https://youtube.com/@channel', color: 'text-red-600' },
              ].map(({ key, icon: Icon, label, placeholder, color }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <Icon className={`w-4 h-4 inline mr-1.5 ${color}`} />
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={(links as any)[key]}
                      onChange={e => setLinks({ ...links, [key]: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                      placeholder={placeholder}
                    />
                    {(links as any)[key] && (
                      <button
                        onClick={() => setLinks({ ...links, [key]: '' })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── 공개 설정 ── */}
          {activeSection === 'settings' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">공개 범위 설정</h3>
                <p className="text-xs text-gray-500 mb-4">다른 사용자에게 노출되는 정보를 제어합니다</p>

                <div className="space-y-3">
                  {[
                    { key: 'profilePublic', label: '프로필 공개', desc: '내 프로필을 모든 사용자에게 공개합니다', important: true },
                    { key: 'showProjects', label: '프로젝트 목록 공개', desc: '내 프로젝트를 프로필에서 볼 수 있습니다' },
                    { key: 'showSkills', label: '기술 스택 공개', desc: '기술 스택과 관심사를 공개합니다' },
                    { key: 'showActivity', label: '활동 내역 공개', desc: '커뮤니티 활동 내역을 공개합니다' },
                    { key: 'showLocation', label: '위치 정보 공개', desc: '프로필에 위치를 표시합니다' },
                    { key: 'showEmail', label: '이메일 공개', desc: '다른 사용자가 이메일을 볼 수 있습니다' },
                  ].map(({ key, label, desc, important }) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        (privacy as any)[key]
                          ? important ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex-1 mr-4">
                        <p className={`text-sm font-semibold ${important ? 'text-blue-800' : 'text-gray-800'}`}>
                          {label}
                          {important && <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">필수</span>}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                      </div>
                      <button
                        onClick={() => setPrivacy({ ...privacy, [key]: !(privacy as any)[key] })}
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
                          (privacy as any)[key] ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
                            (privacy as any)[key] ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 계정 위험 영역 */}
              <div className="border border-red-100 rounded-xl p-4 bg-red-50">
                <h4 className="text-sm font-semibold text-red-700 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  위험 영역
                </h4>
                <p className="text-xs text-red-600 mb-3">아래 작업은 되돌릴 수 없습니다. 신중하게 진행하세요.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-red-300 text-red-600 hover:bg-red-100 hover:border-red-400 text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  계정 비활성화
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 하단 저장 버튼 */}
        <div className="flex-shrink-0 border-t border-gray-100 p-4 bg-white">
          <div className="flex gap-3">
            <DrawerClose asChild>
              <Button variant="outline" className="flex-1 text-gray-600">
                취소
              </Button>
            </DrawerClose>
            <Button
              onClick={handleSave}
              className={`flex-1 transition-all duration-300 ${
                saved
                  ? 'bg-green-500 hover:bg-green-500'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  저장됨!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  변경사항 저장
                </>
              )}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}