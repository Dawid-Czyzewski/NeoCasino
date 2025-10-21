import React from 'react'
import { useLocalization } from '../hooks/useLocalization'

const RouletteRules = () => {
  const { t } = useLocalization()

  return (
    <div className="roulette-rules">
      <h3>{t('roulette.rules')}</h3>
      <ul>
        <li>🔴 {t('roulette.redNumbers')}: x2</li>
        <li>⚫ {t('roulette.blackNumbers')}: x2</li>
        <li>🟢 {t('roulette.greenZero')}: x35</li>
      </ul>
    </div>
  )
}

export default RouletteRules
