import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Loader, Card } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

const NewNote = () => {

    const [form, setForm] = useState({ title: '' });
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [loginuser, setLoginUser] = useState('');
    const [addButton, setAddButton] = useState(false);
    const [searchButton, setSearchButton] = useState(false);
    const [logout, setLogout] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [getNoteData, setGetNotesData] = useState([]);
    const [completeNote, setCompleteNotes] = useState(false);
    const [allnotes, setAllNotes] = useState(true);
    const [toggleAllComplete, settoggleAllComplete] = useState(false)
    const [toggleAllActive, settoggleAllActive] = useState(false)
    const [finalComplete, setFinalComplete] = useState([]);
    const [activeNotes, setActiveNotes] = useState([]);
    const Comple = [];
    const Active = [];

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push("/");
        }
        if (userId) {
            router.push("/new");
        }
        getNote();
        const users = JSON.parse(localStorage.getItem('loginUserData'));
        console.log(users, 'get users')
        if (users) {
            setLoginUser(users.email);
        }
    }, [errors, logout])

    const getNote = async () => {

        const data = JSON.parse(localStorage.getItem('loginUserData'));
        if (data) {
            const dataEmail = data.email
            axios.get(`/api/notes/${dataEmail}`)
                .then(function (response) {
                    console.log(response.data.data, 'get new function');
                    setGetNotesData(response.data.data)
                    const notesData = response.data.data;
                    console.log(notesData, '????')
                    if (notesData) {
                        for (let i = 0; i < notesData.length; i++) {
                            if (notesData[i].complete == true) {
                                Comple.push(notesData[i]);
                                console.log(Comple, '***complete***')
                                setFinalComplete(Comple)
                            }
                        }
                        for (let i = 0; i < notesData.length; i++) {
                            console.log(notesData[i].complete, 'complete')
                            if (notesData[i].complete == false) {
                                Active.push(notesData[i]);
                                console.log(Comple, '****Active***')
                                setActiveNotes(Active)
                            }
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    const createNote = async () => {
        // console.log(form.email, '??????', loginuser)
        axios.post("/api/notes", {
            title: form.title,
            email: loginuser,
            complete: completeNote
        })
            .then(function (response) {
                // console.log(response, '>>', response.data.data._id);
                if (response.data.data) {
                    getNote();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        createNote()
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};
        if (!form.title) {
            err.title = 'Title is required';
        }
        return err;
    }

    function pulsButton() {
        setAddButton(true)
        setSearchButton(false)
    }

    function searchBut() {
        setSearchButton(true)
        setAddButton(false)
    }

    function logoutUser() {
        localStorage.removeItem("userId");
        localStorage.removeItem("loginUserData");
        setLogout(true)
    }

    // function crossLine(event) {
    //     const element = event.target;
    //     element.classList.toggle("crossed-line");
    // }

    function toggleComplete(id) {
        console.log('target', id)
        if (completeNote == true) {
            setCompleteNotes(false)
            console.log(completeNote, 'false complete notes')
        }
        if (completeNote == false) {
            setCompleteNotes(true)
            console.log(completeNote, 'true complete notes')
        }

        axios.put(`/api/notes/${id}`, {
            complete: completeNote
        })
            .then(function (response) {
                console.log(response, '>>', response.data.data);
                if (response.data.data) {
                    getNote();
                    // console.log(getNoteData,'getNoteData')
                    // const completedNo = response.data.data;
                    // console.log(completedNo,'????')
                    // if(completedNo){
                    //     for (let i = 0; i < completedNo.length; i++) {
                    //         console.log(completedNo[i].complete,'complete')
                    //         if(completedNo[i].complete == true){
                    //             Comple.push(completedNo[i]);
                    //             console.log(Comple,'*******')
                    //             setFinalComplete(Comple)
                    //         }
                    //         // if (list[i].userid === loginuserid) {
                    //         //     Record.push(list[i])
                    //         //     setUserRecord(Record)
                    //         //     console.log('id match', userRecord, 'userRecord')
                    //         // }
                    //     }
                    // }
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        // const completed = getNoteData.map(todo => {
        //     // console.log(todo,'todo map',todo._id)
        //     if (todo._id === id) {
        //         setComplete([...complete, todo])
        //         setCrossLine(true)
        //     } else {
        //         return todo;
        //     }
        // })
        // console.log(toggleAllComplete, 'completed',complete,'duplicate')
    };

    function showComplete() {
        settoggleAllComplete(true)
        settoggleAllActive(false)
        setAllNotes(false)
    }

    function showAll() {
        settoggleAllComplete(false)
        settoggleAllActive(false)
        setAllNotes(true)
    }

    function showActive() {
        settoggleAllActive(true)
        settoggleAllComplete(false)
        setAllNotes(false)
    }

    return (
        <div className="form-container">
            <Link href="/new">
                <a className="create" onClick={logoutUser}>Logout</a>
            </Link>
            <div style={{ height: "200px", width: "600px" }}>
                <Card>
                    <h3 style={{ textAlign: 'center', paddingTop: '8px' }}>THINGS TO DO</h3>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            {addButton ? (<>
                                <Form.Input
                                    fluid
                                    error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                    label=''
                                    placeholder='Title'
                                    name='title'
                                    onChange={handleChange}
                                />
                            </>) : ""}
                            {searchButton ? (<>
                                <Form.Input
                                    fluid
                                    error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                    label=''
                                    placeholder='Search.....'
                                    value={searchValue}
                                    onChange={event => setSearchValue(event.target.value)} value={searchValue}
                                />
                            </>) : ""}
                        </Form>
                    </div>
                    {allnotes ? (<>
                        <div style={{ paddingTop: "40px" }}>
                            {getNoteData.filter(product => {
                                if (!searchValue) { return true } else return product.title.toLowerCase().includes(searchValue.toLowerCase())
                            }).map((note, index) => {

                                return (
                                    <div key={note._id} style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                                        <span
                                            style={{
                                                textDecoration: note.complete == true ? "line-through" : ""
                                            }}
                                            onClick={() => toggleComplete(note._id)} className='listText'>{note.title}</span>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </>) : ""}

                    {toggleAllComplete ? (<>
                        <div style={{ paddingTop: "40px" }}>
                            {finalComplete.filter(product => {
                                if (!searchValue) { return true } else return product.title.toLowerCase().includes(searchValue.toLowerCase())
                            }).map((note, index) => {

                                return (
                                    <div key={note._id} style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                                        <span
                                            style={{
                                                textDecoration: note.complete == true ? "line-through" : ""
                                            }}
                                            onClick={() => toggleComplete(note._id)} className='listText'>{note.title}</span>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </>) : ""}

                    {toggleAllActive ? (<>
                        <div style={{ paddingTop: "40px" }}>
                            {activeNotes.filter(product => {
                                if (!searchValue) { return true } else return product.title.toLowerCase().includes(searchValue.toLowerCase())
                            }).map((note, index) => {

                                return (
                                    <div key={note._id} style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                                        <span
                                            onClick={() => toggleComplete(note._id)} className='listText'>{note.title}</span>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </>) : ""}

                    <div style={{ backgroundColor: '#F4FCE8' }}>
                        <Button style={{ backgroundColor: '#F4FCE8', fontSize: '10px' }} onClick={pulsButton}> <FontAwesomeIcon className="button11" icon={faPlus} /></Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '1px', fontSize: '10px' }} onClick={searchBut}> <FontAwesomeIcon className="button11" icon={faSearch} /></Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '1px', fontSize: '10px' }}> <FontAwesomeIcon className="button11" icon={faGripLinesVertical} /></Button>
                        {allnotes ? (<>
                            <span style={{ backgroundColor: '#F4FCE8', paddingLeft: '9px', fontSize: '10px' }}>{getNoteData.length} Items Left</span>
                        </>) : ""}
                        {toggleAllActive ? (<>
                            <span style={{ backgroundColor: '#F4FCE8', paddingLeft: '9px', fontSize: '10px' }}>{activeNotes.length} Items Left</span>
                        </>) : ""}
                        {toggleAllComplete ? (<>
                            <span style={{ backgroundColor: '#F4FCE8', paddingLeft: '9px', fontSize: '10px' }}>{finalComplete.length} Items Left</span>
                        </>) : ""}
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '250px', fontSize: '10px' }} onClick={showAll}>All</Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '2px', fontSize: '10px' }} onClick={showActive}>Active</Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '2px', fontSize: '10px' }} onClick={showComplete}>Completed</Button>
                    </div>
                    {/* <Button type='submit'> <FontAwesomeIcon className="button11" icon={faPlus} /></Button> */}
                </Card>
            </div>
        </div>
    )
}


// NewNote.getInitialProps = async () => {
//     console.log('77777777777777')
//     const res = await fetch(`http://localhost:3000/api/notes/${loginuser}`);
//     const { data } = await res.json();
//     console.log(data, 'getInitialProps')

//     return { notes: data }
// }


export default NewNote;















  // console.log('kkk')
        // axios.get(`http://localhost:3000/api/notes/${loginuser}`)
        //     .then(function (response) {
        //         console.log(response.data.data, 'get new function');
        //         setGetNotesData(response.data.data)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

            // function getCompleteN() {
    //     setCompletedNotes(true)
    // }





    // function toggleComplete(id) {
    //     console.log('target', id)
    //     if (complete) {
    //         //     var index = complete.findIndex(function(o){
    //         //         return o._id === id;
    //         //    })
    //         //    console.log(index,'index exam')
    //         //    if (index !== -1) {

    //         //    const newArr = complete.splice(index, 1);
    //         //    console.log(newArr,'newArr',complete)
    //         //    setComplete(newArr)
    //         //    }
    //         const duplicatedata = complete.map(to => {
    //             console.log(to, 'to')
    //             if (to._id === id) {
    //                 console.log('id match', id)
    //                 setDuplicateId(id)
    //             }
    //         });
    //     }
    //     const completed = getNoteData.map(todo => {
    //         // console.log(todo,'todo map',todo._id)
    //         if (todo._id === id) {
    //             setComplete([...complete, todo])
    //             setCrossLine(true)
    //         } else {
    //             return todo;
    //         }
    //     })
    //     console.log(duplicateID, 'duplicate')
    //     // console.log(toggleAllComplete, 'completed',complete,'duplicate')
    // };



    // https://contactmentor.com/checkbox-list-react-js-example/

    // todo on strike complete line https://codesandbox.io/s/todo-list-hooks-ebfgw?from-embed=&file=/src/ToDoList.js

    // Javascript: How to access the return value of a Promise object



