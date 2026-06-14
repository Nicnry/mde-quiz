import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { CHAPITRES } from '../data/cours'
import NavHeader from '../components/NavHeader'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#7c6aff', text:'#e2e8f0', muted:'#64748b', good:'#10b981',
}

export default function Theorie() {
  const [actif, setActif] = useState(CHAPITRES[0].id)
  const ch = CHAPITRES.find(c => c.id === actif)

  function handleSelect(id) {
    setActif(id)
    // Scroll top du contenu sur mobile
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Cours Théorique MDE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight:'100vh', background:C.bg, display:'flex', flexDirection:'column' }}>

        {/* ── Header avec burger chapitres ── */}
        <NavHeader
          titre={`📖 ${ch.titre}`}
          backHref="/"
          showChapitresDrawer
          actifChapitre={actif}
          onChapitreSelect={handleSelect}
          actions={
            <Link href={`/quiz/${actif}`} style={{ flexShrink:0 }}>
              <div style={{ background:ch.couleur+'22', border:`1px solid ${ch.couleur}44`, color:ch.couleur, borderRadius:8, padding:'6px 12px', fontSize:12, fontWeight:700, whiteSpace:'nowrap', minHeight:36, display:'flex', alignItems:'center' }}>
                Quiz →
              </div>
            </Link>
          }
        />

        {/* ── Layout desktop : sidebar + contenu ── */}
        <div className="theorie-layout" style={{ flex:1 }}>

          {/* Sidebar desktop uniquement */}
          <nav className="theorie-sidebar">
            <div style={{ color:C.muted, fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:10, paddingLeft:4 }}>
              CHAPITRES ({CHAPITRES.length})
            </div>
            {CHAPITRES.map(c => (
              <button key={c.id} onClick={() => handleSelect(c.id)} style={{
                width:'100%', textAlign:'left',
                background: actif===c.id ? c.couleur+'22' : 'transparent',
                border: `1px solid ${actif===c.id ? c.couleur+'55' : 'transparent'}`,
                borderRadius:8, padding:'9px 10px', marginBottom:4,
                color: actif===c.id ? c.couleur : C.muted,
                fontSize:13, fontWeight: actif===c.id ? 700 : 400,
                display:'flex', alignItems:'center', gap:8, cursor:'pointer',
                transition:'all 0.15s',
              }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{c.emoji}</span>
                <span style={{ flex:1, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.titre}</span>
              </button>
            ))}
          </nav>

          {/* Contenu principal */}
          <main className="theorie-content">
            <div style={{ maxWidth:720, margin:'0 auto' }}>

              {/* En-tête chapitre */}
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <span style={{ fontSize:36, flexShrink:0 }}>{ch.emoji}</span>
                <div>
                  <h1 style={{ color:ch.couleur, fontSize:'clamp(18px,4vw,24px)', fontWeight:800, margin:'0 0 4px' }}>{ch.titre}</h1>
                  <p style={{ color:C.muted, fontSize:13, margin:0 }}>{ch.description}</p>
                </div>
              </div>

              {/* Bloc théorie */}
              <div style={{ background:C.card, border:`1px solid ${ch.couleur}33`, borderRadius:14, padding:'20px', marginBottom:28, overflowX:'auto' }}>
                <div style={{ color:ch.couleur, fontWeight:700, fontSize:11, letterSpacing:1, marginBottom:14 }}>📖 THÉORIE DU COURS</div>
                <pre style={{
                  color:C.text, fontSize:'clamp(12px,2.5vw,13.5px)', lineHeight:1.8,
                  whiteSpace:'pre-wrap', wordBreak:'break-word',
                  fontFamily:"'Segoe UI', system-ui, sans-serif", margin:0,
                }}>
                  {ch.theorie}
                </pre>
              </div>

              {/* Questions */}
              <div style={{ marginBottom:24 }}>
                <h2 style={{ color:C.text, fontSize:17, fontWeight:700, marginBottom:14 }}>
                  ❓ Questions &amp; Réponses ({ch.questions.length})
                </h2>
                {ch.questions.map((q, i) => (
                  <QCard key={q.id} q={q} i={i} />
                ))}
              </div>

              {/* CTA quiz */}
              <Link href={`/quiz/${ch.id}`} style={{ display:'block', marginBottom:40 }}>
                <div style={{
                  background:`linear-gradient(135deg,${ch.couleur},${ch.couleur}bb)`,
                  color:'#fff', borderRadius:12, padding:'16px 24px',
                  textAlign:'center', fontWeight:700, fontSize:16,
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                }}>
                  🎯 Faire le quiz — {ch.titre} →
                </div>
              </Link>

              {/* Navigation chapitres mobile bas de page */}
              <div className="mobile-only" style={{ marginBottom:20 }}>
                <div style={{ color:C.muted, fontSize:12, fontWeight:700, marginBottom:10 }}>Autre chapitre :</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {CHAPITRES.filter(c=>c.id!==actif).slice(0,4).map(c=>(
                    <button key={c.id} onClick={()=>handleSelect(c.id)} style={{
                      background:C.card, border:`1px solid ${C.border}`, borderRadius:8,
                      padding:'10px 12px', color:C.muted, fontSize:12, textAlign:'left', cursor:'pointer',
                    }}>
                      {c.emoji} {c.titre}
                    </button>
                  ))}
                </div>
                <button onClick={() => document.querySelector('.drawer')?.classList.add('open')} style={{
                  marginTop:8, width:'100%', background:'transparent',
                  border:`1px dashed ${C.border}`, borderRadius:8, padding:'10px',
                  color:C.accent, fontSize:13, fontWeight:600,
                }}>
                  Voir tous les chapitres →
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

// ── Carte question accordéon ──────────────────────────────────────
function QCard({ q, i }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, marginBottom:10, overflow:'hidden' }}>
      <button onClick={() => setOpen(v => !v)} style={{
        width:'100%', background:'transparent', color:C.text,
        padding:'14px 16px', textAlign:'left', display:'flex', alignItems:'flex-start', gap:10,
        minHeight:56,
      }}>
        <span style={{ color:C.muted, fontSize:11, fontWeight:700, flexShrink:0, marginTop:3 }}>Q{i+1}</span>
        <span style={{ flex:1, fontSize:'clamp(13px,3vw,14px)', fontWeight:600, lineHeight:1.5 }}>{q.enonce}</span>
        <span style={{ color:C.muted, fontSize:18, flexShrink:0, transform:open?'rotate(90deg)':'none', transition:'transform 0.2s', marginTop:1 }}>›</span>
      </button>
      {open && (
        <div style={{ padding:'0 16px 16px', borderTop:`1px solid ${C.border}` }}>
          <div style={{ background:'#0a0c14', borderRadius:8, padding:14, marginTop:12 }}>
            <div style={{ color:'#10b981', fontWeight:700, fontSize:12, marginBottom:6 }}>✓ Bonne réponse</div>
            <div style={{ color:C.text, fontSize:'clamp(13px,3vw,14px)', lineHeight:1.5, marginBottom:10 }}>
              {q.choix[q.reponse]}
            </div>
            <div style={{ color:C.muted, fontSize:'clamp(12px,2.8vw,13px)', lineHeight:1.65 }}>
              {q.explication}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
