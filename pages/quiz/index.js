import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CHAPITRES } from '../../data/cours'
import QuizEngine from '../../components/QuizEngine'

export default function QuizPage() {
  const allQuestions = CHAPITRES.flatMap(ch =>
    ch.questions.map(q => ({ ...q, chapitre: ch.titre, couleur: ch.couleur }))
  ).sort(() => Math.random() - 0.5)

  return (
    <>
      <Head><title>Quiz Complet — MDE</title></Head>
      <QuizEngine
        questions={allQuestions}
        titre="Quiz Complet"
        emoji="🧠"
        couleur="#7c6aff"
        backHref="/"
      />
    </>
  )
}
