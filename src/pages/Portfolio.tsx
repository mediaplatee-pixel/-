import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Play, X } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { Project } from '@/types';
// No need for ReactPlayer

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const filteredProjects = filter === 'All' 
    ? projects 
    : filter === 'InfoYouTube'
      ? projects.filter(p => p.category === 'InfoYouTube' || p.category === 'YouTube')
      : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8">포트폴리오</h1>
          
          <div className="flex flex-wrap gap-3">
            {['All', 'Educational', 'InfoYouTube', 'Corporate'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-primary text-black border-primary' 
                    : 'glass border-white/10 text-muted-foreground hover:text-white hover:border-white/20'
                }`}
              >
                {cat === 'All' ? '전체' : cat === 'Educational' ? '교육' : cat === 'InfoYouTube' ? '정보전달 유튜브' : '기업'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video glass rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 glass rounded-3xl">
            <p className="text-muted-foreground">등록된 프로젝트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl mb-6 glass border-white/10">
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black">
                      <Play fill="currentColor" size={24} />
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
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
