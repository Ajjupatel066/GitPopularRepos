import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeFilter: languageFiltersData[0].id,
    repositories: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderRepositoryList()
  }

  renderRepositoryList = async () => {
    const {activeFilter} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeFilter}`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedList = data.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        name: eachRepository.name,
        avatarUrl: eachRepository.avatar_url,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
        starsCount: eachRepository.stars_count,
      }))
      this.setState({
        repositories: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveFilter = id => {
    this.setState({activeFilter: id})
  }

  renderRepositoriesList = () => {
    const {repositories} = this.state

    return (
      <ul className="repositories-list">
        {repositories.map(eachItem => (
          <RepositoryItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-txt">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeFilter} = this.state

    return (
      <div className="app-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="filter-list">
          {languageFiltersData.map(eachFilter => (
            <LanguageFilterItem
              key={eachFilter.id}
              eachFilter={eachFilter}
              isActive={activeFilter === eachFilter.id}
              changeActiveFilter={this.changeActiveFilter}
            />
          ))}
        </ul>
        {this.renderRepositoryItems()}
      </div>
    )
  }
}

export default GithubPopularRepos

//  <ul className="repository-items"></ul>
