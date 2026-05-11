import uilogo from '../assets/uilogo.png'
import uilogoblack from '../assets/uilogoblack.png'

const logos = {
  white: uilogo,
  black: uilogoblack,
}

export default function UiTherapyCredit({ className = '', tone = 'white' }) {
  const classes = ['uityherapy-credit', className].filter(Boolean).join(' ')

  return (
    <p className={classes}>
      <span className="uityherapy-credit__label">Designed &amp; Powered by</span>
      <img src={logos[tone]} alt="uitherapy" className="uityherapy-credit__logo" />
    </p>
  )
}
