import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import './App.css';

import ItemList from './components/ItemList'
import ItemEnter from './components/ItemEnter'
import MainPage from './components/MainPage'
import Header from './components/Header'
import Spinner from './components/Spinner';
import TripPage from './components/TripPage'

import { getRecentTrips, storeTrip, clearRecentTrips, getCurrentUser } from './utils/LocalStorage'
import TiApi from './api/TiApi'
import AuthApi from './api/AuthApi'


const API_URL = 'https://deimantas.tech/ti-api'
//const API_URL = 'http://localhost:8080'

function App(props) {
    const [items, setItems] = useState([]);
    const [people, setPeople] = useState([]);
    const [lists, setLists] = useState([]);
    const [listSelected, setListSelected] = useState(-1);
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState("");
    const [tripUrl, setTripUrl] = useState("");
    const [tripName, setTripName] = useState("");
    const [tripLoc, setTripLoc] = useState("");
    const [tripPublic, setTripPublic] = useState("");
    const [tripFound, setTripFound] = useState(false);
    const [tripOwner, setTripOwner] = useState(false);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    useEffect(() => {
        setTripOwner(false)
        if  (currentUserTrips.length > 0) {
            currentUserTrips.forEach(t => {
                if (t.url === tripUrl) {
                    setTripOwner(true)
                }
            })
        }
    }, [currentUserTrips, tripUrl]);

    const fetchAllTrips = async () => {
        let userTrips = {}

        if (currentUser) {
            try {
                setLoading(true)
                userTrips = await tiApi.getAllTrips()
            } catch (error) {
                userTrips = {}
                handleFetchError(error)
            }
        }
        Promise.resolve()
            .then(() => setCurrentUserTrips(userTrips))
            .then(() => setLoading(false))
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
                let newPage = (page === "main" || page === "") ? "trip" : page
                let newItems = await tiApi.getAllTasks(tripUrl)
                let newAssignees = await tiApi.getAllAssignees(tripUrl)
                let newLists = await tiApi.getAllLists(tripUrl)
                let newNotes = await tiApi.getAllNotes(tripUrl)
    
                Promise.resolve()
                    .then(() => setItems(newItems))
                    .then(() => setPeople(newAssignees))
                    .then(() => setLists(newLists))
                    .then(() => setNotes(newNotes))
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
        let newTask = { task: text, tripUrl: tripUrl, listId: listSelected }

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

    const handleRemoveAssignee = (id) => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.deleteAssignee(tripUrl, id)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleRemoveAssignee: ${error}`))
            })
    }

    const handleAddList = (listName) => {
        let newList = { name: listName, tripUrl: tripUrl }

        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.addList(newList)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleAddList: ${error}`))
            })
    }

    const handleRemoveList = (id) => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.deleteList(tripUrl, id)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleRemoveList: ${error}`))
            })
    }

    const handleAddNote = (text) => {
        let newNote = { note: text, tripUrl: tripUrl }

        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.addNote(newNote)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleAddNote: ${error}`))
            })
    }

    const handleRemoveNote = (id) => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.deleteNote(tripUrl, id)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleRemoveNote: ${error}`))
            })
    }

    const handleChangePublic = () => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.changePublicTrip(tripUrl, !tripPublic)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleUpdateItem: ${error}`))
            })
    }

    const handleChangeLocation = (location) => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.changeLocationTrip(tripUrl, location)
                    .then(() => { fetchAllData() })
                    .catch(error => handleFetchError(`handleUpdateItem: ${error}`))
            })
    }

    const handleDeleteTrip = () => {
        Promise.resolve()
            .then(() => { setLoading(true) })
            .then(() => {
                tiApi.deleteTrip(tripUrl)
                    .then(() => fetchAllTrips())
                    .then(() => setTripFound(false))
                    .then(() => setPage("main"))
                    .then(() => setLoading(false))
                    .catch(error => handleFetchError(`handleDeleteTrip: ${error}`))
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

    const handleChangePage = (page, id) => {
        setPage(page)
        setListSelected(id)
    }

    const handleClearRecents = () => {
        clearRecentTrips()
        setRecents([])
    }

    const handleFetchError = (error) => {
        if (error.message.includes("Unauthorized")) {
            handleLogout()
            setWarning("acc")
        } else {
            setWarning("trip")
        }
        setPage("main")
        setTripFound(false)
        setLoading(false)
        console.log("Can't fetch data: " + error.message)
    }

    const handleLogin = (usr, pw) => {
        authApi.login(usr, pw).then((resp) => {
            if (resp.status === 401) {
                setWarning("login")
            } else {
                setCurrentUser(getCurrentUser())
                setWarning("")
            }
        })
    }

    const handleRegister = (usr, eml, pw) => {
        if (pw.length < 6) {
            setRegStatus("Password must be at least 6 characters long")
        }else if (usr.length > 20) {
            setRegStatus("Too long username")
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
        setTripFound(false)
    }

    return (
        <div className="App">
            <Header
                items={items}
                lists={lists}
                handleRemoveList={handleRemoveList}
                listSelected={listSelected}
                setListSelected={setListSelected}
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
                (page === "trip") &&
                <main role="main" className="container">
                    <TripPage 
                        items={items}
                        notes={notes}
                        handleChangePage={handleChangePage}
                        peopleCnt={people.length}
                        tripOwner={tripOwner}
                        tripUrl={tripUrl}
                        tripName={tripName}
                        tripPublic={tripPublic}
                        tripLoc={tripLoc}
                        handleChangePublic={handleChangePublic}
                        handleChangeLocation={handleChangeLocation}
                        handleDeleteTrip={handleDeleteTrip}
                        handleAddNote={handleAddNote}
                        handleRemoveNote={handleRemoveNote}
                        handleAddList={handleAddList}
                        handleAddAssignee={handleAddAssignee}
                        people={people}
                        lists={lists}
                        handleRemoveAssignee={handleRemoveAssignee} />
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
                        hideLabel={false}
                        lists={lists}
                        listSelected={listSelected}
                        item="item" />
                    {
                        (items.length > 0) &&
                        <ItemList
                            listSelected={listSelected}
                            items={items}
                            people={people}
                            handleDone={handleDone}
                            handleEdit={handleEdit}
                            handleRemoveItem={handleRemoveItem}
                        />
                    }
                </main>
            }
            <Spinner loading={loading}/>
        </div>
    );
}

export default App;
