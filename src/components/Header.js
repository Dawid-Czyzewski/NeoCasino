import { useLocalization } from '../hooks/useLocalization'

const Header = ({ wallet, isSpinning }) => {
  const { t, changeLanguage, getCurrentLanguage, getAvailableLanguages } = useLocalization()
  const currentLanguage = getCurrentLanguage()
  const availableLanguages = getAvailableLanguages()

  return (
    <header className="casino-header">
      <div className="wallet-info">
        <div className="wallet">💰 {t('header.wallet')}: {wallet}</div>
        <div className="language-controls">
          <label>{t('header.language')}: </label>
          <select 
            value={currentLanguage} 
            onChange={(e) => changeLanguage(e.target.value)}
            className="language-select"
          >
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}

export default Header
