import React from 'react'
import User from './User'
import { useQuery } from 'react-apollo'
import { useHistory } from 'react-router';
import gql from 'graphql-tag'
import { LINKS_PER_PAGE } from '../constants';
export const FEED_QUERY = gql`
  query FeedQuery(
    $take: Int
    $skip: Int
    $orderBy: UserOrderByInput
  ) {
    userfeed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      users {
        name
      }
      count
    }
  }
`;

const getLinksToRender = (isNewPage, data) => {
  if (isNewPage) {
    return data.feed.users;
  }
  const rankedLinks = data.userfeed.users.slice();
  return rankedLinks;
};

const getQueryVariables = (isNewPage, page) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { name: 'desc' };
  return { take, skip, orderBy };
};

const LinkList = () => {
  const history = useHistory();
  const isNewPage = history.location.pathname.includes(
    'new'
  );
  const pageIndexParams = history.location.pathname.split(
    '/'
  );
  const page = parseInt(
    pageIndexParams[pageIndexParams.length - 1]
  );

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const {
    data,
    loading,
    error,
  } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page)
  });


  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {getLinksToRender(isNewPage, data).map(
            (user, index) => (
              <User
                key={user.id}
                user={user}
                index={index + pageIndex}
              />
            )
          )}
          {isNewPage && (
            <div className="flex ml4 mv3 gray">
              <div
                className="pointer mr2"
                onClick={() => {
                  if (page > 1) {
                    history.push(`/new/${page - 1}`);
                  }
                }}
              >
                Previous
              </div>
              <div
                className="pointer"
                onClick={() => {
                  if (
                    page <=
                    data.userfeed.count / LINKS_PER_PAGE
                  ) {
                    const nextPage = page + 1;
                    history.push(`/new/${nextPage}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LinkList;