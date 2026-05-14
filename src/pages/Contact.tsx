import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden min-h-screen">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0" />
      <div className="fixed top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-sphere opacity-30 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Get in Touch</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">함께 시작하세요</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed">
              새로운 프로젝트에 대해 이야기해보고 싶으신가요? 
              언제든 편하게 문의해 주세요. 미디어플레이트가 당신의 비전을 현실로 만듭니다.
            </p>

            <div className="space-y-6">
              <ContactInfo icon={<Mail className="text-primary" size={20} />} label="이메일" value="contact@mediaplate.com" />
              <ContactInfo icon={<Phone className="text-primary" size={20} />} label="전화번호" value="02-1234-5678" />
              <ContactInfo icon={<MapPin className="text-primary" size={20} />} label="위치" value="서울특별시 강남구 테헤란로" />
            </div>

            <div className="mt-12 w-full h-64 rounded-[32px] overflow-hidden grayscale invert border border-white/10 glass relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.111811655655!2d127.03716037636737!3d37.50116662763351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3f868297745%3A0x673932822a96937e!2z7YWM7Zek656A66Gc!5e0!3m2!1sko!2skr!4v1713260000000!5m2!1sko!2skr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-50 group-hover:opacity-80 transition-opacity duration-700"
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-black/20 rounded-[32px]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-dark p-10 md:p-12 rounded-[40px] border border-white/10 shadow-2xl"
          >
            <form className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">성함 / 회사명</Label>
                <Input id="name" placeholder="홍길동" className="bg-white/5 border-white/10 h-14 rounded-xl px-6 focus:border-primary/50 transition-all" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">이메일</Label>
                <Input id="email" type="email" placeholder="example@email.com" className="bg-white/5 border-white/10 h-14 rounded-xl px-6 focus:border-primary/50 transition-all" />
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">문의 유형</Label>
                <select className="w-full h-14 rounded-xl bg-white/5 border border-white/10 px-6 text-sm focus:border-primary/50 outline-none transition-all appearance-none cursor-pointer">
                  <option className="bg-zinc-900">교육 콘텐츠 제작</option>
                  <option className="bg-zinc-900">유튜브 채널 브랜딩</option>
                  <option className="bg-zinc-900">기업 홍보 영상</option>
                  <option className="bg-zinc-900">기타</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">문의 내용</Label>
                <Textarea id="message" placeholder="프로젝트에 대해 자세히 설명해 주세요." className="bg-white/5 border-white/10 min-h-[180px] rounded-xl p-6 focus:border-primary/50 transition-all" />
              </div>
              <Button className="w-full h-16 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] transition-all">
                문의 보내기
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-all duration-500">
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">{label}</div>
        <div className="text-lg font-bold tracking-tight">{value}</div>
      </div>
    </div>
  );
}
