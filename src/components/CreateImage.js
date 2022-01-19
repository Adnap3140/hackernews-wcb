import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './ImageList'
import { LINKS_PER_PAGE } from '../constants'
const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!, $tag: String!) {
    postImage(description: $description, url: $url, tag: $tag) {
      id
      createdAt
      url
      description
      tag
    }
  }
`

class CreateImage extends Component {
  state = {
    description: '',
    url: '',
    tag: '',
  }

  render() {
    const { description, url, tag } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the Image"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the Image"
          />
          <input
            className="mb2"
            value={tag}
            onChange={e => this.setState({ tag: e.target.value })}
            type="text"
            placeholder="The tag"
          />
        </div>
        <Mutation
  mutation={POST_MUTATION}
  variables={{ description, url, tag }}
  onCompleted={() => this.props.history.push('/new/1')}
  update={(store, { data: { postImage } }) => {
    const first = LINKS_PER_PAGE
    const skip = 0
    const orderBy = 'createdAt_DESC'
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy }
    })
    data.feed.images.unshift(postImage)
    store.writeQuery({
      query: FEED_QUERY,
      data,
      variables: { first, skip, orderBy }
    })
  }}
>
  {postMutation => <button onClick={postMutation}>Submit</button>}
</Mutation>


      </div>
    )
  }
}

export default CreateImage