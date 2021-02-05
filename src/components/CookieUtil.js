class CookieUtil {

    saveTripLocally(tripUrl) {
        let count = 0;
        let currentCookies = [];
        [currentCookies, count] = this.getTripLocally();

        if (count > 0) {
            if (!this.checkTrip(currentCookies, tripUrl)) {
                document.cookie = "trip1=" + tripUrl;
                document.cookie = "trip2=" + currentCookies["trip1"];
                document.cookie = "trip3=" + currentCookies["trip2"];
            }
        } else {
            document.cookie = "trip1=" + tripUrl;
            document.cookie = "trip2= ";
            document.cookie = "trip3= ";
        }
    }

    getTripLocally() {
        let count = 0;
        return [document.cookie.split(';').reduce((cookieObject, cookieString) => {
            let splitCookie = cookieString.split('=')
            try {
                cookieObject[splitCookie[0].trim()] = decodeURIComponent(splitCookie[1])
                count++
            } catch (error) {
                cookieObject[splitCookie[0].trim()] = splitCookie[1]
            }
            return cookieObject
        }, []), count];
    }

    checkTrip(cookieObj, tripUrl) {
        if (cookieObj["trip1"] === tripUrl) return true;
        else if (cookieObj["trip2"] === tripUrl) return true;
        else if (cookieObj["trip3"] === tripUrl) return true;
        return false;
    }

}

export default CookieUtil;