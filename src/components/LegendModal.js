import { useLocalization } from '../hooks/useLocalization'
import { GameService } from '../services/gameService'

const LegendModal = ({ isOpen, onClose, gameType = 'slotMachine' }) => {
  const { t } = useLocalization()

  if (!isOpen) return null

  const symbolValues = GameService.getSymbolValues()

  const renderSlotMachineLegend = () => {
    return (
      <div>
        <div className="symbols-section">
          <h3>{t('legend.symbolValues')}</h3>
          <div className="symbols-grid">
            {Object.entries(symbolValues).map(([symbol, data]) => (
              <div key={symbol} className="symbol-item">
                <div className="symbol-display">
                  <span className="symbol-icon">{symbol}</span>
                  <div className="symbol-info">
                    <div className="symbol-name">{t(`symbols.${data.nameKey}`)}</div>
                    <div className="symbol-multiplier">x{data.multiplier}</div>
                    <div className="symbol-description">{t(`descriptions.${data.descriptionKey}`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="winning-section">
          <h3>{t('legend.winningPatterns')}</h3>
          <div className="winning-patterns">
            <div className="pattern-item">
              <div className="pattern-name">{t('patterns.horizontalLine')}</div>
              <div className="pattern-example">🍒 🍒 🍒</div>
              <div className="pattern-description">{t('patterns.threeIdentical')}</div>
            </div>
            <div className="pattern-item">
              <div className="pattern-name">{t('patterns.verticalLine')}</div>
              <div className="pattern-example">🍋<br/>🍋<br/>🍋</div>
              <div className="pattern-description">{t('patterns.threeIdenticalColumn')}</div>
            </div>
            <div className="pattern-item">
              <div className="pattern-name">{t('patterns.diagonal')}</div>
              <div className="pattern-example">💎<br/>&nbsp;&nbsp;💎<br/>&nbsp;&nbsp;&nbsp;&nbsp;💎</div>
              <div className="pattern-description">{t('patterns.threeIdenticalDiagonal')}</div>
            </div>
          </div>
        </div>

        <div className="rules-section">
          <h3>{t('legend.gameRules')}</h3>
          <ul className="rules-list">
            <li>• {t('rules.winFormula')}</li>
            <li>• {t('rules.diagonalDouble')}</li>
            <li>• {t('rules.multipleLines')}</li>
            <li>• {t('rules.highestSymbol')}</li>
            <li>• {t('rules.lowestSymbol')}</li>
          </ul>
        </div>
      </div>
    )
  }

  const renderCrashLegend = () => {
    return (
      <div className="crash-legend">
        <div className="legend-description">
          <p>{t('crash.legend.description')}</p>
        </div>

        <div className="how-to-play">
          <h3>{t('crash.legend.howToPlay')}</h3>
          <ul className="steps-list">
            <li>{t('crash.legend.step1')}</li>
            <li>{t('crash.legend.step2')}</li>
            <li>{t('crash.legend.step3')}</li>
            <li>{t('crash.legend.step4')}</li>
            <li>{t('crash.legend.step5')}</li>
          </ul>
        </div>

        <div className="multiplier-growth">
          <h3>{t('crash.legend.multiplierGrowth')}</h3>
          <p>{t('crash.legend.growthDesc')}</p>
        </div>

        <div className="tips-section">
          <h3>{t('crash.legend.tips')}</h3>
          <ul className="tips-list">
            <li>{t('crash.legend.tip1')}</li>
            <li>{t('crash.legend.tip2')}</li>
            <li>{t('crash.legend.tip3')}</li>
            <li>{t('crash.legend.tip4')}</li>
          </ul>
        </div>

        <div className="payouts-section">
          <h3>{t('crash.legend.payouts')}</h3>
          <p>{t('crash.legend.payoutDesc')}</p>
        </div>
      </div>
    )
  }

  const renderScratchLegend = () => {
    return (
      <div className="scratch-legend">
        <div className="legend-description">
          <p>{t('scratch.legend.description')}</p>
        </div>

        <div className="how-to-play">
          <h3>{t('scratch.legend.howToPlay')}</h3>
          <ul className="steps-list">
            <li>{t('scratch.legend.step1')}</li>
            <li>{t('scratch.legend.step2')}</li>
            <li>{t('scratch.legend.step3')}</li>
            <li>{t('scratch.legend.step4')}</li>
            <li>{t('scratch.legend.step5')}</li>
          </ul>
        </div>

        <div className="payouts-section">
          <h3>{t('crash.legend.payouts')}</h3>
          <p><strong>{t('scratch.legend.winFormula')}</strong></p>
          <p className="tip-text">{t('scratch.legend.winningCondition')}</p>
          <p className="tip-text">{t('scratch.legend.scratchTip')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t(`${gameType}.legend.title`)}</h2>
          <button 
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="legend-content">
          {gameType === 'slotMachine' && renderSlotMachineLegend()}
          {gameType === 'crash' && renderCrashLegend()}
          {gameType === 'scratch' && renderScratchLegend()}
        </div>
      </div>
    </div>
  )
}

export default LegendModal
