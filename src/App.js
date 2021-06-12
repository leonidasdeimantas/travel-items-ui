import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import './App.css';

import ItemList from './components/ItemList'
import ItemEnter from './components/ItemEnter'
import MainPage from './components/MainPage'
import Header from './components/Header'
import Assignees from './components/Assignees'
import Spinner from './components/Spinner';

import { getRecentTrips, storeTrip, clearRecentTrips, getCurrentUser } from './utils/LocalStorage'
import TiApi from './api/TiApi'
import AuthApi from './api/AuthApi'


const API_URL = 'https://deimantas.tech/ti-api'
//const API_URL = 'http://localhost:8080'

function App(props) {
    const [items, setItems] = useState([]);
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState("");
    const [tripUrl, setTripUrl] = useState("");
    const [tripName, setTripName] = useState("");
    const [tripLoc, setTripLoc] = useState("");
    const [tripPublic, setTripPublic] = useState("");
    const [tripFound, setTripFound] = useState(false);
    const [recents, setRecents] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentUserTrips, setCurrentUserTrips] = useState({});
    const [warning, setWarning] = useState("")
    const [regStatus, setRegStatus] = useState("")

    const tiApi = new TiApi(API_URL);
    const authApi = new AuthApi(API_URL);

    // onComponentMount
    useEffect(() => {
        setCurrentUser(getCurrentUser())
        setWarning("")

        const url = queryString.parse(props.location.search).tripUrl;
        if (url) {
            setTripUrl(url)
        } else {
            setPage("main")
            setLoading(false)
        }

        setRecents(getRecentTrips())
    }, [props]);

    useEffect(() => {
        fetchAllData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripUrl]);

    useEffect(() => {
        if (warning === "login") {
            setWarning("")
        }
        fetchAllTrips()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const fetchAllTrips = async () => {
        if (currentUser) {
            try {
                let userTrips = await tiApi.getAllTrips()
                setCurrentUserTrips(userTrips)
            } catch (error) {
                setCurrentUserTrips({})
                handleFetchError(error)
            }
        } else {
            setCurrentUserTrips({})
        }
    }


    const fetchAllData = async () => {
        if (tripUrl === "") {
            return 
        } else {
            setLoading(true)
        }        

        try {
            let trip =  await tiApi.getTrip(tripUrl)

            if (trip) {
                let newPage = (page === "main" || page === "") ? "items" : page
                let newItems = await tiApi.getAllTasks(tripUrl)
                let newAssignees = await tiApi.getAllAssignees(tripUrl)
    
                Promise.resolve()
                    .then(() => setItems(newItems))
                    .then(() => setPeople(newAssignees))
                    .then(() => setTripName(trip.name))
                    .then(() => setTripLoc(trip.location))
                    .then(() => setTripPublic(trip.public))
                    .then(() => setTripFound(true))
                    .then(() => setPage(newPage))
                    .then(() => storeTrip({ name: trip.name, url: tripUrl }))
                    .then(() => setRecents(getRecentTrips()))
                    .then(() => setLoading(false))
                    .then(() => setWarning(""))
            }

        } catch (error) {
            handleFetchError(error)
        }
    }

    const handleAddTrip = (name, location) => {
        let newTrip = { name: name, location: location }

        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.addTrip(newTrip)
                    .then(response => window.location.href = `?tripUrl=${response.tripUrl}`)
                    .catch(error => handleFetchError(`handleAddTrip: ${error}`))
            })
    }

    const handleAddItem = (text) => {
        let newTask = { task: text, tripUrl: tripUrl }

        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.addTask(newTask)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleAddItem: ${error}`))
            })
    }

    const handleUpdateItem = (item) => {
        let updatedTrip = { id: item.id, task: item.text, price: item.price, assigneeId: item.assignee, tripUrl: tripUrl, completed: item.completed }

        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.updateTask(updatedTrip)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleUpdateItem: ${error}`))
            })
    }

    const handleRemoveItem = (id) => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.deleteTask(tripUrl, id)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleRemoveItem: ${error}`))
            })
    }

    const handleAddAssignee = (assgineeName) => {
        let newAssignee = { name: assgineeName, tripUrl: tripUrl }

        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.addAssignee(newAssignee)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleAddAssignee: ${error}`))
            })
    }

    const handleRemoveAssingee = (id) => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.deleteAssignee(tripUrl, id)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleRemoveAssingee: ${error}`))
            })
    }

    const handleChangePublic = () => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.changePublicTask(tripUrl, !tripPublic)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleUpdateItem: ${error}`))
            })
    }

    const handleDone = (id) => {
        let item = items.find(element => element.id === id)

        item.completed = !item.completed
        handleUpdateItem(item)
    }

    const handleEdit = (id, assignee, price) => {
        let item = items.find(element => element.id === id)

        item.assignee = assignee
        item.price = price
        handleUpdateItem(item)
    }

    const handleChangePage = (page) => {
        setPage(page)
    }

    const handleClearRecents = () => {
        clearRecentTrips()
        setRecents([])
    }

    const handleFetchError = (error) => {
        setPage("main")
        setTripFound(false)
        setLoading(false)
        setWarning("trip")
        console.log("Can't fetch data: " + error)
    }

    const handleLogin = (usr, pw) => {
        authApi.login(usr, pw).then((resp) => {
            if (resp.status === 401) {
                setWarning("login")
            } else {
                setCurrentUser(getCurrentUser())
            }
        })
    }

    const handleRegister = (usr, eml, pw) => {
        if (pw.length < 6) {
            setRegStatus("Password must be at least 6 characters long")
        } else {
            authApi.register(usr, eml, pw).then((resp) => {
                setRegStatus(resp.message)
            })
        }
    }

    const handleRegStatusClear = () => {
        setRegStatus("")
    }

    const handleLogout = () => {
        authApi.logout()
        setCurrentUser(getCurrentUser())
    }

    return (
        <div className="App">
            <Header
                itemCnt={items.length}
                peopleCnt={people.length}
                page={page}
                tripFound={tripFound}
                handleChangePage={handleChangePage}
            />
            {
                (page === "main") &&
                <main role="main" className="container">
                    <MainPage
                        warning={warning}
                        regStatus={regStatus}
                        handleRegStatusClear={handleRegStatusClear}
                        currentUser={currentUser}
                        currentUserTrips={currentUserTrips}
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                        handleRegister={handleRegister}
                        handleAddTrip={handleAddTrip}
                        handleClearRecents={handleClearRecents}
                        recents={[recents]} />
                </main>
            }
            {
                (page === "items") &&
                <main role="main" className="container">
                    <ItemEnter
                        tripPublic={tripPublic}
                        handleChangePublic={handleChangePublic}
                        handleAddItem={handleAddItem}
                        tripUrl={tripUrl}
                        tripName={tripName}
                        tripLoc={tripLoc}
                        item="item" />
                    {
                        (items.length > 0) &&
                        <ItemList
                            items={items}
                            people={people}
                            handleDone={handleDone}
                            handleEdit={handleEdit}
                            handleRemoveItem={handleRemoveItem}
                        />
                    }
                </main>
            }
            {
                (page === "people") &&
                <main role="main" className="container">
                    <ItemEnter
                        handleAddItem={handleAddAssignee}
                        tripUrl={tripUrl}
                        tripName={tripName}
                        tripLoc={tripLoc}
                        item="assignee" />
                    <Assignees
                        people={people}
                        handleRemove={handleRemoveAssingee} />
                </main>
            }
            <Spinner loading={loading}/>
        </div>
    );
}

export default App;
