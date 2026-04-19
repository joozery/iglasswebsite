'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Article {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  createdAt: string;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const id = params.id;
        if (!id) return;
        const res = await fetch(`http://localhost:5001/api/articles/${id}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
        router.push('/articles');
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-thai text-zinc-950">
        <div className="w-10 h-10 border-4 border-zinc-50 border-t-[#FFB800] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-white font-thai pb-60 pt-[80px]">
      
      {/* 1. Large Header Image */}
      <section className="relative h-[50vh] md:h-[60vh] w-full bg-zinc-50 overflow-hidden border-b border-zinc-100">
         {article.image ? (
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
         ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-100 font-black text-6xl italic opacity-30 uppercase tracking-tighter">IGLASS</div>
         )}
      </section>

      {/* 2. Article Header System */}
      <article className="max-w-4xl mx-auto px-6 mt-16">
         
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 pb-12 border-b border-zinc-100">
            <div className="space-y-4 flex-1">
               <div className="flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-[#FFB800]"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB800]">{article.category}</span>
               </div>
               <h1 className="text-3xl md:text-5xl font-black text-zinc-950 leading-[1.2] uppercase tracking-tight">
                  {article.title}
               </h1>
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
               <div className="w-12 h-12 rounded-full bg-zinc-950 flex items-center justify-center text-[#FFB800] text-sm font-black uppercase shadow-lg">
                  {article.author.charAt(0)}
               </div>
               <div>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">ผู้เขียน</p>
                  <p className="text-[14px] font-black text-zinc-950 uppercase">{article.author}</p>
               </div>
            </div>
         </div>

         {/* 3. Published Info & Back Link */}
         <div className="flex items-center justify-between mb-16 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <p>วันที่เผยแพร่: {new Date(article.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <Link href="/articles" className="hover:text-zinc-950 border-b border-transparent hover:border-zinc-950 transition-all">กลับไปหน้าบทความ</Link>
         </div>

         {/* 4. Article Content Area */}
         <div className="prose prose-zinc prose-lg max-w-none">
            <p className="text-[17px] md:text-[19px] text-zinc-700 font-semibold leading-[2] whitespace-pre-wrap selection:bg-[#FFB800] selection:text-black">
               {article.content}
            </p>
         </div>

         {/* 5. Footer CTA (Updated to 'Read More Articles') */}
         <div className="mt-32 pt-16 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
               <h4 className="text-2xl font-black text-zinc-950 uppercase tracking-tight">สนใจอ่านบทความอื่นเพิ่มเติม?</h4>
               <p className="text-zinc-400 text-[13px] font-semibold italic">อัปเดตเทรนด์แฟชั่นแว่นตาและสาระเรื่องดวงตาได้ที่นี่</p>
            </div>
            <Link href="/articles" className="bg-[#FFB800] text-black px-12 py-5 rounded-full font-black text-[12px] uppercase tracking-[3px] hover:bg-zinc-950 hover:text-white transition-all shadow-xl shadow-[#FFB800]/20 active:scale-95">
               ดูบทความทั้งหมด
            </Link>
         </div>

      </article>

    </div>
  );
}
