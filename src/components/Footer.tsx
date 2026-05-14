import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & Intro */}
          <div className="md:col-span-5 lg:col-span-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">
              미디어플레이트
            </Link>
            <p className="mt-6 text-muted-foreground max-w-sm leading-relaxed break-keep">
              교육 콘텐츠와 정보전달 영상을 전문으로 제작하는 영상 프로덕션으로 당신의 가치를 영상으로 증명합니다.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">사이트 맵</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">홈</Link></li>
              <li><Link to="/#services" className="hover:text-primary transition-colors">서비스</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">포트폴리오</Link></li>
              <li><Link to="/#process" className="hover:text-primary transition-colors">제작 프로세스</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">문의하기</Link></li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Contact & Info</h4>
            <div className="space-y-4 text-muted-foreground text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-xs font-mono uppercase">Email</span>
                <a href="mailto:mediaplatee@gmail.com" className="hover:text-primary transition-colors font-medium">
                  mediaplatee@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-xs font-mono uppercase">Call</span>
                <a href="tel:010-6584-7718" className="hover:text-primary transition-colors font-medium">
                  010-6584-7718
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-xs font-mono uppercase">Office</span>
                <p className="leading-relaxed">
                  서울특별시 구로구 디지털로 300, <br />
                  지밸리비즈플라자 12층
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 MediaPlate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
            <Link to="/terms" className="hover:text-white transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
