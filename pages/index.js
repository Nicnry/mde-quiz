import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CHAPITRES, TOTAL_QUESTIONS, TOTAL_FLASHCARDS } from '../data/cours'
import { loadProgress, resetProgress } from '../components/QuizEngine'
import NavHeader from '../components/NavHeader'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#7c6aff', text:'#e2e8f0', muted:'#64748b', good:'#10b981', warn:'#f59e0b',
}

export default function Home() {
  const [progress, setProgress] = useState({})
  useEffect(() => { setProgress(loadProgress()) }, [])

  const totalOk = Object.values(progress).filter(v=>v===true).length
  const globalPct = TOTAL_QUESTIONS > 0 ? Math.round(totalOk/TOTAL_QUESTIONS*100) : 0
  const hasProgress = Object.keys(progress).length > 0

  function handleReset() {
    if (confirm('Réinitialiser toute la progression ?')) { resetProgress(); setProgress({}) }
  }

  return (
    <>
      <Head>
        <title>MDE Quiz 62-41.2</title>
        <meta name="description" content="Révision complète MDE — 100% du cours avec théorie et pratique" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>" />
      </Head>

      <div style={{ minHeight:'100vh', background:C.bg }}>
        <NavHeader titre="MDE Quiz" />

        {/* Hero */}
        <div style={{ background:'linear-gradient(135deg,#0d0f18,#13162a 50%,#1a0a2e)', borderBottom:`1px solid ${C.border}`, padding:'clamp(32px,6vw,64px) 20px clamp(28px,5vw,48px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, opacity:0.04, backgroundImage:'linear-gradient(#7c6aff 1px,transparent 1px),linear-gradient(90deg,#7c6aff 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }} />

          <div style={{ position:'relative', maxWidth:720, margin:'0 auto' }}>
            <div style={{ display:'inline-block', background:'#7c6aff22', border:'1px solid #7c6aff44', borderRadius:8, padding:'4px 14px', color:C.accent, fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:20 }}>
              62-41.2 · INGÉNIERIE PILOTÉE PAR LES MODÈLES DE DONNÉES
            </div>

            <h1 style={{ fontSize:'clamp(22px,6vw,44px)', fontWeight:900, color:C.text, marginBottom:12, lineHeight:1.2 }}>
              Cours MDE complet
              <br />
              <span style={{ background:'linear-gradient(135deg,#7c6aff,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Théorie · Pratique · VP · ODM
              </span>
            </h1>

            <p style={{ color:C.muted, fontSize:'clamp(13px,3vw,16px)', marginBottom:28, lineHeight:1.6 }}>
              <strong style={{ color:C.text }}>{TOTAL_QUESTIONS} questions</strong> · {TOTAL_FLASHCARDS} flashcards · {CHAPITRES.length} chapitres<br />
              Extrait des slides du professeur Camus
            </p>

            {/* Progression */}
            {hasProgress && (
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'16px 20px', marginBottom:24, display:'inline-block', minWidth:'min(300px,100%)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ color:C.muted, fontSize:12 }}>Progression globale</span>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ color:C.accent, fontWeight:700, fontSize:12 }}>{totalOk}/{TOTAL_QUESTIONS}</span>
                    <button onClick={handleReset} style={{ background:'transparent', border:`1px solid ${C.border}`, color:C.muted, borderRadius:5, padding:'2px 7px', fontSize:10 }}>Reset</button>
                  </div>
                </div>
                <div style={{ background:C.border, borderRadius:99, height:8, marginBottom:6 }}>
                  <div style={{ width:`${globalPct}%`, background:`linear-gradient(90deg,${C.accent},${C.good})`, borderRadius:99, height:8, transition:'width 0.6s' }} />
                </div>
                <div style={{ color:C.text, fontWeight:800, fontSize:20 }}>
                  {globalPct}%
                  <span style={{ color:C.muted, fontWeight:400, fontSize:12, marginLeft:8 }}>
                    {globalPct>=80?'🎯 Prêt pour l\'examen !':globalPct>=50?'💪 Continue !':'📚 On s\'y met !'}
                  </span>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="hero-actions">
              <Link href="/quiz" style={{ display:'block' }}>
                <div style={{ background:'linear-gradient(135deg,#7c6aff,#8b5cf6)', color:'#fff', padding:'15px 28px', borderRadius:12, fontWeight:700, fontSize:16, boxShadow:'0 0 30px #7c6aff33', minHeight:52, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  🚀 Quiz Complet
                </div>
              </Link>
              <Link href="/flashcards" style={{ display:'block' }}>
                <div style={{ background:C.surface, color:C.text, border:`1px solid ${C.border}`, padding:'15px 28px', borderRadius:12, fontWeight:700, fontSize:16, minHeight:52, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  🃏 Flashcards
                </div>
              </Link>
              <Link href="/odm" style={{ display:'block' }}>
                <div style={{ background:C.surface, color:'#f97316', border:`1px solid #f9731644`, padding:'15px 28px', borderRadius:12, fontWeight:700, fontSize:16, minHeight:52, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  🟠 Guide ODM
                </div>
              </Link>
              <Link href="/transformations" style={{ display:'block' }}>
                <div style={{ background:C.surface, color:'#e8a020', border:`1px solid #e8a02044`, padding:'15px 28px', borderRadius:12, fontWeight:700, fontSize:16, minHeight:52, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  🗄️ Transformations
                </div>
              </Link>
              <Link href="/theorie" style={{ display:'block' }}>
                <div style={{ background:C.surface, color:C.text, border:`1px solid ${C.border}`, padding:'15px 28px', borderRadius:12, fontWeight:700, fontSize:16, minHeight:52, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  📖 Cours
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Grille chapitres */}
        <div style={{ maxWidth:980, margin:'0 auto', padding:'32px 16px 60px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
            <h2 style={{ color:C.text, fontSize:20, fontWeight:700 }}>📚 Chapitres</h2>
            <span style={{ color:C.muted, fontSize:12 }}>{CHAPITRES.length} chapitres · {TOTAL_QUESTIONS} questions</span>
          </div>
          <p style={{ color:C.muted, fontSize:13, marginBottom:20 }}>Chaque chapitre contient le cours théorique + le quiz</p>

          <div className="chapitres-grid">
            {CHAPITRES.map(ch => {
              const chOk = ch.questions.filter(q=>progress[q.id]===true).length
              const chAnswered = ch.questions.filter(q=>progress[q.id]!==undefined).length
              const pct = ch.questions.length > 0 ? Math.round(chOk/ch.questions.length*100) : 0
              const pctColor = pct>=80?C.good:pct>=50?C.warn:C.bad

              return (
                <Link key={ch.id} href={`/quiz/${ch.id}`} style={{ textDecoration:'none', display:'block' }}>
                  <div style={{ background:C.card, border:`1px solid ${ch.couleur}33`, borderRadius:14, padding:'16px 18px', cursor:'pointer', transition:'transform 0.15s,box-shadow 0.15s', height:'100%' }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${ch.couleur}22` }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
                  >
                    <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:12 }}>
                      <span style={{ fontSize:24, flexShrink:0 }}>{ch.emoji}</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:2 }}>{ch.titre}</div>
                        <div style={{ color:C.muted, fontSize:11, lineHeight:1.4, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{ch.description}</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ color:C.muted, fontSize:11 }}>{ch.questions.length} questions</span>
                      {chAnswered > 0 && <span style={{ color:pctColor, fontSize:11, fontWeight:700 }}>{pct}%</span>}
                    </div>
                    <div style={{ background:C.border, borderRadius:99, height:4 }}>
                      <div style={{ width:`${pct}%`, background:`linear-gradient(90deg,${ch.couleur},${ch.couleur}88)`, borderRadius:99, height:4, transition:'width 0.5s', minWidth:pct>0?6:0 }} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
