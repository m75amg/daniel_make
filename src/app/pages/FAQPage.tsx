import { Link } from 'react-router';
import { ChevronRight, HelpCircle, Search } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { useState } from 'react';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: '플랫폼 이용',
      icon: '🚀',
      faqs: [
        {
          question: 'Make 2.0은 무엇인가요?',
          answer: 'Make 2.0은 엔지니어링 메이커 및 콘테스트 플랫폼입니다. 메이커들이 프로젝트를 공유하고, 콘테스트에 참가하며, 커뮤니티와 소통할 수 있는 공간입니다.',
        },
        {
          question: '회원가입은 어떻게 하나요?',
          answer: '상단 메뉴의 "로그인" 버튼을 클릭한 후 "회원가입" 링크를 선택하세요. 이메일 또는 소셜 계정으로 간편하게 가입할 수 있습니다.',
        },
        {
          question: '프로젝트는 어떻게 등록하나요?',
          answer: '로그인 후 상단 메뉴의 "+" 버튼 또는 "새 프로젝트" 버튼을 클릭하면 프로젝트 등록 페이지로 이동합니다. 프로젝트 제목, 설명, 이미지, 기술 태그 등을 입력하여 등록할 수 있습니다.',
        },
        {
          question: '프로젝트를 비공개로 할 수 있나요?',
          answer: '현재는 공개 프로젝트만 지원하고 있습니다. 하지만 작성 중인 프로젝트는 "작성중" 상태로 설정하여 완성 전까지 노출을 제한할 수 있습니다.',
        },
      ],
    },
    {
      category: '콘테스트',
      icon: '🏆',
      faqs: [
        {
          question: '콘테스트에 참가하려면 어떻게 해야 하나요?',
          answer: '콘테스트 상세 페이지에서 "프로젝트 시작하기" 버튼을 클릭하면 됩니다. 프로젝트를 등록하면 자동으로 콘테스트에 참가 신청이 완료됩니다.',
        },
        {
          question: 'Quest는 무엇인가요?',
          answer: 'Quest는 콘테스트 프로젝트를 단계별로 완성해 가는 과정입니다. Quest 1, 2, 3을 순차적으로 완료하면서 하나의 통합된 프로젝트를 만들어갑니다. 각 Quest는 별도의 제출물이 아니라 하나의 프로젝트를 발전시키는 마일스톤입니다.',
        },
        {
          question: '콘테스트 상금은 어떻게 받나요?',
          answer: '콘테스트 종료 후 심사를 거쳐 수상자가 발표됩니다. 수상자에게는 등록된 이메일로 개별 연락을 드리며, 신원 확인 후 상금이 지급됩니다.',
        },
        {
          question: '한 번에 여러 콘테스트에 참가할 수 있나요?',
          answer: '네, 가능합니다. 동시에 여러 콘테스트에 참가하여 각각 다른 프로젝트를 진행할 수 있습니다.',
        },
        {
          question: '콘테스트 마감 후 프로젝트는 어떻게 되나요?',
          answer: '콘테스트가 종료되어도 프로젝트는 플랫폼에 계속 남아 있습니다. 다른 사용자들이 계속 조회하고 좋아요를 누를 수 있으며, 여러분의 포트폴리오로 활용할 수 있습니다.',
        },
      ],
    },
    {
      category: '프로젝트 관리',
      icon: '📁',
      faqs: [
        {
          question: '프로젝트를 수정하려면 어떻게 하나요?',
          answer: '"My Make" 페이지에서 본인의 프로젝트를 찾아 "수정" 버튼을 클릭하면 됩니다. 언제든지 프로젝트 내용을 수정할 수 있습니다.',
        },
        {
          question: '프로젝트를 삭제할 수 있나요?',
          answer: '네, "My Make" 페이지에서 프로젝트의 "더보기" 메뉴를 클릭한 후 "삭제" 옵션을 선택하면 됩니다. 단, 콘테스트 진행 중인 프로젝트는 삭제가 제한될 수 있습니다.',
        },
        {
          question: '이미지는 몇 개까지 업로드할 수 있나요?',
          answer: '대표 이미지 1개와 상세 이미지 최대 10개까지 업로드할 수 있습니다. 각 이미지는 최대 5MB까지 가능합니다.',
        },
        {
          question: '동영상도 업로드할 수 있나요?',
          answer: '직접 동영상 파일을 업로드하는 것은 지원하지 않지만, YouTube, Vimeo 등의 동영상 링크를 프로젝트에 추가할 수 있습니다.',
        },
      ],
    },
    {
      category: '커뮤니티',
      icon: '👥',
      faqs: [
        {
          question: '다른 사용자를 팔로우하려면 어떻게 하나요?',
          answer: '사용자 프로필 페이지에서 "팔로우" 버튼을 클릭하면 됩니다. 팔로우한 사용자의 새 프로젝트와 활동을 "My Make" 피드에서 확인할 수 있습니다.',
        },
        {
          question: '댓글은 어떻게 작성하나요?',
          answer: '프로젝트 상세 페이지 하단의 댓글 입력창에 의견을 작성하고 "등록" 버튼을 클릭하면 됩니다. 로그인이 필요합니다.',
        },
        {
          question: '부적절한 콘텐츠는 어떻게 신고하나요?',
          answer: '프로젝트나 댓글의 "더보기" 메뉴에서 "신고하기" 옵션을 선택하여 신고할 수 있습니다. 운영팀이 검토 후 적절한 조치를 취합니다.',
        },
      ],
    },
    {
      category: '기술 지원',
      icon: '⚙️',
      faqs: [
        {
          question: '어떤 브라우저를 지원하나요?',
          answer: 'Chrome, Firefox, Safari, Edge의 최신 버전을 지원합니다. 최상의 경험을 위해 최신 버전의 브라우저 사용을 권장합니다.',
        },
        {
          question: '모바일에서도 사용할 수 있나요?',
          answer: '네, Make 2.0은 반응형 디자인으로 모바일, 태블릿, 데스크톱 모두에서 사용할 수 있습니다.',
        },
        {
          question: '로그인이 안 돼요',
          answer: '비밀번호를 잊으신 경우 로그인 페이지에서 "비밀번호 찾기"를 클릭하세요. 그래도 해결되지 않으면 contact@make20.com으로 문의해 주세요.',
        },
        {
          question: '프로젝트 업로드가 실패합니다',
          answer: '이미지 파일 크기가 5MB를 초과하지 않는지, 지원하는 파일 형식(JPG, PNG)인지 확인해 주세요. 문제가 지속되면 브라우저 캐시를 삭제하거나 다른 브라우저를 사용해 보세요.',
        },
      ],
    },
    {
      category: '계정 및 보안',
      icon: '🔒',
      faqs: [
        {
          question: '비밀번호를 변경하려면 어떻게 하나요?',
          answer: '"My Make" 페이지의 "프로필 편집" 메뉴에서 비밀번호를 변경할 수 있습니다.',
        },
        {
          question: '계정을 삭제할 수 있나요?',
          answer: '계정 설정 페이지 하단의 "계정 삭제" 버튼을 통해 삭제할 수 있습니다. 단, 삭제 후에는 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.',
        },
        {
          question: '내 개인정보는 안전한가요?',
          answer: 'Make 2.0은 사용자의 개인정보를 암호화하여 안전하게 보관하며, 개인정보 보호법을 준수합니다. 자세한 내용은 개인정보처리방침을 참고하세요.',
        },
      ],
    },
  ];

  const allFaqs = faqCategories.flatMap(cat => 
    cat.faqs.map(faq => ({ ...faq, category: cat.category, icon: cat.icon }))
  );

  const filteredFaqs = searchQuery
    ? allFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">자주 묻는 질문</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium">FAQ</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            자주 묻는 질문
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Make 2.0 사용에 대한 궁금한 점을 해결해 드립니다
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
        <Card className="p-4 border-gray-200 shadow-lg">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="질문을 검색하세요..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </Card>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredFaqs ? (
          // Search Results
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              검색 결과 ({filteredFaqs.length})
            </h2>
            {filteredFaqs.length === 0 ? (
              <Card className="p-12 text-center border-gray-200">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">검색 결과가 없습니다</p>
                <p className="text-sm text-gray-500">다른 키워드로 검색해 보세요</p>
              </Card>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <Card key={index} className="border-gray-200">
                    <AccordionItem value={`search-${index}`} className="border-0">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                        <div className="flex items-start gap-3 text-left">
                          <span className="text-2xl flex-shrink-0">{faq.icon}</span>
                          <div>
                            <Badge variant="outline" className="text-xs mb-2">
                              {faq.category}
                            </Badge>
                            <p className="font-semibold text-gray-900">{faq.question}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed pl-11">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                ))}
              </Accordion>
            )}
          </div>
        ) : (
          // Categories
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <Card key={faqIndex} className="border-gray-200">
                      <AccordionItem value={`${categoryIndex}-${faqIndex}`} className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                          <span className="text-left font-semibold text-gray-900">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            원하는 답변을 찾지 못하셨나요?
          </h2>
          <p className="text-gray-600 mb-8">
            문의하기를 통해 직접 질문해 주세요. 빠른 시일 내에 답변드리겠습니다.
          </p>
          <Link to="/contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              문의하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}