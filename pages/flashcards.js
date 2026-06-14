import Head from 'next/head'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { FLASHCARDS } from '../data/cours'
import NavHeader from '../components/NavHeader'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#7c6aff', text:'#e2e8f0', muted:'#64748b', good:'#10b981', warn:'#f59e0b',
}

export default function Flashcards() {
  const cards = useMemo(() => [...FLASHCARDS].sort(()=>Math.random()-0.5), [])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(new Set())
  const [review, setReview] = useState(new Set())
  const [done, setDone] = useState(false)

  const card = cards[idx]

  function goNext() {
    setFlipped(false)
    setTimeout(() => {
      if (idx + 1 >= cards.length) setDone(true)
      else setIdx(i => i + 1)
    }, 150)
  }

  function handleKnown() { setKnown(s => new Set([...s, idx])); goNext() }
  function handleReview() { setReview(s => new Set([...s, idx])); goNext() }

  function restart() {
    setIdx(0); setFlipped(false)
    setKnown(new Set()); setReview(new Set()); setDone(false)
  }

  const pct = Math.round(idx / cards.length * 100)

  if (done) return (
    <>
      <Head><title>Flashcards MDE — Terminé</title></Head>
      <div style={{ minHeight:'100vh', background:C.bg }}>
        <NavHeader titre="🃏 Flashcards" backHref="/" />
        <div style={{ maxWidth:480, margin:'0 auto', padding:'48px 20px' }}>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'32px 24px', textAlign:'center' }}>
            <div style={{ fontSize:52, marginBottom:16 }}>
              {known.size >= cards.length*0.8 ? '🎯' : known.size >= cards.length*0.5 ? '👍' : '📚'}
            </div>
            <h2 style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:20 }}>Série terminée !</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
              <div style={{ background:C.good+'18', border:`1px solid ${C.good}44`, borderRadius:12, padding:'16px 0' }}>
                <div style={{ color:C.good, fontSize:28, fontWeight:800 }}>{known.size}</div>
                <div style={{ color:C.muted, fontSize:12 }}>Maîtrisés ✓</div>
              </div>
              <div style={{ background:C.warn+'18', border:`1px solid ${C.warn}44`, borderRadius:12, padding:'16px 0' }}>
                <div style={{ color:C.warn, fontSize:28, fontWeight:800 }}>{review.size}</div>
                <div style={{ color:C.muted, fontSize:12 }}>À revoir ↻</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={restart} style={{ flex:1, background:`linear-gradient(135deg,${C.accent},#8b5cf6)`, border:'none', borderRadius:12, padding:'15px 0', color:'#fff', fontWeight:700, fontSize:15, minHeight:52 }}>
                🔄 Recommencer
              </button>
              <Link href="/" style={{ flex:1 }}>
                <button style={{ width:'100%', background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:'15px 0', color:C.muted, fontWeight:600, fontSize:15, minHeight:52 }}>
                  ← Accueil
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Head><title>Flashcards MDE — {idx+1}/{cards.length}</title></Head>
      <div style={{ minHeight:'100vh', background:C.bg }}>
        <NavHeader
          titre="🃏 Flashcards"
          backHref="/"
          actions={
            <div style={{ display:'flex', gap:8, alignItems:'center', flexShrink:0 }}>
              <span style={{ color:C.good, fontSize:13, fontWeight:700 }}>✓ {known.size}</span>
              <span style={{ color:C.muted, fontSize:13 }}>·</span>
              <span style={{ color:C.warn, fontSize:13, fontWeight:700 }}>↻ {review.size}</span>
            </div>
          }
        />

        {/* Barre de progression */}
        <div style={{ background:C.border, height:3 }}>
          <div style={{ width:`${pct}%`, height:3, background:`linear-gradient(90deg,${C.accent},${C.good})`, transition:'width 0.4s' }} />
        </div>

        <div style={{ maxWidth:600, margin:'0 auto', padding:'clamp(20px,5vw,40px) 16px' }}>
          {/* Compteur */}
          <div style={{ textAlign:'center', color:C.muted, fontSize:13, marginBottom:20 }}>
            {idx+1} / {cards.length}
          </div>

          {/* Carte flip CSS */}
          <div onClick={() => setFlipped(v=>!v)} style={{ width:'100%', minHeight:'clamp(200px,40vw,280px)', cursor:'pointer', perspective:'1200px', marginBottom:24 }}>
            <div style={{
              position:'relative', width:'100%', height:'clamp(200px,40vw,280px)',
              transformStyle:'preserve-3d',
              transition:'transform 0.45s cubic-bezier(.4,0,.2,1)',
              transform: flipped ? 'rotateY(180deg)' : 'none',
            }}>
              {/* Recto */}
              <div style={{
                position:'absolute', inset:0, backfaceVisibility:'hidden',
                background:C.card, border:`1px solid ${C.border}`, borderRadius:18,
                padding:'24px', display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center', textAlign:'center',
              }}>
                <div style={{ color:C.muted, fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:20 }}>
                  TERME · Tape pour retourner
                </div>
                <div style={{
                  background:C.accent+'18', border:`1px solid ${C.accent}33`, borderRadius:12,
                  padding:'12px 20px', color:C.text, fontSize:'clamp(16px,4vw,22px)',
                  fontWeight:800, fontFamily:'monospace', wordBreak:'break-word',
                }}>
                  {card.recto}
                </div>
                <div style={{ color:C.muted, fontSize:24, marginTop:20 }}>↕</div>
              </div>

              {/* Verso */}
              <div style={{
                position:'absolute', inset:0, backfaceVisibility:'hidden',
                transform:'rotateY(180deg)',
                background:C.accent+'10', border:`1px solid ${C.accent}44`, borderRadius:18,
                padding:'24px', display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center', textAlign:'center',
              }}>
                <div style={{ color:C.accent, fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:16 }}>
                  DÉFINITION
                </div>
                <div style={{ color:C.text, fontSize:'clamp(13px,3.5vw,15px)', lineHeight:1.7, wordBreak:'break-word' }}>
                  {card.verso}
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'évaluation */}
          {flipped ? (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <button onClick={handleReview} style={{ background:C.warn+'18', border:`1.5px solid ${C.warn}`, borderRadius:14, padding:'16px 0', color:C.warn, fontWeight:700, fontSize:16, minHeight:56 }}>
                ↻ À revoir
              </button>
              <button onClick={handleKnown} style={{ background:C.good+'18', border:`1.5px solid ${C.good}`, borderRadius:14, padding:'16px 0', color:C.good, fontWeight:700, fontSize:16, minHeight:56 }}>
                ✓ Je sais !
              </button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:10 }}>
              <button onClick={() => setFlipped(true)} style={{ background:`linear-gradient(135deg,${C.accent},#8b5cf6)`, border:'none', borderRadius:14, padding:'16px 0', color:'#fff', fontWeight:700, fontSize:16, minHeight:56 }}>
                👆 Retourner la carte
              </button>
              <button onClick={goNext} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'16px 20px', color:C.muted, fontWeight:600, fontSize:18, minHeight:56 }}>
                →
              </button>
            </div>
          )}

          {/* Hint */}
          {!flipped && (
            <p style={{ color:C.muted, fontSize:12, textAlign:'center', marginTop:12 }}>
              Clique sur la carte ou sur "Retourner" pour voir la définition
            </p>
          )}
        </div>
      </div>
    </>
  )
}
