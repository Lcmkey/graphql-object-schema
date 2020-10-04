# How to run (JS version)

> please remember to install the package before your running

```propreties
$ npm i
```

1. Run Json server

```properties
$ json-server --watch ./data/mockData.json
```

2.  Start the application

```
$ npm run dev
```

### Test

Browse `http://localhost:3000/graphql`

- Qury with below content

  ```propreties
  {
  person(id: "0001") {
      id
      username
      firstName
      lastName
      email
      friends {
      id
      firstName
      }
  }
  persons {
      id
      username
      firstName
      lastName
      email
      friends {
      id
      firstName
      }
  }
  }
  ```
