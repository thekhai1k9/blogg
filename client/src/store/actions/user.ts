
export const logout = () => (dispatch: any) => {
  console.log(dispatch)
  
  // dispatch(userActions.resetUserInfo())
  localStorage.removeItem('account')
}
