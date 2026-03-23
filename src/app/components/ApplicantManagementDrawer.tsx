import { useState } from 'react';
import {
  X, Users, CheckCircle, XCircle, Clock,
  Link2, UserPlus, MessageSquare, ChevronRight,
  Handshake, Trophy, Star, AlertCircle
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  useTeammate,
  type TeammateApplication,
  type TeammateNotification
} from '../context/TeammateContext';

interface ApplicantManagementDrawerProps {
  open: boolean;
  onClose: () => void;
  postId: string;
  postTitle: string;
  notifications?: TeammateNotification[];
}

export function ApplicantManagementDrawer({
  open,
  onClose,
  postId,
  postTitle,
  notifications = [],
}: ApplicantManagementDrawerProps) {
  const { getApplicationsForPost, acceptApplication, rejectApplication, markNotificationRead } = useTeammate();
  const [confirmAction, setConfirmAction] = useState<{ appId: string; type: 'accept' | 'reject' } | null>(null);
  const [completedActions, setCompletedActions] = useState<Record<string, 'accepted' | 'rejected'>>({});

  const applicants = getApplicationsForPost(postId);

  const handleAccept = (app: TeammateApplication) => {
    setConfirmAction({ appId: app.id, type: 'accept' });
  };

  const handleReject = (app: TeammateApplication) => {
    setConfirmAction({ appId: app.id, type: 'reject' });
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    if (confirmAction.type === 'accept') {
      acceptApplication(confirmAction.appId);
      setCompletedActions(prev => ({ ...prev, [confirmAction.appId]: 'accepted' }));
    } else {
      rejectApplication(confirmAction.appId);
      setCompletedActions(prev => ({ ...prev, [confirmAction.appId]: 'rejected' }));
    }
    // Mark related notifications as read
    notifications.forEach(n => {
      if (n.applicationId === confirmAction.appId) markNotificationRead(n.id);
    });
    setConfirmAction(null);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'accepted':
        return { label: '수락됨', bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, iconColor: 'text-green-600' };
      case 'rejected':
        return { label: '거절됨', bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, iconColor: 'text-red-500' };
      default:
        return { label: '검토중', bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, iconColor: 'text-yellow-600' };
    }
  };

  const acceptedCount = applicants.filter(a => a.status === 'accepted').length;
  const pendingCount = applicants.filter(a => a.status === 'pending').length;

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-5 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-white" />
                <span className="text-sm text-green-100 font-medium">지원자 관리</span>
              </div>
              <h2 className="text-xl font-bold text-white leading-snug line-clamp-2">{postTitle}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
              <UserPlus className="w-3.5 h-3.5 text-white" />
              <span className="text-sm text-white font-medium">총 {applicants.length}명 지원</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
              <Clock className="w-3.5 h-3.5 text-yellow-200" />
              <span className="text-sm text-white font-medium">검토중 {pendingCount}명</span>
            </div>
            {acceptedCount > 0 && (
              <div className="flex items-center gap-1.5 bg-green-700/60 rounded-full px-3 py-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-200" />
                <span className="text-sm text-white font-medium">수락 {acceptedCount}명</span>
              </div>
            )}
          </div>
        </div>

        {/* Confirm Dialog Overlay */}
        {confirmAction && (
          <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center p-6">
            <Card className="p-6 w-full max-w-sm shadow-2xl">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                confirmAction.type === 'accept' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {confirmAction.type === 'accept'
                  ? <Handshake className="w-6 h-6 text-green-600" />
                  : <XCircle className="w-6 h-6 text-red-500" />
                }
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                {confirmAction.type === 'accept' ? '참여를 수락하시겠습니까?' : '지원을 거절하시겠습니까?'}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                {confirmAction.type === 'accept'
                  ? '수락하면 지원자에게 알림이 전송되고 팀원으로 합류하게 됩니다.'
                  : '거절하면 지원자에게 거절 알림이 전송됩니다.'}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setConfirmAction(null)}
                >
                  취소
                </Button>
                <Button
                  className={`flex-1 ${
                    confirmAction.type === 'accept'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                  onClick={handleConfirm}
                >
                  {confirmAction.type === 'accept' ? '수락하기' : '거절하기'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Scrollable applicant list */}
        <div className="flex-1 overflow-y-auto">
          {applicants.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">아직 지원자가 없습니다</p>
              <p className="text-sm text-gray-500 mt-1">커뮤니티에 공유하면 더 많은 메이커에게 노출됩니다</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {/* Guide */}
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800">
                  각 지원자의 소개와 스킬을 검토한 후 수락 또는 거절하세요. 수락 시 지원자에게 알림이 전송됩니다.
                </p>
              </div>

              {applicants.map((applicant) => {
                const effectiveStatus = completedActions[applicant.id] ?? applicant.status;
                const statusConfig = getStatusConfig(effectiveStatus);
                const StatusIcon = statusConfig.icon;
                const isNew = notifications.some(n => n.applicationId === applicant.id && !n.isRead);

                return (
                  <Card
                    key={applicant.id}
                    className={`p-5 transition-all ${
                      effectiveStatus === 'accepted'
                        ? 'border-green-200 bg-green-50'
                        : effectiveStatus === 'rejected'
                        ? 'border-red-100 bg-red-50 opacity-70'
                        : 'border-gray-200 bg-white hover:shadow-md'
                    }`}
                  >
                    {/* Applicant Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className={`font-bold text-lg ${
                            effectiveStatus === 'accepted'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {applicant.applicantInitial}
                          </AvatarFallback>
                        </Avatar>
                        {isNew && effectiveStatus === 'pending' && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-900">{applicant.applicantName}</span>
                          {isNew && effectiveStatus === 'pending' && (
                            <Badge className="bg-red-100 text-red-600 border-0 text-xs">새 지원</Badge>
                          )}
                          <Badge className={`${statusConfig.bg} ${statusConfig.text} border-0 text-xs ml-auto flex items-center gap-1`}>
                            <StatusIcon className={`w-3 h-3 ${statusConfig.iconColor}`} />
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{applicant.appliedAt} 지원</p>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-white border border-gray-100 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-800 leading-relaxed">{applicant.message}</p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {applicant.skills.map(skill => (
                        <Badge key={skill} className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                          <Star className="w-2.5 h-2.5 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Portfolio */}
                    {applicant.portfolio && (
                      <div className="flex items-center gap-1.5 text-sm text-blue-600 mb-4">
                        <Link2 className="w-3.5 h-3.5" />
                        <a href="#" className="hover:underline text-xs">{applicant.portfolio}</a>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {effectiveStatus === 'pending' && (
                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleReject(applicant)}
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1.5" />
                          거절
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleAccept(applicant)}
                        >
                          <Handshake className="w-3.5 h-3.5 mr-1.5" />
                          수락하기
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-200 text-gray-600"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    )}

                    {effectiveStatus === 'accepted' && (
                      <div className="flex items-center gap-2 pt-3 border-t border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700 font-medium">팀원으로 수락되었습니다</span>
                        <Button size="sm" variant="outline" className="ml-auto border-green-300 text-green-700 hover:bg-green-50 text-xs">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          연락하기
                        </Button>
                      </div>
                    )}

                    {effectiveStatus === 'rejected' && (
                      <div className="flex items-center gap-2 pt-3 border-t border-red-100">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-500">거절됨</span>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex-shrink-0 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              수락된 팀원은 프로젝트에 자동으로 추가됩니다
            </p>
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
