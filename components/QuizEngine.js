import { useState, useEffect } from 'react'
import Link from 'next/link'

const C = {
  bg: '#0d0f18', surface: '#13162a', card: '#181c30', border: '#252a45',
  accent: '#7c6aff', text: '#e2e8f0', muted: '#64748b', good: '#10b981',
  bad: '#ef4444', warn: '#f59e0b',
}

function saveAnswer(id, correct) {
  try {
    const saved = JSON.parse(localStorage.getItem('mde-progress') || '{}')
    saved[id] = correct
    localStorage.setItem('mde-progress', JSON.stringify(saved))
  } catch {}
}

export default function QuizEngine({ questions, titre, emoji, couleur, backHref }) {
  const [shuffled] = useState(() => [...questions].sort(() => Math.random() - 0.5))
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [history, setHistory] = useState([])

  const q = shuffled[idx]
  if (!q) return null

  function handleSelect(i) {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    const correct = i === q.reponse
    if (correct) setScore(s => s + 1)
    setHistory(h => [...h, { q, selected: i, correct }])
    saveAnswer(q.id, correct)
  }

  function handleNext() {
    if (idx + 1 >= shuffled.length) {
      setDone(true)
    } else {
      setIdx(i => i + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  function handleRestart() {
    setIdx(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setDone(false)
    setHistory([])
  }

  const pct = Math.round(((idx + (answered ? 1 : 0)) / shuffled.length) * 100)

  if (done) {
    const scorePct = Math.round((score / shuffled.length) * 100)
    const mention = scorePct >= 80 ? { label: '🎯 Excellent !', color: C.good }
      : scorePct >= 60 ? { label: '👍 Bien', color: '#a78bfa' }
      : scorePct >= 40 ? { label: '📖 À retravailler', color: C.warn }
      : { label: '🔁 Recommence', color: C.bad }

    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 16, padding: 32, textAlign: 'center',
          }}>
            {/* Score circulaire */}
            <div style={{
              width: 140, height: 140, borderRadius: '50%',
              background: `conic-gradient(${mention.color} ${scorePct * 3.6}deg, ${C.border} 0deg)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: `0 0 40px ${mention.color}33`,
            }}>
              <div style={{
                width: 108, height: 108, borderRadius: '50%',
                background: C.card,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: mention.color }}>{scorePct}%</span>
                <span style={{ fontSize: 12, color: C.muted }}>{score}/{shuffled.length}</span>
              </div>
            </div>

            <h2 style={{ color: mention.color, fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
              {mention.label}
            </h2>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>
              {titre} · {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {shuffled.length}
            </p>

            {/* Erreurs */}
            {history.filter(h => !h.correct).length > 0 && (
              <div style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: 16, marginBottom: 20, textAlign: 'left',
              }}>
                <div style={{ color: C.warn, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
                  ❌ Questions ratées ({history.filter(h => !h.correct).length})
                </div>
                {history.filter(h => !h.correct).map((item, i) => (
                  <div key={i} style={{
                    color: C.muted, fontSize: 12, lineHeight: 1.5,
                    padding: '6px 0',
                    borderBottom: i < history.filter(h => !h.correct).length - 1 ? `1px solid ${C.border}` : 'none',
                  }}>
                    <span style={{ color: C.text }}>• {item.q.question.substring(0, 80)}...</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleRestart} style={{
                flex: 1, background: `linear-gradient(135deg, ${couleur}, ${couleur}aa)`,
                border: 'none', borderRadius: 10, padding: '12px 0',
                color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>🔄 Recommencer</button>
              <Link href={backHref} style={{ flex: 1 }}>
                <button style={{
                  width: '100%', background: C.surface,
                  border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 0',
                  color: C.muted, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}>← Accueil</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* Header */}
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Link href={backHref} style={{ color: C.muted, textDecoration: 'none', fontSize: 20 }}>←</Link>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{titre}</div>
          <div style={{ color: C.muted, fontSize: 12 }}>
            Question {idx + 1} / {shuffled.length}
          </div>
        </div>
        <div style={{
          background: couleur + '22', color: couleur,
          border: `1px solid ${couleur}44`,
          borderRadius: 8, padding: '4px 12px',
          fontSize: 13, fontWeight: 700,
        }}>
          {score} ✓
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: C.border, height: 3 }}>
        <div style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${couleur}, ${couleur}aa)`,
          height: 3, transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Question */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px 20px 100px' }}>
        {/* Badge chapitre */}
        {q.chapitre && (
          <div style={{
            display: 'inline-block',
            background: couleur + '18', color: couleur,
            border: `1px solid ${couleur}33`,
            borderRadius: 6, padding: '3px 10px',
            fontSize: 11, fontWeight: 700, marginBottom: 16,
          }}>{q.chapitre}</div>
        )}

        {/* Énoncé */}
        <div style={{
          color: C.text, fontSize: 17, fontWeight: 600,
          lineHeight: 1.65, marginBottom: 24,
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: 20,
        }}>
          {q.question}
        </div>

        {/* Choix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.choix.map((c, i) => {
            let bg = C.card, border = C.border, color = C.text, icon = null
            if (answered) {
              if (i === q.reponse) { bg = C.good + '18'; border = C.good; color = C.good; icon = '✓' }
              else if (i === selected) { bg = C.bad + '18'; border = C.bad; color = C.bad; icon = '✗' }
            } else if (selected === i) { bg = couleur + '18'; border = couleur }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  background: bg, border: `1.5px solid ${border}`,
                  borderRadius: 10, padding: '13px 16px',
                  color, textAlign: 'left', fontSize: 14,
                  lineHeight: 1.55, cursor: answered ? 'default' : 'pointer',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{
                  minWidth: 26, height: 26, borderRadius: 6,
                  background: answered && i === q.reponse ? C.good + '33'
                    : answered && i === selected ? C.bad + '33'
                    : '#ffffff08',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 1,
                  color: answered && i === q.reponse ? C.good
                    : answered && i === selected ? C.bad
                    : C.muted,
                }}>
                  {icon || String.fromCharCode(65 + i)}
                </span>
                {c}
              </button>
            )
          })}
        </div>

        {/* Explication */}
        {answered && (
          <div style={{
            marginTop: 20,
            background: C.surface,
            border: `1px solid ${selected === q.reponse ? C.good + '44' : C.warn + '44'}`,
            borderRadius: 12, padding: 18,
          }}>
            <div style={{
              color: selected === q.reponse ? C.good : C.warn,
              fontWeight: 700, fontSize: 13, marginBottom: 8,
            }}>
              {selected === q.reponse ? '✅ Bonne réponse !' : '📖 Explication'}
            </div>
            <div style={{ color: C.text, fontSize: 13.5, lineHeight: 1.7 }}>
              {q.explication}
            </div>
          </div>
        )}
      </div>

      {/* Bouton suivant — sticky bas */}
      {answered && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: C.surface, borderTop: `1px solid ${C.border}`,
          padding: '14px 20px',
        }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <button onClick={handleNext} style={{
              width: '100%',
              background: idx + 1 >= shuffled.length
                ? `linear-gradient(135deg, ${C.good}, #059669)`
                : `linear-gradient(135deg, ${couleur}, ${couleur}aa)`,
              border: 'none', borderRadius: 10, padding: '15px 0',
              color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer',
            }}>
              {idx + 1 >= shuffled.length ? '🏁 Voir mes résultats' : 'Question suivante →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
