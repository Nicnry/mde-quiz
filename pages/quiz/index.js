import Head from 'next/head'
import { useMemo } from 'react'
import { CHAPITRES } from '../../data/cours'
import QuizEngine from '../../components/QuizEngine'

export default function QuizGlobal() {
  const questions = useMemo(() =>
    CHAPITRES.flatMap(ch => ch.questions.map(q => ({
      ...q, chapitreLabel: `${ch.emoji} ${ch.titre}`, couleur: ch.couleur
    }))).sort(() => Math.random() - 0.5),
  [])

  return (
    <>
      <Head><title>Quiz Complet MDE</title></Head>
      <QuizEngine questions={questions} titre="Quiz Complet" emoji="🧠" couleur="#7c6aff" backHref="/" />
    </>
  )
}
