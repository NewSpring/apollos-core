import { onBoard } from "../../../../core/client/actions"
import { auth } from "../../../client/methods"


const login = (store, next, action) => {
  const { dispatch, getState } = store

  const state = getState()
  const { data } = state.onBoard

  // submitting form
  if (state.onBoard.state === "default" && action.state === "submit" && data.email && data.password) {

    // trigger loading screen
    dispatch(onBoard.loading())

    auth.login(data.email, data.password, (err, authorized) => {
      const failure = (err) => {
        dispatch(onBoard.error({
          unauthorized: {
            message: "Incorrect email and password combination"
          }
        }))
        dispatch(onBoard.authorize(false))
        dispatch(onBoard.fail())
      }

      if (authorized) {
        Meteor.loginWithPassword(data.email, data.password, (err, id) => {

          const loggedIn = (err, account) => {
            console.log(err, account)
            dispatch(onBoard.success())
            dispatch(onBoard.authorize(true))
          }

          if (err && err.error === 403) {
            console.log("creating a user")
            // need to create a user
            Accounts.createUser({
              email: data.email,
              password: data.password
            }, loggedIn)
          }


        })

      } else {
        failure(err)
      }

      action.state = "default"
      return next(action)

    })

    return function cancel() {
      // clearTimeout(timeoutId)
    }

  }

  return next(action)
}

export default login
