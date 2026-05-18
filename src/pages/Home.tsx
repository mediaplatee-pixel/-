import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  Video, 
  GraduationCap, 
  Youtube, 
  Star, 
  X,
  ClipboardList,
  Search,
  Calendar,
  Film,
  MessageCircle,
  Download,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { collection, query, orderBy, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { Project, SiteSettings } from '@/types';

export default function Home() {
  const [projectsByCategory, setProjectsByCategory] = useState<Record<string, Project[]>>({
    'Educational': [],
    'InfoYouTube': [],
    'Corporate': []
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  // Hero Title Animation
  const titleWords = "복잡한 지식을 이해하기 쉬운 영상으로 설계합니다".split(" ");
  const containerVars = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  const childVars = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as SiteSettings);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();

    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
      
      const grouped: Record<string, Project[]> = {
        'Educational': allProjects.filter(p => p.category === 'Educational').slice(0, 3),
        'InfoYouTube': allProjects.filter(p => p.category === 'InfoYouTube' || p.category === 'YouTube').slice(0, 3),
        'Corporate': allProjects.filter(p => p.category === 'Corporate').slice(0, 3)
      };
      
      setProjectsByCategory(grouped);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });
    return unsubscribe;
  }, []);

  const categories = [
    { id: 'Educational', label: '교육 콘텐츠' },
    { id: 'Corporate', label: '기업 및 브랜드 영상' },
    { id: 'InfoYouTube', label: '정보전달 유튜브' }
  ];

  const whyUsData = [
    {
      number: "01",
      title: "이해하기 쉬운 콘텐츠 설계",
      description: "복잡한 내용도 시청자가 쉽게 이해할 수 있도록 구성과 흐름을 먼저 정리한 뒤 영상으로 제작합니다."
    },
    {
      number: "02",
      title: "섭외부터 납품까지 한 번에",
      description: "섭외, 설계, 촬영, 편집, 자막, 그래픽, 최종 납품까지 여러 업체를 따로 찾지 않아도 한 번에 진행할 수 있습니다."
    },
    {
      number: "03",
      title: "같이 일하기 좋은 제작 파트너",
      description: "교육·공공·기업 프로젝트 경험을 바탕으로 담당자가 안심하고 맡길 수 있는 안정적인 제작 과정을 제공합니다."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* ... Hero and Clients (no changes) ... */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Cinematic Animated Background Glows */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/20 blur-[160px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -120, 0],
              y: [0, 80, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full"
          />
        </div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10 text-center flex flex-col items-center">
          <div className="flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary text-sm font-bold tracking-[0.4em] uppercase mb-8"
            >
              EDUCATIONAL VIDEO PRODUCTION
            </motion.span>
            
            <motion.h1 
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.3] mb-10 max-w-4xl flex flex-wrap justify-center gap-x-4"
            >
              {titleWords.map((word, idx) => (
                <motion.span key={idx} variants={childVars} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-14"
            >
              미디어플레이트는 대학교, 공공기관, 기업의 교육 콘텐츠와 정보전달 영상을 <br className="hidden md:block" />
              기획부터 촬영, 편집, 디자인까지 원스톱으로 제작하는 영상 프로덕션입니다.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-row flex-wrap gap-4 justify-center"
            >
              <Link to="/contact">
                <Button size="lg" className="h-12 md:h-14 px-6 md:px-10 font-bold text-sm md:text-base rounded-sm text-black bg-primary hover:bg-primary/90">
                  2시간 이내 견적 받아보기
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="h-12 md:h-14 px-6 md:px-10 font-bold text-sm md:text-base rounded-sm glass border-white/10 hover:bg-white/5">
                  포트폴리오 확인하기
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section: Dynamic Text Rail */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01] relative overflow-hidden group">
        <div className="flex flex-col gap-8 md:gap-12 relative">
          {/* Edge Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#000] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#000] to-transparent z-10 pointer-events-none" />

          {/* Row 1: Forward Scroll */}
          <div className="flex overflow-hidden">
            <div className="marquee-rail">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-12 md:gap-24 items-center px-6 md:px-12">
                  {["삼성생명", "SK", "현대NGV", "롯데바이오로지스", "Kakao mobility"].map((client, idx) => (
                    <React.Fragment key={idx}>
                      <span className="text-2xl md:text-4xl font-black tracking-tighter text-white/40 hover:text-primary transition-all duration-300 cursor-default whitespace-nowrap uppercase">
                        {client}
                      </span>
                      <span className="text-white/10 font-thin">/</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Reverse Scroll */}
          <div className="flex overflow-hidden">
            <div className="marquee-rail-reverse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-12 md:gap-24 items-center px-6 md:px-12">
                  {["한국산업기술기획평가원", "경기과학기술대학교", "국립군산대학교 창업지원단", "한양대학교", "인천교육청교육연수원"].map((client, idx) => (
                    <React.Fragment key={idx}>
                      <span className="text-xl md:text-3xl font-bold tracking-tight text-white/40 hover:text-primary transition-all duration-300 cursor-default whitespace-nowrap">
                        {client}
                      </span>
                      <span className="text-white/10 font-thin">/</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned for High-Readability & Focus */}
      <section id="services" className="py-32 relative z-10 bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24 text-center md:text-left"
          >
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary px-4 py-1.5 font-bold uppercase tracking-[0.2em]">Service Excellence</Badge>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">제작 서비스</h2>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              기획부터 촬영, 편집까지 모든 과정을 <br className="hidden md:block" />
              압도적인 퀄리티로 완성하는 미디어플레이트의 핵심 서비스입니다.
            </p>
          </motion.div>
          
          <div className="flex flex-col">
            {[
              {
                id: "01",
                icon: <GraduationCap className="text-primary" />,
                title: "교육 콘텐츠 제작",
                description: "대학교 강의, 공공기관 교육, 온라인 클래스 등 복잡한 지식을 학습 흐름에 맞춰 이해하기 쉬운 영상으로 제작합니다.",
                tags: ["LMS 최적화", "모션 그래픽", "학습 설계"]
              },
              {
                id: "02",
                icon: <Video className="text-primary" />,
                title: "기업 사내교육·매뉴얼 영상",
                description: "임직원 교육, 안전교육, CS교육, 업무 매뉴얼 등 기업 내부 교육에 필요한 영상을 목적에 맞게 설계하고 제작합니다.",
                tags: ["직무 교육", "안전 매뉴얼", "조직 문화"]
              },
              {
                id: "03",
                icon: <Youtube className="text-primary" />,
                title: "정보전달형 유튜브 콘텐츠",
                description: "전문 지식과 브랜드 메시지를 시청자가 쉽게 이해하고 오래 기억할 수 있는 유튜브 콘텐츠로 제작합니다.",
                tags: ["채널 브랜딩", "전달력 최적화", "지식 큐레이션"]
              }
            ].map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Horizontal Line */}
                <div className="absolute top-0 left-0 w-full h-px bg-white/10 group-hover:bg-primary/30 transition-colors duration-500" />
                
                <div className="py-12 md:py-16 flex flex-col md:flex-row items-start gap-8 md:gap-24 relative group">
                  {/* Service Number & Icon */}
                  <div className="flex items-center gap-6 md:w-32 shrink-0">
                    <span className="text-4xl md:text-5xl font-black font-mono text-white/10 group-hover:text-primary/40 transition-colors duration-500 leading-none">
                      {service.id}
                    </span>
                    <div className="md:hidden p-3 rounded-xl bg-primary/5 text-primary">
                      {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24 })}
                    </div>
                  </div>

                  {/* Icon Tray (Desktop) */}
                  <div className="hidden md:flex p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500 shrink-0">
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 40, strokeWidth: 1.5 })}
                  </div>

                  {/* Content Body */}
                  <div className="flex-grow space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl break-keep">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Interaction Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="hidden lg:flex self-center opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500 text-primary">
                    <ArrowRight size={48} strokeWidth={1} />
                  </div>
                </div>

                {/* Last item bottom border */}
                {idx === 2 && (
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section (Moved Up) */}
      <section className="py-24 border-y border-white/10 glass relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem label="제작 프로젝트" value="500+" index={0} />
            <StatItem label="누적 조회수" value="10M+" index={1} />
            <StatItem label="파트너사" value="80+" index={2} />
            <StatItem label="고객 만족도" value="99%" index={3} />
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section id="portfolio" className="py-32 bg-neutral-900/30 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">PORTFOLIO</Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">최근 프로젝트</h2>
            </div>
            <Link to="/portfolio">
              <Button variant="ghost" className="text-muted-foreground hover:text-white group">
                전체보기 <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
          </div>

          <div className="space-y-24">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-12">
                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="h-px bg-white/10 flex-grow" />
                  <h3 className="text-sm font-bold text-primary uppercase tracking-[0.3em] whitespace-nowrap">{cat.label}</h3>
                  <div className="h-px bg-white/10 flex-grow" />
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {projectsByCategory[cat.id].length > 0 ? (
                    projectsByCategory[cat.id].map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="relative aspect-video overflow-hidden rounded-[24px] mb-6 glass border-white/10">
                          <motion.img 
                            src={project.thumbnailUrl} 
                            alt={project.title}
                            whileHover={{ scale: 1.1, filter: "saturate(1.2)" }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black">
                              <Play fill="currentColor" size={24} />
                            </div>
                          </div>
                        </div>
                        <div className="px-2 text-center md:text-left">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-1">
                            {project.title}
                          </h3>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-3 py-10 text-center glass rounded-[24px] border-dashed border-white/10">
                      <p className="text-muted-foreground italic text-sm">해당 카테고리의 하이엔드 영상이 준비 중입니다.</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work in Progress Section - Infinite Slider Flow */}
      <section id="wip" className="py-32 relative overflow-hidden bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10 mb-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-4 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live Production
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">프로덕션 현장 스케치</h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-sm md:text-right break-keep"
            >
              교육 영상 전문 제작진이 함께 <br /> 
              더 좋은 결과물을 위해 매 과정 최선을 다해 제작합니다.
            </motion.p>
          </div>
        </div>

        {/* Infinite Marquee Section */}
        <div className="relative flex overflow-hidden py-10 select-none">
          {/* First Row Moving Right */}
          <motion.div 
            animate={{ x: [0, -1920] }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              }
            }}
            className="flex flex-nowrap shrink-0 gap-6"
          >
            {[
              { src: "/src/assets/images/현장사진1.png", title: "프로페셔널 기획", scene: "SCENE 01" },
              { src: "/src/assets/images/현장사진2.png", title: "최첨단 장비 운용", scene: "SCENE 02" },
              { src: "/src/assets/images/현장사진3.png", title: "실시간 모니터링", scene: "SCENE 03" },
              { src: "/src/assets/images/현장사진4.png", title: "시네마틱 라이팅", scene: "SCENE 04" },
              { src: "/src/assets/images/현장사진5.png", title: "인터뷰 연출", scene: "SCENE 05" },
              // Duplicate for seamless loop
              { src: "/src/assets/images/현장사진1.png", title: "프로페셔널 기획", scene: "SCENE 01" },
              { src: "/src/assets/images/현장사진2.png", title: "최첨단 장비 운용", scene: "SCENE 02" },
              { src: "/src/assets/images/현장사진3.png", title: "실시간 모니터링", scene: "SCENE 03" },
              { src: "/src/assets/images/현장사진4.png", title: "시네마틱 라이팅", scene: "SCENE 04" },
              { src: "/src/assets/images/현장사진5.png", title: "인터뷰 연출", scene: "SCENE 05" },
            ].map((img, i) => (
              <div key={i} className="relative w-[300px] md:w-[450px] aspect-[3/2] rounded-3xl overflow-hidden group border border-white/5 shrink-0">
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{img.scene}</span>
                  <div className="text-sm font-bold mt-1 text-white">{img.title}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row Moving Left (Optional for more density) */}
        <div className="relative flex overflow-hidden pb-20 select-none">
          <motion.div 
            animate={{ x: [-1920, 0] }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              }
            }}
            className="flex flex-nowrap shrink-0 gap-6"
          >
            {[
              { src: "/src/assets/images/현장사진6.png", title: "정밀 컷편집", scene: "POST 01" },
              { src: "/src/assets/images/현장사진7.png", title: "모션 그래픽", scene: "POST 02" },
              { src: "/src/assets/images/현장사진8.png", title: "색보정 작업", scene: "POST 03" },
              { src: "/src/assets/images/현장사진9.png", title: "최종 검수", scene: "POST 04" },
              // Duplicate for seamless loop
              { src: "/src/assets/images/현장사진6.png", title: "정밀 컷편집", scene: "POST 01" },
              { src: "/src/assets/images/현장사진7.png", title: "모션 그래픽", scene: "POST 02" },
              { src: "/src/assets/images/현장사진8.png", title: "색보정 작업", scene: "POST 03" },
              { src: "/src/assets/images/현장사진9.png", title: "최종 검수", scene: "POST 04" },
            ].map((img, i) => (
              <div key={i} className="relative w-[250px] md:w-[350px] aspect-[3/2] rounded-[2rem] overflow-hidden group border border-white/5 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="text-[9px] font-bold text-primary uppercase">{img.scene}</span>
                  <div className="text-xs font-bold mt-0.5 text-white">{img.title}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Why MediaPlate Section (Refined for Focus & Clarity) */}
      <section id="why-mediaplate" className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[150px] rounded-full -z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="space-y-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <Badge variant="outline" className="mb-8 border-primary/30 text-primary uppercase tracking-[0.3em] px-4 py-1.5 font-bold">WHY MEDIAPLATE</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6 text-white break-keep">
                기획부터 납품까지,<br className="md:hidden" /> 
                <span className="text-primary italic">영상 제작의 모든 과정</span>을<br className="md:hidden" /> 설계합니다
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed break-keep">
                처음 시작하는 담당자도 고민 없이 맡길 수 있도록,<br className="hidden md:block" /> 
                복잡한 제작 절차를 가장 직관적이고 효율적으로 제안합니다.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "이해하기 쉬운 콘텐츠 설계",
                  description: "복잡한 내용도 시청자가 쉽게 이해할 수 있도록 구성과 흐름을 먼저 정리한 뒤 영상으로 제작합니다.",
                  icon: <Search size={24} />
                },
                {
                  title: "섭외부터 납품까지 한 번에",
                  description: "섭외, 설계, 촬영, 편집, 자막, 그래픽, 최종 납품까지 여러 업체를 따로 찾지 않아도 한 번에 진행할 수 있습니다.",
                  icon: <ClipboardList size={24} />
                },
                {
                  title: "같이 일하기 좋은 제작 파트너",
                  description: "교육·공공·기업 프로젝트 경험을 바탕으로 담당자가 안심하고 맡길 수 있는 안정적인 제작 과정을 제공합니다.",
                  icon: <CheckCircle2 size={24} />
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-primary/30 font-mono font-bold tracking-widest text-sm">POINT 0{i + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed break-keep">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Production Process Section - Horizontal Timeline Layout */}
      <section id="process" className="py-32 relative bg-neutral-950 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--primary-rgb),0.02),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary uppercase tracking-[0.2em] px-4 py-1.5 font-bold">Workflow</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">체계적인 제작 프로세스</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed break-keep">
              복잡한 과정은 저희가 설계하겠습니다. <br className="hidden md:block" /> 투명하고 효율적인 미디어플레이트만의 제작 시스템을 경험해보세요.
            </p>
          </motion.div>

          {/* Horizontal Timeline Container */}
          <div className="relative">
            {/* Desktop Connective Line */}
            <div className="hidden lg:block absolute top-[2.25rem] left-[5%] right-[5%] h-px bg-white/10 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-12 relative z-10">
              {[
                { id: "01", icon: <ClipboardList size={18} />, title: "문의/목적 확인", description: "영상의 목적, 활용 채널, 기초 자료를 확인합니다." },
                { id: "02", icon: <Search size={18} />, title: "자료 검토/견적", description: "원고, 촬영본 등을 검토하여 견적을 안내드립니다." },
                { id: "03", icon: <Calendar size={18} />, title: "기획/일정 확정", description: "구성안, 촬영 방식, 최종 일정을 확정합니다." },
                { id: "04", icon: <Film size={18} />, title: "촬영/디자인 제작", description: "기획에 맞춰 촬영 및 시각화 작업을 시작합니다." },
                { id: "05", icon: <MessageCircle size={18} />, title: "피드백/수정", description: "1차 결과물 전달 후 피드백을 꼼꼼히 반영합니다." },
                { id: "06", icon: <Download size={18} />, title: "최종 납품", description: "최적의 포맷으로 최종본을 납품하며 종료합니다." }
              ].map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Marker */}
                  <div className="w-18 h-18 rounded-full bg-neutral-900 border-2 border-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-black group-hover:border-primary group-hover:scale-110 transition-all duration-500 relative">
                    {step.icon}
                    <span className="absolute -top-3 -right-2 bg-neutral-950 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                      {step.id}
                    </span>
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex flex-col items-center max-w-[180px]">
                    <h3 className="text-lg font-bold mb-3 tracking-tight text-white group-hover:text-primary transition-colors whitespace-nowrap">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-snug break-keep text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow for Mobile/Tablet */}
                  {idx < 5 && (
                    <div className="lg:hidden mt-8 text-neutral-800">
                      <motion.div 
                        animate={{ y: [0, 5, 0] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Plus size={16} />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4 group hover:bg-primary/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <MessageCircle size={20} />
              </div>
              <div className="text-sm">
                <div className="font-bold text-white">2시간 이내 빠른 답변</div>
                <div className="text-muted-foreground whitespace-nowrap">평일 기준 제작 문의 시 담당 매니저가 확인 후 즉시 연락드립니다.</div>
              </div>
            </div>
            <div className="p-6 rounded-2xl glass border-white/5 flex items-center gap-4 group hover:bg-white/[0.05] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50">
                <ClipboardList size={20} />
              </div>
              <div className="text-sm">
                <div className="font-bold text-white">체계적인 전담 팀 구성</div>
                <div className="text-muted-foreground whitespace-nowrap">프로젝트의 성격에 최적화된 기획/촬영/편집 전문가가 배정됩니다.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-neutral-900/40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">자주 묻는 질문</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              문의 전 자주 궁금해하시는 내용을 정리했습니다.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "영상 제작이 처음인데 어떻게 진행하면 되나요?",
                a: "영상의 목적, 희망 분량, 제작 일정, 보유 자료 정도만 알려주셔도 상담이 가능합니다. 전달주신 내용을 바탕으로 담당 PD가 제작 방향과 필요한 범위를 정리해드리고, 예산에 맞는 제작 방식을 제안드립니다."
              },
              {
                q: "아직 기획이 정리되지 않았는데, 기획도 해주시나요?",
                a: "네, 가능합니다. 제작 목적과 활용 채널, 전달하고 싶은 핵심 내용만 알려주셔도 영상의 방향성을 함께 정리해드립니다. 필요에 따라 콘텐츠 구성, 대본 방향, 촬영 구성, 화면 연출 방식까지 제안드리며, 교육 영상의 경우 학습자가 이해하기 쉬운 흐름으로 기획을 도와드립니다."
              },
              {
                q: "원고나 PPT만 있어도 영상 제작이 가능한가요?",
                a: "네, 가능합니다. 원고, PPT, 교안, 스토리보드 등 기본 자료만 있어도 영상화가 가능하며, 필요에 따라 구성 정리, 화면 자료 삽입, 자막, 모션그래픽, 편집까지 함께 진행할 수 있습니다."
              },
              {
                q: "촬영부터 편집까지 한 번에 진행할 수 있나요?",
                a: "네, 가능합니다. 강의 영상, 인터뷰 영상, 교육 영상, 행사 영상 등 목적에 맞춰 촬영 기획부터 현장 촬영, 편집, 자막, 최종 납품까지 함께 진행합니다."
              },
              {
                q: "출연자나 강사 섭외도 가능한가요?",
                a: "네, 가능합니다. 프로젝트 성격에 따라 강사, 배우, 아나운서, 성우 등 필요한 출연자 섭외를 함께 도와드릴 수 있습니다. 섭외 범위와 비용은 출연자 유형, 촬영 일정, 활용 범위에 따라 별도 협의 후 안내드립니다."
              },
              {
                q: "일반 영상 제작과 미디어플레이트의 교육 영상 제작은 어떤 점이 다른가요?",
                a: "미디어플레이트는 단순히 보기 좋은 영상보다, 학습자가 내용을 쉽게 이해하고 끝까지 따라올 수 있는 교육 영상 제작을 중요하게 생각합니다. 강의 흐름, PPT 자료 구성, 자막 가독성, 핵심 내용 강조, 화면 전환 방식 등을 교육 콘텐츠에 맞게 설계하며, 대학교 이러닝, 공공기관 교육 영상, 기업 사내교육 영상 제작 경험을 바탕으로 안정적인 제작 프로세스를 제공합니다."
              },
              {
                q: "제작 기간은 얼마나 걸리나요?",
                a: "영상의 분량과 제작 방식에 따라 달라집니다. 단순 편집은 비교적 빠르게 진행 가능하며, 촬영과 디자인, 모션그래픽이 포함되는 경우에는 일정 협의 후 제작 기간을 안내드립니다."
              },
              {
                q: "수정은 몇 회까지 가능한가요?",
                a: "기본 수정은 2회까지 무료로 진행됩니다. 또한 납품 후 발견되는 오탈자나 내용 오류에 대한 수정은 6개월간 무상으로 지원해드립니다. 다만, 최초 협의된 기획 방향이나 구성 자체가 크게 변경되는 경우에는 추가 비용이 발생할 수 있습니다."
              },
              {
                q: "견적은 언제 받을 수 있나요?",
                a: "문의 내용을 남겨주시면 최대한 빠르게 확인 후 견적을 안내드립니다. 제작 목적, 영상 분량, 촬영 여부, 납품 일정이 함께 전달되면 더 정확한 견적 확인이 가능합니다."
              }
            ].map((faq, idx) => (
              <FaqItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-xs font-bold tracking-widest text-primary uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Fast Response Guarantee
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
              지금 고민 중인 프로젝트,<br />
              <span className="text-primary">함께 시작해볼까요?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground">
              문의를 남겨주시면 <span className="text-white font-bold underline underline-offset-4 decoration-primary/50">평일 2시간 이내</span>로 전담 제작팀이 직접 연락드립니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <a 
                href="https://pf.kakao.com/_your_id" 
                target="_blank" 
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  "w-full sm:w-auto h-16 px-10 rounded-2xl bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#3C1E1E] font-black text-lg gap-3"
                )}
              >
                <Play size={20} className="fill-current" />
                카카오톡으로 빠른 문의
              </a>
              <Link 
                to="/contact"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  "w-full sm:w-auto h-16 px-10 rounded-2xl border-white/10 hover:bg-white/5 font-bold text-lg gap-3"
                )}
              >
                온라인 문의하기
              </Link>
            </div>
            
            <p className="text-xs text-muted-foreground/60">
              *주말 및 공휴일 접수 건은 익영업일 오전 중으로 연락드립니다.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative background blur */}
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video glass-dark p-1 rounded-3xl border border-white/10 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-6 right-6 z-10 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>
              <div className="w-full h-full rounded-[22px] overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedProject.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]}`}
                  title={selectedProject.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function ServiceCard({ icon, title, description, index }: { icon: React.ReactNode, title: string, description: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="glass p-10 rounded-3xl hover:border-primary/50 transition-all group"
    >
      <div className="text-primary mb-8 group-hover:scale-110 transition-transform inline-block">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatItem({ label, value, index }: { label: string, value: string, index: number }) {
  const numericValue = parseInt(value.replace(/,/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9,]/g, '');
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const hasStarted = React.useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      let startTime: number | null = null;
      const duration = 2000;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeValue = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeValue * numericValue));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const timer = setTimeout(() => {
        requestAnimationFrame(animate);
      }, index * 150);

      return () => clearTimeout(timer);
    }
  }, [isInView, numericValue, index]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex items-baseline justify-center gap-2 md:gap-4"
    >
      <div className="text-3xl md:text-6xl font-bold text-primary tracking-tighter tabular-nums whitespace-nowrap">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-muted-foreground font-bold whitespace-nowrap">{label}</div>
    </motion.div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all hover:bg-white/[0.04]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold tracking-tight pr-8">{question}</span>
        <div className={cn(
          "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:border-primary/50 group-hover:text-primary shrink-0",
          isOpen && "bg-primary text-black border-primary"
        )}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-white/70 text-lg leading-relaxed break-keep">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

