import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { FLASHCARDS } from '../data/cours'

const C = {
  bg: '#0d0f18', surface: '#13162a', card: '#181c30', border: '#252a45',
  accent: '#7c6aff', text: '#e2e8f0', muted: '#64748b', good: '#10b981',
}

export default function Flashcards() {
  const [cards] = useState(() => [...FLASHCARDS].sort(() => Math.random() - 0.5))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState([])
  const [review, setReview] = useState([])

  const card = cards[idx]
  const done = idx >= cards.length

  function handleKnown() {
    setKnown(k => [...k, idx])
    next()
  }

  function handleReview() {
    setReview(r => [...r, idx])
    next()
  }

  function next() {
    setFlipped(false)
    setTimeout(() => setIdx(i => i + 1), 150)
  }

  const pct = Math.round((idx / cards.length) * 100)

  if (done) {
    return (
      <>
        <Head><title>Flashcards — MDE</title></Head>
        <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 16, padding: 32, textAlign: 'center', maxWidth: 420, width: '100%',
          }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>
              {known.length >= cards.length * 0.8 ? '🎯' : known.length >= cards.length * 0.5 ? '👍' : '📚'}
            </div>
            <h2 style={{ color: C.text, fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Terminé !</h2>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
              <div style={{ background: C.good + '18', border: `1px solid ${C.good}44`, borderRadius: 8, padding: '10px 20px' }}>
                <div style={{ color: C.good, fontSize: 24, fontWeight: 800 }}>{known.length}</div>
                <div style={{ color: C.muted, fontSize: 12 }}>Maîtrisés</div>
              </div>
              <div style={{ background: '#f59e0b18', border: `1px solid #f59e0b44`, borderRadius: 8, padding: '10px 20px' }}>
                <div style={{ color: '#f59e0b', fontSize: 24, fontWeight: 800 }}>{review.length}</div>
                <div style={{ color: C.muted, fontSize: 12 }}>À revoir</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setIdx(0); setFlipped(false); setKnown([]); setReview([]) }} style={{
                flex: 1, background: `linear-gradient(135deg, ${C.accent}, #8b5cf6)`,
                border: 'none', borderRadius: 10, padding: '12px 0',
                color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>🔄 Recommencer</button>
              <Link href="/" style={{ flex: 1 }}>
                <button style={{
                  width: '100%', background: C.surface,
                  border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 0',
                  color: C.muted, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}>← Accueil</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head><title>Flashcards — MDE</title></Head>
      <div style={{ minHeight: '100vh', background: C.bg }}>
        {/* Header */}
        <div style={{
          background: C.surface, borderBottom: `1px solid ${C.border}`,
          padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <Link href="/" style={{ color: C.muted, textDecoration: 'none', fontSize: 20 }}>←</Link>
          <span style={{ fontSize: 20 }}>🃏</span>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>Flashcards</div>
            <div style={{ color: C.muted, fontSize: 12 }}>{idx + 1} / {cards.length}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: C.good, fontSize: 12, fontWeight: 700 }}>✓ {known.length}</span>
            <span style={{ color: '#f59e0b', fontSize: 12, fontWeight: 700 }}>↻ {review.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background: C.border, height: 3 }}>
          <div style={{
            width: `${pct}%`, height: 3,
            background: `linear-gradient(90deg, ${C.accent}, ${C.good})`,
            transition: 'width 0.4s',
          }} />
        </div>

        {/* Card */}
        <div style={{
          maxWidth: 560, margin: '0 auto', padding: '40px 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          {/* Flip card */}
          <div
            onClick={() => setFlipped(f => !f)}
            style={{
              width: '100%', minHeight: 240,
              cursor: 'pointer', marginBottom: 28,
              perspective: '1000px',
            }}
          >
            <div style={{
              position: 'relative', width: '100%', minHeight: 240,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s ease',
              transform: flipped ? 'rotateY(180deg)' : 'none',
            }}>
              {/* Recto */}
              <div style={{
                position: 'absolute', width: '100%', minHeight: 240,
                backfaceVisibility: 'hidden',
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 16, padding: 32,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center',
              }}>
                <div style={{ color: C.muted, fontSize: 11, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>
                  TERME · Clique pour retourner
                </div>
                <div style={{
                  color: C.text, fontSize: 24, fontWeight: 800,
                  fontFamily: 'monospace',
                  background: C.accent + '18', border: `1px solid ${C.accent}33`,
                  borderRadius: 10, padding: '12px 24px',
                }}>{card.recto}</div>
              </div>

              {/* Verso */}
              <div style={{
                position: 'absolute', width: '100%', minHeight: 240,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: C.accent + '10',
                border: `1px solid ${C.accent}44`,
                borderRadius: 16, padding: 32,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center',
              }}>
                <div style={{ color: C.muted, fontSize: 11, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>
                  DÉFINITION
                </div>
                <div style={{ color: C.text, fontSize: 15, lineHeight: 1.65 }}>
                  {card.verso}
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'évaluation */}
          {flipped ? (
            <div style={{ display: 'flex', gap: 12, width: '100%' }}>
              <button onClick={handleReview} style={{
                flex: 1, background: '#f59e0b18', border: `1.5px solid #f59e0b`,
                borderRadius: 10, padding: '14px 0',
                color: '#f59e0b', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>↻ À revoir</button>
              <button onClick={handleKnown} style={{
                flex: 1, background: C.good + '18', border: `1.5px solid ${C.good}`,
                borderRadius: 10, padding: '14px 0',
                color: C.good, fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>✓ Je sais !</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 12, width: '100%' }}>
              <button onClick={() => setFlipped(true)} style={{
                flex: 1,
                background: `linear-gradient(135deg, ${C.accent}, #8b5cf6)`,
                border: 'none', borderRadius: 10, padding: '14px 0',
                color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
              }}>👆 Retourner la carte</button>
              <button onClick={next} style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: '14px 16px',
                color: C.muted, fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}>→</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
