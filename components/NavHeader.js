import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CHAPITRES } from '../data/cours'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#7c6aff', text:'#e2e8f0', muted:'#64748b', good:'#10b981',
}

// ─── Icône burger ────────────────────────────────────────────────
function BurgerIcon({ open }) {
  return (
    <div style={{ width:22, height:16, position:'relative', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          display:'block', height:2, background:C.text, borderRadius:2,
          transition:'all 0.25s ease',
          transformOrigin: i===0?'top left': i===2?'bottom left':'center',
          transform: open
            ? i===0 ? 'rotate(45deg) translateY(-1px)'
            : i===1 ? 'scaleX(0) translateX(10px)'
            : 'rotate(-45deg) translateY(1px)'
            : 'none',
          opacity: open && i===1 ? 0 : 1,
        }} />
      ))}
    </div>
  )
}

// ─── Drawer mobile : liste des chapitres ─────────────────────────
function ChapitresDrawer({ open, onClose, actif, onSelect }) {
  const ref = useRef(null)

  // fermer sur Escape
  useEffect(() => {
    if (!open) return
    const h = e => { if (e.key==='Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  // bloquer le scroll body quand ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Overlay */}
      <div className={`menu-overlay${open?' open':''}`} onClick={onClose} />

      {/* Drawer */}
      <div className={`drawer${open?' open':''}`} ref={ref}>
        <div className="drawer-header">
          <div>
            <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>📚 Chapitres</div>
            <div style={{ color:C.muted, fontSize:11 }}>{CHAPITRES.length} chapitres · {CHAPITRES.reduce((s,c)=>s+c.questions.length,0)} questions</div>
          </div>
          <button onClick={onClose} style={{ background:'transparent', color:C.muted, fontSize:22, minHeight:44, minWidth:44, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8 }}>
            ✕
          </button>
        </div>
        <div className="drawer-body">
          {CHAPITRES.map(c => (
            <button key={c.id} onClick={() => { onSelect?.(c.id); onClose() }} style={{
              width:'100%', textAlign:'left',
              background: actif===c.id ? c.couleur+'22' : 'transparent',
              border: `1px solid ${actif===c.id ? c.couleur+'55' : C.border+'44'}`,
              borderRadius:8, padding:'10px 12px', marginBottom:6,
              color: actif===c.id ? c.couleur : C.muted,
              fontSize:13, fontWeight: actif===c.id ? 700 : 400,
              display:'flex', alignItems:'center', gap:10, minHeight:44,
            }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{c.emoji}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:600, lineHeight:1.3 }}>{c.titre}</div>
                <div style={{ fontSize:11, color:C.muted, marginTop:2, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.description}</div>
              </div>
              <span style={{ color:C.muted, fontSize:11, flexShrink:0 }}>{c.questions.length}q</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Nav menu principal (pages) ───────────────────────────────────
function NavDrawer({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { href:'/', label:'🏠 Accueil', desc:'Vue d\'ensemble' },
    { href:'/quiz', label:'🧠 Quiz Complet', desc:'Toutes les questions mélangées' },
    { href:'/flashcards', label:'🃏 Flashcards', desc:'40 cartes mémo' },
    { href:'/theorie', label:'📖 Cours Complet', desc:'Théorie par chapitre' },
    { href:'/transformations', label:'🗄️ Transformations', desc:'MCD→MLD-R→MPD visuels' },
  ]

  return (
    <>
      <div className={`menu-overlay${open?' open':''}`} onClick={onClose} />
      <div className={`drawer${open?' open':''}`}>
        <div className="drawer-header">
          <div>
            <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>🧠 MDE Quiz</div>
            <div style={{ color:C.muted, fontSize:11 }}>62-41.2 Ingénierie MDE</div>
          </div>
          <button onClick={onClose} style={{ background:'transparent', color:C.muted, fontSize:22, minHeight:44, minWidth:44, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8 }}>
            ✕
          </button>
        </div>
        <div className="drawer-body">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={onClose}>
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:'14px 16px', marginBottom:8, cursor:'pointer', minHeight:56 }}>
                <div style={{ color:C.text, fontWeight:600, fontSize:15 }}>{l.label}</div>
                <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{l.desc}</div>
              </div>
            </Link>
          ))}

          <div style={{ marginTop:20, borderTop:`1px solid ${C.border}`, paddingTop:16 }}>
            <div style={{ color:C.muted, fontSize:11, fontWeight:700, marginBottom:10, letterSpacing:1 }}>CHAPITRES RAPIDES</div>
            {CHAPITRES.slice(0,6).map(c => (
              <Link key={c.id} href={`/quiz/${c.id}`} onClick={onClose}>
                <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:8, color:C.muted, fontSize:13, cursor:'pointer' }}>
                  <span>{c.emoji}</span> {c.titre}
                </div>
              </Link>
            ))}
            <Link href="/theorie" onClick={onClose}>
              <div style={{ color:C.accent, fontSize:13, padding:'8px 10px', fontWeight:600 }}>Voir tous les chapitres →</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Header principal ─────────────────────────────────────────────
export default function NavHeader({ titre, backHref, actions, showChapitresDrawer, actifChapitre, onChapitreSelect }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chapOpen, setChapOpen] = useState(false)

  return (
    <>
      <header style={{
        background:C.surface, borderBottom:`1px solid ${C.border}`,
        padding:'0 16px', height:'var(--header-h)',
        display:'flex', alignItems:'center', gap:12,
        position:'sticky', top:0, zIndex:50,
        boxShadow:'0 2px 20px rgba(0,0,0,0.3)',
      }}>
        {/* Burger */}
        <button onClick={() => showChapitresDrawer ? setChapOpen(true) : setMenuOpen(true)}
          style={{ background:'transparent', color:C.text, minWidth:44, minHeight:44, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, flexShrink:0 }}>
          <BurgerIcon open={false} />
        </button>

        {/* Retour optionnel */}
        {backHref && (
          <Link href={backHref} style={{ color:C.muted, fontSize:22, minWidth:44, minHeight:44, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            ←
          </Link>
        )}

        {/* Titre */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ color:C.text, fontWeight:700, fontSize:15, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {titre || '🧠 MDE Quiz'}
          </div>
          <div style={{ color:C.muted, fontSize:11 }}>62-41.2</div>
        </div>

        {/* Actions contextuelles (slot) */}
        {actions}
      </header>

      {/* Drawer navigation générale */}
      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Drawer chapitres (page théorie) */}
      {showChapitresDrawer && (
        <ChapitresDrawer
          open={chapOpen}
          onClose={() => setChapOpen(false)}
          actif={actifChapitre}
          onSelect={onChapitreSelect}
        />
      )}
    </>
  )
}

export { ChapitresDrawer, NavDrawer }
