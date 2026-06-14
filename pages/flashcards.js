import Head from 'next/head'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { FLASHCARDS } from '../data/cours'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#7c6aff', text:'#e2e8f0', muted:'#64748b', good:'#10b981', warn:'#f59e0b',
}

export default function Flashcards() {
  const cards = useMemo(() => [...FLASHCARDS].sort(()=>Math.random()-0.5), [])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState([])
  const [review, setReview] = useState([])
  const [done, setDone] = useState(false)

  const card = cards[idx]

  function next() { setFlipped(false); setTimeout(()=>setIdx(i=>{ if(i+1>=cards.length){setDone(true);return i}; return i+1 }),150) }
  function handleKnown() { setKnown(k=>[...k,idx]); next() }
  function handleReview() { setReview(r=>[...r,idx]); next() }
  function restart() { setIdx(0); setFlipped(false); setKnown([]); setReview([]); setDone(false) }

  const pct = Math.round(idx/cards.length*100)

  if (done) return (
    <>
      <Head><title>Flashcards — MDE</title></Head>
      <div style={{ minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
        <div style={{ maxWidth:400, width:'100%', background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:32, textAlign:'center' }}>
          <div style={{ fontSize:52, marginBottom:16 }}>{known.length>=cards.length*0.8?'🎯':known.length>=cards.length*0.5?'👍':'📚'}</div>
          <h2 style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:16 }}>Terminé !</h2>
          <div style={{ display:'flex', gap:12, justifyContent:'center', marginBottom:24 }}>
            <div style={{ background:C.good+'18', border:`1px solid ${C.good}44`, borderRadius:8, padding:'10px 24px' }}>
              <div style={{ color:C.good, fontSize:24, fontWeight:800 }}>{known.length}</div>
              <div style={{ color:C.muted, fontSize:12 }}>Maîtrisés</div>
            </div>
            <div style={{ background:C.warn+'18', border:`1px solid ${C.warn}44`, borderRadius:8, padding:'10px 24px' }}>
              <div style={{ color:C.warn, fontSize:24, fontWeight:800 }}>{review.length}</div>
              <div style={{ color:C.muted, fontSize:12 }}>À revoir</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={restart} style={{ flex:1, background:`linear-gradient(135deg,${C.accent},#8b5cf6)`, border:'none', borderRadius:10, padding:'12px 0', color:'#fff', fontWeight:700, fontSize:14 }}>🔄 Recommencer</button>
            <Link href="/" style={{ flex:1 }}>
              <button style={{ width:'100%', background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:'12px 0', color:C.muted, fontWeight:600, fontSize:14 }}>← Accueil</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Head><title>Flashcards MDE — {idx+1}/{cards.length}</title></Head>
      <div style={{ minHeight:'100vh', background:C.bg }}>
        {/* Header */}
        <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:'12px 20px', display:'flex', alignItems:'center', gap:12, position:'sticky', top:0, zIndex:10 }}>
          <Link href="/" style={{ color:C.muted, fontSize:22 }}>←</Link>
          <span style={{ fontSize:20 }}>🃏</span>
          <div style={{ flex:1 }}>
            <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>Flashcards MDE</div>
            <div style={{ color:C.muted, fontSize:12 }}>{idx+1} / {cards.length}</div>
          </div>
          <span style={{ color:C.good, fontSize:13, fontWeight:700 }}>✓ {known.length}</span>
          <span style={{ color:C.warn, fontSize:13, fontWeight:700 }}>↻ {review.length}</span>
        </div>

        {/* Progress */}
        <div style={{ background:C.border, height:3 }}>
          <div style={{ width:`${pct}%`, height:3, background:`linear-gradient(90deg,${C.accent},${C.good})`, transition:'width 0.4s' }} />
        </div>

        {/* Card avec flip CSS */}
        <div style={{ maxWidth:580, margin:'0 auto', padding:'36px 20px' }}>
          <div onClick={()=>setFlipped(v=>!v)} style={{ width:'100%', minHeight:260, cursor:'pointer', perspective:'1000px', marginBottom:24 }}>
            <div style={{ position:'relative', width:'100%', minHeight:260, transformStyle:'preserve-3d', transition:'transform 0.45s ease', transform:flipped?'rotateY(180deg)':'none' }}>
              {/* Recto */}
              <div style={{ position:'absolute', width:'100%', minHeight:260, backfaceVisibility:'hidden', background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'32px 28px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
                <div style={{ color:C.muted, fontSize:11, fontWeight:700, marginBottom:16, letterSpacing:1 }}>TERME · Clique pour retourner</div>
                <div style={{ background:C.accent+'18', border:`1px solid ${C.accent}33`, borderRadius:10, padding:'14px 28px', color:C.text, fontSize:22, fontWeight:800, fontFamily:'monospace' }}>{card.recto}</div>
              </div>
              {/* Verso */}
              <div style={{ position:'absolute', width:'100%', minHeight:260, backfaceVisibility:'hidden', transform:'rotateY(180deg)', background:C.accent+'10', border:`1px solid ${C.accent}44`, borderRadius:16, padding:'28px 24px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
                <div style={{ color:C.muted, fontSize:11, fontWeight:700, marginBottom:14, letterSpacing:1 }}>DÉFINITION</div>
                <div style={{ color:C.text, fontSize:14.5, lineHeight:1.7 }}>{card.verso}</div>
              </div>
            </div>
          </div>

          {flipped ? (
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={handleReview} style={{ flex:1, background:C.warn+'18', border:`1.5px solid ${C.warn}`, borderRadius:10, padding:'14px 0', color:C.warn, fontWeight:700, fontSize:14 }}>↻ À revoir</button>
              <button onClick={handleKnown} style={{ flex:1, background:C.good+'18', border:`1.5px solid ${C.good}`, borderRadius:10, padding:'14px 0', color:C.good, fontWeight:700, fontSize:14 }}>✓ Je sais !</button>
            </div>
          ) : (
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={()=>setFlipped(true)} style={{ flex:1, background:`linear-gradient(135deg,${C.accent},#8b5cf6)`, border:'none', borderRadius:10, padding:'14px 0', color:'#fff', fontWeight:700, fontSize:15 }}>👆 Retourner</button>
              <button onClick={next} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:'14px 18px', color:C.muted, fontWeight:600, fontSize:14 }}>→</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
