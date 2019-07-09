import React from 'react'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { BenefitColumns } from 'lib/components/BenefitColumns'
import { BuildSeamlessApps } from 'lib/components/BuildSeamlessApps'
import { GSNTools } from 'lib/components/GSNTools'
import { Hero } from 'lib/components/Hero'

const Home = function() {
  return (
    <MainLayout>
      <Hero />
      <BenefitColumns />
      <BuildSeamlessApps />
      <GSNTools />
    </MainLayout>
  )
}

export default Home;