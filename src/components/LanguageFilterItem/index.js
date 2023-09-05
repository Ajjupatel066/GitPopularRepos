// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachFilter, isActive, changeActiveFilter} = props
  const {id, language} = eachFilter

  const activeButtonClassName = isActive ? 'btn Active' : 'btn'

  const onClickFilter = () => {
    changeActiveFilter(id)
  }

  return (
    <li className="filter-item">
      <button
        type="button"
        onClick={onClickFilter}
        className={`${activeButtonClassName}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
