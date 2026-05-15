import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, Send, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    videoType: '',
    scope: [] as string[],
    length: '',
    episodes: '',
    filming: '',
    schedule: '',
    deliveryDate: '',
    budget: '',
    references: '',
    details: ''
  });

  const videoTypes = ["교육 영상", "기업/기관 홍보 영상", "사내교육 영상", "유튜브 콘텐츠", "강연/세미나 영상", "행사 영상", "모션그래픽 영상", "기타"];
  const scopes = ["기획부터 필요해요", "촬영이 필요해요", "편집이 필요해요", "자막 작업이 필요해요", "모션그래픽/인포그래픽이 필요해요", "썸네일/디자인 작업이 필요해요", "전체 제작이 필요해요", "아직 잘 모르겠어요"];
  const lengths = ["1분 이내", "3분 이내", "5분 이내", "10분 이내", "10~30분", "30분 이상", "아직 미정"];
  const episodeCounts = ["1편", "2~5편", "6~10편", "10편 이상", "아직 미정"];
  const filmingNeeds = ["촬영이 필요합니다", "이미 촬영본이 있습니다", "촬영 없이 자료 기반 제작을 원합니다", "아직 결정되지 않았습니다"];
  const schedules = ["1주 이내", "2주 이내", "1개월 이내", "2개월 이상", "협의 필요"];
  const budgets = ["100만 원 이하", "100만~300만 원", "300만~500만 원", "500만~1,000만 원", "1,000만 원 이상", "예산 협의 필요"];

  const toggleScope = (item: string) => {
    setFormData(prev => ({
      ...prev,
      scope: prev.scope.includes(item) 
        ? prev.scope.filter(i => i !== item)
        : [...prev.scope, item]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const data = await response.json();
        const errorMsg = data.error || data.message || '접수 중 오류가 발생했습니다.';
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error(`서버와의 통신에 실패했습니다. (사유: ${error instanceof Error ? error.message : '알 수 없는 오류'})`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-24 min-h-screen flex items-center justify-center bg-neutral-950">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 glass rounded-[40px] border border-primary/20 max-w-lg mx-auto"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">접수 완료</h2>
          <p className="text-muted-foreground leading-relaxed break-keep mb-8">
            문의가 정상적으로 접수되었습니다. <br />
            확인 후 빠르게 연락드리겠습니다.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full px-8 h-12">
            돌아가기
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 relative overflow-hidden bg-neutral-950 min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary px-4 py-1.5 font-bold uppercase tracking-[0.2em]">Inquiry</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
            프로젝트 <span className="text-primary italic">문의하기</span>
          </h1>
          <div className="relative inline-block">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed break-keep max-w-2xl mx-auto">
              제작하고자 하는 영상의 목적과 일정, 예산을 남겨주시면 <br className="hidden md:block" />
              담당자가 확인 후 프로젝트에 맞는 제작 방향과 견적을 안내드립니다. <br className="hidden md:block" />
              아직 구체적인 기획이 정해지지 않았더라도 괜찮습니다.
            </p>
            <Sparkles className="absolute -top-6 -right-8 text-primary/30 w-8 h-8 hidden md:block" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-16 rounded-[3rem] shadow-2xl overflow-hidden relative"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-16 relative z-10">
            {/* Step 1: Basic Info */}
            <div className="space-y-10">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold font-mono">01</div>
                <h3 className="text-2xl font-bold tracking-tight">기본 정보를 입력해주세요</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <FormGroup label="이름 / 담당자명" required>
                  <Input 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="성함을 입력해주세요" 
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-primary/50 transition-all" 
                  />
                </FormGroup>
                <FormGroup label="회사명 / 기관명" required>
                  <Input 
                    required 
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    placeholder="회사 혹은 기관명을 입력해주세요" 
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-primary/50 transition-all" 
                  />
                </FormGroup>
                <FormGroup label="연락처" required>
                  <Input 
                    required 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="010-0000-0000" 
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-primary/50 transition-all" 
                  />
                </FormGroup>
                <FormGroup label="이메일" required>
                  <Input 
                    required 
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="example@email.com" 
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-primary/50 transition-all" 
                  />
                </FormGroup>
              </div>
            </div>

            {/* Step 2: Project Details */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold font-mono">02</div>
                <h3 className="text-2xl font-bold tracking-tight">원하시는 영상에 대해 알려주세요</h3>
              </div>

              <FormGroup label="제작하고자 하는 영상 종류">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {videoTypes.map(type => (
                    <SelectionButton 
                      key={type} 
                      selected={formData.videoType === type}
                      onClick={() => setFormData({...formData, videoType: type})}
                    >
                      {type}
                    </SelectionButton>
                  ))}
                </div>
              </FormGroup>

              <FormGroup label="필요한 제작 범위 (복수 선택 가능)">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scopes.map(item => (
                    <SelectionButton 
                      key={item} 
                      selected={formData.scope.includes(item)}
                      onClick={() => toggleScope(item)}
                      multi
                    >
                      {item}
                    </SelectionButton>
                  ))}
                </div>
              </FormGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormGroup label="예상 영상 분량">
                  <select 
                    value={formData.length}
                    onChange={e => setFormData({...formData, length: e.target.value})}
                    className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all appearance-none text-sm cursor-pointer"
                  >
                    <option value="" className="bg-neutral-900">분량 선택</option>
                    {lengths.map(l => <option key={l} value={l} className="bg-neutral-900">{l}</option>)}
                  </select>
                </FormGroup>
                <FormGroup label="제작 편수">
                  <select 
                    value={formData.episodes}
                    onChange={e => setFormData({...formData, episodes: e.target.value})}
                    className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all appearance-none text-sm cursor-pointer"
                  >
                    <option value="" className="bg-neutral-900">편수 선택</option>
                    {episodeCounts.map(c => <option key={c} value={c} className="bg-neutral-900">{c}</option>)}
                  </select>
                </FormGroup>
              </div>

              <FormGroup label="촬영 필요 여부">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filmingNeeds.map(option => (
                    <SelectionButton 
                      key={option} 
                      selected={formData.filming === option}
                      onClick={() => setFormData({...formData, filming: option})}
                    >
                      {option}
                    </SelectionButton>
                  ))}
                </div>
              </FormGroup>
            </div>

            {/* Step 3: Schedule & Budget */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold font-mono">03</div>
                <h3 className="text-2xl font-bold tracking-tight">일정과 예산을 고려 중이신가요?</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormGroup label="희망 제작 일정">
                  <select 
                    value={formData.schedule}
                    onChange={e => setFormData({...formData, schedule: e.target.value})}
                    className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all appearance-none text-sm mb-4 cursor-pointer"
                  >
                    <option value="" className="bg-neutral-900">일정 선택</option>
                    {schedules.map(s => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
                  </select>
                  <Input 
                    value={formData.deliveryDate}
                    onChange={e => setFormData({...formData, deliveryDate: e.target.value})}
                    placeholder="희망 납품일이 있다면 적어주세요." 
                    className="bg-white/[0.03] border-white/10 rounded-xl"
                  />
                </FormGroup>
                <FormGroup label="예상 예산">
                  <select 
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 transition-all appearance-none text-sm cursor-pointer"
                  >
                    <option value="" className="bg-neutral-900">예산 범위 선택</option>
                    {budgets.map(b => <option key={b} value={b} className="bg-neutral-900">{b}</option>)}
                  </select>
                </FormGroup>
              </div>
            </div>

            {/* Step 4: References & Details */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold font-mono">04</div>
                <h3 className="text-2xl font-bold tracking-tight">기타 참고 사항을 자유롭게 적어주세요</h3>
              </div>

              <FormGroup label="참고 영상 / 자료">
                <Textarea 
                  value={formData.references}
                  onChange={e => setFormData({...formData, references: e.target.value})}
                  placeholder="참고 영상 링크, 기존 제작물, 기획서, 스토리보드, 원고 등이 있다면 링크로 남겨주세요." 
                  className="bg-white/[0.03] border-white/10 min-h-[120px] rounded-[2rem] px-8 py-6 focus:border-primary/50 transition-all resize-none"
                />
              </FormGroup>

              <FormGroup label="문의 내용">
                <Textarea 
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                  placeholder="제작 목적, 영상 활용처, 타깃 시청자, 원하는 분위기, 촬영 장소, 참고 영상, 일정 등을 자유롭게 작성해주세요. 아직 구체적으로 정해지지 않았더라도 괜찮습니다." 
                  className="bg-white/[0.03] border-white/10 min-h-[220px] rounded-[2rem] px-8 py-6 focus:border-primary/50 transition-all resize-none"
                />
              </FormGroup>
            </div>

            <div className="pt-12 text-center border-t border-white/5">
              <p className="text-sm text-muted-foreground mb-10 leading-relaxed font-medium">
                문의 내용을 자세히 남겨주실수록 보다 정확한 견적 안내가 가능합니다. <br />
                내용 확인 후 빠르게 연락드리겠습니다.
              </p>
              <Button 
                type="submit"
                size="lg" 
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-[320px] h-18 rounded-full text-xl font-bold shadow-[0_10px_40px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_15px_50px_rgba(var(--primary-rgb),0.3)] transition-all hover:-translate-y-1"
              >
                {isSubmitting ? (
                  <>
                    처리 중...
                    <Loader2 className="ml-3 w-6 h-6 animate-spin" />
                  </>
                ) : (
                  <>
                    견적 상담 요청하기
                    <Send className="ml-3 w-6 h-6" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function FormGroup({ label, children, required }: { label: string, children: React.ReactNode, required?: boolean }) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-bold flex items-center gap-2 ml-1 text-white">
        {label}
        {required && <span className="text-primary">*</span>}
      </Label>
      {children}
    </div>
  );
}

function SelectionButton({ children, selected, onClick, multi }: { children: React.ReactNode, selected: boolean, onClick: () => void, multi?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative px-6 py-4 rounded-2xl text-[13px] md:text-sm font-medium transition-all text-left flex items-center justify-between group/btn
        ${selected 
          ? 'bg-primary/20 border-primary/40 text-white ring-1 ring-primary/20' 
          : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/[0.05] hover:border-white/10 hover:text-white'
        }
        border
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className={`
        w-5 h-5 rounded-md border flex items-center justify-center transition-all
        ${selected 
          ? 'bg-primary border-primary text-black scale-100' 
          : 'border-white/10 group-hover/btn:border-primary/50 scale-90'
        }
      `}>
        {selected && <Check size={14} strokeWidth={4} />}
      </div>
    </button>
  );
}
