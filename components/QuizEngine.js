import { useState, useEffect } from 'react'
import Link from 'next/link'
import NavHeader from './NavHeader'

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

// ── Panneau cours (inline ou drawer) ─────────────────────────────
function CoursPaneau({ texte, visible, onClose }) {
  if (!visible) return null
  return (
    <>
      {/* Overlay mobile */}
      <div
        onClick={onClose}
        style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.6)',
          backdropFilter:'blur(4px)', zIndex:80,
        }}
        className="mobile-only"
      />
      {/* Panneau */}
      <div style={{
        // Desktop : inline dans la page
        // Mobile : fixé en bas comme un sheet
        position:'fixed',
        bottom:0, left:0, right:0,
        maxHeight:'70vh',
        background:C.card,
        borderTop:`1px solid ${C.accent}44`,
        borderRadius:'16px 16px 0 0',
        zIndex:90,
        display:'flex', flexDirection:'column',
        boxShadow:'0 -8px 40px rgba(0,0,0,0.5)',
      }}>
        {/* Handle + header */}
        <div style={{ padding:'12px 20px 10px', borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
          <div style={{ width:32, height:4, background:C.border, borderRadius:2, flexShrink:0 }} />
          <span style={{ color:C.warn, fontWeight:700, fontSize:13, flex:1 }}>📖 Cours — théorie</span>
          <button onClick={onClose} style={{ background:'transparent', color:C.muted, fontSize:20, minWidth:36, minHeight:36, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6 }}>✕</button>
        </div>
        {/* Contenu scrollable */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px 20px 24px', WebkitOverflowScrolling:'touch' }}>
          <pre style={{ color:C.text, fontSize:'clamp(12px,3vw,13px)', lineHeight:1.8, whiteSpace:'pre-wrap', wordBreak:'break-word', fontFamily:"'Segoe UI', system-ui, sans-serif", margin:0 }}>
            {texte}
          </pre>
        </div>
      </div>
    </>
  )
}

// ── Écran résultats ───────────────────────────────────────────────
function Resultat({ score, total, history, couleur, titre, onRestart, backHref }) {
  const pct = Math.round(score / total * 100)
  const m = pct>=80?{l:'🎯 Excellent !',c:C.good}
           :pct>=60?{l:'👍 Bien',c:'#a78bfa'}
           :pct>=40?{l:'📖 À retravailler',c:C.warn}
                   :{l:'🔁 Recommence',c:C.bad}
  const erreurs = history.filter(h => !h.correct)

  return (
    <div style={{ minHeight:'100vh', background:C.bg }}>
      <NavHeader titre={titre} backHref={backHref} />
      <div style={{ maxWidth:560, margin:'0 auto', padding:'32px 20px 60px' }}>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'32px 24px', textAlign:'center' }}>
          {/* Cercle score */}
          <div style={{ width:130, height:130, borderRadius:'50%', background:`conic-gradient(${m.c} ${pct*3.6}deg, ${C.border} 0)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:`0 0 40px ${m.c}33` }}>
            <div style={{ width:100, height:100, borderRadius:'50%', background:C.card, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:28, fontWeight:900, color:m.c }}>{pct}%</span>
              <span style={{ fontSize:12, color:C.muted }}>{score}/{total}</span>
            </div>
          </div>
          <h2 style={{ color:m.c, fontSize:24, fontWeight:800, marginBottom:8 }}>{m.l}</h2>
          <p style={{ color:C.muted, fontSize:14, marginBottom:24 }}>
            {score} bonne{score>1?'s':''} réponse{score>1?'s':''} sur {total}
          </p>

          {erreurs.length > 0 && (
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:16, marginBottom:20, textAlign:'left' }}>
              <div style={{ color:C.warn, fontWeight:700, fontSize:12, marginBottom:10 }}>
                ❌ Questions ratées ({erreurs.length})
              </div>
              <div className="erreurs-list">
                {erreurs.map((e,i) => (
                  <div key={i} style={{ color:C.muted, fontSize:12, padding:'5px 0', borderBottom:i<erreurs.length-1?`1px solid ${C.border}33`:'none', lineHeight:1.4 }}>
                    <span style={{ color:C.text }}>• {e.q.enonce.substring(0,80)}{e.q.enonce.length>80?'...':''}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={onRestart} style={{ flex:1, background:`linear-gradient(135deg,${couleur},${couleur}aa)`, border:'none', borderRadius:12, padding:'14px 0', color:'#fff', fontWeight:700, fontSize:15, minHeight:48 }}>
              🔄 Recommencer
            </button>
            <Link href={backHref} style={{ flex:1 }}>
              <button style={{ width:'100%', background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:'14px 0', color:C.muted, fontWeight:600, fontSize:15, minHeight:48 }}>
                ← Accueil
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Moteur de quiz principal ──────────────────────────────────────
export default function QuizEngine({ questions, titre, emoji, couleur, backHref, theorie }) {
  const [shuffled] = useState(() => [...questions].sort(() => Math.random()-0.5))
  const [idx, setIdx] = useState(0)
  const [sel, setSel] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([])
  const [done, setDone] = useState(false)
  const [showCours, setShowCours] = useState(false)

  const q = shuffled[idx]

  // fermer le cours quand on passe à la question suivante
  useEffect(() => { setShowCours(false) }, [idx])

  // bloquer scroll body quand cours ouvert (mobile)
  useEffect(() => {
    document.body.style.overflow = showCours ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showCours])

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
    setIdx(i=>i+1); setSel(null); setAnswered(false)
  }

  function restart() {
    setIdx(0); setSel(null); setAnswered(false); setScore(0); setHistory([]); setDone(false)
  }

  if (done) return (
    <Resultat score={score} total={shuffled.length} history={history} couleur={couleur}
      titre={titre} onRestart={restart} backHref={backHref} />
  )

  const pct = Math.round(((idx + (answered?1:0)) / shuffled.length) * 100)

  return (
    <div style={{ minHeight:'100vh', background:C.bg }}>

      {/* ── Header ── */}
      <NavHeader
        titre={`${emoji} ${titre}`}
        backHref={backHref}
        actions={
          <div style={{ display:'flex', gap:8, alignItems:'center', flexShrink:0 }}>
            {theorie && (
              <button onClick={() => setShowCours(v=>!v)} style={{
                background: showCours ? C.warn+'22' : C.card,
                border: `1px solid ${showCours ? C.warn : C.border}`,
                color: showCours ? C.warn : C.muted,
                borderRadius:8, padding:'0 12px',
                fontSize:12, fontWeight:600,
                height:36, display:'flex', alignItems:'center', gap:5,
                whiteSpace:'nowrap',
              }}>
                📖 <span className="desktop-only">Cours</span>
              </button>
            )}
            <div style={{ background:couleur+'22', color:couleur, border:`1px solid ${couleur}44`, borderRadius:8, padding:'0 12px', fontSize:13, fontWeight:700, height:36, display:'flex', alignItems:'center', flexShrink:0 }}>
              {score} ✓
            </div>
          </div>
        }
      />

      {/* ── Barre de progression ── */}
      <div style={{ background:C.border, height:3 }}>
        <div style={{ width:`${pct}%`, background:`linear-gradient(90deg,${couleur},${couleur}aa)`, height:3, transition:'width 0.4s' }} />
      </div>

      {/* ── Progression textuelle ── */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:'6px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ color:C.muted, fontSize:12 }}>Question {idx+1} / {shuffled.length}</span>
        {q.chapitreLabel && (
          <span style={{ color:couleur, fontSize:11, fontWeight:700, background:couleur+'18', border:`1px solid ${couleur}33`, borderRadius:5, padding:'2px 8px' }}>
            {q.chapitreLabel}
          </span>
        )}
      </div>

      {/* ── Contenu scrollable ── */}
      <div style={{ maxWidth:700, margin:'0 auto', padding:'20px 16px', paddingBottom: answered ? 110 : 40 }}>

        {/* Énoncé */}
        <div style={{ color:C.text, fontSize:'clamp(15px,4vw,17px)', fontWeight:600, lineHeight:1.7, marginBottom:18, background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'18px 20px' }}>
          {q.enonce}
        </div>

        {/* Choix */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:16 }}>
          {q.choix.map((c,i) => {
            let bg=C.card, border=C.border, color=C.text, icon=null
            if (answered) {
              if (i===q.reponse) { bg=C.good+'18'; border=C.good; color=C.good; icon='✓' }
              else if (i===sel) { bg=C.bad+'18'; border=C.bad; color=C.bad; icon='✗' }
            } else if (sel===i) { bg=couleur+'18'; border=couleur }
            return (
              <button key={i} onClick={() => handle(i)} style={{
                background:bg, border:`1.5px solid ${border}`, borderRadius:12,
                padding:'13px 16px', color, textAlign:'left',
                display:'flex', gap:12, alignItems:'flex-start',
                transition:'all 0.15s', minHeight:48,
              }}>
                <span style={{
                  minWidth:28, height:28, borderRadius:6, background:'#ffffff08', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:800, marginTop:1,
                  color: answered&&i===q.reponse?C.good : answered&&i===sel?C.bad : C.muted,
                }}>
                  {icon || String.fromCharCode(65+i)}
                </span>
                <span className="quiz-choice-text">{c}</span>
              </button>
            )
          })}
        </div>

        {/* Explication */}
        {answered && (
          <div style={{ background:C.surface, border:`1px solid ${sel===q.reponse?C.good+'44':C.warn+'44'}`, borderRadius:14, padding:'16px 18px' }}>
            <div style={{ color:sel===q.reponse?C.good:C.warn, fontWeight:700, fontSize:13, marginBottom:8 }}>
              {sel===q.reponse?'✅ Correct !':'📖 Explication'}
            </div>
            <div style={{ color:C.text, fontSize:'clamp(13px,3vw,13.5px)', lineHeight:1.75 }}>
              {q.explication}
            </div>
          </div>
        )}
      </div>

      {/* ── Panneau cours (bottom sheet mobile) ── */}
      {theorie && (
        <CoursPaneau
          texte={theorie}
          visible={showCours}
          onClose={() => setShowCours(false)}
        />
      )}

      {/* ── Bouton suivant fixé en bas ── */}
      {answered && (
        <div style={{ position:'fixed', bottom:0, left:0, right:0, background:C.surface, borderTop:`1px solid ${C.border}`, padding:'12px 16px', zIndex:40 }}>
          <div style={{ maxWidth:700, margin:'0 auto' }}>
            <button onClick={next} style={{
              width:'100%',
              background: idx+1>=shuffled.length
                ? `linear-gradient(135deg,${C.good},#059669)`
                : `linear-gradient(135deg,${couleur},${couleur}bb)`,
              border:'none', borderRadius:12, padding:'16px 0',
              color:'#fff', fontWeight:700, fontSize:16, minHeight:52,
            }}>
              {idx+1>=shuffled.length ? '🏁 Voir mes résultats' : 'Question suivante →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
