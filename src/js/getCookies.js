
let Head = {
  getApiHeader () {
    let head = {}
    head.token = sessionStorage.getItem('logintoken')
    head.channel = ''
    head.clientId = ''
    return head
  }
}
export default Head
