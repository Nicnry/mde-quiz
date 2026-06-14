import Head from 'next/head'
import NavHeader from '../components/NavHeader'

// ── Couleurs harmonisées avec le projet existant ─────────────────
const PROJ = {
  bg:      '#0d0f18',
  surface: '#13162a',
  card:    '#181c30',
  border:  '#252a45',
  accent:  '#7c6aff',
  text:    '#e2e8f0',
  muted:   '#64748b',
  good:    '#10b981',
  warn:    '#f59e0b',
  bad:     '#ef4444',
}

// Couleurs niveaux (légèrement adaptées pour l'app dark)
const LVL = {
  mcdBg:   '#1a3a5c',
  mcdFg:   '#7ab8f5',
  mldrBg:  '#1a5c3a',
  mldrFg:  '#7af5b0',
  mpdBg:   '#5c1a3a',
  mpdFg:   '#f57ab8',
  accent:  '#e8a020',
  warn:    '#f57a7a',
  ok:      '#7af5b0',
  border:  '#2a3f55',
}

// ── Micro-composants ─────────────────────────────────────────────
const Badge = ({ type, children }) => {
  const bg = type==='mcd'?LVL.mcdBg : type==='mldr'?LVL.mldrBg : LVL.mpdBg
  const fg = type==='mcd'?LVL.mcdFg : type==='mldr'?LVL.mldrFg : LVL.mpdFg
  return <span style={{ display:'inline-block', padding:'2px 9px', borderRadius:12, fontSize:'0.72em', fontWeight:700, letterSpacing:0.5, verticalAlign:'middle', background:bg, color:fg }}>{children}</span>
}

const Ste = ({ c, children }) => <span style={{ fontFamily:'Courier New,monospace', color:c||LVL.mcdFg, fontSize:'0.88em' }}>{children}</span>
const Cst = ({ children }) => <span style={{ color:'#f5c842', fontFamily:'monospace', fontSize:'0.85em' }}>{children}</span>

const RuleBox = ({ children, style }) => (
  <div style={{ background:'#0d1a27', border:'1px solid #2a4a6a', borderLeft:`3px solid ${LVL.accent}`, borderRadius:6, padding:'10px 14px', fontSize:'0.83em', color:LVL.mcdFg, marginBottom:10, ...style }}>
    {children}
  </div>
)

const Info = ({ children }) => (
  <div style={{ background:'#0d2a1a', border:'1px solid #1a5a35', borderRadius:6, padding:'10px 14px', fontSize:'0.82em', margin:'8px 0', color:'#7af5b0' }}>
    {children}
  </div>
)

const Warn = ({ children }) => (
  <div style={{ background:'#2a0d0d', border:'1px solid #5a1a1a', borderRadius:6, padding:'10px 14px', fontSize:'0.82em', margin:'8px 0', color:'#f57a7a' }}>
    {children}
  </div>
)

const Card = ({ children, style }) => (
  <div style={{ background:PROJ.card, border:`1px solid ${LVL.border}`, borderRadius:10, padding:'16px 18px', marginBottom:14, ...style }}>
    {children}
  </div>
)

const H2 = ({ id, children }) => (
  <h2 id={id} style={{ fontSize:'1.15em', fontWeight:700, marginBottom:18, padding:'10px 18px', borderRadius:8, borderLeft:`4px solid ${LVL.accent}`, background:PROJ.card, color:PROJ.text, scrollMarginTop:80 }}>
    {children}
  </h2>
)
const H3 = ({ children }) => <h3 style={{ fontSize:'0.95em', fontWeight:700, marginBottom:10, color:LVL.accent }}>{children}</h3>

const Grid2 = ({ children }) => (
  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16 }}>
    {children}
  </div>
)
const Grid3 = ({ children }) => (
  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
    {children}
  </div>
)

// Table MLD-R style UML
const UmlTable = ({ titre, stereo, rows, contraintes, color }) => (
  <div style={{ border:`2px solid ${color||LVL.border}`, borderRadius:6, overflow:'hidden', display:'inline-block', minWidth:200, width:'100%', fontSize:'0.8em', verticalAlign:'top', marginBottom:8 }}>
    <div style={{ background: color ? color+'33' : '#1e3a5a', padding:'5px 10px', textAlign:'center', borderBottom:`1px solid ${LVL.border}`, fontWeight:700, color: color||LVL.mcdFg }}>
      {stereo && <small style={{ display:'block', fontWeight:400, color:PROJ.muted, fontSize:'0.85em' }}>{stereo}</small>}
      {titre}
    </div>
    <div style={{ padding:'6px 10px', background:'#0f1e30' }}>
      {rows.map((r,i) => <div key={i} style={{ padding:'2px 0', borderBottom: i<rows.length-1?'1px solid #1e2d3d':'none' }}>{r}</div>)}
    </div>
    {contraintes && contraintes.length > 0 && (
      <div style={{ padding:'6px 10px', borderTop:`2px solid ${LVL.border}`, background:'#101820' }}>
        {contraintes.map((c,i) => <div key={i} style={{ padding:'2px 0' }}>{c}</div>)}
      </div>
    )}
  </div>
)

// Entité MCD
const McdEntity = ({ titre, stereo, rows }) => (
  <div style={{ border:'2px solid #7ab8f5', borderRadius:6, overflow:'hidden', display:'inline-block', minWidth:160, fontSize:'0.8em', verticalAlign:'top', marginBottom:8 }}>
    <div style={{ background:LVL.mcdBg, padding:'5px 10px', textAlign:'center', fontWeight:700, color:LVL.mcdFg }}>
      {stereo && <small style={{ display:'block', fontWeight:400, color:PROJ.muted, fontSize:'0.85em' }}>{stereo}</small>}
      {titre}
    </div>
    <div style={{ padding:'6px 10px', background:'#0f1e30' }}>
      {rows.map((r,i) => <div key={i} style={{ padding:'2px 0' }}>{r}</div>)}
    </div>
  </div>
)

// Entité ODM (Barker)
const OdmEntity = ({ titre, rows }) => (
  <div style={{ border:`2px solid ${LVL.mpdFg}`, borderRadius:6, overflow:'hidden', display:'inline-block', minWidth:180, fontSize:'0.8em', verticalAlign:'top', marginBottom:8, width:'100%' }}>
    <div style={{ background:LVL.mpdBg, padding:'5px 10px', textAlign:'center', fontWeight:700, color:LVL.mpdFg }}>
      {titre}
    </div>
    <div style={{ padding:'6px 10px', background:'#1e0a18' }}>
      {rows.map((r,i) => <div key={i} style={{ padding:'2px 0' }}>{r}</div>)}
    </div>
  </div>
)

const Assoc = ({ children }) => (
  <div style={{ border:'2px solid #c8f542', borderRadius:4, padding:'4px 10px', display:'inline-block', background:'#1a2a0d', fontSize:'0.82em', color:'#c8f542', textAlign:'center', minWidth:110 }}>
    {children}
  </div>
)

const Arrow = () => <span style={{ fontSize:'1.5em', color:LVL.accent, flexShrink:0 }}>→</span>
const ArrowDown = () => <div style={{ color:LVL.accent, fontSize:'2em', margin:'6px 0' }}>↓</div>

// Colonnes colorées
const pk  = (txt) => <span style={{ color:'#f5c842' }}>{txt}</span>
const fk  = (txt) => <span style={{ color:'#f57a42' }}>{txt}</span>
const pfk = (txt) => <span style={{ color:'#f5a842' }}>{txt}</span>
const nid = (txt) => <span style={{ color:'#42c8f5' }}>{txt}</span>
const m   = (txt) => <span style={{ color:'#f542c8' }}>{txt}</span>
const u   = (txt) => <span style={{ color:'#42f578' }}>{txt}</span>
const aid = (txt) => <span style={{ color:'#c842f5' }}>{txt}</span>
const frz = (txt) => <span style={{ color:'#f54242' }}>{txt}</span>
const aud = (txt) => <span style={{ color:'#a0a0f5' }}>{txt}</span>

// ── Section helper ────────────────────────────────────────────────
const Section = ({ id, children }) => (
  <section id={id} style={{ marginBottom:48 }}>{children}</section>
)

// ── TABS pour les 3 règles ────────────────────────────────────────
import { useState } from 'react'
function Tabs({ tabs }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div style={{ display:'flex', gap:4, marginBottom:-1, flexWrap:'wrap' }}>
        {tabs.map((t,i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding:'7px 14px', borderRadius:'8px 8px 0 0',
            border:`1px solid ${active===i?LVL.border:'transparent'}`, borderBottom:'none',
            cursor:'pointer', fontSize:'0.82em', fontWeight:600,
            background: active===i ? PROJ.card : '#0d1520',
            color: active===i ? PROJ.text : PROJ.muted,
          }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ background:PROJ.card, border:`1px solid ${LVL.border}`, borderRadius:'0 8px 8px 8px', padding:18 }}>
        {tabs[active].content}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ════════════════════════════════════════════════════════════════
export default function Transformations() {
  const ancres = [
    ['#niveaux','Niveaux'],['#stereotypes','Stéréotypes'],['#regles','Règles 1-2-3'],
    ['#dt-ti','DT vs TI'],['#assoc-id','Assoc. identifiantes'],['#frozen','Frozen / Ordered'],
    ['#audit','Audit / AID'],['#odm','ODM'],['#recap','Récap'],
  ]

  return (
    <>
      <Head>
        <title>Transformations MCD→MLD-R→MPD — MDE Quiz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight:'100vh', background:PROJ.bg, fontFamily:"'Segoe UI',system-ui,sans-serif", fontSize:14, lineHeight:1.5, color:PROJ.text }}>
        <NavHeader titre="🗄️ Transformations MCD→MLD-R→MPD" backHref="/" />

        {/* ── Sous-nav ancres ── */}
        <div style={{ background:'#0d1e2e', borderBottom:`1px solid ${LVL.border}`, padding:'10px 20px', overflowX:'auto', display:'flex', gap:6, flexWrap:'nowrap', whiteSpace:'nowrap' }}>
          {ancres.map(([href, label]) => (
            <a key={href} href={href} style={{ padding:'5px 12px', borderRadius:20, fontSize:'0.78em', fontWeight:600, textDecoration:'none', border:`1px solid ${LVL.border}`, color:PROJ.muted, flexShrink:0, transition:'all .2s' }}
              onMouseEnter={e=>{e.target.style.background=LVL.accent;e.target.style.color='#000';e.target.style.borderColor=LVL.accent}}
              onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color=PROJ.muted;e.target.style.borderColor=LVL.border}}>
              {label}
            </a>
          ))}
        </div>

        <main style={{ maxWidth:1200, margin:'0 auto', padding:'28px 20px 60px' }}>

          {/* ═══ 1. NIVEAUX ═══════════════════════════════════════ */}
          <Section id="niveaux">
            <H2 id="niveaux">1. Les trois niveaux d'abstraction</H2>
            <Grid3>
              <Card style={{ borderTop:`3px solid ${LVL.mcdFg}` }}>
                <H3><Badge type="mcd">MCD</Badge> Modèle Conceptuel</H3>
                <RuleBox>Niveau <strong>conceptuel</strong> — indépendant de toute technologie.</RuleBox>
                <ul style={{ paddingLeft:18, fontSize:'0.83em', color:PROJ.muted }}>
                  <li>Entités, associations, attributs</li>
                  <li>Cardinalités (0..1, 1..1, 0..*, 1..*)</li>
                  <li>Stéréotypes (<Ste>&lt;&lt;NID&gt;&gt;</Ste>, <Ste>&lt;&lt;CID&gt;&gt;</Ste>...)</li>
                  <li>Contraintes UML (<Cst>{'{ordered}'}</Cst>, <Cst>{'{frozen}'}</Cst>...)</li>
                  <li>Outil : Visual Paradigm + MVC-CD</li>
                </ul>
              </Card>
              <Card style={{ borderTop:`3px solid ${LVL.mldrFg}` }}>
                <H3><Badge type="mldr">MLD-R</Badge> Modèle Logique</H3>
                <RuleBox>Niveau <strong>logique</strong> — relationnel, indépendant du SGBD.</RuleBox>
                <ul style={{ paddingLeft:18, fontSize:'0.83em', color:PROJ.muted }}>
                  <li>Tables, colonnes avec types abstraits</li>
                  <li>PK, FK, PFK — stéréotypes explicites</li>
                  <li>Contraintes de table et de colonne</li>
                  <li>Mode DT (dépendant) ou TI (indépendant)</li>
                </ul>
              </Card>
              <Card style={{ borderTop:`3px solid ${LVL.mpdFg}` }}>
                <H3><Badge type="mpd">MPD-R-ORA</Badge> Modèle Physique Oracle</H3>
                <RuleBox>Niveau <strong>physique</strong> — spécifique Oracle.</RuleBox>
                <ul style={{ paddingLeft:18, fontSize:'0.83em', color:PROJ.muted }}>
                  <li>Types Oracle (VARCHAR2, NUMBER...)</li>
                  <li>Triggers, packages PL/SQL (APIs de tables)</li>
                  <li>Tables JN (journalisation)</li>
                  <li>Index sur FK, séquences</li>
                  <li>Outil : Oracle Data Modeler (ODM)</li>
                </ul>
              </Card>
            </Grid3>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, margin:'16px 0', flexWrap:'wrap' }}>
              <Badge type="mcd">MCD</Badge>
              <span style={{ color:LVL.accent, fontSize:'1.4em' }}>→</span>
              <span style={{ fontSize:'0.78em', color:PROJ.muted, textAlign:'center' }}>Transformation<br/><small>Règles 1-2-3</small></span>
              <span style={{ color:LVL.accent, fontSize:'1.4em' }}>→</span>
              <Badge type="mldr">MLD-R</Badge>
              <span style={{ color:LVL.accent, fontSize:'1.4em' }}>→</span>
              <span style={{ fontSize:'0.78em', color:PROJ.muted, textAlign:'center' }}>Ingénierie<br/><small>MVC-CD / ODM</small></span>
              <span style={{ color:LVL.accent, fontSize:'1.4em' }}>→</span>
              <Badge type="mpd">MPD-R-ORA</Badge>
            </div>
          </Section>

          {/* ═══ 2. STÉRÉOTYPES ═══════════════════════════════════ */}
          <Section id="stereotypes">
            <H2 id="stereotypes">2. Stéréotypes et contraintes — référence complète</H2>
            <Grid2>
              <div>
                <H3>Stéréotypes <Badge type="mcd">MCD</Badge></H3>
                <Card>
                  <div style={{ marginBottom:8 }}><Ste>&lt;&lt;Entity&gt;&gt;</Ste> <span style={{ color:PROJ.muted }}>— entité ordinaire</span></div>
                  <div style={{ marginBottom:8 }}><Ste>&lt;&lt;NID-1&gt;&gt;</Ste> <span style={{ color:PROJ.muted }}>— identifiant naturel non-absolu : unique <em>dans le contexte du parent</em></span></div>
                  <div style={{ marginBottom:8 }}><Ste>&lt;&lt;NID-2&gt;&gt;</Ste> <span style={{ color:PROJ.muted }}>— identifiant naturel absolu : unique dans l'absolu. Ex : numéro de châssis</span></div>
                  <div style={{ marginBottom:8 }}><Ste c="#f542c8">&lt;&lt;M&gt;&gt;</Ste> <span style={{ color:PROJ.muted }}>— attribut obligatoire (Mandatory, NOT NULL)</span></div>
                  <div style={{ marginBottom:8 }}><Ste c="#c842f5">&lt;&lt;AID&gt;&gt;</Ste> <span style={{ color:PROJ.muted }}>— Artificial ID, clé technique auto-générée</span></div>
                  <div><Ste c="#c842f5">&lt;&lt;CID&gt;&gt;</Ste> <span style={{ color:PROJ.muted }}>— identifiant de composition, entité dépendante</span></div>
                </Card>
                <H3>Contraintes <Badge type="mcd">MCD</Badge></H3>
                <Card>
                  <div style={{ marginBottom:8 }}><Cst>{'{ordered}'}</Cst> <span style={{ color:PROJ.muted }}>— génère une colonne <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>ordre</code> alimentée auto</span></div>
                  <div style={{ marginBottom:8 }}><Cst>{'{frozen}'}</Cst> <span style={{ color:PROJ.muted }}>— la FK ne peut pas changer de valeur (non-transférable)</span></div>
                  <div><Cst>{'{absolute}'}</Cst> <span style={{ color:PROJ.muted }}>— identifiant naturel unique dans l'absolu (NID-2)</span></div>
                </Card>
              </div>
              <div>
                <H3>Stéréotypes <Badge type="mldr">MLD-R</Badge> (colonnes)</H3>
                <Card>
                  <div style={{ marginBottom:6 }}>{pk('<<PK>>')} — Clé Primaire</div>
                  <div style={{ marginBottom:6 }}>{fk('<<FK>>')} — Clé Étrangère</div>
                  <div style={{ marginBottom:6 }}>{pfk('<<PFK>>')} — PK ET FK (table dépendante DT)</div>
                  <div style={{ marginBottom:6 }}>{nid('<<NID-1>>')} — Unique composite (relatif au parent)</div>
                  <div style={{ marginBottom:6 }}>{nid('<<NID-2>>')} — Unique absolu</div>
                  <div style={{ marginBottom:6 }}>{m('<<M>>')} — NOT NULL</div>
                  <div style={{ marginBottom:6 }}>{u('<<U>>')} — Contrainte UNIQUE</div>
                  <div style={{ marginBottom:6 }}>{aid('<<AID>>')} — surrogate key auto</div>
                  <div>{aud('<<AAU>> <<AAI>> <<AMU>> <<AMI>>')} — audit</div>
                </Card>
                <H3>Contraintes de table <Badge type="mldr">MLD-R</Badge></H3>
                <Card style={{ fontSize:'0.82em' }}>
                  <div style={{ marginBottom:5 }}>{pk('<<PK>> PK_NomTable(col1, col2...)')}</div>
                  <div style={{ marginBottom:5 }}>{fk('<<FK-x>> FK_NomTable_NomRef(col)')}</div>
                  <div style={{ marginBottom:5 }}>{u('<<U>> NIDx_NomTable(col)')}</div>
                  <div>{u('<<U>> SIMPK_NomTable(col1, col2)')} <span style={{ color:PROJ.muted }}>← mode TI uniquement</span></div>
                </Card>
              </div>
            </Grid2>
          </Section>

          {/* ═══ 3. RÈGLES ════════════════════════════════════════ */}
          <Section id="regles">
            <H2 id="regles">3. Les 3 règles de transformation MCD → MLD-R</H2>
            <Tabs tabs={[
              {
                label: 'Règle 1 — Entité',
                content: (
                  <div>
                    <RuleBox><strong>Règle 1 :</strong> Toute entité devient une table. Ses attributs → colonnes. Identifiant → PK. On ajoute souvent un {aid('<<AID>>')} (clé artificielle).</RuleBox>
                    <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', margin:'12px 0' }}>
                      <McdEntity titre="Collaborateur" stereo="<<Entity>>" rows={[
                        <>{nid('<<NID-1>>')} email : word</>,
                        <>{m('<<M>>')} nom : token</>,
                        <>prenom : token</>,
                      ]} />
                      <Arrow />
                      <UmlTable titre="Collaborateurs" stereo="<<Table>>" rows={[
                        <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                        <>{nid('<<NID-1>>')} {m('<<M>>')} email : VARCHAR {'{word}'}</>,
                        <>{m('<<M>>')} nom : VARCHAR {'{token}'}</>,
                        <>prenom : VARCHAR {'{token}'}</>,
                      ]} contraintes={[
                        <>{pk('<<PK>> PK_Col(num)')}</>,
                        <>{u('<<U>> NID1_Col_email(email)')}</>,
                      ]} />
                    </div>
                    <Info>💡 <strong>{'{aid}'}</strong> = clé technique auto-incrémentée, non visible de l'utilisateur. Alimentée automatiquement via séquence Oracle + trigger BEFORE INSERT.</Info>
                  </div>
                )
              },
              {
                label: 'Règle 2 — Assoc. 1:N',
                content: (
                  <div>
                    <RuleBox><strong>Règle 2 :</strong> Association 1:N → la PK du côté 1 migre comme {fk('<<FK>>')} dans la table côté N.</RuleBox>
                    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', margin:'12px 0' }}>
                      <McdEntity titre="Département" stereo="<<Entity>>" rows={[<>{nid('<<NID-1>>')} code : word</>]} />
                      <div style={{ textAlign:'center', fontSize:'0.8em', color:PROJ.muted }}>
                        <div>1..1</div>
                        <Assoc>appartient</Assoc>
                        <div>0..*</div>
                      </div>
                      <McdEntity titre="Employé" stereo="<<Entity>>" rows={[
                        <>{nid('<<NID-1>>')} matricule : word</>,
                        <>{m('<<M>>')} nom : token</>,
                      ]} />
                    </div>
                    <ArrowDown />
                    <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                      <UmlTable titre="Departements" stereo="<<Table>>" rows={[
                        <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                        <>{nid('<<NID-1>>')} {m('<<M>>')} code : VARCHAR</>,
                      ]} contraintes={[
                        <>{pk('<<PK>> PK_Dep(num)')}</>,
                        <>{u('<<U>> NID1_Dep_code(code)')}</>,
                      ]} />
                      <UmlTable titre="Employes" stereo="<<Table>>" rows={[
                        <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                        <>{fk('<<FK-1>>')} {m('<<M>>')} dep_num : NUMERIC</>,
                        <>{nid('<<NID-1>>')} {m('<<M>>')} matricule : VARCHAR</>,
                        <>{m('<<M>>')} nom : VARCHAR</>,
                      ]} contraintes={[
                        <>{pk('<<PK>> PK_Emp(num)')}</>,
                        <>{fk('<<FK-1>> FK1_Emp_Dep(dep_num)')}</>,
                        <>{u('<<U>> NID1_Emp_mat(matricule)')}</>,
                      ]} />
                    </div>
                    <Info>💡 Si l'association est obligatoire côté enfant (min 1), la FK est {m('<<M>>')} (NOT NULL). Si optionnelle (min 0), la FK peut être nulle.</Info>
                  </div>
                )
              },
              {
                label: 'Règle 3 — Assoc. N:N',
                content: (
                  <div>
                    <RuleBox><strong>Règle 3 :</strong> Association N:N → <em>table associative</em>. Les deux FK forment la PK composée ({pfk('<<PFK>>')}). En mode DT : table dépendante.</RuleBox>
                    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', margin:'12px 0' }}>
                      <McdEntity titre="Personne" stereo="<<Entity>>" rows={[<>{nid('<<NID-1>>')} email : word</>, <>{m('<<M>>')} nom : token</>]} />
                      <div style={{ textAlign:'center', fontSize:'0.8em', color:PROJ.muted }}>
                        <div>0..*</div>
                        <Assoc>s'inscrit</Assoc>
                        <div>0..*</div>
                      </div>
                      <McdEntity titre="Module" stereo="<<Entity>>" rows={[<>{nid('<<NID-1>>')} code : word</>, <>{m('<<M>>')} prix : positiveMoney</>]} />
                    </div>
                    <ArrowDown />
                    <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                      <UmlTable titre="Personnes" stereo="<<Table>>" rows={[
                        <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                        <>{nid('<<NID-1>>')} {m('<<M>>')} email : VARCHAR</>,
                        <>{m('<<M>>')} nom : VARCHAR</>,
                      ]} contraintes={[<>{pk('<<PK>> PK_Per(num)')}</>, <>{u('<<U>> NID1_Per(email)')}</>]} />
                      <UmlTable titre="Inscriptions" stereo="<<Table associative>>" color="#f5c842" rows={[
                        <>{pfk('<<PFK-1>>')} per_num : NUMERIC</>,
                        <>{pfk('<<PFK-2>>')} mod_num : NUMERIC</>,
                        <>{m('<<M>>')} dateInscription : DATE</>,
                      ]} contraintes={[
                        <>{pk('<<PK>> PK_Ins(per_num, mod_num)')}</>,
                        <>{fk('<<FK-1>> FK1_Ins_Per(per_num)')}</>,
                        <>{fk('<<FK-2>> FK2_Ins_Mod(mod_num)')}</>,
                      ]} />
                      <UmlTable titre="Modules" stereo="<<Table>>" rows={[
                        <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                        <>{nid('<<NID-1>>')} {m('<<M>>')} code : VARCHAR</>,
                        <>{m('<<M>>')} prix : NUMERIC</>,
                      ]} contraintes={[<>{pk('<<PK>> PK_Mod(num)')}</>, <>{u('<<U>> NID1_Mod(code)')}</>]} />
                    </div>
                  </div>
                )
              },
            ]} />
          </Section>

          {/* ═══ 4. DT vs TI ══════════════════════════════════════ */}
          <Section id="dt-ti">
            <H2 id="dt-ti">4. Modes de transformation DT vs TI</H2>
            <Grid2>
              <Card style={{ borderTop:`3px solid ${LVL.mldrFg}` }}>
                <H3>Mode DT — Dépendance entre Tables</H3>
                <RuleBox>Transformation <strong>standard</strong>. Table associative → FK forment la PK composée.</RuleBox>
                <UmlTable titre="Inscriptions" stereo="<<Table associative — mode DT>>" color={LVL.mldrFg} rows={[
                  <>{pfk('<<PFK-1>>')} per_num : NUMERIC</>,
                  <>{pfk('<<PFK-2>>')} mod_num : NUMERIC</>,
                  <>{m('<<M>>')} dateInscription : DATE</>,
                ]} contraintes={[
                  <>{pk('<<PK>> PK_Ins(per_num, mod_num) ← PK COMPOSÉE')}</>,
                  <>{fk('<<FK-1>> FK1_Ins_Per(per_num)')}</>,
                  <>{fk('<<FK-2>> FK2_Ins_Mod(mod_num)')}</>,
                ]} />
              </Card>
              <Card style={{ borderTop:`3px solid #f5c842` }}>
                <H3>Mode TI — Tables Indépendantes</H3>
                <RuleBox>Toutes les tables ont une PK <strong>mono-colonne</strong>. Contraintes supplémentaires obligatoires.</RuleBox>
                <UmlTable titre="Inscriptions" stereo="<<Table indépendante — mode TI>>" color="#f5c842" rows={[
                  <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')} ← PK SIMPLE</>,
                  <>{fk('<<FK-1>>')} {m('<<M>>')} per_num : NUMERIC</>,
                  <>{fk('<<FK-2>>')} {m('<<M>>')} mod_num : NUMERIC</>,
                  <>{m('<<M>>')} dateInscription : DATE</>,
                ]} contraintes={[
                  <>{pk('<<PK>> PK_Ins(num)')}</>,
                  <>{fk('<<FK-1>> FK1_Ins_Per(per_num)')}</>,
                  <>{fk('<<FK-2>> FK2_Ins_Mod(mod_num)')}</>,
                  <>{u('<<U>> SIMPK_Ins(per_num, mod_num) ← simulation PK')}</>,
                ]} />
                <Warn style={{ marginTop:10 }}>⚠️ En mode TI : rétablir manuellement la <strong>SIMPK</strong> (unicité), la <strong>{'{stability}'}</strong> (non-modif FK) et le <strong>{m('<<M>>')}</strong> (obligatoire) sur les FK.</Warn>
              </Card>
            </Grid2>
            <Card style={{ marginTop:4 }}>
              <H3>Pourquoi utiliser le mode TI ?</H3>
              <Grid2>
                <RuleBox><strong>Évolution de la structure</strong> — Si une PK change, l'impact en cascade est minimal avec TI (FK simple). En DT, toutes les FK composites doivent être mises à jour.</RuleBox>
                <RuleBox><strong>Compatibilité framework</strong> — Oracle APEX, Laravel/Eloquent préconisent des tables avec PK simple. MVC-CD supporte les deux modes ; ODM nécessite une dénaturation manuelle du MCD pour TI.</RuleBox>
              </Grid2>
            </Card>
          </Section>

          {/* ═══ 5. ASSOCIATIONS IDENTIFIANTES ════════════════════ */}
          <Section id="assoc-id">
            <H2 id="assoc-id">5. Associations identifiantes — NID &amp; CID</H2>
            <Grid2>
              <Card>
                <H3>Association identifiante naturelle <Ste c={LVL.mcdFg}>&lt;&lt;NID&gt;&gt;</Ste></H3>
                <RuleBox>L'entité est <strong>partiellement identifiée</strong> par son parent. NID unique <em>dans le contexte du parent</em>.</RuleBox>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', margin:'10px 0' }}>
                  <McdEntity titre="Dépôt" stereo="<<Entity>>" rows={[<>{nid('<<NID-1>>')} code : word</>]} />
                  <div style={{ textAlign:'center', fontSize:'0.78em', color:PROJ.muted }}>
                    <div>1..1</div>
                    <Assoc>affecter<br/><Cst>&lt;&lt;NID&gt;&gt;</Cst></Assoc>
                    <div>0..*</div>
                  </div>
                  <McdEntity titre="Camion" stereo="<<Entity>>" rows={[
                    <>{nid('<<NID-1>>')} identification : word</>,
                    <>{nid('<<NID-2>>')} numeroChassis : word</>,
                  ]} />
                </div>
                <ArrowDown />
                <UmlTable titre="Camions" stereo="<<Table>>" rows={[
                  <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                  <>{fk('<<FK-1>>')} {m('<<M>>')} dep_num : NUMERIC</>,
                  <>{nid('<<NID-1>>')} {m('<<M>>')} identification : VARCHAR</>,
                  <>{nid('<<NID-2>>')} {m('<<M>>')} numeroChassis : VARCHAR</>,
                ]} contraintes={[
                  <>{pk('<<PK>> PK_Cam(num)')}</>,
                  <>{fk('<<FK-1>> FK1_Cam_Dep(dep_num)')}</>,
                  <>{u('<<U>> NID1_Cam(dep_num, identification) ← COMPOSITE')}</>,
                  <>{u('<<U>> NID2_Cam(numeroChassis) ← {absolute}')}</>,
                ]} />
                <Info style={{ marginTop:8 }}>💡 NID-1 : deux camions peuvent avoir le même <em>identification</em> dans des dépôts différents. NID-2 : numéroChassis unique dans l'absolu → <Cst>{'{absolute}'}</Cst>.</Info>
              </Card>
              <Card>
                <H3>Association identifiante de composition <Ste c="#c842f5">&lt;&lt;CID&gt;&gt;</Ste></H3>
                <RuleBox>L'entité enfant est <strong>complètement dépendante</strong> de son parent. Non-transférable. Numérotation recommence par parent.</RuleBox>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', margin:'10px 0' }}>
                  <McdEntity titre="Dépôt" stereo="<<Entity>>" rows={[<>{nid('<<NID-1>>')} code : word</>]} />
                  <div style={{ textAlign:'center', fontSize:'0.78em', color:PROJ.muted }}>
                    <div>1..1</div>
                    <Assoc>contient ◆<br/><span style={{ color:LVL.mpdFg }}>&lt;&lt;CID&gt;&gt;</span></Assoc>
                    <div>0..*</div>
                  </div>
                  <McdEntity titre="PlaceParc" stereo="<<Entity>>" rows={[<>{nid('<<NID-1>>')} numPlace : positiveInteger</>]} />
                </div>
                <ArrowDown />
                <UmlTable titre="PlacesParc" stereo="<<Table>>" rows={[
                  <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')} ← global, auto</>,
                  <>{frz('<<FK-1>>')} {m('<<M>>')} {frz('dep_num : NUMERIC {frozen}')}</>,
                  <>{nid('<<NID-1>>')} {m('<<M>>')} numPlace : NUMERIC ← 1..n par dépôt</>,
                ]} contraintes={[
                  <>{pk('<<PK>> PK_PlPa(num)')}</>,
                  <>{fk('<<FK-1>> FK1_PlPa_Dep(dep_num)')}</>,
                  <>{u('<<U>> NID1_PlPa(dep_num, numPlace)')}</>,
                ]} />
                <Warn style={{ marginTop:8 }}>⚠️ CID implique <Cst>{'{frozen}'}</Cst> sur la FK : une place ne peut <strong>pas changer de dépôt</strong>. ODM ne prend pas en charge l'alimentation auto de numPlace.</Warn>
              </Card>
            </Grid2>
          </Section>

          {/* ═══ 6. FROZEN / ORDERED ══════════════════════════════ */}
          <Section id="frozen">
            <H2 id="frozen">6. Contraintes non-déclaratives : {'{frozen}'} et {'{ordered}'}</H2>
            <Grid2>
              <Card>
                <H3><Cst>{'{frozen}'}</Cst> — Non-modifiable</H3>
                <RuleBox>La colonne <strong>ne peut pas être modifiée</strong> après insertion. Exemple : <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>dateReception</code> d'une commande, alimentée automatiquement.</RuleBox>
                <UmlTable titre="Commandes" stereo="<<Table>>" rows={[
                  <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                  <>{frz('<<M>> dateReception : DATE {frozen}')}</>,
                  <>{m('<<M>>')} express : BOOLEAN</>,
                  <>montantRetenu : NUMERIC</>,
                  <>dateGelee : DATE</>,
                ]} contraintes={[<>{pk('<<PK>> PK_Com(num)')}</>]} />
                <Info style={{ marginTop:8 }}>💡 <strong>dateReception</strong> est alimentée automatiquement (date courante). Figée car elle ordonnance les commandes.<br/>Implémentation : trigger BEFORE UPDATE qui bloque toute modification.</Info>
              </Card>
              <Card>
                <H3><Cst>{'{ordered}'}</Cst> — Association ordonnée</H3>
                <RuleBox>Génère une colonne <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>ordre</code> alimentée automatiquement, avec contrainte unique sur (FK + ordre).</RuleBox>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', margin:'10px 0', fontSize:'0.8em' }}>
                  <McdEntity titre="Collaborateur" stereo="<<Entity>>" rows={[<>{nid('<<NID-1>>')} email</>]} />
                  <div style={{ textAlign:'center', color:PROJ.muted }}>
                    1..1 —<Assoc>possède<br/><Cst>{'{ordered}'}</Cst></Assoc>— 0..*
                  </div>
                  <McdEntity titre="Qualification" stereo="<<Entity>>" rows={[
                    <>{nid('<<NID-1>>')} libelle : token</>,
                    <>{m('<<M>>')} tHoraire : positiveMoney</>,
                  ]} />
                </div>
                <ArrowDown />
                <UmlTable titre="Qualifications" stereo="<<Table>>" rows={[
                  <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                  <>{fk('<<FK-1>>')} {m('<<M>>')} col_num : NUMERIC</>,
                  <>{nid('<<NID-1>>')} {m('<<M>>')} libelle : VARCHAR</>,
                  <>{m('<<M>>')} tHoraire : NUMERIC</>,
                  <>{u(m('<<M>> ordre : NUMERIC'))} <span style={{ color:'#f5c842' }}>← auto</span></>,
                ]} contraintes={[
                  <>{pk('<<PK>> PK_Qual(num)')}</>,
                  <>{fk('<<FK-1>> FK1_Qual_Col(col_num)')}</>,
                  <>{u('<<U>> NID1_Qual(col_num, libelle)')}</>,
                  <>{u('<<U>> ORD_Qual(col_num, ordre)')}</>,
                ]} />
              </Card>
            </Grid2>
          </Section>

          {/* ═══ 7. AID & AUDIT ═══════════════════════════════════ */}
          <Section id="audit">
            <H2 id="audit">7. AID (clé artificielle) &amp; Colonnes d'audit</H2>
            <Grid2>
              <Card>
                <H3>AID — Artificial Identifier <Cst>{'{aid}'}</Cst></H3>
                <RuleBox>PK technique, auto-incrémentée, non visible de l'utilisateur.</RuleBox>
                <UmlTable titre="Personnes" stereo="<<Table>>" rows={[
                  <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')} ← auto-incrémenté</>,
                  <>{nid('<<NID-1>>')} {m('<<M>>')} email : VARCHAR</>,
                  <>{m('<<M>>')} nom : VARCHAR</>,
                ]} contraintes={[<>{pk('<<PK>> PK_Per(num)')}</>, <>{u('<<U>> NID1_Per(email)')}</>]} />
                <Info style={{ marginTop:8 }}>💡 MPD-R-ORA : séquence Oracle (SEQ_NOMTABLE, Cache=20) + trigger BEFORE INSERT. La séquence pré-alloue 20 valeurs pour la performance.</Info>
              </Card>
              <Card>
                <H3>Colonnes d'audit <Ste c="#a0a0f5">&lt;&lt;AAU&gt;&gt; &lt;&lt;AAI&gt;&gt; &lt;&lt;AMU&gt;&gt; &lt;&lt;AMI&gt;&gt;</Ste></H3>
                <RuleBox>Traçabilité technique automatique, transparente pour l'utilisateur.</RuleBox>
                <div style={{ fontSize:'0.82em', marginBottom:8 }}>
                  <div style={{ marginBottom:4 }}>{aud('<<AAU>>')} <strong>ajUser</strong> — utilisateur lors de l'<u>ajout</u> → <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>ajUser := USER</code></div>
                  <div style={{ marginBottom:4 }}>{aud('<<AAI>>')} <strong>ajDate</strong> — date/heure de l'<u>ajout</u> → <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>ajDate := SYSDATE</code></div>
                  <div style={{ marginBottom:4 }}>{aud('<<AMU>>')} <strong>moUser</strong> — utilisateur lors de la <u>modification</u></div>
                  <div style={{ marginBottom:4 }}>{aud('<<AMI>>')} <strong>moDate</strong> — date/heure de la <u>modification</u></div>
                </div>
                <UmlTable titre="CliCategories" stereo="<<Table>>" rows={[
                  <>{pk('<<PK>>')} {aid('num : NUMERIC {aid}')}</>,
                  <>{nid('<<NID-1>>')} {m('<<M>>')} code : VARCHAR</>,
                  <>{nid('<<NID-2>>')} {m('<<M>>')} libelle : VARCHAR</>,
                  <>descriptif : VARCHAR</>,
                  <>{aud('<<AAU>> ajUser : VARCHAR')}</>,
                  <>{aud('<<AAI>> ajDate : TIMESTAMP')}</>,
                  <>{aud('<<AMU>> moUser : VARCHAR')}</>,
                  <>{aud('<<AMI>> moDate : TIMESTAMP')}</>,
                ]} contraintes={[
                  <>{pk('<<PK>> PK_CliCat(num)')}</>,
                  <>{u('<<U>> NID1_CliCat_code(code)')}</>,
                  <>{u('<<U>> NID2_CliCat_libelle(libelle)')}</>,
                ]} />
                <Warn style={{ marginTop:8 }}>⚠️ Limite : trace limitée à la <em>dernière</em> modification. Pour un historique complet → <strong>Tables JN</strong> (journalisation).</Warn>
              </Card>
            </Grid2>
          </Section>

          {/* ═══ 8. ODM ═══════════════════════════════════════════ */}
          <Section id="odm">
            <H2 id="odm">8. Oracle Data Modeler (ODM) — Spécificités</H2>
            <Card>
              <RuleBox>ODM utilise la <strong>notation Barker</strong> (≠ UML). Niveaux : <em>Logical Model</em> (= MCD), <em>Relational Model</em> (= MLD-R), <em>Physical Model</em> (= MPD). Bidirectionnel (reverse engineering).</RuleBox>
            </Card>
            <Grid2>
              <Card>
                <H3>Notation Barker — Symboles</H3>
                <RuleBox><strong>Attributs :</strong><br/>
                  <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>#</code> = Primary Key &nbsp;|&nbsp;
                  <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>U</code> = Unique (NID) &nbsp;|&nbsp;
                  <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>*</code> = Non nul (obligatoire) &nbsp;|&nbsp;
                  <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>o</code> = optionnel
                </RuleBox>
                <RuleBox style={{ marginTop:8 }}><strong>Cardinalités :</strong><br/>
                  Trait tillé (--) = min 0 | Trait plein (—) = min 1<br/>
                  Terminaison normale = max 1 | Patte d'oie (&lt;) = max N
                </RuleBox>
                <Info>💡 Dans ODM, les noms d'association ne sont pas affichés — on utilise les <strong>noms de rôles</strong>.</Info>
              </Card>
              <Card>
                <H3>Entité ODM (notation Barker) — Exemple</H3>
                <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                  <OdmEntity titre="Eleve" rows={[
                    <><span style={{ color:'#f5c842' }}># *</span> Numero</>,
                    <><span style={{ color:'#42f578' }}>U *</span> Matricule</>,
                    <>* Nom</>,
                    <>* Prenom</>,
                    <>* DateNaissance</>,
                  ]} />
                  <OdmEntity titre="Classe" rows={[
                    <><span style={{ color:'#f5c842' }}># *</span> Numero</>,
                    <><span style={{ color:'#42f578' }}>U *</span> Code</>,
                    <>* Niveau</>,
                    <>* Obligation</>,
                  ]} />
                </div>
                <div style={{ fontSize:'0.82em', color:PROJ.muted, marginTop:8 }}>
                  Un Eleve est affecté à 1 et 1 seule Classe — association 1:N dans ODM.
                </div>
              </Card>
            </Grid2>
            <Card style={{ marginTop:4 }}>
              <H3>Associations identifiantes dans ODM <span style={{ color:LVL.mpdFg }}>◆ losange</span></H3>
              <Grid2>
                <div>
                  <RuleBox><strong>Association identifiante naturelle (NID)</strong><br/>
                    → Cocher <em>"Identifying"</em> sur la relation dans ODM<br/>
                    → NID-2 : contrainte <Cst>{'{absolute}'}</Cst> sur la colonne<br/>
                    → NID-1 : contrainte unique composite (FK + colonne)
                  </RuleBox>
                  <RuleBox style={{ marginTop:8 }}><strong>Association identifiante de composition (CID)</strong><br/>
                    → Relation identifiante dans ODM : ◆ losange<br/>
                    → La PK de la table enfant inclut la FK du parent<br/>
                    → <strong>⚠️ ODM ne gère pas</strong> l'alimentation auto de numPlace<br/>
                    → <strong>⚠️ ODM ne gère pas</strong> la non-transférabilité (Transferable=false non propagé dans la consolidation)
                  </RuleBox>
                </div>
                <div>
                  <Card style={{ background:'#0d1a27', border:'none', marginBottom:0 }}>
                    <div style={{ color:LVL.mcdFg, fontWeight:700, marginBottom:10, fontSize:'0.9em' }}>Plugin MVC-CD (VP)</div>
                    <div style={{ fontSize:'0.83em', color:PROJ.muted }}>
                      MCD → <span style={{ color:LVL.mldrFg }}>MLD-R</span> → <span style={{ color:LVL.mpdFg }}>MPD-R-ORA</span><br/>
                      • Ingénierie <em>descendante</em> uniquement<br/>
                      • Gère AID, audit, ordered, frozen, NID, CID<br/>
                      • Génère APIs de tables PL/SQL + Tables JN<br/>
                      • Paramétrage DT ou TI automatique
                    </div>
                    <div style={{ color:LVL.mpdFg, fontWeight:700, margin:'12px 0 8px', fontSize:'0.9em' }}>Oracle Data Modeler</div>
                    <div style={{ fontSize:'0.83em', color:PROJ.muted }}>
                      MCD ↔ MLD-R ↔ MPD (bidirectionnel)<br/>
                      • Reverse engineering depuis base Oracle<br/>
                      • Notation Barker (≠ UML)<br/>
                      • ⚠️ Ne gère pas {'{frozen}'} sur FK de CID<br/>
                      • ⚠️ Ne gère pas alimentation auto CID
                    </div>
                  </Card>
                </div>
              </Grid2>
            </Card>
          </Section>

          {/* ═══ 9. RÉCAP ══════════════════════════════════════════ */}
          <Section id="recap">
            <H2 id="recap">9. Récapitulatif visuel — Tous les stéréotypes</H2>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:14 }}>
              {[['#f5c842','PK'],['#f57a42','FK'],['#f5a842','PFK'],['#42c8f5','NID'],['#f542c8','M (Not Null)'],['#42f578','U (Unique)'],['#c842f5','AID'],['#f54242','Frozen'],['#a0a0f5','Audit']].map(([c,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:'0.78em' }}>
                  <div style={{ width:10, height:10, borderRadius:'50%', background:c }} />
                  {l}
                </div>
              ))}
            </div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.8em' }}>
                <thead>
                  <tr style={{ background:'#0d1a27', color:LVL.accent }}>
                    {['Élément MCD','→ MLD-R (colonne)','→ MLD-R (contrainte table)','→ MPD-R-ORA'].map(h => (
                      <th key={h} style={{ padding:'8px 12px', textAlign:'left', borderBottom:`2px solid ${LVL.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Entité + AID', pk('<<PK>> num : NUMERIC {aid}'), pk('<<PK>> PK_Table(num)'), 'Séquence + Trigger BEFORE INSERT'],
                    ['NID-1 (non-absolu)', <>{nid('<<NID-1>>')}{m(' <<M>>')} col : VARCHAR</>, u('<<U>> NID1_T(fk_col, col)'), 'UNIQUE composite (FK + col)'],
                    ['NID-2 (absolu)', <>{nid('<<NID-2>>')}{m(' <<M>>')} col : VARCHAR</>, u('<<U>> NID2_T(col)'), <><Cst>{'{absolute}'}</Cst> → UNIQUE simple</>],
                    [m('<<M>>'), m('<<M>> col : VARCHAR'), '—', 'NOT NULL'],
                    ['Association 1:N', fk('<<FK-x>> ref_num : NUMERIC'), fk('<<FK-x>> FKx_T_Ref(col)'), 'FOREIGN KEY + Index'],
                    ['N:N mode DT', pfk('<<PFK-1>> ... <<PFK-2>> ...'), pk('<<PK>> PK_T(col1, col2)'), 'PK composée, 2 FK + index'],
                    ['N:N mode TI', <>{pk('<<PK>> num {aid}')}{fk(' <<FK>> col1, col2')}</>, <>{u('<<U>> SIMPK_T(col1,col2)')} + <Cst>{'{stability}'}</Cst></>, 'PK simple, UNIQUE + trigger non-modif FK'],
                    ['Assoc. <<NID>>', <>{fk('<<FK>>')}{nid(' <<NID-1>>')} col</>, u('<<U>> NID1_T(ref, col)'), 'Unique composite + NOT NULL'],
                    ['Assoc. <<CID>>', frz('<<FK>> ref_num {frozen}'), <>{fk('<<FK>>')} + {u('<<U>>')} NID sur (FK+col)</>, 'FK non-transférable (trigger) + auto-incrément par parent'],
                    [<Cst>{'{frozen}'}</Cst>, frz('<<FK>> col {frozen}'), '—', 'Trigger BEFORE UPDATE bloquant'],
                    [<Cst>{'{ordered}'}</Cst>, <>Colonne <code style={{ background:'#0a1520', padding:'1px 5px', borderRadius:3 }}>ordre : NUMERIC</code></>, u('<<U>> ORD_T(fk, ordre)'), 'Trigger alimentation auto de ordre'],
                    [aud('<<AAU/AAI/AMU/AMI>>'), aud('ajUser, ajDate, moUser, moDate'), '—', 'Triggers BEFORE INSERT/UPDATE, USER et SYSDATE'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom:`1px solid ${LVL.border}`, background: i%2===1?'#0d1520':'transparent' }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding:'7px 12px' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

        </main>
      </div>
    </>
  )
}
