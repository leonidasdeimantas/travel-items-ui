const KEY_RECENTS = ['recent1','recent2','recent3','recent4','recent5']

export const getRecentTrips = () => {
	if (!localStorage) return

	try {
        let array = []
        KEY_RECENTS.forEach(key => array.push(JSON.parse(localStorage.getItem(key))))
		return array
	} catch (error) {
		console.error(`Error getting ${KEY_RECENTS} from localStorage`, error)
	}
};

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
};

export const clearRecentTrips = () => {
	if (!localStorage) return
	localStorage.clear()
};