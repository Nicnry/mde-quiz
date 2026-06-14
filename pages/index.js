import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CHAPITRES, TOTAL_QUESTIONS, TOTAL_FLASHCARDS } from '../data/cours'
import { loadProgress, resetProgress } from '../components/QuizEngine'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#7c6aff', text:'#e2e8f0', muted:'#64748b', good:'#10b981', warn:'#f59e0b', bad:'#ef4444'
}

export default function Home() {
  const [progress, setProgress] = useState({})
  useEffect(() => { setProgress(loadProgress()) }, [])

  const totalOk = Object.values(progress).filter(v=>v===true).length
  const totalAnswered = Object.values(progress).filter(v=>v!==undefined).length
  const globalPct = TOTAL_QUESTIONS > 0 ? Math.round(totalOk/TOTAL_QUESTIONS*100) : 0

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
        {/* Hero */}
        <div style={{ background:'linear-gradient(135deg, #0d0f18, #13162a 50%, #1a0a2e)', borderBottom:`1px solid ${C.border}`, padding:'56px 20px 40px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          {/* Grille déco */}
          <div style={{ position:'absolute', inset:0, opacity:0.04, backgroundImage:'linear-gradient(#7c6aff 1px, transparent 1px), linear-gradient(90deg, #7c6aff 1px, transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }} />

          <div style={{ position:'relative', maxWidth:720, margin:'0 auto' }}>
            <div style={{ display:'inline-block', background:'#7c6aff22', border:'1px solid #7c6aff44', borderRadius:8, padding:'4px 14px', color:C.accent, fontSize:12, fontWeight:700, letterSpacing:1, marginBottom:20 }}>
              62-41.2 · INGÉNIERIE PILOTÉE PAR LES MODÈLES DE DONNÉES
            </div>

            <h1 style={{ fontSize:'clamp(26px,5vw,46px)', fontWeight:900, color:C.text, marginBottom:14, lineHeight:1.2 }}>
              Cours MDE complet
              <br />
              <span style={{ background:'linear-gradient(135deg,#7c6aff,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Théorie · Pratique · VP · ODM
              </span>
            </h1>

            <p style={{ color:C.muted, fontSize:16, marginBottom:28, lineHeight:1.6 }}>
              <strong style={{ color:C.text }}>{TOTAL_QUESTIONS} questions</strong> · {TOTAL_FLASHCARDS} flashcards · {CHAPITRES.length} chapitres<br />
              Extrait directement des slides, documents et exemples du professeur Camus
            </p>

            {/* Stats globales */}
            {totalAnswered > 0 ? (
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'18px 24px', marginBottom:28, display:'inline-block', minWidth:300 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <span style={{ color:C.muted, fontSize:13 }}>Progression globale</span>
                  <span style={{ color:C.accent, fontWeight:700, fontSize:13 }}>{totalOk}/{TOTAL_QUESTIONS} correctes</span>
                </div>
                <div style={{ background:C.border, borderRadius:99, height:8, marginBottom:8 }}>
                  <div style={{ width:`${globalPct}%`, background:`linear-gradient(90deg,${C.accent},${C.good})`, borderRadius:99, height:8, transition:'width 0.6s' }} />
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ color:C.text, fontWeight:800, fontSize:22 }}>{globalPct}%
                    <span style={{ color:C.muted, fontWeight:400, fontSize:13, marginLeft:8 }}>
                      {globalPct>=80?'🎯 Prêt pour l\'examen !':globalPct>=50?'💪 Continue !':'📚 On s\'y met !'}
                    </span>
                  </span>
                  <button onClick={handleReset} style={{ background:'transparent', border:`1px solid ${C.border}`, color:C.muted, borderRadius:6, padding:'4px 10px', fontSize:11 }}>Reset</button>
                </div>
              </div>
            ) : null}

            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/quiz" style={{ display:'inline-block', background:'linear-gradient(135deg,#7c6aff,#8b5cf6)', color:'#fff', padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16, boxShadow:'0 0 30px #7c6aff44' }}>
                🚀 Quiz Complet
              </Link>
              <Link href="/flashcards" style={{ display:'inline-block', background:C.surface, color:C.text, border:`1px solid ${C.border}`, padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16 }}>
                🃏 Flashcards ({TOTAL_FLASHCARDS})
              </Link>
              <Link href="/theorie" style={{ display:'inline-block', background:C.surface, color:C.text, border:`1px solid ${C.border}`, padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16 }}>
                📖 Cours complet
              </Link>
            </div>
          </div>
        </div>

        {/* Chapitres */}
        <div style={{ maxWidth:960, margin:'0 auto', padding:'36px 20px 60px' }}>
          <h2 style={{ color:C.text, fontSize:20, fontWeight:700, marginBottom:6 }}>📚 Chapitres</h2>
          <p style={{ color:C.muted, fontSize:13, marginBottom:24 }}>Clique sur un chapitre pour faire le quiz + accéder au cours de ce chapitre</p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(270px, 1fr))', gap:14 }}>
            {CHAPITRES.map(ch => {
              const chOk = ch.questions.filter(q=>progress[q.id]===true).length
              const chAnswered = ch.questions.filter(q=>progress[q.id]!==undefined).length
              const pct = ch.questions.length > 0 ? Math.round(chOk/ch.questions.length*100) : 0
              const pctColor = pct>=80?C.good:pct>=50?C.warn:C.bad

              return (
                <Link key={ch.id} href={`/quiz/${ch.id}`} style={{ textDecoration:'none' }}>
                  <div style={{ background:C.card, border:`1px solid ${ch.couleur}33`, borderRadius:14, padding:18, cursor:'pointer', transition:'transform 0.15s, box-shadow 0.15s', height:'100%' }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${ch.couleur}22` }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
                  >
                    <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 }}>
                      <span style={{ fontSize:26, flexShrink:0 }}>{ch.emoji}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:3 }}>{ch.titre}</div>
                        <div style={{ color:C.muted, fontSize:11 }}>{ch.description}</div>
                      </div>
                    </div>

                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
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
