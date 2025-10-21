import { useLocalization } from '../hooks/useLocalization'
import { GameService } from '../services/gameService'

const LegendModal = ({ isOpen, onClose }) => {
  const { t } = useLocalization()

  if (!isOpen) return null

  const symbolValues = GameService.getSymbolValues()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('legend.title')}</h2>
          <button 
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="legend-content">
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
      </div>
    </div>
  )
}

export default LegendModal
