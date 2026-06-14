import { useState, useEffect } from 'react'
import Link from 'next/link'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#7c6aff', text:'#e2e8f0', muted:'#64748b',
  good:'#10b981', bad:'#ef4444', warn:'#f59e0b',
}

function saveProgress(id, correct) {
  try {
    const p = JSON.parse(localStorage.getItem('mde-v2') || '{}')
    if (p[id] === undefined) { p[id] = correct; localStorage.setItem('mde-v2', JSON.stringify(p)) }
  } catch {}
}
export function loadProgress() {
  try { return JSON.parse(localStorage.getItem('mde-v2') || '{}') } catch { return {} }
}
export function resetProgress() {
  try { localStorage.removeItem('mde-v2') } catch {}
}

function Theorie({ texte }) {
  return (
    <div style={{ background:'#0a0c14', border:`1px solid ${C.border}`, borderRadius:10, padding:'16px 20px', marginBottom:20 }}>
      <div style={{ color: C.warn, fontWeight:700, fontSize:12, marginBottom:8, letterSpacing:1 }}>📖 COURS</div>
      <pre style={{ color: C.text, fontSize:13, lineHeight:1.75, whiteSpace:'pre-wrap', fontFamily:'inherit', margin:0 }}>{texte}</pre>
    </div>
  )
}

function Resultat({ score, total, history, couleur, onRestart, backHref }) {
  const pct = Math.round(score / total * 100)
  const m = pct>=80?{l:'🎯 Excellent !',c:C.good}:pct>=60?{l:'👍 Bien',c:'#a78bfa'}:pct>=40?{l:'📖 À retravailler',c:C.warn}:{l:'🔁 Recommence',c:C.bad}
  const erreurs = history.filter(h=>!h.correct)
  return (
    <div style={{ minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ maxWidth:560, width:'100%' }}>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:32, textAlign:'center' }}>
          {/* Cercle score */}
          <div style={{ width:130, height:130, borderRadius:'50%', background:`conic-gradient(${m.c} ${pct*3.6}deg, ${C.border} 0)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:`0 0 40px ${m.c}33` }}>
            <div style={{ width:100, height:100, borderRadius:'50%', background:C.card, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:28, fontWeight:900, color:m.c }}>{pct}%</span>
              <span style={{ fontSize:12, color:C.muted }}>{score}/{total}</span>
            </div>
          </div>
          <h2 style={{ color:m.c, fontSize:24, fontWeight:800, marginBottom:8 }}>{m.l}</h2>
          <p style={{ color:C.muted, fontSize:14, marginBottom:24 }}>{score} bonne{score>1?'s':''} réponse{score>1?'s':''} sur {total}</p>

          {erreurs.length > 0 && (
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:16, marginBottom:20, textAlign:'left' }}>
              <div style={{ color:C.warn, fontWeight:700, fontSize:12, marginBottom:10 }}>❌ Questions ratées ({erreurs.length})</div>
              {erreurs.map((e,i)=>(
                <div key={i} style={{ color:C.muted, fontSize:12, padding:'5px 0', borderBottom:i<erreurs.length-1?`1px solid ${C.border}33`:'none' }}>
                  <span style={{ color:C.text }}>• {e.q.enonce.substring(0,90)}...</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={onRestart} style={{ flex:1, background:`linear-gradient(135deg, ${couleur}, ${couleur}aa)`, border:'none', borderRadius:10, padding:'12px 0', color:'#fff', fontWeight:700, fontSize:14 }}>
              🔄 Recommencer
            </button>
            <Link href={backHref} style={{ flex:1 }}>
              <button style={{ width:'100%', background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:'12px 0', color:C.muted, fontWeight:600, fontSize:14 }}>
                ← Accueil
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuizEngine({ questions, titre, emoji, couleur, backHref, theorie }) {
  const [shuffled] = useState(() => [...questions].sort(() => Math.random()-0.5))
  const [idx, setIdx] = useState(0)
  const [sel, setSel] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([])
  const [done, setDone] = useState(false)
  const [showTheorie, setShowTheorie] = useState(false)

  const q = shuffled[idx]

  function handle(i) {
    if (answered) return
    setSel(i)
    setAnswered(true)
    const ok = i === q.reponse
    if (ok) setScore(s=>s+1)
    setHistory(h=>[...h, { q, correct:ok }])
    saveProgress(q.id, ok)
  }

  function next() {
    if (idx+1 >= shuffled.length) { setDone(true); return }
    setIdx(i=>i+1); setSel(null); setAnswered(false); setShowTheorie(false)
  }

  function restart() {
    setIdx(0); setSel(null); setAnswered(false); setScore(0); setHistory([]); setDone(false)
  }

  if (done) return <Resultat score={score} total={shuffled.length} history={history} couleur={couleur} onRestart={restart} backHref={backHref} />

  const pct = Math.round(((idx + (answered?1:0)) / shuffled.length) * 100)

  return (
    <div style={{ minHeight:'100vh', background:C.bg }}>
      {/* Sticky header */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:'12px 20px', display:'flex', alignItems:'center', gap:12, position:'sticky', top:0, zIndex:10 }}>
        <Link href={backHref} style={{ color:C.muted, fontSize:22 }}>←</Link>
        <span style={{ fontSize:20 }}>{emoji}</span>
        <div style={{ flex:1 }}>
          <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>{titre}</div>
          <div style={{ color:C.muted, fontSize:12 }}>{idx+1}/{shuffled.length}</div>
        </div>
        {theorie && (
          <button onClick={()=>setShowTheorie(v=>!v)} style={{ background:showTheorie?C.warn+'22':C.card, border:`1px solid ${showTheorie?C.warn:C.border}`, color:showTheorie?C.warn:C.muted, borderRadius:8, padding:'6px 12px', fontSize:12, fontWeight:600 }}>
            📖 Cours
          </button>
        )}
        <div style={{ background:couleur+'22', color:couleur, border:`1px solid ${couleur}44`, borderRadius:8, padding:'4px 12px', fontSize:13, fontWeight:700 }}>
          {score} ✓
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{ background:C.border, height:3 }}>
        <div style={{ width:`${pct}%`, background:`linear-gradient(90deg,${couleur},${couleur}aa)`, height:3, transition:'width 0.4s' }} />
      </div>

      <div style={{ maxWidth:700, margin:'0 auto', padding:'24px 20px 120px' }}>
        {/* Théorie optionnelle */}
        {showTheorie && theorie && <Theorie texte={theorie} />}

        {/* Badge chapitre */}
        {q.chapitreLabel && (
          <div style={{ display:'inline-block', background:couleur+'18', color:couleur, border:`1px solid ${couleur}33`, borderRadius:6, padding:'3px 10px', fontSize:11, fontWeight:700, marginBottom:14 }}>
            {q.chapitreLabel}
          </div>
        )}

        {/* Énoncé */}
        <div style={{ color:C.text, fontSize:17, fontWeight:600, lineHeight:1.7, marginBottom:22, background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:'18px 20px' }}>
          {q.enonce}
        </div>

        {/* Choix */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {q.choix.map((c,i)=>{
            let bg=C.card, border=C.border, color=C.text, icon=null
            if (answered) {
              if (i===q.reponse) { bg=C.good+'18'; border=C.good; color=C.good; icon='✓' }
              else if (i===sel) { bg=C.bad+'18'; border=C.bad; color=C.bad; icon='✗' }
            } else if (sel===i) { bg=couleur+'18'; border=couleur }
            return (
              <button key={i} onClick={()=>handle(i)} style={{ background:bg, border:`1.5px solid ${border}`, borderRadius:10, padding:'13px 16px', color, textAlign:'left', fontSize:14.5, lineHeight:1.55, display:'flex', gap:12, alignItems:'flex-start', transition:'all 0.15s' }}>
                <span style={{ minWidth:26, height:26, borderRadius:6, background:'#ffffff08', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, flexShrink:0, marginTop:1, color:answered&&i===q.reponse?C.good:answered&&i===sel?C.bad:C.muted }}>
                  {icon || String.fromCharCode(65+i)}
                </span>
                {c}
              </button>
            )
          })}
        </div>

        {/* Explication */}
        {answered && (
          <div style={{ marginTop:18, background:C.surface, border:`1px solid ${sel===q.reponse?C.good+'44':C.warn+'44'}`, borderRadius:12, padding:18 }}>
            <div style={{ color:sel===q.reponse?C.good:C.warn, fontWeight:700, fontSize:13, marginBottom:8 }}>
              {sel===q.reponse?'✅ Correct !':'📖 Explication'}
            </div>
            <div style={{ color:C.text, fontSize:13.5, lineHeight:1.75 }}>{q.explication}</div>
          </div>
        )}
      </div>

      {/* Bouton suivant sticky bas */}
      {answered && (
        <div style={{ position:'fixed', bottom:0, left:0, right:0, background:C.surface, borderTop:`1px solid ${C.border}`, padding:'14px 20px' }}>
          <div style={{ maxWidth:700, margin:'0 auto' }}>
            <button onClick={next} style={{ width:'100%', background:idx+1>=shuffled.length?`linear-gradient(135deg,${C.good},#059669)`:`linear-gradient(135deg,${couleur},${couleur}aa)`, border:'none', borderRadius:10, padding:'15px 0', color:'#fff', fontWeight:700, fontSize:16 }}>
              {idx+1>=shuffled.length?'🏁 Voir mes résultats':'Question suivante →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
