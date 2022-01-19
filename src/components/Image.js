import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const VOTE_MUTATION = gql`
  mutation VoteMutation (
    $take: Int
    $skip: Int
    $orderBy: ImageOrderByInput
  ) {
    imagefeed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      images {
        url
      }
      count
    }
  }
`

class Image extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
  <span className="gray">{this.props.index + 1}.</span>
  {authToken && (
    <Mutation
    mutation={VOTE_MUTATION}
    variables={{ linkId: this.props.image.id }}
  >

  </Mutation>  
  )}
</div>

{/* This is a comment */}

        <div className="ml1">
          <div> 
            {this.props.image.description}
          </div>
          <div className="f6 lh-copy gray">
            <a href="">
                <img alt="Didnt Load lmao" src={this.props.image.url}
                width="500" height="~">
                </img>
            </a>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Image