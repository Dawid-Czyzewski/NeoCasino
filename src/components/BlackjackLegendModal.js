import { useLocalization } from '../hooks/useLocalization'

const BlackjackLegendModal = ({ isOpen, onClose }) => {
  const { t } = useLocalization()

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🃏 {t('blackjack.rules')}</h2>
          <button 
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="legend-content">
          <div className="blackjack-rules-section">
            <h3>🎯 {t('blackjack.rules')}</h3>
            <ul className="rules-list">
              <li>• {t('blackjack.rule1')}</li>
              <li>• {t('blackjack.rule2')}</li>
              <li>• {t('blackjack.rule3')}</li>
              <li>• {t('blackjack.rule4')}</li>
              <li>• {t('blackjack.rule5')}</li>
            </ul>
          </div>

          <div className="card-values-section">
            <h3>🃏 {t('blackjack.cardValues')}</h3>
            <div className="card-values-grid">
              <div className="card-value-item">
                <div className="card-example">A</div>
                <div className="card-description">{t('blackjack.aceValue')}</div>
              </div>
              <div className="card-value-item">
                <div className="card-example">2-9</div>
                <div className="card-description">{t('blackjack.numberCards')}</div>
              </div>
              <div className="card-value-item">
                <div className="card-example">J, Q, K</div>
                <div className="card-description">{t('blackjack.faceCards')}</div>
              </div>
            </div>
          </div>

          <div className="payouts-section">
            <h3>💰 {t('blackjack.payouts')}</h3>
            <div className="payouts-grid">
              <div className="payout-item">
                <div className="payout-type">🃏 Blackjack</div>
                <div className="payout-amount">{t('blackjack.blackjackPayout')}</div>
                <div className="payout-description">{t('blackjack.blackjackDesc')}</div>
              </div>
              <div className="payout-item">
                <div className="payout-type">🏆 {t('blackjack.win')}</div>
                <div className="payout-amount">{t('blackjack.winPayout')}</div>
                <div className="payout-description">{t('blackjack.winDesc')}</div>
              </div>
              <div className="payout-item">
                <div className="payout-type">🤝 {t('blackjack.push')}</div>
                <div className="payout-amount">{t('blackjack.pushPayout')}</div>
                <div className="payout-description">{t('blackjack.pushDesc')}</div>
              </div>
              <div className="payout-item">
                <div className="payout-type">💥 {t('blackjack.bust')}</div>
                <div className="payout-amount">{t('blackjack.bustPayout')}</div>
                <div className="payout-description">{t('blackjack.bustDesc')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlackjackLegendModal
