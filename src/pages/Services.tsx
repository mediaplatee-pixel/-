import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const STEPS = [
  { title: '기획 및 전략', description: '클라이언트의 니즈를 분석하고 최적의 영상 전략을 수립합니다.' },
  { title: '스크립트 및 스토리보드', description: '메시지를 효과적으로 전달할 수 있는 대본과 구성안을 작성합니다.' },
  { title: '촬영', description: '최신 장비와 전문 인력을 투입하여 고퀄리티 소스를 확보합니다.' },
  { title: '편집 및 후반 작업', description: '컷 편집, 색보정, 자막, 사운드 디자인을 통해 완성도를 높입니다.' },
  { title: '피드백 및 납품', description: '클라이언트의 의견을 반영하여 최종 결과물을 전달합니다.' },
];

export default function Services() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">제작 프로세스</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            미디어플레이트는 체계적인 제작 공정을 통해 
            최상의 결과물을 보장합니다. 모든 단계에서 클라이언트와 긴밀하게 소통합니다.
          </p>
        </div>

        <div className="space-y-12">
          {STEPS.map((step, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              key={index}
              className="flex gap-8 items-start p-8 rounded-3xl bg-zinc-900/30 border border-white/5"
            >
              <div className="text-6xl font-black text-primary/20 shrink-0">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  {step.title}
                  <CheckCircle2 className="ml-3 text-primary" size={20} />
                </h3>
                <p className="text-lg text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
