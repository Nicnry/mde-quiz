import Head from 'next/head'
import { useRouter } from 'next/router'
import { CHAPITRES } from '../../data/cours'
import QuizEngine from '../../components/QuizEngine'

export default function ChapitreQuiz() {
  const { query } = useRouter()
  const { id } = query
  if (!id) return null
  const ch = CHAPITRES.find(c => c.id === id)
  if (!ch) return (
    <div style={{ color:'#e2e8f0', padding:40, textAlign:'center', fontFamily:'system-ui' }}>
      Chapitre introuvable. <a href="/" style={{ color:'#7c6aff' }}>Retour</a>
    </div>
  )

  return (
    <>
      <Head><title>{ch.titre} — MDE Quiz</title></Head>
      <QuizEngine
        questions={ch.questions}
        titre={ch.titre}
        emoji={ch.emoji}
        couleur={ch.couleur}
        backHref="/"
        theorie={ch.theorie}
      />
    </>
  )
}

export async function getStaticPaths() {
  return { paths: CHAPITRES.map(ch => ({ params: { id: ch.id } })), fallback: false }
}
export async function getStaticProps() { return { props: {} } }
