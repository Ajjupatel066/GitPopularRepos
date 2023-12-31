// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = eachItem

  return (
    <li className="each-repository-container">
      <img src={avatarUrl} className="avatar-img" alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="sfi-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="sfi-img"
          alt="stars"
        />
        <p className="sfi-count">{starsCount} stars</p>
      </div>
      <div className="sfi-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="sfi-img"
          alt="forks"
        />
        <p className="sfi-count">{forksCount} forks</p>
      </div>
      <div className="sfi-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="sfi-img"
          alt="open issues"
        />
        <p className="sfi-count">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
