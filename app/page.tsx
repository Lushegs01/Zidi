'use client'

import { useRef, useState, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import HowItWorks from '@/components/home/HowItWorks'
import Subjects from '@/components/home/Subjects'
import CulturalStory from '@/components/home/CulturalStory'
import FamilySection from '@/components/home/FamilySection'
import TutorMatching from '@/components/home/TutorMatching'
import Pricing from '@/components/home/Pricing'
import SafetySection from '@/components/home/SafetySection'
import WaitlistSection from '@/components/home/WaitlistSection'
import Enrollment, { type EnrollmentHandle } from '@/components/home/Enrollment'
import PolicyModal from '@/components/ui/PolicyModal'
import WaitlistDrawer from '@/components/ui/WaitlistDrawer'

export default function HomePage() {
  const [openPolicyId, setOpenPolicyId] = useState<string | null>(null)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const enrollmentRef = useRef<EnrollmentHandle>(null)

  const handleOpenPolicy = useCallback((id: string) => {
    setOpenPolicyId(id)
  }, [])

  const handleClosePolicy = useCallback(() => {
    setOpenPolicyId(null)
  }, [])

  const handleOpenWaitlist = useCallback(() => {
    setWaitlistOpen(true)
  }, [])

  const handleCloseWaitlist = useCallback(() => {
    setWaitlistOpen(false)
  }, [])

  const handleSubjectEnroll = useCallback((subject: string) => {
    enrollmentRef.current?.preSelectSubject(subject)
    setTimeout(() => {
      document.getElementById('enrol')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, [])

  const handlePlanEnroll = useCallback((_planId: string) => {
    setTimeout(() => {
      document.getElementById('enrol')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, [])

  return (
    <>
      <Navbar
        onOpenPolicy={handleOpenPolicy}
        onOpenWaitlist={handleOpenWaitlist}
      />

      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Subjects
          onEnroll={handleSubjectEnroll}
          onWaitlist={handleOpenWaitlist}
        />
        <CulturalStory />
        <FamilySection />
        <TutorMatching />
        <Pricing onEnroll={handlePlanEnroll} />
        <SafetySection onOpenPolicy={handleOpenPolicy} />
        <WaitlistSection onOpenWaitlist={handleOpenWaitlist} />
        <Enrollment ref={enrollmentRef} />
      </main>

      <Footer onOpenPolicy={handleOpenPolicy} />

      {/* Overlays */}
      <PolicyModal policyId={openPolicyId} onClose={handleClosePolicy} />
      <WaitlistDrawer isOpen={waitlistOpen} onClose={handleCloseWaitlist} />
    </>
  )
}
