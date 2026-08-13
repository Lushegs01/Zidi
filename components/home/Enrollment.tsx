'use client'

import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown } from 'lucide-react'
import { timezones, generateTimeSlots } from '@/data/timezones'

// ── Types ──────────────────────────────────────────────────────────────────

type LearnerType = 'child' | 'adult' | null
type Subject = 'yoruba' | 'igbo' | 'other' | null
type Level = 'beginner' | 'some' | 'conversational' | null
type SessionType = 'private-once' | 'private-twice' | 'group-once' | 'group-twice' | null
type GroupSize = 2 | 3 | 4 | null

interface GroupMember {
  name: string
  age: string
}

interface EnrollmentState {
  step: number
  learnerType: LearnerType
  subject: Subject
  subjectOther: string
  level: Level
  sessionType: SessionType
  groupSize: GroupSize
  groupMembers: GroupMember[]
  learnerName: string
  age: string
  goal: string
  selectedDays: Set<string>
  timezoneValue: string
  timezoneOffset: number | null
  selectedSlots: Set<string>
  contactName: string
  email: string
  whatsapp: string
  referral: string
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// ── ChoiceBtn helper ────────────────────────────────────────────────────────
function ChoiceBtn({
  selected,
  onClick,
  className = '',
  children,
}: {
  selected: boolean
  onClick: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left border-2 rounded-[12px] transition-all duration-150 ${
        selected
          ? 'border-gold bg-gold-pale'
          : 'border-ivory-dark bg-ivory hover:border-gold/60'
      } ${className}`}
    >
      {children}
    </button>
  )
}

// ── Enrollment export handle ────────────────────────────────────────────────
export interface EnrollmentHandle {
  preSelectSubject: (subject: string) => void
}

// ── Main Component ──────────────────────────────────────────────────────────
const Enrollment = forwardRef<EnrollmentHandle>(function Enrollment(_props, ref) {
  const TOTAL_STEPS = 5

  const [state, setState] = useState<EnrollmentState>({
    step: 1,
    learnerType: null,
    subject: null,
    subjectOther: '',
    level: null,
    sessionType: null,
    groupSize: null,
    groupMembers: [],
    learnerName: '',
    age: '',
    goal: '',
    selectedDays: new Set(),
    timezoneValue: '',
    timezoneOffset: null,
    selectedSlots: new Set(),
    contactName: '',
    email: '',
    whatsapp: '',
    referral: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [direction, setDirection] = useState(1)

  useImperativeHandle(ref, () => ({
    preSelectSubject(subject: string) {
      setState(prev => ({ ...prev, subject: subject as Subject }))
    },
  }))

  function set<K extends keyof EnrollmentState>(key: K, value: EnrollmentState[K]) {
    setState(prev => ({ ...prev, [key]: value }))
  }

  function goTo(next: number) {
    setDirection(next > state.step ? 1 : -1)
    setState(prev => ({ ...prev, step: next }))
    setTimeout(() => {
      document.getElementById('enrol')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function validateAndNext() {
    setError('')
    const { step, learnerType, subject, subjectOther, level, sessionType, groupSize, groupMembers } = state

    if (step === 1) {
      if (!learnerType) { setError('Please choose who this is for.'); return }
    }
    if (step === 2) {
      if (!subject) { setError('Please choose a subject.'); return }
      if (subject === 'other' && !subjectOther.trim()) { setError('Please describe what you\'d like to learn.'); return }
      if (!level) { setError('Please choose a level.'); return }
      if (!sessionType) { setError('Please choose a session type.'); return }
      if (sessionType.startsWith('group')) {
        if (!groupSize) { setError('Please choose your group size.'); return }
        const incomplete = groupMembers.some(m => !m.name.trim())
        if (incomplete) { setError('Please enter all group member names.'); return }
      }
    }
    if (step === 3) {
      const isGroup = sessionType?.startsWith('group')
      if (!isGroup) {
        if (!state.learnerName.trim()) { setError('Please enter the learner\'s name.'); return }
      }
    }
    if (step === 4) {
      if (!state.timezoneValue) { setError('Please select your timezone.'); return }
    }
    goTo(step + 1)
  }

  function handleGroupSizeChange(size: GroupSize) {
    if (!size) return
    const members: GroupMember[] = Array.from({ length: size }, (_, i) => ({
      name: state.groupMembers[i]?.name || '',
      age: state.groupMembers[i]?.age || '',
    }))
    setState(prev => ({ ...prev, groupSize: size, groupMembers: members }))
  }

  function toggleDay(day: string) {
    setState(prev => {
      const next = new Set(prev.selectedDays)
      next.has(day) ? next.delete(day) : next.add(day)
      return { ...prev, selectedDays: next }
    })
  }

  function toggleSlot(slot: string) {
    setState(prev => {
      const next = new Set(prev.selectedSlots)
      next.has(slot) ? next.delete(slot) : next.add(slot)
      return { ...prev, selectedSlots: next }
    })
  }

  function handleTimezoneChange(value: string) {
    const tz = timezones.find(t => t.value === value || t.label === value)
    setState(prev => ({
      ...prev,
      timezoneValue: value,
      timezoneOffset: tz?.utcOffset ?? null,
      selectedSlots: new Set(),
    }))
  }

  function handleSubmit() {
    if (!state.contactName.trim()) { setError('Please enter your name.'); return }
    if (!state.email.trim()) { setError('Please enter your email address.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) { setError('Please enter a valid email address.'); return }
    setError('')
    // TODO: Wire up Formspree endpoint here when available
    // For now, show the success state immediately (matching original site behaviour)
    setSubmitted(true)
    setTimeout(() => {
      document.getElementById('enrol')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const isGroup = state.sessionType?.startsWith('group')
  const timeSlots = state.timezoneOffset !== null
    ? generateTimeSlots(state.timezoneOffset)
    : []

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  }

  return (
    <section id="enrol" className="bg-ivory-dark py-24">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <span className="block text-[0.7rem] font-bold tracking-[0.12em] uppercase text-gold mb-3">
          Enrol
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.025em] text-zidi-text mb-3">
          Ready? Let&apos;s get started.
        </h2>
        <p className="text-zidi-muted text-lg leading-relaxed max-w-[44ch] mb-12">
          Fill in the details below and we&apos;ll match you with the right tutor within 24 hours.
        </p>

        {/* Form box */}
        <div className="max-w-[600px] bg-white rounded-[16px] shadow-[0_4px_48px_rgba(0,0,0,0.08)] border border-black/6 p-8 sm:p-10">

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-forest" />
              </div>
              <h3 className="font-display text-2xl font-bold text-zidi-text mb-3">
                Form submitted. We will be in touch.
              </h3>
              <p className="text-zidi-muted leading-relaxed max-w-[34ch] mx-auto">
                We&apos;ll review your details and reach out via email or WhatsApp to confirm next steps.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Progress bar */}
              <div className="flex gap-1.5 mb-8">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                      i + 1 < state.step
                        ? 'bg-forest'
                        : i + 1 === state.step
                        ? 'bg-gold'
                        : 'bg-ivory-dark'
                    }`}
                  />
                ))}
              </div>

              {/* Steps */}
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={state.step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >

                  {/* ── STEP 1: Who ── */}
                  {state.step === 1 && (
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-gold mb-1.5">Step 1 of 5</p>
                      <h3 className="font-display text-2xl font-bold text-zidi-text mb-6">Who is this for?</h3>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <ChoiceBtn
                          selected={state.learnerType === 'child'}
                          onClick={() => set('learnerType', 'child')}
                          className="p-4"
                        >
                          <span className="text-2xl block mb-1.5">👧🏾</span>
                          <span className="block font-semibold text-sm text-zidi-text">My child</span>
                          <span className="block text-xs text-zidi-muted mt-0.5">I&apos;m booking for my son or daughter</span>
                        </ChoiceBtn>
                        <ChoiceBtn
                          selected={state.learnerType === 'adult'}
                          onClick={() => set('learnerType', 'adult')}
                          className="p-4"
                        >
                          <span className="text-2xl block mb-1.5">🧑🏾‍💼</span>
                          <span className="block font-semibold text-sm text-zidi-text">Myself</span>
                          <span className="block text-xs text-zidi-muted mt-0.5">I&apos;m the one learning</span>
                        </ChoiceBtn>
                      </div>
                      {error && <p className="text-sm text-coral mb-3">{error}</p>}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={validateAndNext}
                          className="bg-midnight hover:bg-midnight-2 text-ivory font-semibold text-sm px-6 py-2.5 rounded-[6px] transition-colors"
                        >
                          Continue →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Subject ── */}
                  {state.step === 2 && (
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-gold mb-1.5">Step 2 of 5</p>
                      <h3 className="font-display text-2xl font-bold text-zidi-text mb-6">What would you like to learn?</h3>

                      {/* Subject */}
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-zidi-text mb-2">Subject</label>
                        <div className="grid grid-cols-2 gap-2">
                          {(['yoruba', 'igbo'] as const).map(s => (
                            <ChoiceBtn
                              key={s}
                              selected={state.subject === s}
                              onClick={() => set('subject', s)}
                              className="p-3 flex items-center gap-2.5"
                            >
                              <span className="text-lg">{s === 'yoruba' ? '🗣️' : '💬'}</span>
                              <span className="font-semibold text-sm text-zidi-text capitalize">{s}</span>
                            </ChoiceBtn>
                          ))}
                          <ChoiceBtn
                            selected={state.subject === 'other'}
                            onClick={() => set('subject', 'other')}
                            className="p-3 col-span-2"
                          >
                            <span className="block font-semibold text-sm text-zidi-text">Something else</span>
                            <span className="block text-xs text-zidi-muted mt-0.5">Chess, music, cooking, another language…</span>
                          </ChoiceBtn>
                        </div>
                        {state.subject === 'other' && (
                          <input
                            type="text"
                            placeholder="What would you like to learn?"
                            value={state.subjectOther}
                            onChange={e => set('subjectOther', e.target.value)}
                            className="mt-2 w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body"
                          />
                        )}
                      </div>

                      {/* Level */}
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-zidi-text mb-2">Current level</label>
                        <div className="space-y-2">
                          {[
                            { val: 'beginner', label: 'Complete beginner', sub: 'No experience at all' },
                            { val: 'some', label: 'Some exposure', sub: 'I know a few words or phrases' },
                            { val: 'conversational', label: 'Conversational', sub: 'I can hold a basic conversation' },
                          ].map(l => (
                            <ChoiceBtn
                              key={l.val}
                              selected={state.level === l.val as Level}
                              onClick={() => set('level', l.val as Level)}
                              className="w-full p-3 flex items-center justify-between"
                            >
                              <div>
                                <span className="block font-semibold text-sm text-zidi-text">{l.label}</span>
                                <span className="block text-xs text-zidi-muted mt-0.5">{l.sub}</span>
                              </div>
                              {state.level === l.val && (
                                <CheckCircle size={16} className="text-gold flex-shrink-0 ml-2" />
                              )}
                            </ChoiceBtn>
                          ))}
                        </div>
                      </div>

                      {/* Session type */}
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-zidi-text mb-2">Session type</label>
                        <div className="relative">
                          <select
                            value={state.sessionType || ''}
                            onChange={e => {
                              const val = e.target.value as SessionType
                              set('sessionType', val)
                              if (!val?.startsWith('group')) {
                                setState(prev => ({ ...prev, sessionType: val, groupSize: null, groupMembers: [] }))
                              } else {
                                set('sessionType', val)
                              }
                            }}
                            className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2.5 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body appearance-none"
                          >
                            <option value="" disabled>Select a plan…</option>
                            <option value="private-once">Private · Once per week</option>
                            <option value="private-twice">Private · Twice per week</option>
                            <option value="group-once">Group · Once per week</option>
                            <option value="group-twice">Group · Twice per week</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zidi-muted pointer-events-none" />
                        </div>
                      </div>

                      {/* Group size */}
                      {isGroup && (
                        <div className="mb-4">
                          <label className="block text-xs font-semibold text-zidi-text mb-2">
                            How many people in your group?
                          </label>
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            {([2, 3, 4] as const).map(n => (
                              <ChoiceBtn
                                key={n}
                                selected={state.groupSize === n}
                                onClick={() => handleGroupSizeChange(n)}
                                className="p-2.5 text-center"
                              >
                                <span className="font-bold text-sm text-zidi-text">{n}</span>
                              </ChoiceBtn>
                            ))}
                          </div>
                          <p className="text-xs text-zidi-muted">Groups are 2–4 people who all know each other. Pricing is per person.</p>

                          {state.groupMembers.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {state.groupMembers.map((m, i) => (
                                <div key={i}>
                                  <label className="block text-xs font-semibold text-zidi-text mb-1">Person {i + 1}</label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      placeholder="First name"
                                      value={m.name}
                                      onChange={e => {
                                        const members = [...state.groupMembers]
                                        members[i] = { ...members[i], name: e.target.value }
                                        set('groupMembers', members)
                                      }}
                                      className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body"
                                    />
                                    <select
                                      value={m.age}
                                      onChange={e => {
                                        const members = [...state.groupMembers]
                                        members[i] = { ...members[i], age: e.target.value }
                                        set('groupMembers', members)
                                      }}
                                      className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body"
                                    >
                                      <option value="">Age range</option>
                                      <option value="5-8">5–8</option>
                                      <option value="9-12">9–12</option>
                                      <option value="13-17">13–17</option>
                                      <option value="18-25">18–25</option>
                                      <option value="26-33">26–33</option>
                                      <option value="34-40">34–40</option>
                                      <option value="40+">40+</option>
                                    </select>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {error && <p className="text-sm text-coral mb-3">{error}</p>}
                      <div className="flex justify-between items-center mt-4">
                        <button type="button" onClick={() => goTo(1)} className="text-sm text-zidi-muted hover:text-zidi-text transition-colors">← Back</button>
                        <button type="button" onClick={validateAndNext} className="bg-midnight hover:bg-midnight-2 text-ivory font-semibold text-sm px-6 py-2.5 rounded-[6px] transition-colors">Continue →</button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: Learner details ── */}
                  {state.step === 3 && (
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-gold mb-1.5">Step 3 of 5</p>
                      <h3 className="font-display text-2xl font-bold text-zidi-text mb-6">
                        {isGroup ? 'A bit more detail' : state.learnerType === 'adult' ? 'About you' : 'About your child'}
                      </h3>

                      {!isGroup && (
                        <>
                          <div className="mb-4">
                            <label className="block text-xs font-semibold text-zidi-text mb-1.5">
                              {state.learnerType === 'adult' ? 'Preferred first name' : "Child's first name"}
                            </label>
                            <input
                              type="text"
                              placeholder="First name only"
                              value={state.learnerName}
                              onChange={e => set('learnerName', e.target.value)}
                              className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2.5 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-xs font-semibold text-zidi-text mb-2">Age</label>
                            {state.learnerType === 'child' ? (
                              <div className="grid grid-cols-3 gap-2">
                                {['5–8', '9–12', '13–17'].map(a => (
                                  <ChoiceBtn key={a} selected={state.age === a} onClick={() => set('age', a)} className="p-2.5 text-center">
                                    <span className="font-semibold text-sm text-zidi-text">{a}</span>
                                  </ChoiceBtn>
                                ))}
                              </div>
                            ) : (
                              <div className="grid grid-cols-4 gap-2">
                                {['18–25', '26–33', '34–40', '40+'].map(a => (
                                  <ChoiceBtn key={a} selected={state.age === a} onClick={() => set('age', a)} className="p-2.5 text-center">
                                    <span className="font-semibold text-sm text-zidi-text">{a}</span>
                                  </ChoiceBtn>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-zidi-text mb-1.5">
                          What&apos;s the goal?{' '}
                          <span className="font-normal text-zidi-muted">(optional)</span>
                        </label>
                        <textarea
                          value={state.goal}
                          onChange={e => set('goal', e.target.value)}
                          placeholder="e.g. I want my daughter to speak Yoruba with her grandparents by Christmas…"
                          className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2.5 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body min-h-[90px] resize-y"
                        />
                      </div>

                      {error && <p className="text-sm text-coral mb-3">{error}</p>}
                      <div className="flex justify-between items-center mt-4">
                        <button type="button" onClick={() => goTo(2)} className="text-sm text-zidi-muted hover:text-zidi-text transition-colors">← Back</button>
                        <button type="button" onClick={validateAndNext} className="bg-midnight hover:bg-midnight-2 text-ivory font-semibold text-sm px-6 py-2.5 rounded-[6px] transition-colors">Continue →</button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 4: Availability ── */}
                  {state.step === 4 && (
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-gold mb-1.5">Step 4 of 5</p>
                      <h3 className="font-display text-2xl font-bold text-zidi-text mb-6">When are you free?</h3>

                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-zidi-text mb-2">
                          Best days for sessions{' '}
                          <span className="font-normal text-zidi-muted">(select all that work)</span>
                        </label>
                        <div className="grid grid-cols-7 gap-1.5">
                          {DAYS.map(day => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleDay(day)}
                              className={`py-2 text-center text-xs font-semibold rounded-[6px] border-[1.5px] transition-all ${
                                state.selectedDays.has(day)
                                  ? 'border-gold bg-gold-pale text-zidi-text'
                                  : 'border-ivory-dark bg-ivory text-zidi-muted hover:border-gold/60'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-zidi-text mb-1.5">Your timezone</label>
                        <div className="relative">
                          <select
                            value={state.timezoneValue}
                            onChange={e => handleTimezoneChange(e.target.value)}
                            className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2.5 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body appearance-none"
                          >
                            <option value="">Select your timezone</option>
                            {timezones.map(tz => (
                              <option key={tz.value} value={tz.value}>{tz.label}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zidi-muted pointer-events-none" />
                        </div>
                      </div>

                      {state.timezoneOffset !== null && timeSlots.length > 0 && (
                        <div className="mb-4">
                          <label className="block text-xs font-semibold text-zidi-text mb-1.5">
                            Preferred times{' '}
                            <span className="font-normal text-zidi-muted">(select all that work)</span>
                          </label>
                          <p className="text-xs text-zidi-muted mb-2">
                            Times shown in your local time.
                            {state.timezoneOffset !== 1 && ' (WAT times in brackets)'}
                          </p>
                          <div className="grid grid-cols-4 gap-1.5">
                            {timeSlots.map((slot, i) => (
                              <button
                                key={i}
                                type="button"
                                disabled={!slot.available}
                                onClick={() => slot.available && toggleSlot(slot.label)}
                                className={`py-1.5 text-center text-xs font-semibold rounded-[6px] border-[1.5px] transition-all ${
                                  !slot.available
                                    ? 'border-ivory-dark bg-ivory/50 text-zidi-muted/35 cursor-not-allowed'
                                    : state.selectedSlots.has(slot.label)
                                    ? 'border-gold bg-gold text-ivory'
                                    : 'border-ivory-dark bg-ivory text-zidi-text hover:border-gold/60'
                                }`}
                              >
                                {slot.localDisplay}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {error && <p className="text-sm text-coral mb-3">{error}</p>}
                      <div className="flex justify-between items-center mt-4">
                        <button type="button" onClick={() => goTo(3)} className="text-sm text-zidi-muted hover:text-zidi-text transition-colors">← Back</button>
                        <button type="button" onClick={validateAndNext} className="bg-midnight hover:bg-midnight-2 text-ivory font-semibold text-sm px-6 py-2.5 rounded-[6px] transition-colors">Continue →</button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 5: Contact ── */}
                  {state.step === 5 && (
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-gold mb-1.5">Step 5 of 5</p>
                      <h3 className="font-display text-2xl font-bold text-zidi-text mb-6">
                        {state.learnerType === 'adult' ? 'How do we reach you?' : 'Contact information for parent or guardian'}
                      </h3>

                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-zidi-text mb-1.5">
                          {state.learnerType === 'adult' ? 'Your full name' : 'Parent / guardian\'s full name'}
                        </label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={state.contactName}
                          onChange={e => set('contactName', e.target.value)}
                          className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2.5 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-zidi-text mb-1.5">Email address</label>
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={state.email}
                            onChange={e => set('email', e.target.value)}
                            className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2.5 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zidi-text mb-1.5">WhatsApp number</label>
                          <input
                            type="tel"
                            placeholder="+44 7700 000000"
                            value={state.whatsapp}
                            onChange={e => set('whatsapp', e.target.value)}
                            className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2.5 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-zidi-text mb-1.5">
                          How did you hear about Learn with Zidi?{' '}
                          <span className="font-normal text-zidi-muted">(optional)</span>
                        </label>
                        <div className="relative">
                          <select
                            value={state.referral}
                            onChange={e => set('referral', e.target.value)}
                            className="w-full border-[1.5px] border-ivory-dark bg-ivory rounded-[6px] px-3 py-2.5 text-sm text-zidi-text focus:border-gold focus:bg-white outline-none transition-colors font-body appearance-none"
                          >
                            <option value="">Select one</option>
                            <option>A friend or family member</option>
                            <option>WhatsApp group</option>
                            <option>Instagram or Facebook</option>
                            <option>Google search</option>
                            <option>Other</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zidi-muted pointer-events-none" />
                        </div>
                      </div>

                      {error && <p className="text-sm text-coral mb-3">{error}</p>}
                      <div className="flex justify-between items-center mt-6">
                        <button type="button" onClick={() => goTo(4)} className="text-sm text-zidi-muted hover:text-zidi-text transition-colors">← Back</button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="bg-midnight hover:bg-midnight-2 text-ivory font-semibold text-base px-8 py-3 rounded-[6px] transition-colors"
                        >
                          Submit →
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </section>
  )
})

export default Enrollment
