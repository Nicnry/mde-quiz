import Head from 'next/head'
import { useRouter } from 'next/router'
import { CHAPITRES } from '../../data/cours'
import QuizEngine from '../../components/QuizEngine'

export default function ChapitreQuiz() {
  const router = useRouter()
  const { id } = router.query

  if (!id) return null

  const chapitre = CHAPITRES.find(c => c.id === id)
  if (!chapitre) {
    return <div style={{ color: '#e2e8f0', padding: 40, textAlign: 'center' }}>
      Chapitre introuvable. <a href="/" style={{ color: '#7c6aff' }}>Retour</a>
    </div>
  }

  const questions = chapitre.questions.map(q => ({
    ...q,
    chapitre: chapitre.titre,
    couleur: chapitre.couleur,
  }))

  return (
    <>
      <Head><title>{chapitre.titre} — MDE Quiz</title></Head>
      <QuizEngine
        questions={questions}
        titre={chapitre.titre}
        emoji={chapitre.emoji}
        couleur={chapitre.couleur}
        backHref="/"
      />
    </>
  )
}

export async function getStaticPaths() {
  const paths = CHAPITRES.map(ch => ({ params: { id: ch.id } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  return { props: {} }
}
