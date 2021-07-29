import { gql } from '@apollo/client/core';

const USER_FRAGMENT = gql`
  fragment user on User {
    id
    name
    email
    avatarUrl
    bio
    login
    repositories(first: 10) {
      totalCount
      edges {
        node {
          id
          name
          url
          description
        }
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  ${USER_FRAGMENT}

  query SearchUserQuery($query: String!, $limit: Int!, $after: String, $before: String) {
    search(query: $query, type: USER, last: $limit, after: $after, before: $before) {
      edges {
        cursor
        node {
          ...user
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const SEARCH_REPOS = gql`
  query SearchRepoQuery($login: String!, $first: Int, $last: Int, $after: String, $before: String) {
    repositoryOwner(login: $login) {
      id
      login
      repositories(first: $first, last: $last, before: $before, after: $after) {
        edges {
          cursor
          node {
            id
            name
            url
            description
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export const GET_USER = gql`
  ${USER_FRAGMENT}

  query SearchUserQuery($login: String!) {
    user(login: $login) {
      ...user
    }
  }
`;
