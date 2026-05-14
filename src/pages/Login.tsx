import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { toast } from 'sonner';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('로그인 성공');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      toast.error('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-sphere opacity-30 pointer-events-none z-0" />

      <Card className="w-full max-w-md glass rounded-[32px] border-white/10 relative z-10 shadow-2xl">
        <CardHeader className="text-center pt-10">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,157,0.3)]">
              <Play className="text-black fill-current" size={28} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tighter">관리자 로그인</CardTitle>
          <div className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase mt-2">MediaPlate Admin</div>
        </CardHeader>
        <CardContent className="pb-12 px-10">
          <div className="space-y-8">
            <p className="text-center text-muted-foreground leading-relaxed">
              MediaPlate 관리자 페이지에 접속하려면<br />Google 계정으로 로그인하세요.
            </p>
            <Button 
              onClick={handleGoogleLogin} 
              className="w-full h-14 font-bold flex items-center justify-center gap-3 rounded-xl text-base"
            >
              <img src="https://www.gstatic.com/firebase/explore/google.svg" alt="Google" className="w-5 h-5" />
              Google로 로그인
            </Button>
            <div className="text-center">
              <Link to="/" className="text-xs text-muted-foreground hover:text-white transition-colors">
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
