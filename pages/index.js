import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CHAPITRES, TOTAL_QUESTIONS, TOTAL_FLASHCARDS } from '../data/cours'

const C = {
  bg: '#0d0f18', surface: '#13162a', card: '#181c30', border: '#252a45',
  accent: '#7c6aff', text: '#e2e8f0', muted: '#64748b', good: '#10b981',
}

function useProgress() {
  const [progress, setProgress] = useState({})
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mde-progress') || '{}')
      setProgress(saved)
    } catch {}
  }, [])
  return progress
}

export default function Home() {
  const progress = useProgress()

  const totalAnswered = Object.values(progress).filter(v => v !== undefined).length
  const totalCorrect = Object.values(progress).filter(v => v === true).length
  const globalPct = TOTAL_QUESTIONS > 0 ? Math.round((totalCorrect / TOTAL_QUESTIONS) * 100) : 0

  return (
    <>
      <Head>
        <title>MDE Quiz — 62-41.2</title>
        <meta name="description" content="Révision complète du cours MDE 62-41.2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg }}>
        {/* Hero */}
        <div style={{
          background: `linear-gradient(135deg, #0d0f18 0%, #13162a 50%, #1a0a2e 100%)`,
          borderBottom: `1px solid ${C.border}`,
          padding: '60px 20px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Grid background */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(#7c6aff 1px, transparent 1px), linear-gradient(90deg, #7c6aff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              background: '#7c6aff22',
              border: '1px solid #7c6aff44',
              borderRadius: 8,
              padding: '4px 14px',
              color: C.accent,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              marginBottom: 20,
            }}>62-41.2 · INGÉNIERIE PILOTÉE PAR LES MODÈLES DE DONNÉES</div>

            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 900,
              color: C.text,
              marginBottom: 16,
              lineHeight: 1.2,
            }}>
              Révise le cours MDE
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #7c6aff, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>et vise le 6/6</span>
            </h1>

            <p style={{ color: C.muted, fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
              {TOTAL_QUESTIONS} questions · {TOTAL_FLASHCARDS} flashcards · {CHAPITRES.length} chapitres<br />
              Basé sur les cours, les documents et les informations du prof
            </p>

            {/* Progress global */}
            {totalAnswered > 0 && (
              <div style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '16px 24px',
                marginBottom: 32,
                display: 'inline-block',
                minWidth: 280,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: C.muted, fontSize: 13 }}>Progression globale</span>
                  <span style={{ color: C.accent, fontWeight: 700, fontSize: 13 }}>
                    {totalCorrect}/{TOTAL_QUESTIONS} correctes
                  </span>
                </div>
                <div style={{ background: C.border, borderRadius: 99, height: 8 }}>
                  <div style={{
                    width: `${globalPct}%`,
                    background: `linear-gradient(90deg, ${C.accent}, ${C.good})`,
                    borderRadius: 99, height: 8, transition: 'width 0.5s',
                  }} />
                </div>
                <div style={{ color: C.text, fontWeight: 800, fontSize: 20, marginTop: 8 }}>
                  {globalPct}%
                  <span style={{ color: C.muted, fontWeight: 400, fontSize: 13, marginLeft: 8 }}>
                    {globalPct >= 80 ? '🎯 Prêt pour l\'examen !' : globalPct >= 50 ? '💪 Continue !' : '📚 Commence !'}
                  </span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/quiz" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #7c6aff, #8b5cf6)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                boxShadow: '0 0 30px #7c6aff44',
              }}>🚀 Commencer le Quiz</Link>
              <Link href="/flashcards" style={{
                display: 'inline-block',
                background: C.surface,
                color: C.text,
                border: `1px solid ${C.border}`,
                padding: '14px 32px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
              }}>🃏 Flashcards</Link>
            </div>
          </div>
        </div>

        {/* Chapitres */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
          <h2 style={{ color: C.text, fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
            📚 Chapitres du cours
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {CHAPITRES.map((ch) => {
              const chAnswered = ch.questions.filter(q => progress[q.id] !== undefined).length
              const chCorrect = ch.questions.filter(q => progress[q.id] === true).length
              const pct = ch.questions.length > 0 ? Math.round((chCorrect / ch.questions.length) * 100) : 0

              return (
                <Link key={ch.id} href={`/quiz/${ch.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: C.card,
                    border: `1px solid ${ch.couleur}33`,
                    borderRadius: 14,
                    padding: 20,
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = `0 8px 24px ${ch.couleur}22`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 28, flexShrink: 0 }}>{ch.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                          {ch.titre}
                        </div>
                        <div style={{ color: C.muted, fontSize: 12 }}>{ch.description}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: C.muted, fontSize: 12 }}>
                        {ch.questions.length} questions
                      </span>
                      {chAnswered > 0 && (
                        <span style={{
                          color: pct >= 80 ? C.good : pct >= 50 ? '#f59e0b' : '#ef4444',
                          fontSize: 12, fontWeight: 700,
                        }}>{pct}%</span>
                      )}
                    </div>

                    <div style={{ background: C.border, borderRadius: 99, height: 4 }}>
                      <div style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${ch.couleur}, ${ch.couleur}aa)`,
                        borderRadius: 99, height: 4, transition: 'width 0.5s',
                        minWidth: pct > 0 ? 8 : 0,
                      }} />
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
