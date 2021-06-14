const KEY_RECENTS = ['recent1', 'recent2', 'recent3', 'recent4', 'recent5']
const KEY_USER = 'user'

export const getRecentTrips = () => {
    if (!localStorage) return

    try {
        let array = []
        KEY_RECENTS.forEach(key => array.push(JSON.parse(localStorage.getItem(key))))
        return array
    } catch (error) {
        console.error(`Error getting ${KEY_RECENTS} from localStorage`, error)
    }
}

export const storeTrip = (item) => {
    if (!localStorage) return

    try {
        let array = []
        let alreadyAdded = false

        KEY_RECENTS.forEach(key => array.push(JSON.parse(localStorage.getItem(key))))

        array.forEach(element => {
            if (element) {
                if (element.url === item.url) alreadyAdded = true
            }
        })

        if (!alreadyAdded) {
            array.unshift(item)
            array.reverse()
            KEY_RECENTS.forEach(key => localStorage.setItem(key, JSON.stringify(array.pop())))
        }

        return
    } catch (error) {
        console.error(`Error storing ${KEY_RECENTS} to localStorage`, error)
    }
}

export const clearRecentTrips = () => {
    if (!localStorage) return
    KEY_RECENTS.forEach(key => localStorage.removeItem(key))
}

export const saveUser = (userData) => {
    if (!localStorage) return
    localStorage.setItem(KEY_USER, userData)
}

export const removeUser = () => {
    if (!localStorage) return
    localStorage.removeItem(KEY_USER)
}

export const getCurrentUser = () => {
    if (!localStorage) return undefined
    return JSON.parse(localStorage.getItem(KEY_USER))
}

export const getAuthToken = () => {
    const user = getCurrentUser()

    if (user) {
        return 'Bearer ' + user.accessToken
    }
    return ''
}
