import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
            name
          }
        }
      }
      user {
        id
      }
    }
  }
`

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
  <span className="gray">{this.props.index + 1}.</span>
  {authToken && (
    <Mutation
    mutation={VOTE_MUTATION}
    variables={{ linkId: this.props.link.id }}
    update={(store, { data: { vote } }) =>
      this.props.updateStoreAfterVote(store, vote, this.props.link.id)
    }
  >
    {voteMutation => (
      <div className="ml1 gray f11" onClick={voteMutation}>
        ▲
      </div>
    )}
  </Mutation>  
  )}
</div>

{/* This is a comment */}

        <div className="ml1">
          <div> 
            {this.props.link.description} (<a href={this.props.link.url} target="_blank">{this.props.link.url}</a>)
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes ~ first voter {' '}
            {(this.props.link.votes[0]) ? this.props.link.votes[0].user.name : 'hi'}| by {' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
            {', Group = '} {this.props.link.postedBy.group}
          </div>
        </div>
      </div>
    )
  }
  
}

export default Link