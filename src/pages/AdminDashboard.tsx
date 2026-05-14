import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  LogOut, 
  Plus,
  Trash2,
  Edit,
  Loader2,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '@/lib/firebase';
import { Project, SiteSettings as SiteSettingsType } from '@/types';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] glow-sphere opacity-30 pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className="w-72 glass-dark border-r border-white/10 p-8 flex flex-col relative z-10">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,255,157,0.3)]">
            <span className="text-black font-black text-xl">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter text-lg leading-none">ADMIN</span>
            <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">MediaPlate</span>
          </div>
        </div>

        <nav className="space-y-2 flex-grow">
          <SidebarLink to="/admin" icon={<LayoutDashboard size={20} />} label="대시보드" />
          <SidebarLink to="/admin/portfolio" icon={<FolderKanban size={20} />} label="포트폴리오 관리" />
          <SidebarLink to="/admin/settings" icon={<Settings size={20} />} label="사이트 설정" />
        </nav>

        <div className="pt-8 border-t border-white/5">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl px-4 py-6"
            onClick={() => {
              auth.signOut();
              navigate('/');
            }}
          >
            <LogOut className="mr-3" size={20} />
            <span className="font-bold">로그아웃</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="portfolio" element={<PortfolioManagement />} />
            <Route path="settings" element={<SiteSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-4 px-5 py-4 rounded-xl transition-all text-muted-foreground hover:text-primary hover:bg-white/5 group"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-bold tracking-tight">{label}</span>
    </Link>
  );
}

function DashboardHome() {
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      setProjectCount(snapshot.size);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col">
        <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Overview</span>
        <h1 className="text-4xl font-bold tracking-tighter">대시보드 개요</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="전체 프로젝트" value={projectCount.toString()} />
        <StatCard title="이번 달 문의" value="0" />
        <StatCard title="평균 로딩 속도" value="0.8s" />
      </div>

      <div className="glass rounded-[32px] p-10 border border-white/10">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse" />
          최근 활동
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm italic py-10 text-center glass rounded-2xl border-dashed border-white/10">
            최근 활동이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="glass rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all group">
      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
        {title}
      </div>
      <div className="text-4xl font-bold text-primary group-hover:scale-105 transition-transform origin-left">
        {value}
      </div>
    </div>
  );
}

function PortfolioManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'Educational',
    videoUrl: '',
    thumbnailUrl: '',
    description: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return unsubscribe;
  }, []);

  const openAddDialog = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Educational',
      videoUrl: '',
      thumbnailUrl: '',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      videoUrl: project.videoUrl,
      thumbnailUrl: project.thumbnailUrl,
      description: project.description
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateDoc(doc(db, 'projects', editingProject.id), formData);
        toast.success('프로젝트가 수정되었습니다.');
      } else {
        await addDoc(collection(db, 'projects'), {
          ...formData,
          createdAt: Date.now()
        });
        toast.success('프로젝트가 추가되었습니다.');
      }
      setIsDialogOpen(false);
    } catch (error) {
      handleFirestoreError(error, editingProject ? OperationType.UPDATE : OperationType.CREATE, 'projects');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      toast.success('삭제되었습니다.');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Content</span>
          <h1 className="text-4xl font-bold tracking-tighter">포트폴리오 관리</h1>
        </div>
        <Button className="font-bold h-12 px-8 rounded-xl" onClick={openAddDialog}>
          <Plus className="mr-2" size={20} /> 프로젝트 추가
        </Button>
      </div>

      <div className="glass rounded-[32px] overflow-hidden border border-white/10">
        {loading ? (
          <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" size={40} /></div>
        ) : (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent text-white">
                <TableHead className="py-6 px-8 font-bold text-white">제목</TableHead>
                <TableHead className="py-6 px-8 font-bold text-white">카테고리</TableHead>
                <TableHead className="py-6 px-8 font-bold text-white">날짜</TableHead>
                <TableHead className="py-6 px-8 font-bold text-white text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="border-white/5 hover:bg-white/3 transition-colors">
                  <TableCell className="py-6 px-8 font-medium">{project.title}</TableCell>
                  <TableCell className="py-6 px-8">
                    <Badge variant="outline" className="glass border-primary/20 text-primary px-3 py-1">
                      {project.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-6 px-8 text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-primary/10 hover:text-primary rounded-lg"
                        onClick={() => openEditDialog(project)}
                      >
                        <Edit size={18} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-destructive/10 hover:text-destructive rounded-lg" 
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-20 text-muted-foreground italic">
                    등록된 프로젝트가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <ProjectDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        title={editingProject ? '프로젝트 수정' : '프로젝트 추가'}
      />
    </div>
  );
}

function ProjectDialog({ isOpen, onClose, onSubmit, formData, setFormData, title }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-dark border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">제목</Label>
            <Input 
              required
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">카테고리</Label>
            <select 
              className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 text-sm outline-none focus:border-primary/50"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value as any})}
            >
              <option value="Educational">교육 콘텐츠 (Educational)</option>
              <option value="InfoYouTube">정보전달 유튜브 (InfoYouTube)</option>
              <option value="Corporate">기업 및 브랜드 (Corporate)</option>
              <option value="Other">기타 (Other)</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">유튜브 URL</Label>
            <Input 
              required
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.videoUrl} 
              onChange={e => {
                const url = e.target.value;
                let thumbnailUrl = '';
                const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                if (videoId) {
                  thumbnailUrl = `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`;
                }
                setFormData({...formData, videoUrl: url, thumbnailUrl});
              }}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">설명</Label>
            <textarea 
              className="w-full h-24 rounded-md bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-primary/50"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>취소</Button>
            <Button type="submit" className="font-bold">저장하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsType>({
    companyName: 'MediaPlate',
    primaryColor: '#00FF9D',
    secondaryColor: '#000000',
    contactEmail: 'contact@mediaplate.com',
    youtubeUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    teamMeetingImage: '',
    contentDesignImage: '',
    oneStopProductionImage: '',
    diverseExperienceImage: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as SiteSettingsType);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), settings);
      toast.success('설정이 저장되었습니다.');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/global');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col">
        <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Configuration</span>
        <h1 className="text-4xl font-bold tracking-tighter">사이트 설정</h1>
      </div>
      
      <div className="glass rounded-[32px] p-10 border border-white/10">
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">에이전시 이름</Label>
              <Input 
                value={settings.companyName} 
                onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                className="h-14 bg-white/5 border-white/10 rounded-xl px-6 focus:border-primary/50 transition-all" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">대표 이메일</Label>
              <Input 
                value={settings.contactEmail} 
                onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                className="h-14 bg-white/5 border-white/10 rounded-xl px-6 focus:border-primary/50 transition-all" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">메인 컬러 (Hex)</Label>
              <div className="flex space-x-4">
                <Input 
                  value={settings.primaryColor} 
                  onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-xl px-6 focus:border-primary/50 transition-all" 
                />
                <div 
                  className="w-14 h-14 rounded-xl border border-white/20 shadow-lg" 
                  style={{ backgroundColor: settings.primaryColor }}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/5">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-primary">팀 이미지 관리</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <ImageSettingItem 
                label="메인 팀 회의 이미지 URL" 
                value={settings.teamMeetingImage || ''} 
                onChange={(val) => setSettings({...settings, teamMeetingImage: val})}
              />
              <ImageSettingItem 
                label="콘텐츠 설계 이미지 URL" 
                value={settings.contentDesignImage || ''} 
                onChange={(val) => setSettings({...settings, contentDesignImage: val})}
              />
              <ImageSettingItem 
                label="원스톱 제작 이미지 URL" 
                value={settings.oneStopProductionImage || ''} 
                onChange={(val) => setSettings({...settings, oneStopProductionImage: val})}
              />
              <ImageSettingItem 
                label="다양한 경험 이미지 URL" 
                value={settings.diverseExperienceImage || ''} 
                onChange={(val) => setSettings({...settings, diverseExperienceImage: val})}
              />
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/5">
            <Button className="font-bold h-14 px-12 rounded-xl text-base" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="animate-spin mr-3" /> : null}
              설정 저장하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageSettingItem({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800 * 1024) {
        alert("사진 용량이 너무 큽니다. 800KB 이하의 사진을 권장합니다.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{label}</Label>
      <div className="flex flex-col space-y-3">
        <div className="flex gap-2">
          <Input 
            value={value.startsWith('data:') ? '직접 업로드된 이미지' : value} 
            placeholder="https://images.unsplash.com/..."
            onChange={(e) => onChange(e.target.value)}
            className="h-12 bg-white/5 border-white/10 rounded-xl px-4 focus:border-primary/50 transition-all text-xs" 
            readOnly={value.startsWith('data:')}
          />
          <div className="relative">
            <input
              type="file"
              id={`file-${label}`}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button 
              type="button" 
              variant="outline" 
              className="h-12 w-12 p-0 rounded-xl border-white/10 hover:bg-white/5"
              onClick={() => document.getElementById(`file-${label}`)?.click()}
            >
              <Upload size={18} />
            </Button>
          </div>
          {value.startsWith('data:') && (
            <Button 
              type="button" 
              variant="ghost" 
              className="h-12 px-4 rounded-xl text-xs text-destructive hover:text-destructive/80"
              onClick={() => onChange('')}
            >
              지우기
            </Button>
          )}
        </div>
        
        {value && (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        )}
      </div>
    </div>
  );
}
