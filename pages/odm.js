import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import NavHeader from '../components/NavHeader'

const C = {
  bg:'#0d0f18', surface:'#13162a', card:'#181c30', border:'#252a45',
  accent:'#f97316', text:'#e2e8f0', muted:'#64748b',
  good:'#10b981', warn:'#f59e0b', bad:'#ef4444',
  blue:'#7ab8f5', green:'#7af5b0', pink:'#f57ab8',
}

// ── Petits composants ─────────────────────────────────────────────
const Badge = ({ t, children }) => {
  const colors = { ok: [C.good+'22', C.good], warn: [C.warn+'22', C.warn], bad: [C.bad+'22', C.bad], info: ['#7c6aff22', '#7c6aff'], accent: [C.accent+'22', C.accent] }
  const [bg, fg] = colors[t] || colors.info
  return <span style={{ background:bg, color:fg, border:`1px solid ${fg}44`, borderRadius:6, padding:'2px 8px', fontSize:'0.75em', fontWeight:700, verticalAlign:'middle' }}>{children}</span>
}

const Step = ({ n, titre, children }) => (
  <div style={{ display:'flex', gap:14, marginBottom:20 }}>
    <div style={{ width:32, height:32, borderRadius:'50%', background:`linear-gradient(135deg,${C.accent},${C.accent}88)`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, flexShrink:0, color:'#fff', marginTop:2 }}>{n}</div>
    <div style={{ flex:1 }}>
      <div style={{ color:C.accent, fontWeight:700, fontSize:15, marginBottom:6 }}>{titre}</div>
      <div style={{ color:C.text, fontSize:13.5, lineHeight:1.75 }}>{children}</div>
    </div>
  </div>
)

const Card = ({ children, style }) => (
  <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:'16px 20px', marginBottom:14, ...style }}>
    {children}
  </div>
)

const Warn = ({ children }) => (
  <div style={{ background:C.warn+'15', border:`1px solid ${C.warn}44`, borderRadius:8, padding:'10px 14px', fontSize:13, color:C.warn, margin:'8px 0', lineHeight:1.6 }}>
    ⚠️ {children}
  </div>
)

const Info = ({ children }) => (
  <div style={{ background:C.good+'12', border:`1px solid ${C.good}33`, borderRadius:8, padding:'10px 14px', fontSize:13, color:C.good, margin:'8px 0', lineHeight:1.6 }}>
    💡 {children}
  </div>
)

const Code = ({ children }) => (
  <pre style={{ background:'#060a12', border:`1px solid ${C.border}`, borderRadius:8, padding:'12px 16px', fontSize:12.5, lineHeight:1.7, color:'#a8d8ff', overflowX:'auto', margin:'8px 0', fontFamily:"'Fira Code','Cascadia Code',Consolas,monospace", whiteSpace:'pre-wrap', wordBreak:'break-word' }}>
    {children}
  </pre>
)

// Entité ODM (notation Barker)
const OdmEntity = ({ titre, rows, style }) => (
  <div style={{ border:`2px solid ${C.pink}`, borderRadius:8, overflow:'hidden', display:'inline-block', minWidth:160, fontSize:12.5, verticalAlign:'top', ...style }}>
    <div style={{ background:'#5c1a3a', padding:'5px 12px', textAlign:'center', fontWeight:700, color:C.pink, fontSize:13 }}>{titre}</div>
    <div style={{ padding:'6px 12px', background:'#1e0a18', lineHeight:1.8 }}>
      {rows.map((r,i) => <div key={i}>{r}</div>)}
    </div>
  </div>
)

// Table MLD-R
const MldTable = ({ titre, rows, contraintes, style }) => (
  <div style={{ border:`2px solid #e8a020`, borderRadius:8, overflow:'hidden', display:'inline-block', minWidth:200, fontSize:12, verticalAlign:'top', width:'100%', ...style }}>
    <div style={{ background:'#2a1e00', padding:'5px 12px', textAlign:'center', fontWeight:700, color:'#e8a020', fontSize:13 }}>{titre}</div>
    <div style={{ padding:'6px 12px', background:'#140f00', lineHeight:1.8 }}>
      {rows.map((r,i) => <div key={i}>{r}</div>)}
    </div>
    {contraintes && <div style={{ padding:'6px 12px', borderTop:`1px solid #3a2e00`, background:'#0f0a00', lineHeight:1.8 }}>
      {contraintes.map((c,i) => <div key={i} style={{ color:'#888' }}>{c}</div>)}
    </div>}
  </div>
)

// Rendu inline coloré
const pk = s => <span style={{ color:'#f5c842' }}>{s}</span>
const fk = s => <span style={{ color:'#f57a42' }}>{s}</span>
const nid = s => <span style={{ color:'#42c8f5' }}>{s}</span>
const m = s => <span style={{ color:'#f542c8' }}>{s}</span>
const u = s => <span style={{ color:'#42f578' }}>{s}</span>
const aud = s => <span style={{ color:'#a0a0f5' }}>{s}</span>
const mono = s => <code style={{ background:'#0a1520', padding:'1px 6px', borderRadius:4, fontFamily:'monospace', fontSize:'0.9em', color:'#a8d8ff' }}>{s}</code>

const Sec = ({ id, titre, emoji, children }) => (
  <section id={id} style={{ marginBottom:40 }}>
    <h2 style={{ fontSize:'clamp(16px,3vw,19px)', fontWeight:700, marginBottom:16, padding:'10px 18px', borderRadius:8, borderLeft:`4px solid ${C.accent}`, background:C.card, color:C.text, scrollMarginTop:70 }}>
      {emoji} {titre}
    </h2>
    {children}
  </section>
)

const ancres = [
  ['#intro','Intro'],['#parametrage','Paramétrage'],['#domaines','Domaines'],
  ['#mcd','Créer le MCD'],['#regles','Design Rules'],['#transfo','MCD→MLD-R'],
  ['#physique','Modèle physique'],['#apis','APIs de tables'],['#ddl','Générer SQL'],
  ['#consolidation','Consolidation'],['#nontransferable','Non-transférable'],
  ['#simulation-ti','Simulation TI'],['#lacunes','Lacunes ODM'],
]

export default function OdmPage() {
  return (
    <>
      <Head>
        <title>MDE avec Oracle Data Modeler — Guide complet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ minHeight:'100vh', background:C.bg, fontFamily:"'Segoe UI',system-ui,sans-serif", color:C.text, lineHeight:1.6 }}>

        <NavHeader titre="🟠 MDE avec Oracle Data Modeler" backHref="/" />

        {/* Sous-nav ancrée */}
        <div style={{ background:'#0d1520', borderBottom:`1px solid #2a3f55`, padding:'10px 20px', overflowX:'auto', display:'flex', gap:6, flexWrap:'nowrap', whiteSpace:'nowrap', WebkitOverflowScrolling:'touch' }}>
          {ancres.map(([href,label]) => (
            <a key={href} href={href} style={{ padding:'5px 12px', borderRadius:20, fontSize:'0.78em', fontWeight:600, textDecoration:'none', border:'1px solid #2a3f55', color:C.muted, flexShrink:0 }}
              onMouseEnter={e=>{e.target.style.background=C.accent;e.target.style.color='#fff'}}
              onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color=C.muted}}>
              {label}
            </a>
          ))}
        </div>

        <main style={{ maxWidth:900, margin:'0 auto', padding:'28px 20px 80px' }}>

          {/* ─── INTRO ─── */}
          <Sec id="intro" emoji="📋" titre="Introduction à ODM">
            <Card>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:16 }}>
                <div>
                  <div style={{ color:C.blue, fontWeight:700, marginBottom:6, fontSize:13 }}>Caractéristiques</div>
                  <div style={{ fontSize:13, color:C.muted, lineHeight:1.8 }}>
                    • Outil Oracle GRATUIT<br/>
                    • Intégré à SQL Developer<br/>
                    • Naissance : 2009<br/>
                    • Notation Barker (≠ UML)
                  </div>
                </div>
                <div>
                  <div style={{ color:C.warn, fontWeight:700, marginBottom:6, fontSize:13 }}>⚠️ Terminologie décalée</div>
                  <div style={{ fontSize:13, color:C.muted, lineHeight:1.8 }}>
                    <span style={{ color:C.blue }}>"Logical Model"</span> = MCD ← <strong style={{ color:C.bad }}>ATTENTION</strong><br/>
                    <span style={{ color:C.green }}>"Relational Model"</span> = MLD-R<br/>
                    <span style={{ color:C.pink }}>"Physical Model"</span> = MPD-R<br/>
                    On garde MCD/MLD-R/MPD dans ce cours
                  </div>
                </div>
                <div>
                  <div style={{ color:C.good, fontWeight:700, marginBottom:6, fontSize:13 }}>MCD Ecrisoft (cas du cours)</div>
                  <div style={{ fontSize:12.5, color:C.muted, lineHeight:1.8 }}>
                    PersonneMorale — client —→ Mandat<br/>
                    Mandat ←— pour —→ Realisation<br/>
                    Collaborateur ←— par —→ Realisation<br/>
                    Collaborateur ←— posseder —→ Qualification<br/>
                    Qualification ←— concerner —→ Mandat
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
                {[
                  ['PersonneMorale','# * numero\n* raisonSociale\n* rueNumero\n* codePostal\n* localite'],
                  ['Mandat','# * numero\nU * reference\n* description\n* dateSignature\n* dateDebut\n* dateFinPrevue\no dateFinReelle\n* nbHeuresChefProjet\n* nbHeuresMandCom'],
                  ['Qualification','# * numero\nU * libelle\n* tarifHoraire'],
                  ['Collaborateur','# * numero\nU * mnemo\n* nom\n* prenom'],
                  ['Realisation','# * numero\n* nbHeures'],
                ].map(([titre, rows]) => (
                  <OdmEntity key={titre} titre={titre} rows={rows.split('\n').map((r,i) => <span key={i}>{r}</span>)} />
                ))}
              </div>
              <div style={{ textAlign:'center', color:C.muted, fontSize:12, marginTop:10 }}>
                MCD Ecrisoft dans ODM (notation Barker) — # PK, U Unique, * obligatoire, o optionnel
              </div>
            </Card>
          </Sec>

          {/* ─── PARAMÉTRAGE ─── */}
          <Sec id="parametrage" emoji="⚙️" titre="Étape 1 — Paramétrage du projet">
            <Card>
              <Step n="1" titre="Script de préparation de l'environnement">
                <strong>Tools / Design Rule and Transformations / Transformations</strong><br/>
                Chercher et exécuter (Apply) : {mono('Heg-Arc : Prépare environnement de travail')}<br/>
                Ce script configure les règles de nommage :
                <ul style={{ paddingLeft:18, marginTop:6 }}>
                  <li>Limite des identifiants : <strong>128 caractères</strong> (limite Oracle)</li>
                  <li>Caractères autorisés : {mono('[a-z][A-Z][0-9]_')}</li>
                </ul>
                <Info>Ce paramétrage s'applique à TOUS les niveaux d'abstraction du projet.</Info>
              </Step>
            </Card>
          </Sec>

          {/* ─── DOMAINES ─── */}
          <Sec id="domaines" emoji="🗂️" titre="Étape 2 — Création des domaines">
            <Card>
              <p style={{ fontSize:13.5, color:C.muted, marginBottom:14 }}>
                <strong>Tools / Domains Administration</strong> — Un domaine = type personnalisé et réutilisable dans tout le projet.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:12 }}>
                <div style={{ background:'#0a1520', border:'1px solid #1e3a5a', borderRadius:8, padding:14 }}>
                  <div style={{ color:C.blue, fontWeight:700, marginBottom:6 }}>PK_Numerique</div>
                  <div style={{ fontSize:12.5, color:C.muted, lineHeight:1.7 }}>
                    Logical type : <strong style={{ color:C.text }}>NUMERIC</strong><br/>
                    Precision : <strong style={{ color:C.text }}>38</strong><br/>
                    Usage : PK de TOUTES les tables
                  </div>
                  <Warn>Pourquoi pas INTEGER ? Oracle stocke INTEGER en NUMBER(38). Lors de la consolidation, "INTEGER" (modèle) ≠ "NUMBER(38)" (base) → faux positifs → ALTER TABLE inutiles.</Warn>
                </div>
                <div style={{ background:'#0a1520', border:'1px solid #1e3a5a', borderRadius:8, padding:14 }}>
                  <div style={{ color:C.blue, fontWeight:700, marginBottom:6 }}>OUI_NON</div>
                  <div style={{ fontSize:12.5, color:C.muted, lineHeight:1.7 }}>
                    Logical type : <strong style={{ color:C.text }}>CHAR</strong>, Size : 1<br/>
                    Value List : {mono("'Y'")} et {mono("'N'")}<br/>
                    → Génère une contrainte <strong style={{ color:C.good }}>CHECK</strong> en physique !
                  </div>
                  <Info>Oracle ne supporte pas BOOLEAN → booléen = CHAR(1) + CHECK IN ('Y','N')</Info>
                </div>
                <div style={{ background:'#0a1520', border:'1px solid #1e3a5a', borderRadius:8, padding:14 }}>
                  <div style={{ color:C.blue, fontWeight:700, marginBottom:6 }}>CTRLUSER</div>
                  <div style={{ fontSize:12.5, color:C.muted, lineHeight:1.7 }}>
                    Logical type : <strong style={{ color:C.text }}>VARCHAR</strong>, Size : 30<br/>
                    Usage : colonnes d'audit (CTRLAUSER, CTRLMUSER)<br/>
                    → Standardise le type dans tout le projet
                  </div>
                  <Info>Créer AVANT d'exécuter le script APIs de tables — sinon type UNKNOWN dans le modèle physique.</Info>
                </div>
              </div>
            </Card>
          </Sec>

          {/* ─── CRÉER LE MCD ─── */}
          <Sec id="mcd" emoji="🖊️" titre="Étape 3 — Création du MCD (Logical Model)">
            <Card>
              <Step n="1" titre="Ouvrir le diagramme MCD">
                Dans le Browser : {mono('Logical Model')} → clic droit → {mono('Show')}<br/>
                <Badge t="info">Logical Model dans ODM = niveau MCD (conceptuel)</Badge>
              </Step>
              <Step n="2" titre="Créer une entité">
                Double-clic sur le diagramme → Entity Properties<br/>
                <ul style={{ paddingLeft:18, marginTop:4, fontSize:13 }}>
                  <li><strong>Name</strong> : nom de l'entité (ex: Qualification)</li>
                  <li><strong>Short Name</strong> : abréviation (ex: QUAL) — obligatoire pour la Custom Design Rule</li>
                  <li><strong>Preferred Abbreviation</strong> : nom de la TABLE générée (ex: QUALIFICATIONS)</li>
                </ul>
              </Step>
              <Step n="3" titre="Ajouter les attributs (onglet Attributes)">
                Pour chaque attribut :
                <ul style={{ paddingLeft:18, marginTop:4, fontSize:13 }}>
                  <li><strong>Name</strong> : nom de l'attribut</li>
                  <li><strong>Data Type / Domain</strong> : choisir le domaine (ex: PK_Numerique) ou type logique</li>
                  <li><strong>Primary UID</strong> coché → l'attribut devient la PK (# dans Barker)</li>
                  <li><strong>Mandatory</strong> coché → NOT NULL (* dans Barker)</li>
                  <li>Contrainte sur valeur : Default and Constraint &gt; Generic Constraint → ex: {mono('tarifHoraire > 0')}</li>
                </ul>
              </Step>
              <Step n="4" titre="Ajouter un Unique Identifier (NID)">
                Onglet {mono('Unique Identifiers')} → + pour ajouter<br/>
                Nommer le UID (ex: NID1_QUAL)<br/>
                Onglet {mono('Attributes and Relations')} → déplacer l'attribut dans la liste de droite<br/>
                <Warn>Le 'U' n'apparaît pas toujours dans le diagramme malgré la contrainte — dysfonctionnement connu. Fermer et rouvrir ODM résout généralement le problème.</Warn>
              </Step>
              <Step n="5" titre="Créer une association (New 1:N Relation)">
                Bouton "New 1:N Relation" dans la barre d'outils<br/>
                Cliquer sur l'entité <strong>PÈRE</strong> → tirer vers l'entité <strong>ENFANT</strong><br/>
                Propriétés essentielles :<br/>
                <ul style={{ paddingLeft:18, marginTop:4, fontSize:13 }}>
                  <li><strong>Name</strong> : nom de l'association</li>
                  <li><strong>Name on Source</strong> / <strong>Name on Target</strong> : noms de rôles</li>
                  <li><strong>Source Optional</strong> / <strong>Target Optional</strong> : cardinalités minimales (coché = 0, décoché = 1)</li>
                  <li><strong>Source to Target Cardinality</strong> : cardinalité maximale côté cible</li>
                  <li><strong>Transferable (côté cible)</strong> : DÉCOCHER = non-transférable ({'{frozen}'})</li>
                  <li><strong>Identifying</strong> : COCHER = ◆ losange (association identifiante CID)</li>
                </ul>
                Afficher les rôles : menu contextuel {mono('Show / Labels')}<br/>
                Afficher le cartouche : menu contextuel {mono('Show / Legend')}
              </Step>
            </Card>
          </Sec>

          {/* ─── DESIGN RULES ─── */}
          <Sec id="regles" emoji="✅" titre="Étape 4 — Règles de conception (Design Rules)">
            <Card>
              <p style={{ fontSize:13.5, color:C.muted, marginBottom:14 }}>
                <strong>Tools / Design Rule and Transformations / Design Rule</strong>
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:14 }}>
                <div style={{ background:'#0a1520', borderRadius:8, padding:12 }}>
                  <div style={{ color:C.blue, fontWeight:700, fontSize:13, marginBottom:6 }}>Design Rules (prédéfinies)</div>
                  <div style={{ fontSize:12.5, color:C.muted, lineHeight:1.7 }}>
                    Identify entities without attributes<br/>
                    Identify entities without relationships<br/>
                    Check for entity name case type<br/>
                    Check for attribute naming standards<br/>
                    ...etc.
                  </div>
                </div>
                <div style={{ background:'#0a1520', borderRadius:8, padding:12 }}>
                  <div style={{ color:C.accent, fontWeight:700, fontSize:13, marginBottom:6 }}>Custom Design Rules (HEG-Arc)</div>
                  <div style={{ fontSize:12.5, color:C.muted, lineHeight:1.7 }}>
                    Heg-Arc / MCD : ShortName obligatoire<br/>
                    Heg-Arc / MCD : Type booléen interdit<br/>
                    Heg-Arc / MCD : PK (domaine PK_Numerique)<br/>
                    Heg-Arc / MCD : Attribut sans taille/précision
                  </div>
                </div>
                <div style={{ background:'#0a1520', borderRadius:8, padding:12 }}>
                  <div style={{ color:C.good, fontWeight:700, fontSize:13, marginBottom:6 }}>Rule Set Heg</div>
                  <div style={{ fontSize:12.5, color:C.muted, lineHeight:1.7 }}>
                    Jeu de règles personnalisé regroupant les Custom Design Rules HEG-Arc.<br/>
                    Sélectionner le Rule Set → Apply Selected<br/>
                    Double-clic sur chaque erreur pour corriger directement.
                  </div>
                </div>
              </div>
              <Info>Appliquer le Rule Set Heg, corriger les erreurs (shortname manquant, mauvais type de Numero), puis relancer pour confirmer 0 erreur avant de transformer.</Info>
              <div style={{ background:'#1a0a0a', border:'1px solid #5a1a1a', borderRadius:8, padding:12, fontSize:13, marginTop:10 }}>
                <div style={{ color:C.bad, fontWeight:700, marginBottom:6 }}>Exemple d'erreurs dans le cours :</div>
                <div style={{ color:'#f57a7a', lineHeight:1.7 }}>
                  ERRORS:2 WARNINGS:0<br/>
                  Error: Collaborateur — Un ShortName doit être défini sur l'entité<br/>
                  Error: Collaborateur — le type de l'attribut Numero doit être le domaine PK_Numerique
                </div>
                <div style={{ color:C.muted, fontSize:12, marginTop:6 }}>
                  → Corriger : ajouter ShortName="COL", changer type Numero de Varchar(9) en PK_Numerique
                </div>
              </div>
            </Card>
          </Sec>

          {/* ─── TRANSFORMATION MCD→MLD-R ─── */}
          <Sec id="transfo" emoji="🔄" titre="Étape 5 — Transformation MCD → MLD-R">
            <Card>
              <Step n="1" titre="Lancer la transformation">
                Bouton {mono('»')} (Engineer to Relational Model) dans la barre d'outils<br/>
                Fenêtre qui apparaît : gauche = entités MCD, droite = tables MLD-R futures<br/>
                Options à <strong style={{ color:C.good }}>cocher</strong> dans General Options :
                <ul style={{ paddingLeft:18, marginTop:4, fontSize:13 }}>
                  <li>✅ <strong>Apply name translation</strong></li>
                  <li>✅ <strong>Use preferred abbreviations</strong> → utilise Preferred Abbreviation comme nom de table</li>
                  <li>✅ <strong>Apply template for FK columns</strong> → nomme les colonnes FK selon les templates</li>
                </ul>
                Cliquer <strong>Engineer</strong> → MLD-R créé automatiquement.<br/>
                Ajuster la présentation : menu contextuel {mono('Layout / Resize Object to Visible')}
              </Step>
              <Step n="2" titre="Post-transformation : 3 étapes complémentaires">
                <ol style={{ paddingLeft:18, marginTop:4, fontSize:13, lineHeight:2 }}>
                  <li><strong>Script "Create index on FK"</strong> — Oracle n'indexe PAS automatiquement les FK !</li>
                  <li><strong>Clic-droit MLD-R &gt; Apply Naming Standards to Keys and Constraints</strong> &gt; OK → applique les templates de nommage aux contraintes</li>
                  <li><strong>Script "Tables to upper case - Rhino"</strong> → identifiants en MAJUSCULES</li>
                </ol>
              </Step>
              <div style={{ marginTop:14 }}>
                <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:10 }}>MLD-R attendu (Ecrisoft Etape 1 — Qualification + Collaborateur) :</div>
                <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                  <MldTable titre="QUALIFICATIONS" rows={[
                    <>{pk('P * NUMERO')} <span style={{ color:C.muted }}>NUMBER(38)</span></>,
                    <>{u('U * LIBELLE')} <span style={{ color:C.muted }}>VARCHAR2(20)</span></>,
                    <><span style={{ color:C.text }}>* TARIFHORAIRE</span> <span style={{ color:C.muted }}>NUMBER(3)</span></>,
                  ]} contraintes={[
                    <>{pk('PK_QUAL (NUMERO)')}</>,
                    <>{u('UK_QUAL_LIBELLE (LIBELLE)')}</>,
                  ]} style={{ flex:1, minWidth:180 }} />
                  <MldTable titre="COLLABORATEURS" rows={[
                    <>{pk('P * NUMERO')} <span style={{ color:C.muted }}>NUMBER(38)</span></>,
                    <>{u('U * MNEMO')} <span style={{ color:C.muted }}>VARCHAR2(4)</span></>,
                    <><span style={{ color:C.text }}>* NOM</span> <span style={{ color:C.muted }}>VARCHAR2(40)</span></>,
                    <><span style={{ color:C.text }}>* PRENOM</span> <span style={{ color:C.muted }}>VARCHAR2(20)</span></>,
                    <>{fk('F * QUAL_NUMERO_ATTRIBUER')} <span style={{ color:C.muted }}>NUMBER(38)</span></>,
                  ]} contraintes={[
                    <>{pk('PK_COL (NUMERO)')}</>,
                    <>{u('UK_COL_MNEMO (MNEMO)')}</>,
                    <>{fk('FK_COL_QUAL_ATTRIBUER (QUAL_NUMERO_ATTRIBUER)')}</>,
                    <><span style={{ color:'#666' }}>IX_COL_QUAL_NUMERO_ATTRIBUER</span></>,
                  ]} style={{ flex:1, minWidth:220 }} />
                </div>
                <div style={{ color:C.muted, fontSize:12, marginTop:8 }}>
                  P = PK | U = inclus dans contrainte Unique | * = obligatoire | F = FK
                </div>
              </div>
            </Card>
          </Sec>

          {/* ─── MODÈLE PHYSIQUE ─── */}
          <Sec id="physique" emoji="🏗️" titre="Étape 6 — Modèle physique (Physical Model)">
            <Card>
              <Step n="1" titre="Créer le modèle physique">
                Dans le Browser, sous le MLD-R → clic droit → New Physical Model → <strong>Oracle Database 12cR2</strong><br/>
                Le Physical Model apparaît avec les 2 tables (COLLABORATEURS, QUALIFICATIONS).<br/>
                <Info>Au niveau physique, on NE modifie pas les colonnes (cela se fait aux niveaux supérieurs). On définit les propriétés spécifiques Oracle : tablespace, cluster...</Info>
              </Step>
              <Step n="2" titre="Domaine CTRLUSER (à créer AVANT les APIs)">
                Créer le domaine CTRLUSER (Tools &gt; Domains Administration) :<br/>
                Logical type: VARCHAR, Size: 30<br/>
                <Warn>Ce domaine DOIT être créé avant d'exécuter le script APIs de tables, sinon les colonnes d'audit auront le type UNKNOWN dans le modèle physique.</Warn>
              </Step>
              <Step n="3" titre="Activer la journalisation (_JN) pour chaque table">
                Ouvrir les propriétés de la table (double-clic sur la table dans le MLD-R)<br/>
                Onglet <strong>Dynamic Properties</strong> → + Ajouter :<br/>
                {mono('Name = "journal"')} | {mono('Value = "oui"')}<br/>
                Répéter pour chaque table à journaliser.
              </Step>
            </Card>
          </Sec>

          {/* ─── APIS DE TABLES ─── */}
          <Sec id="apis" emoji="⚡" titre="Étape 7 — Génération des APIs de tables">
            <Card>
              <Warn>ODM ne prend pas en charge nativement les APIs de tables. Un script de transformation personnalisé (Heg-Arc) les génère dans le référentiel.</Warn>
              <Step n="1" titre="Exécuter le script de génération">
                <strong>Tools / Design Rule and Transformations / Transformations</strong><br/>
                Sélectionner et exécuter : {mono('Heg-Arc : Génération des APIs de table Oracle')}<br/>
                <Info>⚠️ Assurez-vous que le Physical Model est ouvert (clic-droit &gt; Open) avant d'exécuter le script.</Info>
              </Step>
              <Step n="2" titre="Résultat dans le modèle physique">
                Après exécution du script, le Physical Model contient :
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10, marginTop:10 }}>
                  {[
                    ['🔢 Séquences', 'SEQ_COLLABORATEURS\nSEQ_QUALIFICATIONS'],
                    ['📦 Packages', 'API_COLLABORATEURS (SPEC)\nAPI_COLLABORATEURS (BODY)\nAPI_QUALIFICATIONS (SPEC)\nAPI_QUALIFICATIONS (BODY)'],
                    ['⚡ Triggers (12)', 'API_BIR_COL, API_BUR_COL,\nAPI_BDR_COL, API_AIR_COL,\nAPI_AUR_COL, API_ADR_COL\n+ idem pour QUAL'],
                    ['📊 Tables _JN', 'COLLABORATEURS_JN\nQUALIFICATIONS_JN\n(si journal=oui)'],
                    ['🏷️ Colonnes d\'audit', 'CTRLAUSER VARCHAR2(30)\nCTRLADATE DATE\nCTRLMUSER VARCHAR2(30)\nCTRLMDATE DATE'],
                  ].map(([titre, content]) => (
                    <div key={titre} style={{ background:'#0a1520', borderRadius:8, padding:12 }}>
                      <div style={{ color:C.accent, fontWeight:700, fontSize:12.5, marginBottom:6 }}>{titre}</div>
                      <pre style={{ fontSize:11, color:C.muted, lineHeight:1.6, fontFamily:'monospace', whiteSpace:'pre-wrap' }}>{content}</pre>
                    </div>
                  ))}
                </div>
              </Step>
              <Step n="3" titre="Package UP_AUTOGEN_COLUMNS — exemple">
                Le DDL Preview montre le corps du package :
                <Code>{`CREATE OR REPLACE PACKAGE BODY API_COLLABORATEURS IS

  PROCEDURE UP_AUTOGEN_COLUMNS (
    API_REC   IN OUT API_ROW_TYPE,
    OPERATION IN     VARCHAR2 DEFAULT 'INS'
  ) IS
  BEGIN
    IF (OPERATION = 'INS') THEN
      IF (API_REC.NUMERO IS NULL) THEN
        SELECT SEQ_COL.NEXTVAL
        INTO API_REC.NUMERO
        FROM DUAL;
      END IF;
      API_REC.CTRLAUSER := SYS_CONTEXT('USERENV', 'SESSION_USER');
      API_REC.CTRLADATE := SYSDATE;
    ELSE
      API_REC.CTRLMUSER := SYS_CONTEXT('USERENV', 'SESSION_USER');
      API_REC.CTRLMDATE := SYSDATE;
    END IF;
  END UP_AUTOGEN_COLUMNS;
...`}</Code>
              </Step>
            </Card>
          </Sec>

          {/* ─── GÉNÉRATION SQL-DDL ─── */}
          <Sec id="ddl" emoji="📄" titre="Étape 8 — Génération du SQL-DDL">
            <Card>
              <Step n="1" titre="Générer depuis le MLD-R">
                Depuis le MLD-R (pas depuis le Physical Model) → bouton <strong>Generate DDL</strong> (icône base de données dans la barre)<br/>
                DDL File Editor → bouton <strong>Generate</strong> → DDL Generation Options
              </Step>
              <Step n="2" titre="DDL Generation Options — tout cocher par défaut">
                Onglet "Create Selection" : tout cocher (Packages, Sequences, Tables...)<br/>
                Onglet "Triggers" : sélectionner TOUS les triggers<br/>
                → OK → code SQL-DDL généré complet
              </Step>
              <Step n="3" titre="Résultat attendu (Etape 1)">
                <div style={{ background:'#0a1520', borderRadius:8, padding:12, fontSize:12, color:C.muted, lineHeight:1.8, fontFamily:'monospace' }}>
                  -- CREATE TABLE : 4<br/>
                  -- CREATE INDEX : 1<br/>
                  -- ALTER TABLE : 6<br/>
                  -- CREATE PACKAGE : 2<br/>
                  -- CREATE PACKAGE BODY : 2<br/>
                  -- CREATE TRIGGER : 12<br/>
                  -- CREATE SEQUENCE : 2
                </div>
              </Step>
              <Step n="4" titre="Exécuter dans SQL Developer">
                Copier-coller le code SQL-DDL complet dans une feuille de calcul SQL Developer<br/>
                Vérifier dans le schéma AGL : tables, triggers, packages, séquences visibles
              </Step>
            </Card>
          </Sec>

          {/* ─── CONSOLIDATION ─── */}
          <Sec id="consolidation" emoji="🔁" titre="Étape 9 — Mécanisme de consolidation">
            <Card>
              <p style={{ fontSize:13.5, color:C.muted, marginBottom:14 }}>
                But : synchroniser le modèle ODM avec la base Oracle réelle après une itération (nouveaux objets ajoutés au MCD).
              </p>
              <Step n="1" titre="Créer la connexion (File > Import > Data Dictionary)">
                Menu File / Import / Data Dictionary → Add → configurer :<br/>
                Name: AGL | Database: Oracle | Username: AGL_PROF_CAMUS<br/>
                Hostname: db.ig.he-arc.ch | Port: 1521 | SID: ens<br/>
                → Save → Cancel (ne pas lancer l'import ici)
              </Step>
              <Step n="2" titre="Lancer la consolidation depuis le MLD-R">
                Bouton <strong>→</strong> (flèche vers la droite) dans la barre du MLD-R<br/>
                Fenêtre "Data Dictionary Connections" :<br/>
                Redirect Connection : choisir <strong>AGL</strong><br/>
                <Warn>NE PAS cocher : "Use Source Schema", "Use Source Object", "Synchronize the Whole Schema". Laisser uniquement "Exclude Remote Objects when synchronize Database with Model".</Warn>
                → OK
              </Step>
              <Step n="3" titre="Fenêtre Compare Models — analyser les différences">
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, margin:'10px 0' }}>
                  <div style={{ background:'#0a1520', borderRadius:8, padding:12 }}>
                    <div style={{ color:C.blue, fontWeight:700, fontSize:12, marginBottom:6 }}>Gauche (MLD-R Modèle)</div>
                    <div style={{ fontSize:11.5, color:C.muted, lineHeight:1.8, fontFamily:'monospace' }}>
                      ✅ COLLABORATEURS<br/>
                      ✅ COLLABORATEURS_JN<br/>
                      ✅ MANDATS<br/>
                      ✅ MANDATS_JN<br/>
                      ✅ PERSONNESMORALES<br/>
                      ✅ REALISATIONS<br/>
                      ✅ SEQ_COL, SEQ_MAN...
                    </div>
                  </div>
                  <div style={{ background:'#0a1520', borderRadius:8, padding:12 }}>
                    <div style={{ color:C.pink, fontWeight:700, fontSize:12, marginBottom:6 }}>Droite (Base Oracle AGL)</div>
                    <div style={{ fontSize:11.5, color:C.muted, lineHeight:1.8, fontFamily:'monospace' }}>
                      ✅ COLLABORATEURS<br/>
                      ✅ COLLABORATEURS_JN<br/>
                      🆕 New Table<br/>
                      🆕 New Table<br/>
                      🆕 New Table<br/>
                      🆕 New Table<br/>
                      🆕 New Sequence...
                    </div>
                  </div>
                </div>
                Bouton <strong>DDL Preview</strong> → voir le SQL de delta AVANT d'appliquer<br/>
                Bouton <strong>Merge</strong> → générer le delta et l'appliquer dans la base
              </Step>
              <Step n="4" titre="APIs de tables — à régénérer séparément">
                <Warn>La consolidation ne génère PAS les triggers des APIs. Il faut les regénérer via Generate DDL en sélectionnant UNIQUEMENT Packages et Triggers (onglet). Ces instructions sont des CREATE OR REPLACE → sûr de tout regénérer.</Warn>
              </Step>
            </Card>
          </Sec>

          {/* ─── NON-TRANSFÉRABLE ─── */}
          <Sec id="nontransferable" emoji="🔒" titre="Lacune ODM : contraintes non-transférables">
            <Card>
              <Warn>ODM ne prend PAS encore en compte les contraintes de clé étrangères non-transférables dans le mécanisme de consolidation. Les triggers correspondants NE sont PAS générés automatiquement. Cette lacune a été soumise à Oracle.</Warn>
              <Step n="1" titre="Modélisation dans le MCD">
                Dans les propriétés de la relation, côté <strong>cible</strong> (Realisation) :<br/>
                <strong>Transferable = false</strong> (décocher la case) → indique la non-transférabilité
              </Step>
              <Step n="2" titre="Contournement : DDL Preview manuel">
                Sélectionner la table concernée (ex: REALISATIONS)<br/>
                Clic-droit → {' '}<strong>DDL Preview</strong><br/>
                Récupérer le trigger {mono('FKNTM_NOMTABLE_BEFORE')} dans le code généré<br/>
                Copier ce trigger → exécuter dans le schéma Oracle
              </Step>
              <div style={{ marginTop:10 }}>
                <div style={{ color:C.text, fontWeight:600, fontSize:13.5, marginBottom:8 }}>Trigger de non-transférabilité (exemple REALISATIONS) :</div>
                <Code>{`CREATE OR REPLACE TRIGGER FKNTM_REALISATIONS_BEFORE
  BEFORE UPDATE OF COL_NUMERO_PAR, MAN_NUMERO_POUR ON REALISATIONS
BEGIN
  RAISE_APPLICATION_ERROR(-20225,
    'Non Transferable FK constraint on table REALISATIONS is violated');
END;
/`}</Code>
              </div>
              <Info>Faire de même pour la table MANDATS qui a aussi une contrainte non-transférable (association "client" avec PersonneMorale).</Info>
            </Card>
          </Sec>

          {/* ─── SIMULATION TI ─── */}
          <Sec id="simulation-ti" emoji="🔀" titre="Simulation d'entité associative (Mode TI dans ODM)">
            <Card>
              <p style={{ fontSize:13.5, color:C.muted, marginBottom:14 }}>
                ODM applique TOUJOURS le mode DT. Pour obtenir une table indépendante (ex: Realisation entre Mandat et Collaborateur), il faut <strong>dénaturer le MCD</strong>.
              </p>
              <Step n="1" titre="Créer l'entité Realisation avec AID">
                Name: Realisation | Short Name: REAL | Preferred Abbreviation: REALISATIONS<br/>
                Attributs :<br/>
                <div style={{ background:'#0a1520', borderRadius:6, padding:10, marginTop:6, fontSize:12.5, color:C.muted, lineHeight:1.8 }}>
                  numero : PK_Numerique, Primary UID ✅<br/>
                  nbHeures : Numeric(5), Default Value: 0
                </div>
              </Step>
              <Step n="2" titre="Créer 2 associations père-fils NON-TRANSFÉRABLES">
                Relation 1 — "pour" : Mandat (0..*) → Realisation (1..1), <strong>Transferable côté Realisation = false</strong><br/>
                Relation 2 — "par" : Collaborateur (0..*) → Realisation (1..1), <strong>Transferable côté Realisation = false</strong>
              </Step>
              <Step n="3" titre="Créer l'Unique Identifier REAL_SIMPK">
                Dans les propriétés de l'entité Realisation → onglet Unique Identifiers → +<br/>
                Name: REAL_SIMPK<br/>
                Onglet "Attributes and Relations" → ajouter les deux <strong>relations</strong> FK (pas les attributs) dans la liste de droite
              </Step>
              <div style={{ marginTop:16 }}>
                <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:10 }}>MCD ODM résultant :</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center', marginBottom:16 }}>
                  <OdmEntity titre="Mandat" rows={['# * numero','U * reference','* description','* dateSignature','...'].map((r,i)=><span key={i}>{r}</span>)} />
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontSize:12, color:C.accent, gap:4 }}>
                    <span>0..*</span>
                    <span>←— pour —→</span>
                    <span>1..1 (non-trf.)</span>
                  </div>
                  <OdmEntity titre="Realisation" rows={['# * numero','* nbHeures','(UK: REAL_SIMPK)'].map((r,i)=><span key={i} style={r.includes('REAL_SIMPK')?{color:'#42f578',fontSize:'0.9em'}:{}}>{r}</span>)} />
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontSize:12, color:C.accent, gap:4 }}>
                    <span>0..*</span>
                    <span>←— par —→</span>
                    <span>1..1 (non-trf.)</span>
                  </div>
                  <OdmEntity titre="Collaborateur" rows={['# * numero','U * mnemo','* nom','* prenom'].map((r,i)=><span key={i}>{r}</span>)} />
                </div>
                <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:10 }}>MLD-R généré :</div>
                <MldTable titre="REALISATIONS" rows={[
                  <>{pk('P * NUMERO')} <span style={{ color:C.muted }}>NUMBER(38)</span> ← PK SIMPLE (AID)</>,
                  <>{fk('F * COL_NUMERO_PAR')} <span style={{ color:C.muted }}>NUMBER(38)</span> ← FK vers COLLABORATEURS</>,
                  <>{fk('F * MAN_NUMERO_POUR')} <span style={{ color:C.muted }}>NUMBER(38)</span> ← FK vers MANDATS</>,
                  <><span style={{ color:C.text }}>* NBHEURES</span> <span style={{ color:C.muted }}>NUMBER(5) DEFAULT 0</span></>,
                  <>{aud('CTRLAUSER, CTRLADATE, CTRLMUSER, CTRLMDATE')}</>,
                ]} contraintes={[
                  <>{pk('PK_REAL (NUMERO)')}</>,
                  <>{u('UK_REAL_SIMPK (COL_NUMERO_PAR, MAN_NUMERO_POUR)')} ← SIMPK</>,
                  <>{fk('FK_REAL_COL_PAR (COL_NUMERO_PAR)')}</>,
                  <>{fk('FK_REAL_MAN_POUR (MAN_NUMERO_POUR)')}</>,
                  <><span style={{ color:'#666' }}>IX_REAL_COL_PAR | IX_REAL_MAN_POUR</span></>,
                ]} />
              </div>
              <div style={{ background:'#0d2a1a', border:'1px solid #1a5a35', borderRadius:8, padding:14, marginTop:14 }}>
                <div style={{ color:C.good, fontWeight:700, marginBottom:8 }}>Questions du prof sur la simulation (p.40 du cours)</div>
                <ul style={{ fontSize:13, color:C.text, lineHeight:2, paddingLeft:18 }}>
                  <li><strong>Sur quelle(s) colonne(s) est basée la PK ?</strong> → NUMERO (AID indépendant, mono-colonne)</li>
                  <li><strong>Comment est garanti le produit cartésien ?</strong> → UK_REAL_SIMPK sur (COL_NUMERO_PAR, MAN_NUMERO_POUR)</li>
                  <li><strong>Pourquoi les 2 FK sont-elles obligatoires ?</strong> → Cardinalités min 1 côté Realisation dans les deux associations</li>
                  <li><strong>Pourquoi non-transférables ?</strong> → Simule {'{frozen}'} : une réalisation ne change pas de mandat ni de collaborateur</li>
                </ul>
              </div>
            </Card>
          </Sec>

          {/* ─── LACUNES ODM ─── */}
          <Sec id="lacunes" emoji="⚠️" titre="Récapitulatif — Lacunes d'ODM vs MVC-CD">
            <Card>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                  <thead>
                    <tr style={{ background:'#0d1a27' }}>
                      <th style={{ padding:'10px 14px', textAlign:'left', borderBottom:`2px solid ${C.border}`, color:C.accent }}>Fonctionnalité</th>
                      <th style={{ padding:'10px 14px', textAlign:'center', borderBottom:`2px solid ${C.border}`, color:C.blue }}>MVC-CD (VP)</th>
                      <th style={{ padding:'10px 14px', textAlign:'center', borderBottom:`2px solid ${C.border}`, color:C.pink }}>ODM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Ingénierie descendante (MCD→SQL)', '✅ Automatique', '✅ Automatique'],
                      ['Reverse engineering (SQL→MCD)', '❌ Non', '✅ Oui (bidirectionnel)'],
                      ['Mode TI (Tables Indépendantes)', '✅ Paramétrable automatiquement', '⚠️ Dénaturalisation manuelle du MCD'],
                      ['APIs de tables (triggers+packages)', '✅ Générées automatiquement', '⚠️ Script de transformation Heg-Arc'],
                      ['Tables JN (journalisation)', '✅ Automatique', '⚠️ Dynamic Property journal=oui + script'],
                      ['{frozen} sur FK (non-transférable)', '✅ Géré', '⚠️ Modélisé (Transferable=false) mais trigger NON généré par consolidation'],
                      ['Entités associatives', '✅ Supportées', '❌ Non supportées → simulation manuelle'],
                      ['Index sur FK', '✅ Automatique', '⚠️ Script "Create index on FK"'],
                      ['Design Rules personnalisées', '✅ Via plugin', '✅ Custom Design Rules (JavaScript)'],
                      ['Consolidation (delta SQL)', '✅ Automatique', '✅ Compare Models'],
                    ].map(([feat, vp, odm], i) => (
                      <tr key={i} style={{ borderBottom:`1px solid ${C.border}`, background: i%2===1?'#0d1520':'transparent' }}>
                        <td style={{ padding:'9px 14px', color:C.text }}>{feat}</td>
                        <td style={{ padding:'9px 14px', textAlign:'center', color:vp.startsWith('✅')?C.good:vp.startsWith('⚠️')?C.warn:C.bad }}>{vp}</td>
                        <td style={{ padding:'9px 14px', textAlign:'center', color:odm.startsWith('✅')?C.good:odm.startsWith('⚠️')?C.warn:C.bad }}>{odm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <Link href="/quiz/odm" style={{ flex:1 }}>
                <div style={{ background:`linear-gradient(135deg,${C.accent},${C.accent}99)`, color:'#fff', borderRadius:12, padding:'14px 24px', textAlign:'center', fontWeight:700, fontSize:15, minHeight:52, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  🎯 Faire le quiz ODM (12 questions) →
                </div>
              </Link>
              <Link href="/transformations#odm" style={{ flex:1 }}>
                <div style={{ background:C.card, border:`1px solid ${C.border}`, color:C.text, borderRadius:12, padding:'14px 24px', textAlign:'center', fontWeight:600, fontSize:15, minHeight:52, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  🗄️ Page Transformations — Section ODM
                </div>
              </Link>
            </div>
          </Sec>

        </main>
      </div>
    </>
  )
}
