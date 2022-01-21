import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Form, Loader, Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
    const [getCompletedNotes, setCompletedNotes] = useState(false);
    const [allnotes, setAllNotes] = useState(true);
    const [toggleAllComplete, settoggleAllComplete] = useState(false)
    const [crossline, setCrossLine] = useState(false)

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push("/");
        }
        if (userId) {
            router.push("/new");
        }
        getNote();
        console.log(getNoteData)

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
            axios.get(`http://localhost:3000/api/notes/${dataEmail}`)
                .then(function (response) {
                    console.log(response.data.data, 'get new function');
                    setGetNotesData(response.data.data)
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
            email: loginuser
        })
            .then(function (response) {
                console.log(response, '>>', response.data.data._id);
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


const [complete,setComplete] = useState([])

    function toggleComplete(id) {
        console.log(id.target,'target')

        console.log(id,'id')
        const completed = getNoteData.map(todo => {
            console.log(todo,'todo map',todo._id)
            if (todo._id === id) {
                setComplete([...complete,todo])
                setCrossLine(true)
            } else {
                return todo;
            }
        })
        console.log(toggleAllComplete, 'completed',complete)
    };
    
    function showComplete (){
        settoggleAllComplete(true)
        setAllNotes(false)
    }

    function showAll (){
        settoggleAllComplete(false)
        setAllNotes(true)
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
                                    // style={{
                                    //     textDecoration: crossLine ? "line-through" : ""
                                    //   }}
                                    onClick={() => toggleComplete(note._id)} className='listText'>{note.title}</span>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                    </>):""}



                    {toggleAllComplete ? (<>
                    <div style={{ paddingTop: "40px" }}>
                        {complete.filter(product => {
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
                    </>):""}

                    <div style={{ backgroundColor: '#F4FCE8' }}>
                        <Button style={{ backgroundColor: '#F4FCE8', fontSize: '10px' }} onClick={pulsButton}> <FontAwesomeIcon className="button11" icon={faPlus} /></Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '1px', fontSize: '10px' }} onClick={searchBut}> <FontAwesomeIcon className="button11" icon={faSearch} /></Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '1px', fontSize: '10px' }}> <FontAwesomeIcon className="button11" icon={faGripLinesVertical} /></Button>
                        <span style={{ backgroundColor: '#F4FCE8', paddingLeft: '9px', fontSize: '10px' }}>{getNoteData.length} items Left</span>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '250px', fontSize: '10px' }} onClick={showAll}>All</Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '2px', fontSize: '10px' }}>Active</Button>
                        {/* <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '2px', fontSize: '10px' }} onClick={getCompleteN}>Completed</Button> */}
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



