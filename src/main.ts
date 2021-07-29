import { createApp, h, provide } from 'vue';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
} from '@apollo/client/core';
import { ApolloClients } from '@vue/apollo-composable';
import App from './app.vue';
import router from './router';
import './plugins/styles.css';

const token = process.env.VUE_APP_GITHUB_ACCESS_TOKEN;

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: string|any) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }));
    return forward(operation);
    // Go to the next link in the chain. Similar to `next` in Express.js middleware.
  }),
  new HttpLink({ uri: 'https://api.github.com/graphql' }),
]);

const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});
app.use(router);
app.mount('#app');
