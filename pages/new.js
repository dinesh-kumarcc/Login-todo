import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader, Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

const NewNote = ({ notes }) => {
    console.log(notes, 'noters')

    const [form, setForm] = useState({ title: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = useState([]);
    const router = useRouter();
    const [loginuser, setLoginUser] = useState('');
    const [userRecord, setUserRecord] = useState([]);
    const [togetNote, setGetNote] = useState([]);
    const [addButton, setAddButton] = useState(false);
    const [searchButton, setSearchButton] = useState(false);
    const [logout, setLogout] = useState(false);
    const [freshRec, setFreshRec] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const Record = [];

    useEffect(() => {
        console.log(notes,'notes ++')
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push("/");
        }
        if (userId) {
            router.push("/new");
        }
        // getNote()
        const users = JSON.parse(localStorage.getItem('loginUserData'));
        console.log(users, 'get users')
        setLoginUser(users.email);
        const userLogin = users.email;
        console.log(userLogin,' check user login')
        // createNote();
        if (notes) {
            console.log('**??***', notes)

            for (let i = 0; i < notes.length; i++) {
                console.log(notes[i].email, 'email notesssss',users.email)
                if (notes[i].email === users.email) {
                    console.log(' if loop')
                    Record.push(notes[i])
                    console.log('record ////', Record, 'length', Record.length)
                    setUserRecord(Record)
                    setFreshRec(true)

                    // setUserRecord(Record)
                }
            }
        }
    }, [errors,logout,freshRec])


    // const getNote = async () => {
    //     const res = await axios.get('http://localhost:3000/api/notes');
    //     console.log(res.data.data, 'res')
    //     setGetNote(res.data.data)
    // }
    // console.log(togetNote, 'togetnote')

    // console.log(loginuser, 'login user')
    // console.log(loginuser, 'login  ***** user', notes)
    // console.log(form, ';;;form', loginuser.length);


    const createNote = async () => {
        console.log(form.email, '??????', loginuser)
        axios.post("http://localhost:3000/api/notes", {
            title: form.title,
            email: loginuser
        })
            .then(function (response) {
                console.log(response, '>>', response.data.data._id);
                if (response.data.data) {

                    setIsSubmitting(false);
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
        setIsSubmitting(true);
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
        setLogout(true)
      }

      function crossLine(event) {
        const element = event.target;
        element.classList.toggle("crossed-line");
      }

    console.log(userRecord.length, 'user lebn')
    return (
        <div className="form-container">
             <Link href="/new">
            <a className="create" onClick={logoutUser}>Logout</a>
        </Link>
            <div style={{ height: "200px", width: "600px" }}>
                <Card>
                    <h3 style={{ textAlign: 'center', paddingTop: '8px' }}>THINGS TO DO</h3>
                    <div>
                        {/* <input onChange={event => setSearchValue(event.target.value)} value={searchValue} type="text" placeholder="Enter product name to search..." style={{ width: '50%', height: '40px', fontSize: '16px' }}></input> */}
                        {/* {
                            isSubmitting
                                ? <Loader active inline='centered' />
                                :  */}

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
                                    placeholder='Search '
                                    // name='title'
                                    value={searchValue}
                                    onChange={event => setSearchValue(event.target.value)} value={searchValue}
                                />
                            </>) : ""}
                            {/* <Form.Input
                                        fluid
                                        error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                        label=''
                                        placeholder='Title'
                                        name='title'
                                        onChange={handleChange}
                                    /> */}
                            {/* <Button type='submit'></Button> */}
                            {/* <Button type='submit'> <FontAwesomeIcon className="button11" icon={faPlus} /></Button> */}
                        </Form>
                        {/* } */}
                    </div>
                    <div style={{ paddingTop: "40px" }}>
                        {userRecord.filter(product => {
                            if (!searchValue) { return true } else return product.title.toLowerCase().includes(searchValue.toLowerCase())
                        }).map((note, index) => {

                            return (
                                <div key={note._id} style={{ textAlign: "center", paddingLeft: "40px", paddingRight: "40px" }}>
                                    {/* <input value={note.title} type="checkbox" onChange={handleCheck} /> */}
                                    <span onClick={crossLine}>{note.title}</span>
                                    {/* <span className={isChecked(note)}>{note.title}</span> */}
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                   
                    <div style={{ backgroundColor: '#F4FCE8' }}>
                        <Button style={{ backgroundColor: '#F4FCE8', fontSize: '10px' }} onClick={pulsButton}> <FontAwesomeIcon className="button11" icon={faPlus} /></Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '1px', fontSize: '10px'  }} onClick={searchBut}> <FontAwesomeIcon className="button11" icon={faSearch} /></Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '1px', fontSize: '10px' }}> <FontAwesomeIcon className="button11" icon={faGripLinesVertical} /></Button>
                        <span style={{ backgroundColor: '#F4FCE8', paddingLeft: '9px', fontSize: '10px' }}>{userRecord.length} items Left</span>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '250px', fontSize: '10px' }}>All</Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '2px', fontSize: '10px' }}>Active</Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '2px', fontSize: '10px' }}>Completed</Button>

                    </div>
                    {/* <Button type='submit'> <FontAwesomeIcon className="button11" icon={faPlus} /></Button> */}

                </Card>
            </div>
        </div>
    )
}


NewNote.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/notes');
    const { data } = await res.json();
    console.log(data, 'getInitialProps')

    return { notes: data }
}

export default NewNote;