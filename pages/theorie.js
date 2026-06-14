import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { CHAPITRES } from '../data/cours'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#7c6aff', text:'#e2e8f0', muted:'#64748b', good:'#10b981',
}

export default function Theorie() {
  const [actif, setActif] = useState(CHAPITRES[0].id)
  const ch = CHAPITRES.find(c=>c.id===actif)

  return (
    <>
      <Head><title>Cours Théorique MDE</title></Head>
      <div style={{ minHeight:'100vh', background:C.bg, display:'flex', flexDirection:'column' }}>
        {/* Header */}
        <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:'12px 20px', display:'flex', alignItems:'center', gap:12 }}>
          <Link href="/" style={{ color:C.muted, fontSize:22 }}>←</Link>
          <div>
            <div style={{ color:C.text, fontWeight:700, fontSize:15 }}>📖 Cours Théorique</div>
            <div style={{ color:C.muted, fontSize:12 }}>Tout le contenu du cours MDE 62-41.2</div>
          </div>
        </div>

        <div style={{ display:'flex', flex:1 }}>
          {/* Sidebar chapitres */}
          <div style={{ width:240, flexShrink:0, background:C.surface, borderRight:`1px solid ${C.border}`, padding:'16px 12px', overflowY:'auto', maxHeight:'calc(100vh - 55px)', position:'sticky', top:55 }}>
            {CHAPITRES.map(c=>(
              <button key={c.id} onClick={()=>setActif(c.id)} style={{
                width:'100%', textAlign:'left', background:actif===c.id?c.couleur+'22':'transparent',
                border:`1px solid ${actif===c.id?c.couleur+'55':C.border+'44'}`,
                borderRadius:8, padding:'9px 12px', marginBottom:6,
                color:actif===c.id?c.couleur:C.muted, fontSize:13,
                fontWeight:actif===c.id?700:400, cursor:'pointer',
                display:'flex', alignItems:'center', gap:8,
              }}>
                <span>{c.emoji}</span>
                <span>{c.titre}</span>
              </button>
            ))}
          </div>

          {/* Contenu */}
          <div style={{ flex:1, padding:'28px 32px', overflowY:'auto', maxHeight:'calc(100vh - 55px)' }}>
            <div style={{ maxWidth:720 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                <span style={{ fontSize:32 }}>{ch.emoji}</span>
                <div>
                  <h1 style={{ color:ch.couleur, fontSize:24, fontWeight:800, margin:0 }}>{ch.titre}</h1>
                  <p style={{ color:C.muted, fontSize:13, margin:0 }}>{ch.description}</p>
                </div>
              </div>

              <div style={{ background:C.card, border:`1px solid ${ch.couleur}33`, borderRadius:12, padding:'20px 24px', marginBottom:28 }}>
                <pre style={{ color:C.text, fontSize:13.5, lineHeight:1.8, whiteSpace:'pre-wrap', fontFamily:"'Segoe UI', system-ui, sans-serif", margin:0 }}>
                  {ch.theorie}
                </pre>
              </div>

              <div style={{ marginBottom:20 }}>
                <h2 style={{ color:C.text, fontSize:17, fontWeight:700, marginBottom:14 }}>
                  ❓ Questions ({ch.questions.length})
                </h2>
                {ch.questions.map((q,i)=>(
                  <div key={q.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:16, marginBottom:10 }}>
                    <div style={{ color:C.muted, fontSize:11, marginBottom:6 }}>Q{i+1}</div>
                    <div style={{ color:C.text, fontSize:14, fontWeight:600, marginBottom:10 }}>{q.enonce}</div>
                    <div style={{ background:'#0a0c14', borderRadius:8, padding:12 }}>
                      <div style={{ color:C.good, fontWeight:700, fontSize:12, marginBottom:4 }}>✓ Bonne réponse</div>
                      <div style={{ color:C.text, fontSize:13 }}>{q.choix[q.reponse]}</div>
                      <div style={{ color:C.muted, fontSize:12, marginTop:8, lineHeight:1.6 }}>{q.explication}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href={`/quiz/${ch.id}`} style={{ display:'block' }}>
                <div style={{ background:`linear-gradient(135deg,${ch.couleur},${ch.couleur}aa)`, color:'#fff', borderRadius:12, padding:'14px 24px', textAlign:'center', fontWeight:700, fontSize:16 }}>
                  🎯 Faire le quiz — {ch.titre} →
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
