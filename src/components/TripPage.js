import React, { useRef }  from 'react';
import { copyToClipboard } from '../utils/Utils'
import ShareButton from './ShareButton';
import TripHeader from '../components/TripHeader';
import ItemEnter from '../components/ItemEnter'
import Assignees from '../components/Assignees'

export default function TripPage(props) {
    const msgRefLocation = useRef(null)
    const msgRefNote = useRef(null)
    const msgRefListName = useRef(null)

    const handleCopyUrl = () => { copyToClipboard(window.location.href) }
    const handleCopyID = () => { copyToClipboard(props.tripUrl) }

    const handleLocationButton = () => {
        let location = msgRefLocation.current.value
        props.handleChangeLocation(location)
    }

    const handleNoteButton = () => {
        let note = msgRefNote.current.value
        msgRefNote.current.value = ""
        props.handleAddNote(note)
    }

    const handleListButton = () => {
        let listName = msgRefListName.current.value
        msgRefListName.current.value = ""
        props.handleAddList(listName)
    }

    let remaining_items = props.items.filter(item => !item.completed).length
    let done_items = props.items.filter(item => item.completed).length
    let items_amount_left = props.items.filter(item => !item.completed).reduce((acc, item) => acc += item.price ? parseFloat(item.price) : 0, 0)
    let items_amount_spent = props.items.filter(item => item.completed).reduce((acc, item) => acc += item.price ? parseFloat(item.price) : 0, 0)

    const list_notes = props.notes.map(note => <NotesItem
        key={note.id}
        note={note}
        remove={props.handleRemoveNote}
    />)

    const list_lists = props.lists.map(list => <ListItem
        key={list.id}
        list={list}
        handleRemoveList={props.handleRemoveList}
    />)


    return (
        <div style={{paddingBottom:"10%"}}>

            <TripHeader 
                tripName={props.tripName}
                tripPublic={props.tripPublic}
            />

            <div className="row C5procTop" >
                <div className="col-sm">
                    <div className="card border-light box-shadow">
                        <div className="card-body">
                            <button className="btn btn-secondary btn-1 brd-1 stretch" data-toggle="modal" data-target="#ListsModal">
                                 Create new list <span className="material-icons-outlined">add</span> 
                            </button>
                        </div>
                    </div>
                    <br />

                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Trip summary
                            <span>
                                <button type="button" className="btn btn-sm CItemButtonRight" data-toggle="modal" data-target="#SummaryModal">
                                    <span className="material-icons-outlined text-muted">edit</span>
                                </button>
                            </span>
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    Remaining items
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <h5><span className="badge badge-info btn-1" style={{marginRight:"20px"}}>{remaining_items}</span></h5>
                                </div>
                            </div>
                            <hr className="my-2"></hr>
                            <div className="row">
                                <div className="col-8">
                                    Remaining amount
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <h5><span className="badge badge-info btn-1" style={{marginRight:"20px"}}>{items_amount_left}€</span></h5>
                                </div>
                            </div>
                            <hr className="my-2"></hr>
                            <div className="row">
                                <div className="col-8">
                                    Items done
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <h5><span className="badge badge-secondary btn-2" style={{marginRight:"20px"}}>{done_items}</span></h5>
                                </div>
                            </div>
                            <hr className="my-2"></hr>
                            <div className="row">
                                <div className="col-8">
                                    Total amount spent
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <h5><span className="badge badge-secondary btn-2" style={{marginRight:"20px"}}>{items_amount_spent}€</span></h5>
                                </div>
                            </div>
                            <hr className="my-2"></hr>
                            <div className="row">
                                <div className="col-8">
                                    Created lists
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <h5><span className="badge badge-secondary btn-2" style={{marginRight:"20px"}}>{props.lists.length}</span></h5>
                                </div>
                            </div>
                            <hr className="my-2"></hr>
                            <div className="row">
                                <div className="col-8">
                                    Number of people
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <h5><span className="badge badge-secondary btn-2" style={{marginRight:"20px"}}>{props.peopleCnt}</span></h5>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <br />
                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Notes
                            <span>
                                <button type="button" className="btn btn-sm CItemButtonRight" data-toggle="modal" data-target="#NotesModal">
                                    <span className="material-icons-outlined text-muted">edit</span>
                                </button>
                            </span>
                            </h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {list_notes}
                            </ul>
                            {list_notes.length === 0 &&
                                <p className="text-center font-italic text-muted">No notes</p>
                            }
                        </div>
                        <br />
                    </div>
                    <br />
                </div>

                <div className="col-sm">

                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Location
                            <span>
                                <button type="button" className="btn btn-sm CItemButtonRight" data-toggle="modal" data-target="#LocationModal">
                                    <span className="material-icons-outlined text-muted">edit</span>
                                </button>
                            </span>
                            </h4>
                        </div>
                        { (props.tripLoc && props.tripLoc !== "") && 
                            <div className="card-body d-flex justify-content-between align-items-center">
                                {props.tripLoc} 
                                <button className="btn btn-outline-secondary btn-sm float-right brd-3 txt-2" onClick={() => window.open("https://www.google.com/maps/search/?api=1&query="+props.tripLoc.split(' ').join('+'), "_blank")}>
                                    Directions <span className="material-icons-outlined">near_me</span> 
                                </button>
                            </div>
                        }
                        { (!props.tripLoc || props.tripLoc === "") && 
                            <div className="card-body">
                                <p className="text-center font-italic text-muted">No location added</p>
                            </div>
                        }
                        <br />
                    </div>
                    <br />

                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Participants</h4>
                        </div>
                        <div className="card-body">
                            <ItemEnter
                                tripPublic={props.tripPublic}
                                handleChangePublic={props.handleChangePublic}
                                handleAddItem={props.handleAddAssignee}
                                tripUrl={props.tripUrl}
                                tripName={props.tripName}
                                tripLoc={props.tripLoc}
                                hideLabel={true}
                                item="participant" />
                            <Assignees
                                people={props.people}
                                handleRemove={props.handleRemoveAssignee} />
                            {props.people.length === 0 &&
                                <p className="text-center font-italic text-muted">No participants</p>
                            }
                        </div>
                        <br />
                    </div>
                    <br />

                    { props.tripOwner &&
                        <div className="card border-danger box-shadow">
                            <div className="card-header border-white bg-white">
                                <h4>Admin panel</h4>
                            </div>
                            <div className="card-body">
                                { props.tripPublic &&
                                    <div>
                                        <div className="row">
                                            <div className="col-6">
                                                This trip is public
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePublic()}>Make private</button>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-8">
                                                You can share this trip by sending ID or link to your friends
                                            </div>
                                            <div className="col-4">
                                                <div className="dropdown">
                                                    <button className="btn btn-outline-secondary btn-sm float-right txt-1 brd-1" type="button" id="1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Share
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <a className="dropdown-item" href="# " onClick={() => handleCopyID()}>Copy ID <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                                                        <a className="dropdown-item" href="# " onClick={() => handleCopyUrl()}>Copy link <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                }
                                { !props.tripPublic &&
                                    <div className="row">
                                        <div className="col-6">
                                            This trip is private
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePublic()}>Make public</button>
                                        </div>
                                    </div>
                                }
                                <hr className="my-3"></hr>
                                
                                <div className="row">
                                    <div className="col-8">
                                        Delete trip
                                    </div>
                                    <div className="col-4">
                                    <button className="btn btn-outline-danger btn-sm float-right" onClick={() => props.handleDeleteTrip()}><span className="material-icons-outlined mr-1">delete_forever</span></button>
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    }
                    <br />
                </div>

            </div>

            <ShareButton 
                tripUrl={props.tripUrl}
                tripPublic={props.tripPublic}
            />

            <div className="modal fade" id="LocationModal" tabIndex="-1" aria-labelledby="LocationModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="LocationModal">Change location</h5>
                        </div>
                        <div className="modal-body">

                                <div className="form-group">
                                    <input className="form-control border-light bg-light" placeholder="Location" ref={msgRefLocation} required />
                                </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary float-right btn-1 brd-1" data-dismiss="modal" onClick={() => handleLocationButton()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="NotesModal" tabIndex="-1" aria-labelledby="NotesModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="NotesModal">Add note</h5>
                        </div>
                        <div className="modal-body">

                                <div className="form-group">
                                    <textarea className="form-control border-light bg-light" maxLength="250" placeholder="Note" ref={msgRefNote} required />
                                </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary float-right btn-1 brd-1" data-dismiss="modal" onClick={() => handleNoteButton()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="ListsModal" tabIndex="-1" aria-labelledby="ListsModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ListsModal">Add list</h5>
                        </div>
                        <div className="modal-body">

                                <div className="form-group">
                                    <input className="form-control border-light bg-light" maxLength="15" placeholder="List name" ref={msgRefListName} required />
                                </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary float-right btn-1 brd-1" data-dismiss="modal" onClick={() => handleListButton()}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="SummaryModal" tabIndex="-1" aria-labelledby="SummaryModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="SummaryModal">Edit lists</h5>
                        </div>
                        <div className="modal-body">
                            {list_lists}
                            {list_lists.length === 0 &&
                                <p className="text-center font-italic text-muted">No lists</p>
                            }
                            <br />
                            <button type="button" className="btn btn-secondary float-right" data-dismiss="modal">Close</button>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    );
}

function NotesItem(props) {
    let date = new Date(props.note.time)

    return (
        <li href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <p className="mb-1 text-break">{props.note.note}</p>
                <p><span className="material-icons-outlined" onClick={() => props.remove(props.note.id)}>close</span></p>
            </div>
            <div className="d-flex w-100 justify-content-between">
                <small className="font-weight-bold">{props.note.name}</small>
                <small>{date.toDateString()}</small>
            </div>
        </li>
    );
}

function ListItem(props) {
    return (
        <div>
            <div className="row">
                <div className="col-8">
                    {props.list.name}
                </div>
                <div className="col-4 d-flex flex-row-reverse">
                    <button className="btn btn-outline-danger btn-sm float-right" onClick={() => props.handleRemoveList(props.list.id)}><span className="material-icons-outlined mr-1">delete_forever</span></button>
                </div>
            </div>
            <hr className="my-2"></hr>
        </div>
    );
}