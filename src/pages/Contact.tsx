import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock, ShieldCheck, Zap, ArrowRight, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden bg-neutral-950 min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary px-4 py-1.5 font-bold uppercase tracking-[0.2em]">Contact Us</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] break-keep">
            영상 제작이 <span className="text-primary">처음이어도 괜찮습니다</span>
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed break-keep font-medium">
              필요한 영상의 목적과 상황만 간단히 남겨주세요.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-12">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> All-in-One 서비스
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed break-keep">
                  출연자 섭외부터 기획, 촬영, 편집까지 미디어플레이트가 제작 과정에 맞춰 상세히 상담해드립니다.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 빠른 견적 안내
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed break-keep">
                  문의 내용을 확인한 후, <span className="text-white font-bold">2시간 이내</span>에 예상 견적과 진행 프로세스를 안내드립니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl mx-auto"
        >
          {/* Section Divider / Label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-2">
              Consultation Form <ArrowRight className="w-3 h-3" />
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google Forms Embed - Transparent and integrated */}
          <div className="w-full relative z-10 overflow-hidden">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSflh-WbHfV4ZCcCC_R0njoukP4G1YPlo5OZVpzJQ4cYOEyP6g/viewform?embedded=true"
              width="100%" 
              height="2400" 
              className="w-full border-0"
              title="제작 문의 폼"
              style={{ background: 'transparent', display: 'block' }}
              loading="lazy"
            >
              로드 중…
            </iframe>
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 mb-16"
        >
          <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-center overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(var(--primary-rgb),0.03),transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter break-keep">
                빠른 상담이 필요하시다면 <br className="md:hidden" />
                <span className="text-primary ml-2">카카오톡 문의하기</span>로 바로 문의주세요
              </h2>
              
              <p className="text-muted-foreground mb-10 font-medium break-keep leading-relaxed">
                실시간으로 담당 매니저가 확인 후 <br className="hidden md:block" />
                가장 빠르게 연락드려 궁금하신 점을 해결해 드립니다.
              </p>
              
              <div className="flex justify-center">
                <a 
                  href="https://open.kakao.com/o/sXXXXXXXX" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#FEE500] text-[#3c1e1e] rounded-2xl font-black text-xl shadow-[0_15px_30px_rgba(254,229,0,0.2)] hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  카카오톡 문의하기
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center opacity-40">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
            © {new Date().getFullYear()} MEDIA PLATE STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}
